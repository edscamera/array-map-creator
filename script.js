class PromptBox {
    element = null;
    button = null;
    onReturn = (val) => {};
    charLimit = 10;

    constructor(text, onReturn, charLimit, defaultValue) {
        this.onReturn = typeof(onReturn) === 'undefined' ? (val) => {} : onReturn;
        charLimit = typeof(charLimit) === 'undefined' ? 10 : charLimit;
        defaultValue = typeof(defaultValue) === 'undefined' ? "" : defaultValue;
        text = typeof(text) === 'undefined' ? "" : text;

        this.backdrop = document.createElement('DIV');
        this.container = document.createElement('DIV');
        this.backdrop.appendChild(this.container);
        Object.assign(this.backdrop.style, {
            position: 'absolute',
            width: window.innerWidth + 'px',
            height: window.innerHeight + 'px',
            backgroundColor: '#000000',
            opacity: 0.5
        });
        document.body.appendChild(this.backdrop);

        this.element = document.createElement('INPUT');
        this.element.value = defaultValue;
        this.element.style.position = 'absolute';
        this.container.appendChild(this.element);

        this.button = document.createElement('BUTTON');
        this.button.innerHTML = '&#10004;';
        Object.assign(this.button.style, {
            color: '#00ff00',
            position: 'absolute',
            left: this.element.offsetWidth + 'px',
            backgroundColor: 'Transparent',
            outline: 'None',
            border: 'None',
            userSelect: 'None',
            zIndex: 999,
            opacity: 1.0
        });
        this.button.onmouseover = () => { this.button.style.color = '#009900' };
        this.button.onmouseout = () => { this.button.style.color = '#00ff00' };
        this.container.appendChild(this.button);

        this.text = document.createElement('h1');
        this.text.innerHTML = text;
        Object.assign(this.text.style, {
            color: '#ffffff',
            position: 'absolute',
            userSelect: 'None',
            zIndex: 999,
            opacity: 1.0
        });
        this.container.appendChild(this.text);

        this.button.onclick = () => {
            this.element.value = this.element.value.slice(0, charLimit);
            this.onReturn(this.element.value);
        };
        this.backdrop.onresize = () => {
            Object.assign(this.backdrop.style, {
                position: 'absolute',
                width: window.innerWidth + 'px',
                height: window.innerHeight + 'px'
            });
            this.element.style.top = (window.innerHeight / 2 - this.element.offsetHeight / 2) + 'px';
            this.button.style.top = (window.innerHeight / 2 - this.button.offsetHeight / 2) + 'px';
            this.element.style.left = (window.innerWidth / 2 - this.element.offsetWidth / 2) + 'px';
            this.button.style.left = (window.innerWidth / 2 - this.element.offsetWidth / 2) + this.element.offsetWidth + 'px';
            this.text.style.left = (window.innerWidth / 2 - this.text.offsetWidth / 2) + 'px';
            this.text.style.top = (window.innerHeight / 2 - this.element.offsetHeight - this.text.offsetHeight * 2) + 'px';
        }
        this.element.onclick = () => {
            this.element.value = this.element.value.slice(0, charLimit);
        };
        this.element.onkeydown = (event) => {
            this.element.value = this.element.value.slice(0, charLimit);
            if (event.key === "Enter") this.button.click();
        };
        window.addEventListener('resize', this.backdrop.onresize);
        this.backdrop.onresize();
    }
    setInputStyle(style) {
        Object.assign(this.element.style, style);
    }
    setButtonStyle(style) {
        Object.assign(this.button.style, style);
    }
    setBackgroundStyle(style) {
        Object.assign(this.backdrop.style, style);
    }
    hide() {
        window.removeEventListener('resize', this.backdrop.onresize);
        this.backdrop.remove();
    }
    show() {
        window.addEventListener('resize', this.backdrop.onresize);
        document.body.appendChild(this.backdrop);
    }
}