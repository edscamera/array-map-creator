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
    setTextStyle(style) { Object.assign(this.text.style, style); this.backdrop.onresize(); }
    setInputStyle(style) { Object.assign(this.element.style, style); this.backdrop.onresize(); }
    setButtonStyle(style) { Object.assign(this.button.style, style); this.backdrop.onresize(); }
    setBackgroundStyle(style) { Object.assign(this.backdrop.style, style); this.backdrop.onresize(); }
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
            this.onReturn(window.parseInt(this.slider.value));
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
    setTextStyle(style) { Object.assign(this.text.style, style); this.backdrop.onresize(); }
    setButtonStyle(style) { Object.assign(this.button.style, style); this.backdrop.onresize(); }
    setIndicatorStyle(style) { Object.assign(this.indicator.style, style); this.backdrop.onresize(); }
    setSliderStyle(style) { Object.assign(this.slider.style, style); this.backdrop.onresize(); }
    setSliderProperties(properties) { Object.assign(this.slider, properties); this.backdrop.onresize(); }
    show() {
        window.addEventListener('resize', this.backdrop.onresize);
        document.body.appendChild(this.backdrop);
    }
    hide() {
        window.removeEventListener('resize', this.backdrop.onresize);
        this.backdrop.remove();
    }
}

let map = null;
let CANVAS = null;
let tilesize = 64;
let colors = [[255, 255, 255]];
const btnNew = document.getElementById('btnNew');
const btnImport = document.getElementById('btnImport');
const btnExport = document.getElementById('btnExport');
document.querySelector("html").style.overflowX = 'hidden';
document.querySelector("html").style.overflowY = 'hidden';

btnNew.onclick = () => {
    let widthInput = new SliderBox("Set width:", width => {
        let heightInput = new SliderBox("Set height:", height => {
            map = new Array(height);
            for(let row = 0; row < map.length; row++) {
                map[row] = new Array(width);
                for(let col = 0; col < map[row].length; col++) {
                    map[row][col] = 0;
                }
            }
            CANVAS = document.createElement('CANVAS');
            CANVAS.width = tilesize * width;
            CANVAS.height = tilesize * height;
            Object.assign(CANVAS.style, {
               position: 'absolute',
               zIndex: -1,
               left: 0,
               top: 0 
            });
            document.body.appendChild(CANVAS);
            updateCanvas();
            resetView();
            dragElement(CANVAS);
        }, 5, 32);
        heightInput.setTextStyle({ fontFamily: "'Roboto Mono', monospace" });
    }, 5, 32);
    widthInput.setTextStyle({ fontFamily: "'Roboto Mono', monospace" });
};

const updateCanvas = () => {
    if (CANVAS === null) return;
    let CTX = CANVAS.getContext('2d');
    CANVAS.width = tilesize * map[0].length;
    CANVAS.height = tilesize * map.length;
    for(let row = 0; row < map.length; row++) {
        for(let col = 0; col < map[row].length; col++) {
            CTX.fillStyle = `rgb(${colors[map[row][col]][0]}, ${colors[map[row][col]][1]}, ${colors[map[row][col]][2]})`;
            CTX.strokeStyle = `rgb(${255 - colors[map[row][col]][0]}, ${255 - colors[map[row][col]][1]}, ${255 - colors[map[row][col]][2]})`;
            CTX.fillRect(col * tilesize, row * tilesize, tilesize, tilesize);
            CTX.strokeRect(col * tilesize, row * tilesize, tilesize, tilesize);
        }
    }
};
const changeSize = interval => {
    if (CANVAS === null) return;
    tilesize += interval;
    CANVAS.style.left = ((CANVAS.style.left.split('px')[0]) - interval * 2) + 'px';
    CANVAS.style.top = ((CANVAS.style.top.split('px')[0]) - interval * 2) + 'px';
    updateCanvas();
}

const resetView = () => {
    if (CANVAS === null) return;
    tilesize = 64;
    updateCanvas();
    CANVAS.style.left = window.innerWidth / 2 - CANVAS.offsetWidth / 2 + 'px';
    CANVAS.style.top = window.innerHeight / 2 - CANVAS.offsetHeight / 2 + 'px';
    updateCanvas();
};

const dragElement = elmnt => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}