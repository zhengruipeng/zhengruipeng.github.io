let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

function toArray<X>(xs: Iterable<X>): X[] {
    return [...xs]
}

console.log(toArray(pets));