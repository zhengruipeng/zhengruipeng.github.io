document.addEventListener("DOMContentLoaded",function (){
    // @ts-ignore
    let parsedValue:CSSTransformValue = CSSStyleValue.parse("height","20px");
    console.log(parsedValue);

    // @ts-ignore
    let parsedValue2:CSSTransformValue = CSSStyleValue.parseAll('height',"20px");
    console.log(parsedValue2);


})