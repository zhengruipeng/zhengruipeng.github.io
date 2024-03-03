let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";
function toArray(xs) {
    return [...xs];
}
console.log(toArray(pets));
