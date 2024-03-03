const person = makeWatchedObject({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
});
// makeWatchedObject has added `on` to the anonymous Object
person.on("firstNameChanged", (newValue) => {
    console.log(`firstName was changed to ${newValue}!`);
});
