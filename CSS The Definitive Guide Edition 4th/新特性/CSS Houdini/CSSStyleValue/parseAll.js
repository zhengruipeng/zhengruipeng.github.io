document.addEventListener("DOMContentLoaded", function () {
    // @ts-ignore
    let parsedValue = CSSStyleValue.parse("height", "20px");
    console.log(parsedValue);
    // @ts-ignore
    let parsedValue2 = CSSStyleValue.parseAll('height', "20px");
    console.log(parsedValue2);
});
