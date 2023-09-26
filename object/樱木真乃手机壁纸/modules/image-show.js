document.addEventListener("DOMContentLoaded", function () {
    const time = this.querySelector("time");

    const slideShow = new SlideShow([
        "./bgi/1.png",
        "./bgi/2.png",
        "./bgi/3.png",
        "./bgi/4.png",
        "./bgi/5.png",
        "./bgi/6.png",
        "./bgi/7.png",
    ]);
    slideShow.init();
    slideShow.image.id = "main-image";

    const date = new Date();
    for (let i = 0; i < date.getDate() % slideShow.hrefs.length; i++) {
        slideShow.next()
    }

    setInterval(function () {
        document.startViewTransition(() => slideShow.next());
    }, 1000 * 60 * 5);

    document.body.addEventListener("click", function () {
        // document.startViewTransition(() => slideShow.next());
    });
    time.addEventListener("click", function () {
        document.startViewTransition(() => slideShow.next());
        // slideShow.next()
    });
});