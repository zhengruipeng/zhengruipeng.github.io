let writablePerson = {
    name: "Person McPersonface",
    age: 42,
};
// works
let readonlyPerson = writablePerson;
console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'
let p2 = {
    name: "Person McPersonface",
    age: 55,
};
let writablePerson2 = p2;
writablePerson2.age++;
console.log(writablePerson2.age);
