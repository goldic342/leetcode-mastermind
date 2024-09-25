import os
import shutil
import re
import sys
import requests
from datetime import datetime
from typing import Dict, List
import argparse

# Configuration
PROBLEM_NAME_SEPARATOR = "-"
PROBLEM_ID_NAME_SEPARATOR = "_"
DEFAULT_LANGUAGE = "js"


def create_js_template(
    function_name: str, params: List[Dict[str, str]], return_type: str
) -> str:
    param_str = ", ".join(f"{p['name']}: {p['type']}" for p in params)
    return f"""
/**
 * @param {{{param_str}}}
 * @return {{{return_type}}}
 */
function {function_name}({", ".join(p['name'] for p in params)}) {{

}}
"""


def create_ts_template(
    function_name: str, params: List[Dict[str, str]], return_type: str
) -> str:
    param_str = ", ".join(f"{p['name']}: {p['type']}" for p in params)
    return f"""
function {function_name}({param_str}): {return_type} {{

}}
"""


LANGUAGE_CONFIG = {
    "js": {
        "extension": ".js",
        "comment": "//",
        "create_template": create_js_template,
        "void": "void",
    },
    "ts": {
        "extension": ".ts",
        "comment": "//",
        "create_template": create_ts_template,
        "void": "void",
    },
    # In some languages like python, rust, kotlin you need to make another request for the asset
    # Example: https://assets.leetcode.com/monaco-tm/configurations/kotlin.json
    #
    # "language": {
    #     "extension": Extension of language file (.py .cpp)
    #     "comment": Comment symbol in language file
    #     "create_template": Function that will create language template,
    #     "void": What value should be returned if no return type is specified
    # },
}


def parse_title_slug(url_or_name: str) -> str:
    if url_or_name.startswith("http"):
        pattern = r"problems/([\w\-]+)/?"
        match = re.search(pattern, url_or_name)
        if match:
            return match.group(1)
        raise ValueError("Invalid LeetCode problem URL")
    else:
        return url_or_name.replace(" ", "-").replace("_", "-").lower()


def fetch_problem_data(title_slug: str) -> dict:
    url = "https://leetcode.com/graphql/"
    query = {
        "query": """
        query questionData($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                questionId
                questionFrontendId
                title
                titleSlug
                difficulty
                categoryTitle
                metaData
                exampleTestcaseList
            }
        }
        """,
        "variables": {"titleSlug": title_slug},
        "operationName": "questionData",
    }

    response = requests.post(url, json=query)

    if response.status_code == 200:
        response_json: dict = response.json()

        if response_json.get("data", {}).get("question") is None:
            raise RuntimeError(f"Problem not found: {title_slug}")

        return response_json.get("data", {}).get("question", {})
    raise RuntimeError(f"Failed to fetch problem data: {response.status_code}")


def create_problem_directory(problem_id: str, title: str) -> str:
    directory_name = f"{problem_id}{PROBLEM_ID_NAME_SEPARATOR}{title.lower().replace(' ', PROBLEM_NAME_SEPARATOR)}"
    if os.path.exists(directory_name):
        rewrite = input("Problem already exists. Rewrite (y/n)").lower()

        if rewrite == "n":
            sys.exit(0)
        elif rewrite == "y":
            shutil.rmtree(directory_name)
        else:
            print("This isn't an option")
            sys.exit(1)

    os.makedirs(directory_name)
    print(f"Directory created: {directory_name}")
    return directory_name


def create_solution_file(
    directory: str, language: str, problem_data: dict, is_custom: bool
):
    if language not in LANGUAGE_CONFIG:
        raise ValueError(f"Language {language} is not supported.")

    lang_config = LANGUAGE_CONFIG[language]
    ext = lang_config["extension"]
    comment_symbol = lang_config["comment"]

    file_name = f"solution{ext}"
    file_path = os.path.join(directory, file_name)

    with open(file_path, "w", encoding="utf-8") as f:
        # Write problem information
        str_list = [
            f"{problem_data.get('title', 'Custom Task')} ({problem_data.get('difficulty', 'N/A')})\n",
            f"Created on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n",
            f"Source: {'None' if is_custom else 'LeetCode'}\n",
            "Happy coding!\n\n",
        ]

        if not is_custom:
            str_list.insert(
                1, f"https://leetcode.com/problems/{problem_data['titleSlug']}/\n"
            )
            str_list.insert(2, f"ID: {problem_data['questionFrontendId']}\n")
            str_list.insert(3, f"Category: {problem_data['categoryTitle']}\n")

        for data_str in str_list:
            f.write(f"{comment_symbol} " + data_str)

        if not is_custom:
            # Write example test cases
            f.write(f"\n{comment_symbol} Example test cases:\n")
            for i, test_case in enumerate(
                problem_data.get("exampleTestcaseList", []), 1
            ):
                test_case = test_case.replace("\n", f"\n{comment_symbol} => ")
                f.write(f"{comment_symbol} Test case {i}: {test_case}\n")

    print(f"Solution file created: {file_path}")


def create_io_files(directory: str):
    for file_name in ["input.txt", "output.txt"]:
        file_path = os.path.join(directory, file_name)
        with open(file_path, "w") as f:
            pass  # Create empty file
        print(f"Created file: {file_path}")


def main():
    parser = argparse.ArgumentParser(description="LeetCode problem setup script")
    parser.add_argument("problem", nargs="+", help="LeetCode problem name or URL")
    parser.add_argument(
        "-l", "--language", default=DEFAULT_LANGUAGE, help="Programming language"
    )
    parser.add_argument(
        "-c", "--custom", action="store_true", help="Create a custom task"
    )
    parser.add_argument(
        "-f",
        "--files",
        action="store_true",
        help="Create input.txt and output.txt files",
    )

    args = parser.parse_args()

    leetcode_url_or_name = " ".join(args.problem)
    language = args.language.lower()
    is_custom = args.custom
    create_io = args.files

    if language not in LANGUAGE_CONFIG:
        print(f'Invalid language, supported: {", ".join(LANGUAGE_CONFIG.keys())}')
        sys.exit(1)

    try:
        if is_custom:
            problem_data = {
                "title": leetcode_url_or_name,
                "questionFrontendId": "custom",
            }
        else:
            title_slug = parse_title_slug(leetcode_url_or_name)
            print(f"Problem: {title_slug}")
            problem_data = fetch_problem_data(title_slug)

        directory = create_problem_directory(
            problem_data["questionFrontendId"], problem_data["title"]
        )
        create_solution_file(directory, language, problem_data, is_custom)

        if create_io:
            create_io_files(directory)

    except KeyboardInterrupt:
        sys.exit(0)
    except ValueError as e:
        print(f"Error parsing problem data: {str(e)}")
        sys.exit(1)
    except RuntimeError as e:
        print(f"{str(e)} (runtime error)")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        print("Please report this issue if it persists.")
        sys.exit(1)


if __name__ == "__main__":
    main()
