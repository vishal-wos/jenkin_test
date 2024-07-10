// const readline = require("readline");
// const process = require("process");

// let dependance;

// // List of options to navigate through
// const options = [
//   "bcrypt",
//   "cli-color",
//   "cors",
//   "crypto-js",
//   "dotenv",
//   "express",
//   "express-handlebars",
//   "express-rate-limit",
//   "helmet",
//   "http",
//   "https",
//   "joi",
//   "jsonwebtoken",
//   "moment",
//   "morgan-body",
//   "multer",
//   "mysql2",
//   "nodemailer",
//   "nodemailer-express-handlebars",
//   "puppeteer",
//   "sequelize",
//   "swagger-autogen",
//   "swagger-ui-express",
//   "uuid",
// ];
// let currentOption = 0;
// let selectedOptions = new Set();

// // Make `process.stdin` begin emitting "keypress" events
// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);

// // Set up readline interface
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // Function to display the options
// function displayOptions() {
//   console.clear();
//   options.forEach((option, index) => {
//     if (index === currentOption) {
//       if (selectedOptions.has(index)) {
//         console.log(`> [x] ${option}`);
//       } else {
//         console.log(`> [ ] ${option}`);
//       }
//     } else {
//       if (selectedOptions.has(index)) {
//         console.log(`  [x] ${option}`);
//       } else {
//         console.log(`  [ ] ${option}`);
//       }
//     }
//   });
//   console.log("\nPress 'a' to select/deselect all");
//   console.log("Press 'q' to exit");
// }

// // Handle keypress events
// process.stdin.on("keypress", (ch, key) => {
//   if (key) {
//     if (key.name === "down") {
//       currentOption = currentOption === options.length - 1 ? 0 : currentOption + 1;
//     } else if (key.name === "up") {
//       currentOption = currentOption === 0 ? options.length - 1 : currentOption - 1;
//     } else if (key.name === "space") {
//       if (selectedOptions.has(currentOption)) {
//         selectedOptions.delete(currentOption);
//       } else {
//         selectedOptions.add(currentOption);
//       }
//     } else if (key.name === "a") {
//       if (selectedOptions.size === options.length) {
//         selectedOptions.clear();
//       } else {
//         options.forEach((_, index) => selectedOptions.add(index));
//       }
//     } else if (key.name === "return") {
//       dependance = [...selectedOptions].map((index) => options[index]).join(" ");
//       rl.close();
//       process.stdin.pause();
//       console.log('npm install', dependance);
//       return;
//     } else if (key.name === "q" || key.name === "escape") {
//       rl.close();
//       process.stdin.pause();
//       return;
//     }
//     // Display options after processing the key event
//     displayOptions();
//   }
// });

// // Initial display
// displayOptions();



const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

// Confirm function to prompt user for input
async function confirm(msg) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(msg, (input) => {
      rl.close();
      resolve(/^y|yes|ok|true$/i.test(input));
    });
  });
}

// Function to add a script to package.json
async function addScriptToPackageJson(scriptName, scriptCommand) {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');

  try {
    // Read the existing package.json file
    const data = await fs.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(data);

    // Add the new script
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
    packageJson.scripts[scriptName] = scriptCommand;

    // Write the updated package.json back to the file
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

    console.log(`Script "${scriptName}" added successfully.`);
  } catch (error) {
    console.error(`Error updating package.json: ${error.message}`);
  }
}

// Main function to demonstrate the confirmation and adding script
async function main() {
  const ok = await confirm("Destination is not empty, continue? [y/N] ");
  if (ok) {
    // Perform the action - adding a script to package.json in this case
    await addScriptToPackageJson('start', 'node index.js');
    console.log("Action performed: Script added to package.json");
  } else {
    console.error("Process aborting ......");
    process.exit(1);
  }
}

// Run the main function
main();
