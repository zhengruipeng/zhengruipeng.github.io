let Console = class extends Object {
    //default Style Sheet
    #consoleStyleSheet = `
        #console-panel{
            background-color: #000;
            color:#fff;
            index: 10;
            height:100vh;
            width:100vw;
            overflow-y:scroll;
            position:fixed;
            top:0;
            left:0;
        }

        #console-panel>p{
            /*white-space: pre;*/
            word-break:break-all;
            font-family: Source Code Pro;
            font-size:1.2rem;
            padding:.2em 1em;
            color: transparent;
            text-shadow: 0 0 0 #fff;
            outline:none;
        }
        #console-panel *{
            word-break:break-all;
            font-family: Source Code Pro;
            font-size:1.2rem;
            padding:.2em 1em;
        }
        /*the style of editable p element */
        #console-panel>p.editable{
            /*user-select: none;*/
            cursor:default;
        }
        @keyframes inputPointer {
            from {
                border-bottom-style: solid;
            }
            to {
                border-bottom-style: none;
            }
        }

        #console-panel > p.editable::after {
            content: " ";
            display:inline-block;
            width:10px;
            margin-left:5px;
            border-bottom: #fff 7px solid;
            animation-name: inputPointer;
            animation-duration: .2s;
            animation-timing-function: linear;
            animation-direction: alternate;
            animation-iteration-count: infinite;
        }
    `;
    //Inline Style Sheet
    #consoleInlineStyleSheet = `
        #console-panel{
            background-color: #000;
            color:#fff;
            index: 10;
            position:fixed;
            top:0;
            right:0;
            height:100%;
            width:30%;
            overflow-y:scroll;
            transition:.3s;
        }
        #console-panel-cancel-btn{
            position:fixed;
            top:0;
            right:30%;
            height:100%;
            width:1rem;
            border:none;
            transition:.3s;
        }
        #console-panel>p{
            /*white-space: pre;*/
            word-break:break-all;
            font-family: Source Code Pro;
            font-size:1.2rem;
            padding:.2em 1em;
            color: transparent;
            text-shadow: 0 0 0 #fff;
            outline:none;
        }
        #console-panel *{
            word-break:break-all;
            font-family: Source Code Pro;
            font-size:1.2rem;
            padding:.2em 1em;
        }
        /*the style of editable p element */
        #console-panel>p.editable{
            /*user-select: none;*/
            cursor:default;
        }
        @keyframes inputPointer {
            from {
                border-bottom-style: solid;
            }
            to {
                border-bottom-style: none;
            }
        }

        #console-panel > p.editable::after {
            content: " ";
            display:inline-block;
            width:10px;
            margin-left:5px;
            border-bottom: #fff 7px solid;
            animation-name: inputPointer;
            animation-duration: .2s;
            animation-timing-function: linear;
            animation-direction: alternate;
            animation-iteration-count: infinite;
        }
        #console-panel.cancel{
            right:-30%;
        }
        #console-panel-cancel-btn.cancel{
            right:0%;
        }
    `;

    //the stack of input messages` history
    #inputHistory = [];

    //HTMLElement, the main element of control panel
    #consolePanel = null;

    //the editing p element
    #editingInput = null;

    autoFinish = true;
    //the timer of operate duration
    timer = null;

    //clear the past timer and bind a new timer
    updateTimer() {
        if (!this.autoFinish) return false;

        if (this.timer) clearTimeout(this.timer);
        if (!this.#getEditingInput()) this.timer = setTimeout(this.end.bind(this), 10);
    }

    //cancel timer
    cancelTimer() {
        if (!this.autoFinish) return false;

        clearTimeout(this.timer);
        this.timer = null;
    }

    /*
    * @name: setEditingInput;
    * @params: HTMLParagraphElement|null htmlPElement
    * @return: Promise<null> isInputTerminal
    * @desc: Sets the transmitted HTMLParagraphElement tag
    *  as an editing tag, and sets a listening method that
    *  submits current data if enter is pressed and focus is lost.
    *  If null is sent, it will perfect previous work
    * */
    #setEditingInput(htmlPElement) {
        if (htmlPElement) {
            htmlPElement.contentEditable = true;
            htmlPElement.classList.add("editable");
            this.#editingInput = htmlPElement;
            this.cancelTimer();
        } else {
            this.#editingInput.contentEditable = false;
            this.#editingInput.classList.remove("editable");
            this.#editingInput = htmlPElement;
            this.updateTimer();
        }


        let that = this;
        return new Promise(resolve => {
            if (!htmlPElement) {
                resolve();
            }

            let historyPointer = 0;
            that.#editingInput?.addEventListener("keydown", function (ev) {
                /*
                * Handle some special keys:
                * When you enter the "Enter", the input ends
                * Entering a space creates a space in the input window
                * If an up arrow is entered, it is overwritten as the previous message
                * If a down arrow is entered, it is overwritten as the next message
                * */
                if (ev.key.toLowerCase() === "enter") {
                    ev.preventDefault();
                    resolve();
                } else if (ev.key.toLowerCase() === "space") {
                    this.innerText += " ";
                } else if (ev.key === "ArrowUp") {
                    if (historyPointer >= that.#inputHistory.length) return false;
                    this.innerText = that.#inputHistory[that.#inputHistory.length - (++historyPointer)];

                    const range = document.createRange();
                    const selection = window.getSelection();

                    range.selectNodeContents(that.#editingInput);
                    range.collapse(false);

                    selection.removeAllRanges();
                    selection.addRange(range);
                } else if (ev.key === "ArrowDown") {
                    if (historyPointer <= 1) return false;
                    this.innerText = that.#inputHistory[that.#inputHistory.length - (--historyPointer)];

                    const range = document.createRange();
                    const selection = window.getSelection();

                    range.selectNodeContents(this);
                    range.collapse(false);

                    selection.removeAllRanges();
                    selection.addRange(range);
                } else if (ev.key.toLowerCase() === "c" && ev.ctrlKey) {
                    ev.preventDefault();
                    this.innerText += "^C";
                    resolve();
                }
            });

            //Auto-wrap problem in firefox
            that.#editingInput?.addEventListener("keyup", function (ev) {
                if (ev.key.toLowerCase() === "backspace") {
                    if (this.innerText.trim() === "" && this.children[0]?.tagName === "BR") {
                        this.removeChild(this.children[0]);
                    }
                }
            });

            //Automatically moves the cursor to the end when the file focuses on the input window
            that.#editingInput?.addEventListener("focus", function (ev) {
                const range = document.createRange();
                const selection = window.getSelection();

                range.selectNodeContents(this);
                range.collapse(false);

                selection.removeAllRanges();
                selection.addRange(range);
            });

            that.#editingInput?.addEventListener("blur", function (ev) {
                // this.focus()
            });

            that.#editingInput.focus();
        });
    };

    //Returns the element that in editing
    #getEditingInput() {
        return this.#editingInput;
    };


    //Preparatory work
    //1. Create the console and set properties
    //2. Set the style sheet
    //3. Add it to the page
    renderAsConsoleApp(/*HTMLElement*/ container = document.body) {
        let consolePanel = document.createElement("div");
        consolePanel.id = "console-panel";
        this.#consolePanel = consolePanel;

        let stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(this.#consoleStyleSheet);

        document.adoptedStyleSheets = [stylesheet]
        container.appendChild(consolePanel);

        let that = this;
        document.addEventListener("keydown", function () {
            if (!that.#getEditingInput()) return false;
            that.#getEditingInput().focus();
        });

        this.updateTimer();

        return consolePanel;
    }

    //Preparatory work
    //1. Create the console and set properties
    //2. Set the style sheet
    //3. Add it to the page
    renderAsConsoleInline(/*HTMLElement*/ container = document.body) {
        let consolePanel = document.createElement("div");
        consolePanel.id = "console-panel";

        let consolePanelCancelBtn = document.createElement("button");
        consolePanelCancelBtn.id = "console-panel-cancel-btn";
        consolePanelCancelBtn.innerText = "||";

        container.appendChild(consolePanelCancelBtn);
        container.appendChild(consolePanel);

        this.#consolePanel = consolePanel;

        let stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(this.#consoleInlineStyleSheet);

        document.adoptedStyleSheets = [stylesheet]

        let that = this;
        this.#consolePanel.addEventListener("click", function () {
            if (!that.#getEditingInput()) return false;
            that.#getEditingInput().focus();
        });
        consolePanelCancelBtn.addEventListener("click", function () {
            that.#consolePanel.classList.toggle("cancel");
            this.classList.toggle("cancel");
        });

        this.autoFinish = false;
        this.updateTimer();
        return consolePanel;
    }

    /*
    * @name: initItem;
    * @params: String msg
    * @return: HTMLParagraphElement generatedP
    * @desc: The output a display message and returns the generated p element
    * */
    #initItem(msg) {
        let p = document.createElement("p");
        msg = msg?.toString() || msg + "";
        msg = msg.replaceAll(String.fromCharCode(32), String.fromCharCode(160));
        p.innerHTML = msg;
        if (this.#getEditingInput()) {
            this.#getEditingInput().insertAdjacentElement("beforebegin", p);
        } else {
            this.#consolePanel.appendChild(p);
        }
        p.scrollIntoView();
        return p;
    }

    output(...msgs) {
        let that = this;
        /*msgs.forEach(msg => {
            that.#initItem(msg);
        });*/
        this.#initItem(msgs.join(" "));
        this.updateTimer();
    }

    error(...msgs) {
        let that = this;
        msgs.forEach(msg => {
            let p = that.#initItem("Error: " + msg);
            p.style.color = "red";
        });

        this.updateTimer();
    }

    warn(...msgs) {
        let that = this;
        msgs.forEach(msg => {
            let p = that.#initItem("Warn: " + msg);
            p.style.color = "yellow";
        });

        this.updateTimer();
    }

    end(msg = "The program has ended....") {
        this.output(msg);
        this.cancelTimer();
        this.autoFinish = false;
    }

    /*
    * @name: input;
    * @params: String msg
    * @return: String[] res
    * @desc: After the prompt is entered,
    *  the information entered by the user is divided into Spaces,
    *  divided into an array of strings, and returned
    * */
    async inputs() {
        let res = await this.input();
        return res.trim().split(/\s+/);
    }

    async input() {
        if (this.#getEditingInput()) {
            return false;
        }

        let p = this.#initItem("");

        await this.#setEditingInput(p);
        let res = this.#getEditingInput().innerText;

        await this.#setEditingInput(null);

        //the content string usually has a special char which code is 160
        //it seems like space ,but they are different
        //we need to change them into space to
        //ensure the normal operation of the program
        res = res.replaceAll(String.fromCharCode(160), String.fromCharCode(32));

        //push the input string into history
        this.#inputHistory.push(res);

        return res;
    }

    clear() {
        this.#inputHistory = [];
        this.cancelTimer();

        this.#consolePanel.innerHTML = "";
    }
};

export {
    Console
};