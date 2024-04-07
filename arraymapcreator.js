const $ = (selector) => document.querySelector(selector);
const canvas = $("canvas");
const g = canvas.getContext("2d");

const map = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
];
const colorMap = ["#fff", "#000"];
let brush = 1;
const tileSize = 64;

window.addEventListener("load", () => {
    updateCanvas();
    updatePalette();

    canvas.style.left = `${window.innerWidth / 2 - canvas.offsetWidth / 2}px`;
    canvas.style.top = `${window.innerHeight / 2 - canvas.offsetHeight / 2}px`;
});

// Update canvas
const updateCanvas = () => {
    canvas.width = map[0].length * tileSize;
    canvas.height = map[0].length * tileSize;

    g.clearRect(0, 0, canvas.width, canvas.height);
    for(let y = 0; y < map.length; y++) {
        for(let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== null) {
                g.fillStyle = colorMap[map[y][x]];
                g.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        };
    };
};

// Update Palette
const updatePalette = () => {
    const palette = $("#palette");
    while (palette.children[0]) palette.children[0].remove();
    colorMap.forEach((color, i) => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "color";
        input.id = `color_${i}`;
        if (brush === i) input.checked = true;
        const label = document.createElement("label");
        label.setAttribute("for", input.id);
        label.innerHTML = `<span>${i}</span>`;
        label.style.backgroundColor = color;
        label.addEventListener("click", () => brush = i);
        palette.append(input, label);
    });
    const label = document.createElement("label");
    label.innerHTML = `<span>+</span>`;
    label.classList.add("btn");
    label.addEventListener("click", () => {
        colorMap.push("#f00");
        updatePalette();
    });
    palette.append(label);
};

// Get Selected Tool
const getSelectedTool = () => {
    return $("input[name=tool]:checked").id.substring(5).toUpperCase();
}

// Move canvas
window.addEventListener("mousedown", (mouseDownEvent) => {
    if (getSelectedTool() !== "PAN" && mouseDownEvent.button !== 2) return;
    const mouseMove = (mouseMoveEvent) => {
        const canvasX = parseFloat(canvas.style.left);
        const canvasY = parseFloat(canvas.style.top);
        canvas.style.left = `${canvasX + mouseMoveEvent.movementX}px`;
        canvas.style.top = `${canvasY + mouseMoveEvent.movementY}px`;
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", mouseMove);
    }, { once: true, });
});
window.addEventListener("contextmenu", event => event.preventDefault());

// Draw
canvas.addEventListener("mousedown", (mouseDownEvent) => {
    if (!["DRAW", "ERASE"].includes(getSelectedTool()) || mouseDownEvent.button !== 0) return;
    const mouseMove = (mouseMoveEvent) => {
        const X = Math.floor(mouseMoveEvent.layerX / tileSize);
        const Y = Math.floor(mouseMoveEvent.layerY / tileSize);
        map[Y][X] = getSelectedTool() === "DRAW" ? brush : null;
        updateCanvas();
    };
    mouseMove(mouseDownEvent)
    canvas.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", () => {
        canvas.removeEventListener("mousemove", mouseMove);
    }, { once: true, });
});

// Fill
canvas.addEventListener("mousedown", (mouseDownEvent) => {
    if (getSelectedTool() !== "FILL") return;
    const X = Math.floor(mouseDownEvent.layerX / tileSize);
    const Y = Math.floor(mouseDownEvent.layerY / tileSize);
    const target = map[Y][X];
    const queue = [[X, Y]];
    while (queue.length > 0) {
        const X = queue[0][0];
        const Y = queue[0][1];
        map[Y][X] = brush;
        queue.splice(0, 1);
        if (X + 1 < map[Y].length && map[Y][X + 1] === target) queue.push([X + 1, Y]);
        if (X - 1 >= 0 && map[Y][X - 1] === target) queue.push([X - 1, Y]);
        if (Y + 1 < map.length && map[Y + 1][X] === target) queue.push([X, Y + 1]);
        if (Y - 1 >= 0 && map[Y - 1][X] === target) queue.push([X, Y - 1]);
    };
    updateCanvas();
});