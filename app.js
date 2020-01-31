const http = require('http');
const inquirer = require('inquirer');
const fs = require('fs');

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

async function generateRoster() {
   // generateHTML
   var teamRoster = '';

   teamRoster += '<!DOCTYPE html>';
   teamRoster += '<html lang="en">';
   teamRoster += '<head>';
   teamRoster += '<meta charset="UTF-8" />';
   teamRoster += '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
   teamRoster += '<meta http-equiv="X-UA-Compatible" content="ie=edge" />';
   teamRoster += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>';
   teamRoster += '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"';
   teamRoster += 'integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"/>';
   teamRoster += '<link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"/>';
   teamRoster += '<link rel="stylesheet" href="styles.css">';
   teamRoster += '<title>Weather Dashboard</title>';

   teamRoster += '<style>';
   teamRoster += 'span {';
   teamRoster += 'border-radius: 3px;';
   teamRoster += 'padding: 5px;';
   teamRoster += 'display: inline;';
   teamRoster += 'color: white;';
   teamRoster += 'background-color: red;';
   teamRoster += '}';
   teamRoster += '</style>';
   teamRoster += '</head>';
	
   teamRoster += '<body>';
   teamRoster += '<div class="container-fluid">';
   teamRoster += '<div class="row">';
    
   teamRoster += '<div class="container p-3 my-3 border">';
   teamRoster += '<h1>Software Engineering Team</h1>';
   teamRoster += '</div>';

   teamRoster += '<div>';
   teamRoster += '<div class="card">';
   teamRoster += '<h5 class="card-header">Team Roster:</h5>';
   teamRoster += '<div class="card-body">';
   teamRoster += '<div class="card-deck">';

   for (i = 0; i < teamArray.length; i++)
   {
      teamRoster += '<div class="card bg-primary">';
      teamRoster += '<div class="card-body text-left" style="color:white;">';
      teamRoster += '<h5 class="card-text">';
      teamRoster += teamArray[i][0];
      teamRoster += '</h5>';
      teamRoster += '<p class="card-text">Name: ' + teamArray[i][1] + '</p>';
      teamRoster += '<p class="card-text">ID: ' + teamArray[i][2] + '</p>';
      teamRoster += '<p class="card-text">email: ' + teamArray[i][3] + '</p>';
      teamRoster += '<p class="card-text">';
      teamRoster += teamArray[i][4];
      teamRoster += '" "';
      teamRoster += teamArray[i][5];
      teamRoster += '</p>';
      teamRoster += '</div>';
      teamRoster += '</div>';
   }

   teamRoster += '</div>';
   teamRoster += '</div>';
   teamRoster += '</div>';

   teamRoster += '</div>';
   teamRoster += '</div>';
   teamRoster += '</div>';
   teamRoster += '</body>';
   teamRoster += '<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>';
   teamRoster += '<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>';
   teamRoster += '<script src="script.js"></script>';
   teamRoster += '</html>';

   console.log(teamRoster);
   //output a file named team.html in the output folder

   process.exit();
}

// Begin the process
promptUser("Manager");
