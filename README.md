# Node.js Notes
## Introduction
This repo is where I put my Node.js study notes and homework assignments.

<details open>
  <summary>Table of Contents</summary>
  
  - [2022.02.14 - Node.js Part 1 fs Example](#2022-02-14-node-js-part-1-fs-example)
    - [Code Summary](#code-summary)
    - [Usage](#usage)
    - [Examples](#examples)

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