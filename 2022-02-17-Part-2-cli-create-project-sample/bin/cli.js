#! /usr/local/bin/node
// console.log('hello world');

import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import { exec, execSync } from "node:child_process";
import rimraf from "rimraf";


const program = new Command(); // create a new commander instance

program.option('-f --framework <framework>', '设置框架'); // add new option to the commander instance (framework is required)
program.command('create <project> [other...]') // add new command to the commander instance (project is required, other is optional)
  .alias('crt') // add alias for command (crt is alias for create)  
  .description('创建项目') // add description for command
  .action((projectName, args) => { // add action for command
    // console.log('project name', projectName);

    // if (args) {
    //   console.log('args', args);
    // }

    // Check if the project folder already exists
    fs.stat(path.join(projectName), (err, state) => {
      if (err) {
        if (err.errno === -2) { // code -2: no such file or directory
          createProject(projectName); // 
        } else {
          console.log('Error: ', err);
        }
      } else {
        if (state.isDirectory()) { // if the project folder already exists, delete it
          console.log('Error: ', 'The project folder already exists');
          // exec(`rm -rf ${projectName}`); // delete the project folder (not recommended) 
          rimraf.sync(path.join(projectName)); // delete the project folder (recommended), and use sync method to wait for the deletion to complete, otherwise the next step will be executed before the deletion is completed, resulting in the creation of the project folder again, and the deletion will be executed again, resulting in an infinite loop, which will cause the program to crash, so the sync method is used to wait for the deletion to complete before the next step is executed, and the program will not crash
          console.log('Aready delete:', projectName);
          createProject(projectName);
        } else {
          createProject(projectName);
        }
      }
    });

  });

program.parse(process.argv); // parse the command line arguments and execute the corresponding action

const ignore = `.vscode 
node_modules
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
`;

function createProject(projectName) { // create project folder and files
  console.log('Create', projectName, 'Done');
  // exec(`mkdir ${projectName}`);
  // exec(`rm -rf ${projectName}`);

  fs.mkdir(path.join(projectName), (err) => { // create project folder, and use path.join to join the path
    // !err ? console.log('Create projuect success') : console.log('Error ', err);

    if (err) {
      console.log('Error creating project folder: ', err);
      return;
    }
    console.log('Project folder created');

  });

  fs.writeFile(path.join(projectName, '.gitignore'), ignore, (err) => { // create .gitignore file and write ignore content to it
    // !err ? console.log('.gitignore file created') : console.log('Error creating .gitignore file: ', err);

    if (err) {
      console.log('Error creating .gitignore file: ', err);
      return;
    }
    console.log('.gitignore file created');

  });

  fs.writeFile(path.join(projectName, 'README.md'), `# ${projectName}`, (err) => { // create README.md file and write content to it 
    // !err ? console.log('README.md file created') : console.log('Error creating README.md file: ', err);

    if (err) {
      console.log('Error creating README.md file: ', err);
      return;
    }
    console.log('README.md file created');

  });

  execSync(`cd ${projectName} \n git init \n npm init -y \n pnpm add -D @types/node`); // use execSync to execute the command line, and use \n to separate the commands, and use cd to enter the project folder, and then execute the following commands
  exec(`code ${projectName}`); // open the project folder in vscode

}

