# LeetCode Problem Setup Script

This script automates the process of setting up a local environment for solving LeetCode problems. It creates a directory structure and solution file template based on the problem details fetched from LeetCode. It also supports creating custom tasks and additional input/output files.

## Features

- Fetches problem details from LeetCode using their GraphQL API
- Creates a directory with the problem ID and name
- Generates a solution file template in the specified programming language
- Supports multiple programming languages: JavaScript, TypeScript (you can add more via `LANGUAGE_CONFIG`)
- Allows creation of custom tasks without fetching from LeetCode
- Option to create input.txt and output.txt files for each problem

## Installation

1. Clone this repository or download the script.
2. Install the required Python package:

```bash
git clone https://github.com/goldic342/leetcode-mastermind.git
pip install requests
```

## Usage

Run the script from the command line with the following syntax:

```bash
python new.py [options] <problem_name_or_url>
```

### Options:

- `<problem_name_or_url>`: The name of the LeetCode problem or its URL (in quotes if the name contains spaces)
- `-l`, `--language`: Optional. The programming language for the solution file (default: js)
- `-c`, `--custom`: Create a custom task (does not fetch from LeetCode)
- `-f`, `--files`: Create input.txt and output.txt files

### Supported languages:

- JavaScript (js)
- TypeScript (ts)

### Examples

1. Setup for "Two Sum" problem in JavaScript:

   ```bash
   python new.py "Two Sum"
   ```

2. Setup using the problem URL in TypeScript:

   ```bash
   python new.py -l ts https://leetcode.com/problems/add-two-numbers/
   ```

3. Setup for "two-sum" without quotes:

   ```bash
   python new.py two-sum
   ```

4. Setup fir two*sum with *:

```bash
python new.py two_sum
```

## Project Structure

After running the script, you'll have a new directory for the problem with a solution file inside:

```
.
├── 1-two_sum/
│   └── solution.js
├── 5-longest_palindromic_substring/
│   └── solution.ts
├── 2-add_two_numbers/
│   ├── solution.ts
│   ├── input.txt  (if -f option was used)
│   └── output.txt (if -f option was used)
└── new.py
```

## Customization

You can easily add support for more programming languages by modifying the `LANGUAGE_CONFIG` dictionary in the script.

You can also change separators for problem name and number by modifying `PROBLEM_NAME_SEPARATOR` and `PROBLEM_ID_NAME_SEPARATOR`.

In some languages like Python, Kotlin, Scala, and many others, you need to make an additional request for the [asset](https://assets.leetcode.com/monaco-tm/configurations/scala.json). I'm lazy to implement this, so if you need support for those languages - contribute :)

## Contributing

Contributions are welcome! If you'd like to add support for more languages, improve the script, or fix any issues, please feel free to submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).
