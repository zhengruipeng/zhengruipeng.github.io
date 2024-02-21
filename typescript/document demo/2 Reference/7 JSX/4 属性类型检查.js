"use strict";
// element attributes type for 'foo' is '{bar?: boolean}'
React.createElement("foo", { bar: true });
React.createElement("baz", { requiredProp: "bar" }); // ok
React.createElement("baz", { requiredProp: "bar", optionalProp: 0 }); // ok
// <baz />; // error, requiredProp is missing
// <baz requiredProp={0} />; // error, requiredProp should be a string
// <baz requiredProp="bar" unknownProp />; // error, unknownProp does not exist
React.createElement("baz", { requiredProp: "bar", "some-unknown-prop": true }); // ok, because 'some-unknown-prop' is not a valid identifier
