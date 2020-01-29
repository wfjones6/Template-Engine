const Employee = require('./Employee.js');

class Engineer extends Employee {
    constructor(name, id, email) {
        super(name, id, email)
        this.github = "GitHubUser";
        this.role = "Engineer";
    }

    getGithub() {
        return this.github;
    }

    getRole(){
        return this.role;
    }
}

module.exports = Engineer;
