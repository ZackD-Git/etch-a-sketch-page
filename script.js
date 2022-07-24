const pixelSlider = document.getElementById("pixel-size");
const clearCanvasBtn = document.getElementById("clear-canvas");
const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('color-picker');
const showGrid = document.getElementById('show-grid');
const output = document.getElementById("output");
let pixelsArray = [];
let isDrawing = false;

window.onload = () => {
    refreshCanvas();
}

function refreshCanvas() {
    clearCanvas();
    createPixelArray();
    showCanvasGrid();
}

function createPixelArray() {
    const pixelsSelected = parseInt(pixelSlider.value);
    pixelsArray = new Array(pixelsSelected * pixelsSelected);
    output.textContent = pixelSlider.value;

    for (let i = 0; i < pixelsArray.length; i++) {
        const newPixel = document.createElement("div");
        const pixDimensions = (canvas.clientWidth / pixelsSelected).toString();
        newPixel.classList.add("pixel");
        newPixel.style.width = pixDimensions;
        canvas.appendChild(newPixel);
        pixelsArray[i] = newPixel;
    }
}

function clearCanvas() {
    for (let i = canvas.childElementCount; i > 0; i--) {
        canvas.lastElementChild.remove();
    }
}

function showCanvasGrid() {
    if (showGrid.checked === true) {
        pixelsArray.forEach(pix => {
            pix.classList.add('pixel-grid')
        });
    } else {
        pixelsArray.forEach(pix => {
            pix.classList.remove('pixel-grid')
        });
    }

}

function startDrawing() {
    isDrawing = true;

    pixelsArray.forEach(pix => pix.addEventListener('mouseover', colorPixels));
}

function stopDrawing() {
    isDrawing = false;
}

function colorPixels(e) {

    if (isDrawing === true) {
        this.style.backgroundColor = `${colorPicker.value}`;
    }

}

//fit to canvas

clearCanvasBtn.addEventListener('click', refreshCanvas);
showGrid.addEventListener('change', showCanvasGrid);
pixelSlider.addEventListener('change', refreshCanvas);
window.addEventListener('mousedown', startDrawing);
window.addEventListener('mouseup', stopDrawing);
