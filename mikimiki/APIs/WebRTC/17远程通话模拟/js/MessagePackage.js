let MessagePackage = class {
    messageType;
    data;

    constructor(data,messageType) {
        this.messageType = messageType;
        this.data = data;

    }
}

export {MessagePackage}