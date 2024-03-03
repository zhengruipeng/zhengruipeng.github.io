function isFish(pet) {
    return pet.swim !== undefined;
}
let getSmallPet = function () {
    return Math.random() > .5 ? { swim: _ => console.log("swim") } : { fly: _ => console.log("fly") };
};
let pet = getSmallPet();
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
const zoo = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1 = zoo.filter(isFish);
// or, equivalently
const underWater2 = zoo.filter(isFish);
// The predicate may need repeating for more complex examples
const underWater3 = zoo.filter((pet) => {
    if (pet.name === "sharkey")
        return false;
    return isFish(pet);
});
console.log(underWater1);
console.log(underWater2);
console.log(underWater3);
