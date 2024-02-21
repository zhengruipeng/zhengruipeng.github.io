declare class Container<A,B>{}

declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(
    element: T,
    children: U[]
    ): Container<T, U[]>;

//可用以下函数简化

declare function create<T extends HTMLElement = HTMLDivElement, U = T[]>(
    element?: T,
    children?: U
    ): Container<T, U>;

const div = create();

const p = create(new HTMLParagraphElement());
