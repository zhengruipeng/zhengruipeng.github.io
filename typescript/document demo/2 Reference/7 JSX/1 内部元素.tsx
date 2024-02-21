declare namespace JSX {
    interface IntrinsicElements {
        foo: any;
    }
}
<foo />; // ok
// <bar />; // error