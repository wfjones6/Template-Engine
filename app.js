const http = require('http');
const inquirer = require('inquirer');
const fs = require('fs');
const util = require("util");
const request = require('request');

const writeFileAsync = util.promisify(fs.writeFile);

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

  getEmpName(mRole)
  .then(function(answers) {
    teamMbr.name = answers.name;

      getEmpId(mRole)
      .then(function(answers) {
        teamMbr.id = answers.id;
  
          getEmpEmail(mRole)
          .then(function(answers) {
            teamMbr.email = answers.email;

            getOther(mRole)
            .then(function(answers) {
              mOtherDesc = answers.other;

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
          generateRoster();
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
   var html = '';

   html += '<!DOCTYPE html>';
   html += '<html lang="en">';
   html += '<head>';
   html += '<meta charset="UTF-8" />';
   html += '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
   html += '<meta http-equiv="X-UA-Compatible" content="ie=edge" />';
   html += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>';
   html += '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"';
   html += 'integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"/>';
   html += '<link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"/>';
   html += '<link rel="stylesheet" href="styles.css">';
   html += '<title>Team Roster</title>';

   html += '<style>';
   html += 'span {';
   html += 'border-radius: 3px;';
   html += 'padding: 5px;';
   html += 'display: inline;';
   html += 'color: white;';
   html += 'background-color: red;';
   html += '}';
   html += '</style>';
   html += '</head>';
	
   html += '<body>';
   html += '<div class="container">';
   html += '<div class="row">';
    
   html += '<div class="container p-3 my-3 border">';
   html += '<h1>Software Engineering Team</h1>';
   html += '</div>';

   html += '<div>';
   html += '<div class="card">';
   html += '<h5 class="card-header">Team Roster:</h5>';
   html += '<div class="card-body">';
   html += '<div class="card-deck">';

   for (i = 0; i < teamArray.length; i++)
   {
      html += '<div class="card bg-primary">';
      html += '<div class="card-body text-left" style="color:white;">';
      html += '<h5 class="card-text">';
      html += teamArray[i][0];
      html += '</h5>';
      html += '<p class="card-text">Name: ' + teamArray[i][1] + '</p>';
      html += '<p class="card-text">ID: ' + teamArray[i][2] + '</p>';
      html += '<p class="card-text">email: ' + teamArray[i][3] + '</p>';
      html += '<p class="card-text">';
      html += teamArray[i][4];
      html += '" "';
      html += teamArray[i][5];
      html += '</p>';
      html += '</div>';
      html += '</div>';
   }

   html += '</div>';
   html += '</div>';
   html += '</div>';

   html += '</div>';
   html += '</div>';
   html += '</div>';
   html += '</body>';
   html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>';
   html += '<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>';
   html += '<script src="script.js"></script>';
   html += '</html>';

   //console.log(html);

   //output a file named team.html in the output folder
   writeFileAsync("team.html", html);

   console.log("Team Roster Generated");
   process.exit();
}

// Begin the process
promptUser("Manager");
