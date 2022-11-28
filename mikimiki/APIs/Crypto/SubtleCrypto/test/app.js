(function (){
    const ciphertext = "郑瑞鹏";

    let encode = async function (key){
        let encoder = new TextEncoder();
        const encodedText = encoder.encode(ciphertext);
        let encrypted = window.crypto.subtle.encrypt(
            {name:"RSA-OAEP"},
            key,
            encodedText
        );
        let buffer = await encrypted;
        console.log(buffer);
        return buffer;
    };
    let decode = async function (key){
        let ciphertext = await encode(key.publicKey);
        let decrypted = await window.crypto.subtle.decrypt(
            {name: "RSA-OAEP"},
            key.privateKey,
            ciphertext,
        );
        let dec = new TextDecoder();
        let decoded = dec.decode(decrypted);
        console.log(decoded);

    };
    window.crypto.subtle.generateKey(
        {
            name:"RSA-OAEP",
            modulusLength:2048,
            publicExponent:new Uint8Array([1,0,1]),
            hash: "SHA-256",
        },
        true,
        ['encrypt','decrypt']
    ).then(keyPair => {
        // let enc = encode(keyPair.publicKey);
        decode(keyPair);

    })
}());