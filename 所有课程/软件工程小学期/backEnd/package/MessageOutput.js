class MessageOutput{
    static output(msg,limit = msg.length/*int*/){
        if(msg.length>limit)msg = msg.substring(0,limit);
        console.log(msg);
    };
}

module.exports = MessageOutput
// export {MessageOutput}
