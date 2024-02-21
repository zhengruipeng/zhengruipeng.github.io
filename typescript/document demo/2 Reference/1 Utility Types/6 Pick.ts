// Pick<Type, Keys>：从Type中选择一组属性Keys
// （字符串字面量或字符串字面量的联合类型），构造一个新的类型。例如：
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
};
 