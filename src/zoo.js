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

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function countAnimals(species) {
  // seu código aqui
}

function calculateEntry(entrants) {
  // seu código aqui
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
