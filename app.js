// prompt for team manager

// prompt for team members - engineer / inern
// name, email, id, manager: officeNumber engineer: github username, intern: school
const {
  askAbout,
  managerQuest,
  memberQuest,
  memberCheck
} = require("./lib/inquiry");

const team = {
  manager: {},
  engineer: [{}],
  intern: [{}],
  hasMemberToAdd: false
};

// team.manager = askAbout(manager);
// console.log(team.manager);
async function init() {
  await addMemberToDB("manager", managerQuest);
  await addMemberToDB("hasMemberToAdd", memberCheck);

  if (team.hasMemberToAdd) {
  }
}

const addMemberToDB = async (member, memberQuest) => {
  team[member] = await askAbout(memberQuest);
  console.log(team);
};

init();
