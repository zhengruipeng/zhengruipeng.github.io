document.addEventListener("DOMContentLoaded", function () {
    const yearLast = this.querySelector("#year-last");
    const dayLast = this.querySelector("#day-last");

    const date = new Date();
    const currDate = date.valueOf();

    const targetDate = new Date();
    targetDate.setMonth(11);
    targetDate.setDate(23);
    const tarDate = targetDate.valueOf();

    const deltaTime = tarDate - currDate;
    const daltaDay = deltaTime / 1000 / 60 / 60 / 24;

    dayLast.innerHTML = Math.floor(daltaDay);
    yearLast.innerHTML = ((targetDate.getFullYear() + 1 + "").slice(-2));

});