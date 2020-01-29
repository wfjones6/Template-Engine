const Employee = require('./Employee.js');

class Intern extends Employee {
    constructor(name, id, email) {
        super(name, id, email)
        this.school = "UCLA";
        this.role = "Intern";
    }

    getSchool() {
        return this.school;
    }

    getRole(){
        return this.role;
    }
}

module.exports = Intern;
