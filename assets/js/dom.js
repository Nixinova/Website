window.jQuery = elem => new jQueryClass(elem);
window.$ = window.jQuery;

class jQueryClass {
    constructor(selector) {
        if (selector instanceof jQueryClass) return selector;
        else if (selector instanceof Function) $(document).ready(selector);
        else if (selector instanceof NodeList) this.elements = selector;
        else if (selector instanceof HTMLElement) this.elements = [selector];
        else if (Object.is(selector, document)) this.elements = [document];
        else this.elements = document.querySelectorAll(selector);
        return this;
    }
    addClass(name) {
        this.elements.forEach(elem => elem.classList.add(name));
        return this;
    }
    removeClass(name) {
        this.elements.forEach(elem => elem.classList.remove(name));
        return this;
    }
    toggleClass(name, force) {
        this.elements.forEach(elem => elem.classList.toggle(name, force));
        return this;
    }
    hasClass(name) {
        return [...this.elements[0].classList].includes(name);
    }
    attr(name, val) {
        if (val == null) return this.elements[0].getAttribute(name);
        this.elements.forEach(elem => elem.setAttribute(name, val));
        return this;
    }
    data(name, val) {
        if (val == null) return this.elements[0].dataset[name];
        this.elements.forEach(elem => elem.dataset[name] = val);
        return this;
    }
    prop(name, val) {
        if (val == null) return this.elements[0][name];
        this.elements[0][name] = val;
        return this;
    }
    val(val) {
        if (val == null) return this.elements[0].value;
        this.elements.forEach(elem => elem.value = val);
        return this;
    }
    empty() {
        this.elements.forEach(elem => elem.innerHTML = '');
        return this;
    }
    remove() {
        this.elements.forEach(elem => elem.parentNode.removeChild(elem));
        return this;
    }
    html(val) {
        if (val == null) return this.elements[0].innerHTML;
        this.elements.forEach(elem => elem.innerHTML = val);
        return this;
    }
    css(name, val) {
        if (val == null) return this.elements[0].style[name];
        this.elements.forEach(elem => elem.style[name] = val);
        return this;
    }
    text(val) {
        if (val == null) return this.elements[0].innerText;
        this.elements.forEach(elem => elem.innerText = val);
        return this;
    }
    append(val) {
        this.elements.forEach(elem => elem.innerHTML += val);
        return this;
    }
    each(func) {
        this.elements.forEach(func);
        return this;
    }
    ready(func) {
        this.elements.forEach(elem => elem.addEventListener('DOMContentLoaded', func));
        return this;
    }

    // Convert to raw DOM elements //
    getElement() {
        return this.elements[0];
    }
    getElements() {
        return this.elements;
    }
}
