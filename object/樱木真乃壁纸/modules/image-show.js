document.addEventListener("DOMContentLoaded", function () {
    const time = this.querySelector("time");

    const slideShow = new SlideShow([
        "./bgi/1.jpg",
        "./bgi/2.jpg",
        "./bgi/3.jpg",
        "./bgi/4.jpg",
        "./bgi/5.jpg",
        "./bgi/6.jpg",
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