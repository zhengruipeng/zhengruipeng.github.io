interface Person {
    name: string;
    age: number;
}

interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
}

let writablePerson: Person = {
    name: "Person McPersonface",
    age: 42,
};

// works
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'

let p2: ReadonlyPerson = {
    name: "Person McPersonface",
    age: 55,
};

let writablePerson2: Person = p2;
writablePerson2.age++;
console.log(writablePerson2.age)