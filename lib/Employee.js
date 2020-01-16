// name, id, title, getName(), getId(), getEmail(), getRole()(return Employee)
class Employee {
  constructor(name, id, title, email) {
    this.name = name;
    this.id = id;
    this.title = title;
    this.email = email;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return "Employee";
  }
}
