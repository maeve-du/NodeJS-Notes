
/**
 * Example of using fs module with destructuring, only import access and constants
 */
// import { access, constants } from "node:fs";
// const file = 'a.txt';
// access(file, constants.F_OK, (err) => {
//   console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
// });

import fs from "fs";
import minimist from "minimist"; //

/**
 * process.argv is an array, contains all the command line arguments
 * e.g. type node example.js --filename a.txt -e -r -w -a -b -c will be ['node', 'example.js', '--filename', 'a.txt', '-e', '-r', '-w', '-a', '-b', '-c']
 */
const argv = process.argv.slice(2); // slice(2) will remove the first two elements, which are node and example.js

/**
 * minimist is a library to transform command line arguments to object
 * e.g. node example.js -e -r -w -a -b -c a.txt, will be transformed to { _: [], e: true, r: true, w: true, a: true, b: true, c: true, filename: 'a.txt' }
 */
const args = minimist(argv); //

console.log('argv', argv); //
console.log('args', args);
// console.log('process', process) 

/**
 * args['filename'] = 'a.txt' if -filename a.txt is in command line， otherwise args['filename'] = undefined
 * args['e'] = true if -e is in command line， otherwise args['e'] = undefined
 * args['r'] = true if -r is in command line， otherwise args['r'] = undefined
 * args['w'] = true if -w is in command line， otherwise args['w'] = undefined
 * args['a'] = true if -a is in command line， otherwise args['a'] = undefined
 * const filename = args['filename'] equivalent to const filename = args.filename,
 * same for checkExist, checkReadable and checkWritable
 */
const filename = args['filename'];
const checkExist = args['e'];
const checkReadable = args['r'];
const checkWritable = args['w'];
const checkExcutable = args['x'];
const checkAll = args['a'];

// console.log(typeof filename);

if (!filename || !(typeof filename === 'string')) { // Check if filename is provided in command line
  console.log('❗️Need filename');
  console.log('Format: --filename <filename>');
  process.exit();
}
// const file = argv[0]; //

// fs.access(filename, fs.constants.F_OK, (err) => { // Check if file exists
//   console.log(`${filename} ${err ? 'does not exist' : 'exists'}`);
// });

// fs.access(filename, fs.constants.R_ok, (err) => { // Check if file is readable
//   console.log(`${filename} ${err ? 'is not readable' : 'is readable'}`);
// });

// fs.access(filename, fs.constants.W_ok, (err) => { // Check if file is writable
//   console.log(`${filename} ${err ? 'is not writable' : 'is writable'}`);
// });

// fs.access(filename, fs.constants.X_ok, (err) => { // Check if file is executable
//   console.log(`${filename} ${err ? 'is not executable' : 'is executable'}`);
// });

// 1. user variables to store the flags
// let existFlag = false;
// let readableFlag = false;
// let writableFlag = false;
// let executableFlag = false;

// 2. User objec to store the flags instead of using variables
// strore the flag of each check, if the flag is false, then check the file, otherwise do nothing
// const fileFlags = {
//   exists: false,
//   isReadable: false,
//   isWritable: false,
//   isExecutable: false
// };

// to check the flag, if the flag is false, then check the file, otherwise do nothing,
// function flagChecker(flag, func) {
//   if (!fileFlags[flag]) {
//     func();
//     fileFlags[flag] = !fileFlags[flag];
//   }
// }

// 3. use a Set instead of an object to store the flags instead of using object
const fileFlags = new Set();

function flagChecker(flag, func) {
  if (!fileFlags.has(flag)) {
    func();
    fileFlags.add(flag);
  }
}


/**
 * when -e is in command line, checkExist = true
 * otherwise checkExist = undefined, same for checkReadable and checkWritable
 */
if (checkExist) {
  isExist();
}

if (checkReadable) {
  isReadable();
}

if (checkWritable) {
  isWritable();
}

if (checkExcutable) {
  isExecutable();
}

//alternative way to check the flag, if the flag is false, then check the file, otherwise do nothing,
function isExist() {
  // if the flag is false, then check the file, otherwise do nothing
  // if (!existFlag) {
  //   fs.access(filename, fs.constants.F_OK, (err) => { // Check if file exists
  //     console.log(`${filename} ${err ? 'does not exist' : 'exists'}`);
  //   });
  //   existFlag = !existFlag;
  // }

  /**
  * code is the same as above, but use function flagChecker to check the flag
  * flag is from object flags
  */
  flagChecker('exists', () => {
    fs.access(filename, fs.constants.F_OK, (err) => { // Check if file exists
      console.log(`${filename} ${err ? 'does not exist' : 'exists'}`);
    });
  } // - end of func
  );
}

function isReadable() {
  // if (!readableFlag) {
  //   fs.access(filename, fs.constants.R_ok, (err) => { // Check if file is readable
  //     console.log(`${filename} ${err ? 'is not readable' : 'is readable'}`);
  //   });
  //   readableFlag = !readableFlag;
  // }

  flagChecker('isReadable', () => {
    fs.access(filename, fs.constants.R_ok, (err) => { // Check if file is readable
      console.log(`${filename} ${err ? 'is not readable' : 'is readable'}`);
    });
  }// - end of func
  );

}

function isWritable() {
  // if (!writableFlag) {
  // fs.access(filename, fs.constants.W_ok, (err) => { // Check if file is writable
  //   console.log(`${filename} ${err ? 'is not writable' : 'is writable'}`);
  // });
  //   writableFlag = !writableFlag;
  // }


  flagChecker('isWritable', () => {
    fs.access(filename, fs.constants.W_ok, (err) => { // Check if file is writable
      console.log(`${filename} ${err ? 'is not writable' : 'is writable'}`);
    });
  }// - end of func
  );
}

function isExecutable() {
  flagChecker('isExecutable', () => {
    fs.access(filename, fs.constants.X_ok, (err) => { // Check if file is executable
      console.log(`${filename} ${err ? 'is not executable' : 'is executable'}`);
    });
  });
}


if (checkAll) {
  isExist();
  isReadable();
  isWritable();
  isExecutable();
}