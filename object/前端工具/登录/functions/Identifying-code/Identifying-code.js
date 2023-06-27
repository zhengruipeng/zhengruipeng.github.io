let IdentifyingCode = class extends Object{
    codeBuf;
    key;
    ciphertext;
    params;
    initRandomCode(/*int*/length){
        let codeBuf = new Uint8Array(length);
        crypto.getRandomValues(codeBuf);
        codeBuf = codeBuf.map(v => v%10);

        this.codeBuf = codeBuf;

    }
    async encrypt(){
        const algoIdentifier = 'AES-CBC';
        const keyParams = {
            name: algoIdentifier,
            length: 256
        };

        const keyUsages = ['encrypt', 'decrypt'];
        const key = await crypto.subtle.generateKey(keyParams, true,
            keyUsages);
        const encryptDecryptParams = {
            name: algoIdentifier,
            iv: crypto.getRandomValues(new Uint8Array(16))
        };
        const ciphertext = await crypto.subtle.encrypt(encryptDecryptParams, key,
            this.codeBuf);
        this.ciphertext= ciphertext;
        this.key = key;
        this.params = encryptDecryptParams;
        // console.log(ciphertext);
    }
    async decrypt(){
        return await crypto.subtle.decrypt(this.params, this.key,
            this.ciphertext);
    }
    async check(value){
        let buffer = new Uint8Array(await crypto.subtle.decrypt(this.params, this.key,
            this.ciphertext));
        let res = true;

        buffer.forEach((v, index, array) => {
            if(parseInt(value[index]) !== v)res = false;
        });
        return res;

    }
    async gui(width,height){
        let buffer = new Uint8Array(await this.decrypt());
        const canvasElement = document.createElement("canvas");
        canvasElement.width = width;
        canvasElement.height = height;
        const ctx = canvasElement.getContext("2d");
        // ctx.fillRect(0,0,50,50);
        ctx.font = "bold "+height/3+"px serif";
        let textWidth = 1/buffer.length*width;
        for(let i = 0;i<150;i++){
            ctx.beginPath();
            ctx.moveTo(Math.random()*width,Math.random()*height);
            ctx.lineTo(Math.random()*width,Math.random()*height);
            ctx.strokeStyle = `rgb(${Math.random()*100+150},${Math.random()*100+150},${Math.random()*100+150})`;
            ctx.stroke()
            ctx.fillStyle = `rgb(${Math.random()*100+150},${Math.random()*100+150},${Math.random()*100+150})`;
            ctx.fillText("*",
                Math.random()*width,Math.random()*height);
            ctx.closePath();
        }
        buffer.forEach((value, index, array) => {
            ctx.setTransform(new DOMMatrix());
            ctx.rotate((Math.random()-0.5)*0.3);
            ctx.fillStyle = `rgb(${Math.random()*150},${Math.random()*150},${Math.random()*150})`;

            ctx.fillText(value,
                index*textWidth+(Math.random()-0.5)*textWidth/4,
                height/2+(Math.random()-0.5)*height/4);

        });



        return canvasElement;
    }
    constructor() {
        super();

    }
};
let currentCode = null;

export {IdentifyingCode,currentCode};