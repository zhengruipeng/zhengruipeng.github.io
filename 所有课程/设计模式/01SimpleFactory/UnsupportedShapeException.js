let UnsupportedShapeException = class extends Error {
    message = "";

    constructor(message = "") {
        super(message);
        this.message = message;

    }

    render() {
        throw this;
    }

}
export {UnsupportedShapeException}