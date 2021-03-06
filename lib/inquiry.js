const inquirer = require("inquirer");

exports.managerQuest = [
  {
    type: "input",
    name: "name",
    message: "Please enter the team manager's name.",
    validate: name => {
      if (name === undefined) return "No input entered. Please enter a valid name.";

      let verdit = true;
      for (char of name.trim()) {
        if (!/[a-zA-Z ]/.test(char)) verdit = "Invalid input. Please enter a valid name.";
      }
      return verdit;
    },
    filter: fullName => {
      const name = fullName.trim();

      if (name) {
        let arr = name.split(" ");
        const newArr = arr.map(word => word.replace(word[0], word[0].toUpperCase()));

        return newArr.join(" ");
      }
    }
  },
  {
    type: "input",
    name: "email",
    message: "Please enter the team manager's email.",
    validate: email => {
      const verdit = email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/);
      return verdit ? true : "Please enter a valid email.";
    }
  },
  {
    type: "input",
    name: "id",
    message: "Please enter the team manager's id."
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Please enter the team manager's officeNumber."
  }
];

exports.memberQuest = [
  {
    type: "list",
    name: "memberTitle",
    message: "Is the member to add an engineer or intern?",
    choices: ["Engineer", "Intern"],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: "input",
    name: "name",
    message: "Please enter this team member's name.",
    validate: name => {
      if (name === undefined) return "No input entered. Please enter a valid name.";

      let verdit = true;
      for (char of name.trim()) {
        if (!/[a-zA-Z ]/.test(char)) verdit = "Invalid input. Please enter a valid name.";
      }
      return verdit;
    },
    filter: fullName => {
      const name = fullName.trim();

      if (name) {
        let arr = name.split(" ");
        const newArr = arr.map(word => word.replace(word[0], word[0].toUpperCase()));

        return newArr.join(" ");
      }
    }
  },
  {
    type: "input",
    name: "email",
    message: "Please enter this team member's email.",
    validate: email => {
      const verdit = email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/);
      return verdit ? true : "Please enter a valid email.";
    }
  },
  {
    type: "input",
    name: "id",
    message: "Please enter this team member's id."
  },
  {
    type: "input",
    name: "github",
    message: "Please enter this team member's GitHub username.",
    validate: username => {
      const detectInvalid = username.match(
        /(?:[^a-zA-Z0-9-]|(?:-{2,})|(?:\B-)|(?:-\B)|(?:.{40,}))/
      );
      return detectInvalid ? "Please enter a valid GitHub username." : true;
    },
    when: answers => {
      return answers.memberTitle === "engineer" ? true : false;
    }
  },
  {
    type: "input",
    name: "school",
    message: "Please enter this team member's school.",
    when: answers => {
      return answers.memberTitle === "intern" ? true : false;
    },
    filter: school => {
      if (school) {
        let arr = school.trim().split(" ");
        const newArr = arr.map(word => word.replace(word[0], word[0].toUpperCase()));

        return newArr.join(" ");
      } else {
        return "";
      }
    }
  }
];

exports.checkMemberToAdd = [
  {
    type: "confirm",
    name: "hasMemberToAdd",
    message: "Do you have more members to add?"
  }
];

exports.askAbout = async memberType => {
  return await inquirer.prompt(memberType);
};
