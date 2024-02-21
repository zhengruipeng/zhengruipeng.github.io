function isFish(pet) {
    return pet.swim !== undefined;
}
var getSmallPet = function () {
    return Math.random() > .5 ? { swim: function (_) { return console.log("swim"); } } : { fly: function (_) { return console.log("fly"); } };
};
var pet = getSmallPet();
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
var zoo = [getSmallPet(), getSmallPet(), getSmallPet()];
var underWater1 = zoo.filter(isFish);
// or, equivalently
var underWater2 = zoo.filter(isFish);
// The predicate may need repeating for more complex examples
var underWater3 = zoo.filter(function (pet) {
    if (pet.name === "sharkey")
        return false;
    return isFish(pet);
});
console.log(underWater1);
console.log(underWater2);
console.log(underWater3);
