const data = require('./data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  if (!ids) return [];
  const species = [];
  ids.forEach((id) => {
    species.push(...data.species.filter((obj) => obj.id === id));
  });
  return species;
}
function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const specie = data.species.find((obj) => obj.name === animal);
  const { residents } = specie;
  return residents.every((el) => el.age >= age);
}

function getEmployeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  const employee = data.employees.find((obj) => {
    if (obj.firstName === employeeName || obj.lastName === employeeName) {
      return true;
    }
    return false;
  });
  return employee;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  // seu código aqui
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  // seu código aqui
  const reducer = (acc, curr) => [...acc, ...curr];
  let managers = data.employees.map((employee) => employee.managers);
  managers = managers.reduce(reducer, []);
  return managers.some((mId) => mId === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employee = { id, firstName, lastName, managers, responsibleFor };

  data.employees.push(employee);
}

function countAnimals(species) {
  // seu código aqui
  if (!species) {
    let counter = data.species.map((animal) => {
      const specie = animal.name;
      const obj = {};
      obj[specie] = animal.residents.length;
      return obj;
    });
    counter = counter.reduce((acc, curr) => ({
      ...acc,
      ...curr,
    }), {});
    return counter;
  }
  const specie = data.species.find((item) => item.name === species);
  return specie.residents.length;
}

function calculateEntry({ Adult = 0, Child = 0, Senior = 0 } = 0) {
  // seu código aqui
  const adult = Adult * data.prices.Adult;
  const child = Child * data.prices.Child;
  const senior = Senior * data.prices.Senior;
  return adult + child + senior;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
