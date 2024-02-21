"use strict";
// element attributes type for 'foo' is '{bar?: boolean}'
<foo bar/>;
<baz requiredProp="bar"/>; // ok
<baz requiredProp="bar" optionalProp={0}/>; // ok
// <baz />; // error, requiredProp is missing
// <baz requiredProp={0} />; // error, requiredProp should be a string
// <baz requiredProp="bar" unknownProp />; // error, unknownProp does not exist
<baz requiredProp="bar" some-unknown-prop/>; // ok, because 'some-unknown-prop' is not a valid identifier
