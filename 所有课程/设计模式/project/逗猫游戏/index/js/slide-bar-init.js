//单一职能原则
let slideBarInit = function () {
    const slideBar = document.querySelector("#slide-bar");

    const slideBarShadowRoot = slideBar.attachShadow({mode: "open"});

    //动态注入CSS
    fetch("./css/slide-bar-shadow-style.css")
        .then(response => response.text())
        .then(cssText => {
            let cssStyleSheet = new CSSStyleSheet();
            cssStyleSheet.replaceSync(cssText)
            slideBarShadowRoot.adoptedStyleSheets = [cssStyleSheet];
        });

    let logoHrefs = [
        "./images/logo1.JPG",
        "./images/logo2.JPG",
        "./images/logo3.JPG"];

    let logoFragment = document.createDocumentFragment();

    logoHrefs.forEach(href => {
        let temp = document.createElement("div");
        let html = `
            <nav>
                <img src=${href} />
            </nav>
        `;
        temp.innerHTML = html;

        logoFragment.appendChild(temp.children[0]);
    });

    slideBarShadowRoot.appendChild(logoFragment);


};

export {slideBarInit};