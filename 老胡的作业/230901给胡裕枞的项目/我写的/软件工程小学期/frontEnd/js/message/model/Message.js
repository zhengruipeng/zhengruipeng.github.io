class Message extends Object {
    id;
    data;
    /*
    * id：发出信息者的ID
    * data：发出的信息*/
    constructor(id, data) {
        super();
        this.id = id;
        this.data = data;
    }
}
export { Message };
