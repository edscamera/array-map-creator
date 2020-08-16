class PromptBox {
    element = null;
    button = null;
    onReturn = (val) => {};
    charLimit = 10;

    constructor(text, onReturn, charLimit, defaultValue) {
        if (text === undefined) text = "";
        if (onReturn === undefined) this.onReturn = (val) => {};
        if (!Number.isInteger(charLimit) || charLimit < 0) this.charLimit = 9999;
        if (defaultValue === undefined) defaultValue = "";

        this.backdrop = document.createElement('DIV');
        Object.assign(this.backdrop.style, {
            position: 'absolute',
            width: window.innerWidth + 'px',
            height: window.innerHeight + 'px'
        });

        this.element = document.createElement('INPUT');
        this.element.value = defaultValue;
        this.element.style.position = 'absolute';

        this.button = document.createElement('BUTTON');
        this.button.innerHTML = '&#10004;';
        Object.assign(this.button.style, {
            color: '#00ff00',
            position: 'absolute',
            left: this.element.offsetWidth + 'px',
            backgroundColor: 'Transparent',
            outline: 'None',
            border: 'None',
            userSelect: 'None'
        });
        this.button.onmouseover = () => { this.button.style.color = '#009900' };
        this.button.onmouseout = () => { this.button.style.color = '#00ff00' };

        this.text = document.createElement('h1');
        this.text.innerHTML = text;
        Object.assign(this.text.style, {
            color: '#ffffff',
            position: 'absolute',
            userSelect: 'None'
        });

        this.button.onclick = () => {
            this.element.value = this.element.value.slice(0, charLimit);
            this.onReturn(this.element.value);
            this.hide();
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
            this.button.style.left = (window.innerWidth / 2 - this.element.offsetWidth / 2) + this.element.offsetWidth - this.button.offsetWidth + 'px';
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
        this.backdrop.append(this.element, this.button, this.text);
        document.body.appendChild(this.backdrop);

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
class SliderBox {
    constructor(text, onReturn, min, max) {
        // Set undefined arguments to default values
        if (text === undefined) text = "";
        if (min === undefined) min = 0;
        this.onReturn = (onReturn === undefined ? val => {} : onReturn);
        if (max === undefined) max = 10;
        // Backdrop Container Initalization
        this.backdrop = document.createElement('DIV');
        this.backdrop.style.position = 'absolute';
        // Question Text Initalization
        this.text = document.createElement('H1');
        this.text.innerHTML = text;
        Object.assign(this.text.style, {
            color: '#ffffff',
            position: 'absolute',
            userSelect: 'None'
        });
        // Slider Initalization
        this.slider = document.createElement('INPUT');
        Object.assign(this.slider, {
            type: 'range',
            min: min,
            max: max,
            value: min,
            margin: 0
        });
        this.slider.style.position = 'absolute';
        // Button Initalization
        this.button = document.createElement('BUTTON');
        this.button.innerHTML = '&#10004;';
        Object.assign(this.button.style, {
            color: '#00ff00',
            position: 'absolute',
            backgroundColor: 'Transparent',
            outline: 'None',
            border: 'None',
            userSelect: 'None',
            margin: 0
        });
        this.button.onmouseover = () => { this.button.style.color = '#009900' };
        this.button.onmouseout = () => { this.button.style.color = '#00ff00' };
        this.button.onclick = () => {
            this.onReturn(this.slider.value);
            this.hide();
        };
        // Indicator Initalization
        this.indicator = document.createElement('h6');
        Object.assign(this.indicator.style, {
            color: 'white',
            position: 'absolute',
            userSelect: 'none',
            margin: 0,
            height: 'auto',
            width: 'auto',
            whiteSpace: 'nowrap'
        });
        // Set Indicator
        this.indicator.innerText = min;
        this.slider.onmouseenter = () => this.indicatorUpdate = window.setInterval(() => {
            this.indicator.innerText = this.slider.value;
            this.backdrop.onresize();
        }, 100);
        this.slider.onmouseleave = () => clearInterval(this.indicatorUpdate);
        // Resize Listener
        this.backdrop.onresize = () => {
            Object.assign(this.backdrop.style, {
                width: window.innerWidth + 'px',
                height: window.innerHeight + 'px'
            });
            this.text.style.left = (window.innerWidth / 2 - this.text.offsetWidth / 2) + 'px';
            this.text.style.top = (window.innerHeight / 2 - this.slider.offsetHeight - this.text.offsetHeight * 2) + 'px';
            this.slider.style.left = (window.innerWidth / 2 - this.slider.offsetWidth / 2) + 'px';
            this.slider.style.top = (window.innerHeight / 2 - this.slider.offsetHeight / 2) + 'px';
            this.button.style.left = (window.innerWidth / 2 + this.slider.offsetWidth / 2) + 'px';
            this.button.style.top = (window.innerHeight / 2 - this.slider.offsetHeight / 2) + 'px';
            this.indicator.style.left = ((window.innerWidth / 2 - this.slider.offsetWidth / 2) - this.indicator.clientWidth - 5) + 'px';
            this.indicator.style.top = (window.innerHeight / 2 - this.slider.offsetHeight / 2) + 4 + 'px';
        }
        // Append Elements
        this.backdrop.append(this.slider, this.button, this.text, this.indicator);
        document.body.appendChild(this.backdrop);
        // Initial Positioning
        window.addEventListener('resize', this.backdrop.onresize);
        this.backdrop.onresize();
    }
    show() {
        window.addEventListener('resize', this.backdrop.onresize);
        document.body.appendChild(this.backdrop);
    }
    hide() {
        window.removeEventListener('resize', this.backdrop.onresize);
        this.backdrop.remove();
    }
}