# LeetCode Problem Setup Script

This script automates the process of setting up a local environment for solving LeetCode problems. It creates a directory structure and solution file template based on the problem details fetched from LeetCode.

Also there are my solutions to all leetcode problems that I solved (I hope they are not bad).

## Features

- Fetches problem details from LeetCode using their GraphQL API
- Creates a directory with the problem ID and name
- Generates a solution file template in the specified programming language
- Supports multiple programming languages: JavaScript, TypeScript (you can add more via `LANGUAGE_CONFIG`)

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
python new.py "<problem_name_or_url>" [language]
```

- `<problem_name_or_url>`: The name of the LeetCode problem or its URL (in quotes if the name contains spaces)
- `language`: Optional. The programming language for the solution file (default: js)

Supported languages:

- JavaScript (js)
- TypeScript (ts)

### Examples

1. Setup for "Two Sum" problem in JavaScript:

   ```bash
   python new.py "Two Sum"
   ```

2. Setup using the problem URL in TypeScript:

   ```bash
   python new.py https://leetcode.com/problems/add-two-numbers/ ts
   ```

3. Setup for two-sum without:

   ```bash
   python new.py two-sum
   ```

## Project Structure

After running the script, you'll have a new directory for the problem with a solution file inside:

```text
.
├── 1-two_sum/
│   └── solution.js
├── 5-longest_palindromic_substring/
│   └── solution.ts
├── 2-add_two_numbers/
│   └── solution.ts
└── new.py
```

## Customization

You can easily add support for more programming languages by modifying the `LANGUAGE_CONFIG` dictionary in the script.

You can also change separators for problem name and number and name by modifying `PROBLEM_NAME_SEPARATOR` and `PROBLEM_ID_NAME_SEPARATOR`

In some languages like: `python`, `kotlin`, `scala` and many other you need to make additional request for [asset](https://assets.leetcode.com/monaco-tm/configurations/scala.json) I'm lazy to implement this, so if you need support for those languages - contribute :)
