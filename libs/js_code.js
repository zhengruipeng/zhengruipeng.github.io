/**
 * Created by DELL on 2017/7/24.
 * javascript document(个人测试专用版)
 * version:1.1
 * 模拟jquery类库
 */
Object.prototype.values = function () {
    var str = "";
    if (typeof this != "object" && this !== "function") return this;
    for (var prop in this) str += this[prop];
    return str;
}

Object.prototype.allValue = function() {
    var str = "";
    for (var prop in this){
        if(typeof this[prop] == "object"){
            str += "Object:(length:"+this[prop].length+")";
            str += "\n"+allValue(this[prop])
        }else{
            str += prop+"-----"+this[prop]+"\n";
        }
    }
    return str;
}

Object.prototype.keys = function() {
    if (typeof this !== "object" && this !== "function") throw TypeError;
    var str = "";
    for (var prop in this) str += prop;
    return str;
}

Object.prototype.inherit = function() {
    if (this == null) {
        throw TypeError()
    }
    if (Object.create) {
        return Object.create(this)
    }
    var a = typeof this;
    if (a !== "object" && a !== "function")
        throw TypeError;

    function f() {
    }

    f.prototype = this;
    return new f();
};


Object.prototype.classof = function () {
    if (this === undefined) return "Undefined";
    if (this === null) return "null";
    return this.toString().slice(8, -1);
};

Object.defineProperty(Object.prototype, "extend", {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function (a, b) {
        var name = Object.getOwnPropertyNames(a);
        for (var i = 0; i < name.length; i++) {
            if (name[i] in b) {
                continue
            }
            var desc = Object.getOwnPropertyDescriptor(a, name[i]);
            Object.defineProperty(b, name[i], desc);
        }
        return b;
    }

});

RegExp.prototype.search = function (s) {
    if (this == null)
        throw TypeError("this == null")
    var instantiation = new RegExp(this);
    if (instantiation.exec(s))
        return 0;
    return -1;

};

Object.prototype.extend = function(p){
    for (var prop in p) {
        this[prop] = p[prop];
    }
    return this;
};

Function.prototype.method = function (o, f) {
    this.prototype.constructor = this;
    this.prototype[o] = f;
    return new this;
};
Object.defineProperty(navigator, "info", {
    configurable: false,
    enumarable: false,
    writable: true,
    value: function () {
        var s = navigator.userAgent.toLocaleLowerCase(),
            match = /(webkit)[\/]([\w.]+)/.exec(s) ||
                /(opera)[?:.*version]?[\/]([\w.]+)/.exec(s) ||
                /(msie)([\w.]+)/.exec(s) ||
                !/compatible/.test(s) && /(mozilla)(?:.*?rv:([\w.]+))?/.exec(s) ||
                [];
        return {name: match[1] || "", version: match[2] || "0"};

    }
});

Object.defineProperty(String.prototype, "log", {
    configurable: true,
    enumarable: false,
    writable: true,
    value: function () {
        if(typeof this === undefined)console.log("undefined")
        (this === null) ? console.log(null) : this;
        console.log(values(this));
        return this;
    }
});
Object.defineProperty(Object.prototype, "log", {
    configurable: true,
    enumarable: false,
    writable: true,
    value: function () {
        if(typeof this === undefined)console.log("undefined")
        (this === null) ? console.log(null) : this;
        console.log(this);
        return this;
    }
});

/*var $ = function (ele) {
    if (typeof ele === "function") {
        var whenReady = (function () {
            var funcs = [];
            var ready = false;

            function headler(e) {
                if (ready) return;
                if (e.type === "readystatechange" || document.readyState !== "complete")
                    return;
                for (var i = 0; i < funcs.length; i++)
                    funcs[i].call(document)
                ready = true;
                funcs = null;

            }

            if (window.addEventListener) {
                document.addEventListener("DOMContentLoaded", headler, false);
                document.addEventListener("readystatechange", headler, false);
                window.addEventListener("load", headler, false);
            } else if (window.attachEvent) {
                document.attachEvent("onreadystatechange", headler);
                window.attachEvent("onload", headler);
            }
            return function whenReady(f) {
                if (ready) f.call(document);
                else funcs.push(f);
            }

        }());
        whenReady(ele);

    } else {
        if (ele.substr(0, 1) == "#") {
            return document.querySelector(ele);
        } else {
            return document.querySelectorAll(ele);
        }
    }

};*/


var js = function (ele) {
    if (typeof ele === "function") {
        /*if(window.onload){
            var arr = window.onload;
        }
        window.onload = ele;
        arr?arr():ele;
        return false;
        if( js.loaded )
            setTimeout( ele,0 );
        else if ( window.addEventListener )
            window.addEventListener( "load",ele,false );
        else if( window.attachEvent )
            window.attachEvent('onload',ele);*/
        var whenReady = (function () {
            var funcs = [];
            var ready = false;

            function headler(e) {
                if (ready) return;
                if (e.type === "readystatechange" || document.readyState !== "complete")
                    return;
                for (var i = 0; i < funcs.length; i++)
                    funcs[i].call(document)
                ready = true;
                funcs = null;

            }

            if (window.addEventListener) {
                document.addEventListener("DOMContentLoaded", headler, false);
                document.addEventListener("readystatechange", headler, false);
                window.addEventListener("load", headler, false);
            } else if (window.attachEvent) {
                document.attachEvent("onreadystatechange", headler);
                window.attachEvent("onload", headler);
            }
            return function whenReady(f) {
                if (ready) f.call(document);
                else funcs.push(f);
            }

        }());
        whenReady(ele);
    } else {
        /*if(ele.substr(0,1) == "#"){
            // if(/[[]/g.test(ele)){
                /!*var start = ele.indexOf("["),
                    end = ele.indexOf("]");
                var new_ele = ele.substring(start,end);*!/
                return window.document.getElementById(ele.substr(1,ele.length-1));}
        else if(ele.substr(0,1) == "."){
            return window.document.getElementsByClassName(ele.substr(1,ele.length-1));}
        else{
            return document.querySelectorAll(ele);
            /!* return window.document.getElementsByTagName(ele);*!/}*/
        /*if(ele.substr(0,1) == "#"){
            return window.document.getElementById(ele.substr(1,ele.length-1));
        }else{*/
        if (ele.substr(0, 1) == "#") {
            return document.getElementById(String(ele.substring(1,ele.length)));
        } else {
            return document.querySelectorAll(ele);
        }
        /*}*/
    }


};

NodeList.prototype.eq = function (n) {
    if (this[n])
        return this[n];
    else {
        throw new Error("eq have a error")
    }
};

HTMLElement.prototype.click = function (f) {
    this.onclick = f;
    return this;
};
HTMLElement.prototype.click = function (f) {
    this.onclick = f;
    return this;
};
HTMLElement.prototype.dblclick = function (f) {
    this.ondblclick = f;
    return this;
};
HTMLElement.prototype.mousemove = function (f) {
    this.onmousemove = f;
    return this;
};
HTMLElement.prototype.mouseover = function (f) {
    this.onmouseover = f;
    return this;
};
HTMLElement.prototype.mouseout = function (f) {
    this.onmouseout = f;
    return this;
};
HTMLElement.prototype.blur = function (f) {
    this.onblur = f;
    return this;
};
HTMLElement.prototype.focus = function (f) {
    this.onfocus = f;
    return this;
};
HTMLElement.prototype.load = function (f) {
    this.onload = f;
    return this;
};
HTMLElement.prototype.error = function (f) {
    this.onerror = f;
    return this;

};
HTMLElement.prototype.css = function (cssName, cssValue) {
    if (arguments.length == 2) {
        this.style[arguments[0]] = arguments[1];
    } else {
        if (this.style[arguments[0]]) {
            return this.style[arguments[0]]
        } else {
            return this.getAttribute(arguments[0]);
        }
    }
};
NodeList.prototype.css = function (cssName, cssValue) {
    if (arguments.length == 2) {
        for (var i = 0; i < this.length; i++) {
            this[i].style[arguments[0]] = arguments[1];
            return arguments[1]
        }
    } else {
        for (var i = 0; i < this.length; i++) {
            if (this[i].style[arguments[0]]) {
                return this[i].style[arguments[0]]
            } else {
                return this[i].getAttribute(arguments[0]);
            }
        }
    }
};

NodeList.prototype.click = function (f) {
    var a = 0;
    for (var i in this) {
        this[i].n = a;
        this[i].onclick = f;
        a++;
    }
    return this;
};
NodeList.prototype.mouseover = function (f) {
    var a = 0;
    for (var i in this) {
        this[i].n = a;
        this[i].onmouseover = f;
        a++;
    }
    return this;
};
NodeList.prototype.mousemove = function (f) {
    var a = 0;
    for (var i in this) {
        this[i].n = a;
        this[i].onmousemove = f;
        a++;
    }
    return this;
};
NodeList.prototype.mouseout = function (f) {
    var a = 0;
    for (var i in this) {
        this[i].n = a;
        this[i].onmouseout = f;
        a++;
    }
    return this;
};


NodeList.prototype.index = function (that) {
    return that['n'];
};
HTMLElement.prototype.attr = function () {
    if (arguments.length == 2) {
        this.setAttribute(arguments[0], arguments[1])
    } else {
        return this.getAttribute(arguments[0])
    }
    return this;
};
HTMLElement.prototype.shack = function (distance, time, callback) {
    var e = this;
    if (!time) time = 500;
    if (!distance) distance = 5;

    var originalStyle = e.style.cssText;
    e.style.position = "relative";
    var start = ( new Date() ).getTime();
    animate();

    function animate() {
        var now = ( new Date() ).getTime(),
            elapsed = now - start,
            fraction = elapsed / time;

        if (fraction < 1) {
            var x = distance * Math.sin(fraction * 4 * Math.PI);
            e.style.left = x + "px";
            setTimeout(animate, Math.min(25, time - elapsed));
        } else {
            e.style.cssText = originalStyle;
            if (callback) callback(e);
        }
        return this;
    }
};
HTMLElement.prototype.fadeOut = function (time, callback) {
    var e = this;
    if (!time) time = 500;
    var start = ( new Date() ).getTime();
    animate();

    function animate() {
        var elapsed = ( new Date() ).getTime() - start,
            fraction = elapsed / time;
        if (fraction < 1) {
            var opacity = 1 - Math.sqrt(fraction);
            e.style.opacity = String(opacity);
            setTimeout(animate, Math.min(25, time - elapsed));
        } else {
            e.style.opacity = 0;
            if (callback) callback(e);
        }
    }
};
HTMLElement.prototype.fadeIn = function (time, callback) {
    var e = this;
    if (!time) time = 500;
    var start = ( new Date() ).getTime();
    animate();

    function animate() {
        var elapsed = ( new Date() ).getTime() - start,
            fraction = elapsed / time;
        if (fraction < 1) {
            var opacity = Math.sqrt(fraction);
            e.style.opacity = String(opacity);
            setTimeout(animate, Math.min(25, time - elapsed));
        } else {
            e.style.opacity = 1;
            if (callback) callback(e);
        }
    }
};
CSSStyleDeclaration.prototype.styleList = function () {
    var re = /[^;{}]+/g,
        arr = this.cssText.match(re);
    return arr;
};

function Ajax(types) {
    return this[types]
}
Ajax.prototype = {
    constructor:Ajax,
    "post":function (url,data,callback){
        var xhr = new XMLHttpRequest();
        xhr.open("POST",url);
        xhr.onreadystatechange = function (){
            if( xhr.readyState === 4 && callback ){
                callback(xhr)
            }
        };
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(this.head(data));
    },
    head:function (b){
        if(!b)return "";
        var pairs = [];
        for(var name in b){
            if(!b.hasOwnProperty(name))continue;
            var value = b[name];
            name = encodeURIComponent(name.replace("+","%20"));
            value = encodeURIComponent(value.replace("+","%20"));
            pairs.push(name+"="+value);
        }
        return pairs.join("&");
    },
    get:function (url,data,callback){
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url+"?"+this.head(data));
        xhr.onreadystatechange = function (){
            if(xhr.readyState === 4 && callback)callback(xhr);
        };
        xhr.getResponseHeader("Content-type","text/plain;charset=utf-8");
        xhr.send(null);
    },
    getJSON:function (url,callback){
        var script = document.createElement("script");
        var head = document.getElementsByTagName("head")[0];
        script.src = url;
        head.appendChild(script);
        if(callback)callback()
    }
};
var ajax = new Ajax();

HTMLElement.prototype.addClass = function (a){
    this.className += " "+a;
};HTMLElement.prototype.removeClass = function (a){
    if(this.className.indexOf(a) === -1) return false;
    else
        this.className = this.className.replace(new RegExp(a,"g"),"");
    return this;
};HTMLElement.prototype.hasClass = function (a){
    return new RegExp(a,"g").test(this.className)
};

Math.rand = function (a,b){
    var arr = [];
    for(var i=a;i<=b;i++){
        arr.push(i);
    }
    return arr[Math.floor(Math.random()*arr.length)]
};

Object.defineProperty(Function.prototype,"method",{
    enumerable:false,
    configuable:true,
    writable:false,
    value:function (a,b){
        this.prototype[a] = b;
        return this;
    }
});