function identity<Type>(arg: Type): Type {
    return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;

console.log(myIdentity)

interface GenericIdentityFn {
    <Type>(arg: Type): Type;
}

function identity2<Type>(arg: Type): Type {
    return arg;
}

let myIdentity2: GenericIdentityFn = identity2;

interface GenericIdentityFn2<Type> {
    (arg: Type): Type;
}

function identity3<Type>(arg: Type): Type {
    return arg;
}

let myIdentity3: GenericIdentityFn2<number> = identity;
