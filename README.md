# Node.js Notes
## Introduction
This repo is where I put my Node.js study notes and homework assignments.

<details open>
  <summary>Table of Contents</summary>
  
  - [Introduction](#introduction)
  - [2022.02.14 - Node.js Part 1 fs Example](#2022-02-14-node-js-part-1-fs-example)
    - [Code Summary](#code-summary)
    - [Usage](#usage)
    - [Examples](#examples)
  - [2022.02.17 - Node.js Part 2 CLI Tool Sample](#2022-02-17-node-js-part-2-cli-tool-sample)
    - [Linking and Unlinking the CLI](#linking-and-unlinking-the-cli)
    - [Usage](#usage)
    - [Framework Support](#framework-support)

</details>


## 2022.02.14 - Node.js Part 1 fs Example
This is a simple example of using the `fs` module from Node.js to check whether a file exists, is readable, is writable, and is executable.


### Code Summary
The code demonstrates the use of the `fs` and `minimist` modules. It takes command line arguments using `process.argv` and minimist to parse and convert them into objects.

Then the script uses the fs `access` method to check whether a file exists, is readable, writable, and executable.

And flags are used to control which checks are performed. If a check has already been performed, the program does not perform the same check again.  The code demonstrates different ways of checking the flags, such as using variables, an object, or a set.

The program will exit if either no filename is provided or if it is not provided in the format `--filename <filename>`.

### Usage
The following command line options are available:

Option | Description
------ | -----------
`--filename <filename>` | Required, The name of the file to be checked.
`-e` | Check if the file exists.
`-r` | Check if the file is readable.
`-w` | Check if the file is writable.
`-x` | Check if the file is executable.
`-a` | Check all of the above.

### Examples

To check if the file example.txt exists:
```
node index.js --filename example.txt -e
```

To check if the file example.txt is readable and writable:
```
node index.js --filename example.txt -r -w
```

To check if the file example.txt exists, is readable and writable:
```
node index.js --filename example.txt -a
```

## 2022.02.17 - Node.js Part 2 CLI Tool Sample

The goal of this project is to learn how to create a CLI tool using Node.js and the Commander library. The tool will allow users to create a new project folder, with some initial files and configurations.

### Linking and Unlinking the CLI
Before using the CLI, you need to link it to your local environment. To do this, navigate to the root folder of the CLI project and run the following command:
```sh
npm link
```
This will create a symbolic link from the global node_modules folder to the CLI's local folder, allowing you to run the cli command from anywhere in your terminal.

Once you are done using the CLI, you can unlink it by running the following command:
```sh
npm unlink
```

### Usage

To create a new project with the CLI tool, run the following command:
```sh
cli crt my-project
```

This will create a new folder called `my-project` in the current directory, and will add the following files:

*   `.gitignore`: This file contains a list of files and folders that should be ignored by Git.
*   `README.md`: This file contains the project name and is used to provide information about the project.
*   `package.json`: This file is used to manage the dependencies of the project.

In addition, the following modules will be pre-installed:

*   `@types/node`: This module provides TypeScript definitions for Node.js.


### Framework Support
Currently, the CLI tool only supports creating a basic project without any framework. The framework feature is not functional yet.