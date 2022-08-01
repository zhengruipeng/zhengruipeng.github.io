document.addEventListener("DOMContentLoaded", function () {
    // @ts-ignore
    let parsedValue = CSSStyleValue.parse("transform", "translate(10px,20px) scale(1,2)");
    console.log(parsedValue);
    // @ts-ignore
    let parsedValue2 = CSSStyleValue.parse("transform", "20px");
    console.log(parsedValue2);
});
