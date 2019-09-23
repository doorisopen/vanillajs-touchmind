const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// canvas 배경 default: white
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR; // 팬 기본 색깔
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 팬 두께


let painting = false;
let filling = false;

function stopPainting(event) {
    painting = false;
}
function startPainting(event) {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";

    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

// 채우기 버튼
function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
    
}


function handleCM(event) {
    event.preventDefault();
}

// save Menu
function handleSaveClick() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "TouchMindJS[Export]";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
// 색상 Array
Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

// Stroke Size
if(range) {
    range.addEventListener("input", handleRangeChange);
}

// Fill, Paint Mode
if(mode) {
    mode.addEventListener("click", handleModeClick);
}

// Save Btn
if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}