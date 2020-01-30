const http = require('http');
const inquirer = require('inquirer');

const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

var teamMbr = new Employee;
var mOtherTitle = "";
var mOtherDesc = "";
var teamArray = []; 

async function promptUser(mRole) {
  teamMbr.role = mRole;

  getOther(mRole)
  .then(function(answers) {
    mOtherDesc = answers.other;

    getEmpName(mRole)
    .then(function(answers) {
      teamMbr.name = answers.name;

        getEmpId(mRole)
        .then(function(answers) {
          teamMbr.id = answers.id;
  
            getEmpEmail(mRole)
            .then(function(answers) {
              teamMbr.email = answers.email;

              console.log("Emp: " + teamMbr.name + ", " + teamMbr.id + ", " + teamMbr.email + ", " + teamMbr.role + ", " + mOtherDesc);

              empArray = [teamMbr.role,
                          teamMbr.name,
                          teamMbr.id,
	       	          teamMbr.email,
                          mOtherTitle,
                          mOtherDesc];

              teamArray.push(empArray);

              selectAction();
          });
       });
    });
 });   
}

async function selectAction() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
          {
            name: 'add engineer',
            value: 'add_engineer'
          },
          {
            name: 'add intern',
            value: 'add_intern'
          },
          {
            name: 'generate team roster',
            value: 'generate_roster'
          },
          {
            name: 'exit',
            value: 'exit'
          }
        ],
      },
    ])
    .then(answers => {
      switch (answers.action) {
        case 'add_engineer':
          promptUser('Engineer');
          break;

        case 'add_intern':
          promptUser('Intern');
          break;

        case 'generate_roster':
          promptUser('Generate');
          break;

        case 'exit':
        default:
          process.exit();
          break;
      }
    });
}

async function getOther(empRole) {
   var mMsg = "";
   switch (empRole) {
     case "Manager":
       mOtherTitle = "Office Number:";
       mMsg = "office number: ";
       break;

     case 'Engineer':
       mOtherTitle = "GitHub:";
       mMsg = "GitHub username: ";
       break;

     case 'Intern':
       mOtherTitle = "School:";
       mMsg = "school name: ";
       break;

     case 'Generate':
       generateRoster();
       break;

     default:
       process.exit();
       break;
  }

  return inquirer.prompt([
    {
        type: "input",
        name: "other",
        message: "Enter " + empRole + " " + mMsg
    }
  ]);
}

async function getMgrOffice(empRole) {
    return inquirer.prompt([
      {
          type: "input",
          name: "officeNumber",
          message: "Enter " + empRole + " office number: "
      }
   ]);
}

async function getEngGitHub(empRole){
    return inquirer.prompt([
      {
          type: "input",
          name: "github",
          message: "Enter " + empRole + " GitHub username: "
      }
   ]);
}

async function getIntrnSchool(empRole){
    return inquirer.prompt([
      {
          type: "input",
          name: "school",
          message: "Enter " + empRole + " school name: "
      }   
  ]);
}

async function generateRoster() {
   // generateHTML
   var teamRoster = "";

   //update the page with the new content
   //document.getElementById('teamRoster').innerHTML = teamRoster;

   console.log("Team Roster Generated");
   process.exit();
}

async function getEmpName(empRole) {
    return inquirer.prompt([
      {
          type: "input",
          name: "name",
          message: "Enter " + empRole + " name: "
      }
   ]);
}

async function getEmpId(empRole) {
    return inquirer.prompt([
      {
          type: "input",
          name: "id",
          message: "Enter " + empRole + " ID: "
      }
   ]);
}

async function getEmpEmail(empRole){
    return inquirer.prompt([
      {
          type: "input",
          name: "email",
          message: "Enter " + empRole + " email: "
      }
   ]);
}

// Begin the process
promptUser("Manager");
