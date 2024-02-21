interface FooProp {
    name: string;
    X: number;
    Y: number;
}

declare namespace JSX {
    interface IntrinsicElements {
        button: any
    }

    class Element {
    }
}

declare function AnotherComponent(prop: { name: string }): JSX.IntrinsicElements;

function ComponentFoo(prop: FooProp) {
    return <AnotherComponent name={prop.name}/>;
}

const Button = (prop: { value: string }, context: { color: string }) => (
    <button/>
);

// 函数组件也可以重载
interface ClickableProps {
    children: JSX.Element[] | JSX.Element;
}

interface HomeProps extends ClickableProps {
    home: JSX.Element;
}

interface SideProps extends ClickableProps {
    side: JSX.Element | string;
}

function MainButton(prop: HomeProps): JSX.Element;
function MainButton(prop: SideProps): JSX.Element;
function MainButton(prop: ClickableProps): JSX.Element {
    return new JSX.Element;
    // ...
}