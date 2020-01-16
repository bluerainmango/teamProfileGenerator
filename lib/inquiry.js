const inquirer = require('inquirer');

exports.managerQuest = [
  {
    type: 'input',
    name: 'name',
    message: "Please enter the team manager's name"
  },
  {
    type: 'input',
    name: 'email',
    message: "Please enter the team manager's email"
  },
  {
    type: 'input',
    name: 'id',
    message: "Please enter the team manager's id"
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: "Please enter the team manager's officeNumber"
  }
];

exports.memberCheck = [
  {
    type: 'confirm',
    name: 'hasMemberToAdd',
    message: 'Do you have more member to add?'
  }
];

exports.memberQuest = [
  {
    type: 'list',
    name: 'memberType',
    message: 'Is the member to add a engineer or intern?',
    choices: ['Engineer', 'Intern'],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: 'input',
    name: 'name',
    message: "Please enter this team mamber's name"
  },
  {
    type: 'input',
    name: 'email',
    message: "Please enter this team mamber's email"
  },
  {
    type: 'input',
    name: 'id',
    message: "Please enter this team mamber's id"
  },
  {
    type: 'input',
    name: 'githubUserName',
    message: "Please enter this team mamber's GitHub username",
    when: answers => {
      return answers.memberType === 'engineer' ? true : false;
    }
  },
  {
    type: 'input',
    name: 'school',
    message: "Please enter this team mamber's school",
    when: answers => {
      return answers.memberType === 'intern' ? true : false;
    }
  }
];

exports.askAbout = async memberType => {
  return await inquirer.prompt(memberType);
};

// getAnswers(manager);
// answers(memberCheck);
