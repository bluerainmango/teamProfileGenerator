const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

// Inquiry, Questions, Classes for employee
const { askAbout, managerQuest, memberQuest, checkMemberToAdd } = require("./lib/inquiry");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Promisified read&write file methods
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Data storage for answers about employee
const team = {
  manager: [],
  engineer: [],
  intern: [],
  hasMemberToAdd: false
};

//* FUNCTION : Initiating the app
async function init() {
  //! 1. Ask about manager & add it to the team
  await addMemberToTeam("manager", managerQuest);
  console.log(team);
  //! 2. Ask about members & add it to the team
  while (team.hasMemberToAdd) {
    await addMemberToTeam("member", memberQuest);
  }

  //! 3. Create HTML
  let html = await createHTML();

  //! 4. Add css to HTML
  const style = await readFile(path.join(__dirname, "templates", "style.css"), "utf8");
  html = html.replace("<style></style>", `<style>${style}</style>`);

  //! 4. Save the completed HTML to 'output' folder
  await writeFile(path.join(__dirname, "output", "team.html"), html, "utf8");
}

//! FUNCTION : Adding a member to the team
const addMemberToTeam = async (type, memberQuest) => {
  //* 1. Get answers
  const answers = await askAbout(memberQuest);

  let title = type === "member" ? answers.memberTitle : "manager";
  let employee;

  //* 2. Create employee obj from the proper class
  switch (title) {
    case "manager":
      employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      break;
    case "engineer":
      employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
      break;
    case "intern":
      employee = new Intern(answers.name, answers.id, answers.email, answers.school);
  }

  //* 3. Add it to the team data storage
  team[title].push(employee);

  //* 4. Ask if there is more member to add
  const answer = await askAbout(checkMemberToAdd);
  team.hasMemberToAdd = answer.hasMemberToAdd;
};

//! FUNCTION: Creating HTML
const createHTML = async () => {
  let mainHTML = await readFile(path.join(__dirname, "templates", "index.html"), "utf-8");
  let cards = "";

  //* 1. Get all employees input data into array for loop
  const teamArr = [...team.manager, ...team.engineer, ...team.intern];

  //* 2. Loop the array to create each employee's card
  for (employee of teamArr) {
    // 2.A) Get an employee's general data
    const { name, id, email } = employee;
    const role = employee.getRole().toLowerCase();
    let special = "";

    // 2.B) Get an employee's special data(Office number || Github || School)
    switch (role) {
      case "manager":
        special = employee.getOfficeNumber();
        break;
      case "engineer":
        special = employee.getGithub();
        break;
      case "intern":
        special = employee.getSchool();
    }
    // 2.C) Append cards
    cards += await generateCard(role, { name, id, email, special });
  }

  //* 3. Replace the main HTML with actual cards and return it
  return mainHTML.replace("{%CARD%}", cards);
};

//! FUNCTION: Generating a card
const generateCard = async (role, employeeData) => {
  // 1. Get employee's template
  let cardTemp = await readFile(path.join(__dirname, "templates", `${role}.html`), "utf-8");

  // 2. Replace the placeholders with actual data
  for (let prop in employeeData) {
    cardTemp = cardTemp.replace(`{%${prop.toUpperCase()}%}`, employeeData[prop]);
  }

  return cardTemp;
};

init();

// path setting
// error handling
