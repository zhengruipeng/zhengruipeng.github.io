(function (){
    const canvas = document.getElementById("canvas");

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight-4;

    const imageBitmap = canvas.getContext("bitmaprenderer");

    let bitmap = webgl.transferToImageBitmap();
    imageBitmap.transferFromImageBitmap(bitmap);
})()