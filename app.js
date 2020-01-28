const inquirer = require('inquirer');

const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

var employee = new Employee();

promptUser()
  .then(function(answers) {
    employee.name = answers.name;

    getEmpId()
    .then(function(answers) {
      employee.id = answers.id;
    
        getEmpEmail()
        .then(function(answers) {
          employee.email = answers.email;

          console.log("Emp: " + employee.name + ", " + employee.id + ", " + employee.email + ", " + employee.role);
        });
    });
});

function promptUser() {
  return inquirer.prompt([
    {
       type: "input",
       name: "name",
       message: "Enter employee name: "
    }
  ]);
}

function getEmpId() {
    return inquirer.prompt([
      {
          type: "input",
          name: "id",
          message: "Enter employee ID: "
      }
   ]);
}

function getEmpEmail(){
    return inquirer.prompt([
      {
          type: "input",
          name: "email",
          message: "Enter employee email: "
      }
   ]);
}
