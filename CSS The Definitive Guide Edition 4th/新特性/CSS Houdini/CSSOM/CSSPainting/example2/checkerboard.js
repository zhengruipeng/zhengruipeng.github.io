class CheckerboardPainter {
    static get inputProperties(){return ["--rect-size"];}
    paint(ctx, geom, properties) {
        // Use `ctx` as if it was a normal canvas
        const colors = ['rgb(255,150,150)', 'rgb(150,255,150)', 'rgb(150,150,255)'];
        const size = properties.get("--rect-size")-0;
        for(let y = 0; y < geom.height/size; y++) {
            for(let x = 0; x < geom.width/size; x++) {
                const color = colors[(x + y) % colors.length];
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.rect(x * size, y * size, size, size);
                ctx.fill();
            }
        }
    }
}

// Register our class under a specific name
registerPaint('checkerboard', CheckerboardPainter);