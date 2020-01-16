// prompt for team manager

// prompt for team members - engineer / inern
// name, email, id, manager: officeNumber engineer: github username, intern: school
const { askAbout, managerQuest, memberQuest, memberCheck } = require("./lib/inquiry");

const { Manager } = require("./lib/Manager");
const { Engineer } = require("./lib/Engineer");
const { Inter } = require("./lib/Intern");

const team = {
  manager: [],
  engineer: [],
  intern: [],
  hasMemberToAdd: false
};

// team.manager = askAbout(manager);
// console.log(team.manager);
async function init() {
  await addMemberToDB("manager", managerQuest);
  //   await addMemberToDB("hasMemberToAdd", memberCheck);

  if (team.hasMemberToAdd) {
  }
}

const addMemberToDB = async (member, memberQuest) => {
  // Get answers
  const data = await askAbout(memberQuest);

  // Create class obj
  if (member === "manager") {
    const employeeObj = new Manager(data.name, data.id, data.email, data.officeNumber);
  } else if (member === "engineer") {
    const employeeObj = new Engineer(data.name, data.id, data.email, data.gitHubUsername);
  } else {
    const employeeObj = new Intern(data.name, data.id, data.email, data.school);
  }

  // Add it to DB
  team[member].push(employeeObj);
};

init();
