class Message extends Object {
    /*
    * id：发出信息者的ID
    * data：发出的信息*/
    constructor(public id: number, public data: string) {
        super();
    }
}

export {Message}