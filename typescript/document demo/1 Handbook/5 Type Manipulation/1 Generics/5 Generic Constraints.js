function loggingIdentity(arg) {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
}
//loggingIdentity(3);
loggingIdentity({ length: 10, value: 3 });
