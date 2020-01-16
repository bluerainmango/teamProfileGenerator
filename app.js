// prompt for team manager

// prompt for team members - engineer / inern
// name, email, id, manager: officeNumber engineer: github username, intern: school
const fs = require("fs");
const { promisify } = require("util");

const { askAbout, managerQuest, memberQuest, checkMemberToAdd } = require("./lib/inquiry");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const team = {
  manager: [],
  engineer: [],
  intern: [],
  hasMemberToAdd: false
};

//* Init func
async function init() {
  //! 1. Ask about manager & add it to the team
  await addMemberToTeam("manager", managerQuest);

  //! 2. Ask about members & add it to the team
  //   while (team.hasMemberToAdd) {
  //     await addMemberToTeam("member", memberQuest);
  //   }

  //! 3. Render
  const readFile = promisify(fs.readFile);
  const appendFile = promisify(fs.appendFile);

  const mainHtml = await readFile("./templates/index.html", "utf-8");
  let managerHtml = await readFile("./templates/manager.html", "utf-8");

  const target = ["{%NAME%}", "{%ID%}", "{%EMAIL%}", "{%OFFICENUM%}"];

  for (el of target) {
    const property = el.split("%")[1].toLowerCase();

    managerHtml = managerHtml.replace(el, team.manager[0][property]);
  }

  console.log(managerHtml);
}

//* Member adding func
const addMemberToTeam = async (type, memberQuest) => {
  //! 1. Get answers
  const answers = await askAbout(memberQuest);

  let title = type === "member" ? answers.memberTitle : "manager";
  let employee;

  //! 2. Create obj from proper class
  if (title === "manager") {
    employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
  } else if (title === "engineer") {
    employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
  } else if (title === "intern") {
    employee = new Intern(answers.name, answers.id, answers.email, answers.school);
  }

  //! 3. Add it to the team
  team[title].push(employee);
  console.log(team);

  //! 4. Ask if there is more member to add
  const answer = await askAbout(checkMemberToAdd);
  team.hasMemberToAdd = answer.hasMemberToAdd;
};

const render = () => {};

init();

// path setting
// error handling
