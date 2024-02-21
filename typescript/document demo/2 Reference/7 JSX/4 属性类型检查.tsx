declare namespace JSX {
    interface IntrinsicElements {
        foo: { bar?: boolean } & any;
    }
}
// element attributes type for 'foo' is '{bar?: boolean}'
<foo bar />;


declare namespace JSX {
    interface IntrinsicElements {
        baz: { requiredProp: string; optionalProp?: number };
    }
}
<baz requiredProp="bar" />; // ok
<baz requiredProp="bar" optionalProp={0} />; // ok
// <baz />; // error, requiredProp is missing
// <baz requiredProp={0} />; // error, requiredProp should be a string
// <baz requiredProp="bar" unknownProp />; // error, unknownProp does not exist
<baz requiredProp="bar" some-unknown-prop />; // ok, because 'some-unknown-prop' is not a valid identifier
