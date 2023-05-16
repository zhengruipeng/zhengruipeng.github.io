let ComponentLib = class extends Object {
    /*+ static HTMLElement buildMenu()
    + static HTMLElement buildList()
    + static HTMLElement buildWindow()
    + static HTMLElement buildSlider()*/
    static buildMenu() {
        let container = document.createElement("div");
        container.innerHTML = `
            <div class="menu">
            菜单
            </div>
        `;
        return container;
    }

    static buildList() {
        let container = document.createElement("div");
        container.innerHTML = `
            <ul class="list">
                <li>播放列表1</li>
                <li>播放列表2</li>
                <li>播放列表3</li>
                <li>播放列表4</li>
            </ul>
        `;
        return container;
    }

    static buildWindow() {
        let container = document.createElement("div");
        container.innerHTML = `
            <main>
                此为主窗口
            </main>
        `;
        return container;
    }

    static buildSlider() {
        let container = document.createElement("div");
        container.innerHTML = `
            <label>
                进度条
                <input type="range" min="0" max="100" step="1" />
            </label>
        `;
        return container;
    }

    static buildEmptyElement() {
        let container = document.createElement("p");
        container.innerHTML = `
        `;
        return container;
    }
}

export {ComponentLib}