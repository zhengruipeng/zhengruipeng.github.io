type Animal = { name: string };
type Fish = { swim: () => void } & Animal;
type Bird = { fly: () => void } & Animal;

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

let getSmallPet = function () {
    return Math.random() > .5 ? <Fish>{swim: _ => console.log("swim")} : <Bird>{fly: _ => console.log("fly")}
};

let pet = getSmallPet();

if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
    if (pet.name === "sharkey") return false;
    return isFish(pet);
});

console.log(underWater1);
console.log(underWater2);
console.log(underWater3);
