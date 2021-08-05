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

function returnAnimalsByLocation() {
  const seAnimals = data.species.filter((animal) => animal.location === 'SE');
  const nwAnimals = data.species.filter((animal) => animal.location === 'NW');
  const swAnimals = data.species.filter((animal) => animal.location === 'SW');
  const neAnimals = data.species.filter((animal) => animal.location === 'NE');

  const animals = {
    NE: neAnimals.map((animal) => animal.name),
    NW: nwAnimals.map((animal) => animal.name),
    SE: seAnimals.map((animal) => animal.name),
    SW: swAnimals.map((animal) => animal.name),
  };

  return animals;
}

// obtem objeto de animais por localização
function getAnimalsByLocation(location) {
  const species = data.species.filter((animal) => animal.location === location);
  return species;
}

// retorna objeto ordenado
function orderObj(list) {
  const orderedList = [];
  list.forEach((animal) => {
    const specie = animal.name;
    const obj = {};
    obj[specie] = animal.residents.map((resident) => resident.name);
    obj[specie] = obj[specie].sort();
    orderedList.push(obj);
  });
  return orderedList;
}
// mais uma né
function orderSexObj(animals, sex) {
  const list = [];
  animals.forEach((animal) => {
    let animalList = animal.residents;
    const specie = animal.name;
    animalList = animalList.filter((item) => item.sex === sex);
    const obj = {};
    obj[specie] = animalList.map((resident) => resident.name);
    obj[specie] = obj[specie].sort();
    list.push(obj);
  });
  return list;
}

// pega uma lista de animais e transforma em um objeto
function getMembersList(animals, sorted, sex) {
  if (sorted && sex) { return orderSexObj(animals, sex); }
  if (sorted) {
    return orderObj(animals);
  }
  const list = [];
  animals.forEach((animal) => {
    let animalList = animal.residents;
    const specie = animal.name;
    if (sex) { animalList = animalList.filter((item) => item.sex === sex); }
    const obj = {};
    obj[specie] = animalList.map((resident) => resident.name);
    list.push(obj);
  });
  return list;
}

// retorna a lista mapeada ordenada
function returnMapOrdered(includeNames) {
  const nwAnimals = getMembersList(getAnimalsByLocation('NW'), true);
  const neAnimals = getMembersList(getAnimalsByLocation('NE'), true);
  const seAnimals = getMembersList(getAnimalsByLocation('SE'), true);
  const swAnimals = getMembersList(getAnimalsByLocation('SW'), true);
  const animals = { NW: nwAnimals, NE: neAnimals, SE: seAnimals, SW: swAnimals };
  return animals;
}

// retorna a lista filtrada por sexo
function returnSexFiltered(sex) {
  const nwAnimals = getMembersList(getAnimalsByLocation('NW'), undefined, sex);
  const neAnimals = getMembersList(getAnimalsByLocation('NE'), undefined, sex);
  const seAnimals = getMembersList(getAnimalsByLocation('SE'), undefined, sex);
  const swAnimals = getMembersList(getAnimalsByLocation('SW'), undefined, sex);
  const animals = { NW: nwAnimals, NE: neAnimals, SE: seAnimals, SW: swAnimals };
  return animals;
}

// retorna a lista ordenada e filtrada por sexo
function returnSexOrdered(sex) {
  const nwAnimals = getMembersList(getAnimalsByLocation('NW'), true, sex);
  const neAnimals = getMembersList(getAnimalsByLocation('NE'), true, sex);
  const seAnimals = getMembersList(getAnimalsByLocation('SE'), true, sex);
  const swAnimals = getMembersList(getAnimalsByLocation('SW'), true, sex);
  const animals = { NW: nwAnimals, NE: neAnimals, SE: seAnimals, SW: swAnimals };
  console.log(animals);
  return animals;
}

// retorna a lista de membros
function returnMembersList(sorted, sex) {
  if (sorted && sex) { return returnSexOrdered(sex); }
  if (sorted) { return returnMapOrdered(); }
  if (sex) { return returnSexFiltered(sex); }
  const nwAnimals = getMembersList(getAnimalsByLocation('NW'));
  const neAnimals = getMembersList(getAnimalsByLocation('NE'));
  const seAnimals = getMembersList(getAnimalsByLocation('SE'));
  const swAnimals = getMembersList(getAnimalsByLocation('SW'));
  const animals = { NW: nwAnimals, NE: neAnimals, SE: seAnimals, SW: swAnimals };
  return animals;
}

function getAnimalMap(obj) {
  // seu código aqui
  if (!obj) { return returnAnimalsByLocation(); }
  if (obj.includeNames !== true) { return returnAnimalsByLocation(); }
  return returnMembersList(obj.sorted, obj.sex);
}

function getSchedule(dayName) {
  // seu código aqui
  const days = Object.keys(data.hours);
  const hours = Object.values(data.hours);
  const legibleHours = hours.map((hour) => {
    if (hour.open === hour.close) { return 'CLOSED'; }
    return `Open from ${hour.open}am until ${hour.close - 12}pm`;
  });
  const schedule = {};
  days.forEach((day, index) => {
    schedule[day] = legibleHours[index];
  });
  if (!dayName) { return schedule; }
  const day = {};
  day[dayName] = schedule[dayName];
  console.log(day);
  return day;
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const employee = data.employees.find((empl) => empl.id === id);
  const specieId = employee.responsibleFor[0];
  const specie = data.species.find((animal) => animal.id === specieId);
  let { residents } = specie;
  residents = residents.sort((a, b) => b.age - a.age);
  return residents.map((animal) => [animal.name, animal.sex, animal.age])[0];
}

function increasePrices(percentage) {
  // seu código aqui
  const increase = percentage / 100;
  let adult = data.prices.Adult + data.prices.Adult * increase;
  let senior = data.prices.Senior + data.prices.Senior * increase;
  let child = data.prices.Child + data.prices.Child * increase;
  adult = Math.round(adult * 100) / 100;
  senior = Math.round(senior * 100) / 100;
  child = Math.round(child * 100) / 100;
  data.prices.Adult = parseFloat(adult.toFixed(2));
  data.prices.Senior = parseFloat(senior.toFixed(2));
  data.prices.Child = parseFloat(child.toFixed(2));
}

function getCoverage(idOrName) {
  const { employees } = data;
  const employee = employees.find((emp) => {
    if (emp.firstName === idOrName
      || emp.lastName === idOrName
      || emp.id === idOrName) {
      return true;
    }
    return false;
  });
  let species = getSpeciesByIds(...employee.responsibleFor);
  species = species.map((specie) => specie.name);
  const coverage = {};
  coverage[`${employee.firstName} ${employee.lastName}`] = species;
  return coverage;
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
  if (!idOrName) {
    const { employees } = data;
    let coverageList = [];
    employees.forEach((employee) => {
      coverageList.push(getCoverage(employee.id));
    });
    const reducer = (acc, curr) => ({ ...acc, ...curr });
    coverageList = coverageList.reduce(reducer, {});
    return coverageList;
  }
  return getCoverage(idOrName);
}

module.exports = {
  getCoverage,
  orderSexObj,
  returnSexFiltered,
  getAnimalsByLocation,
  returnAnimalsByLocation,
  getMembersList,
  returnMembersList,
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
