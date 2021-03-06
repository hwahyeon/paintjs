const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');
const clearBtn = document.getElementById('jsClear');
const eraserBtn = document.getElementById('jsEraser');


const INITIAL_COLOR = "#2c2c2c"

canvas.width = 700;
canvas.height = 700;

canvasClear() // Canvas의 초기값 white로 설정. 이것 없으면 투명

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}


function startPainting(){
    painting = true;
}


function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}


function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}


function handleModeClick() {
    if(filling === true){
        filling = false;
        mode.innerText = "PAINT ON"
    } else {
        filling = true;
        mode.innerText = "FILL ON"
    }
}


function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}


// 마우스 오른쪽 클릭 금지
function handleCM(event){
    event.preventDefault();
}


function handleSaveClick(){
    const image = canvas.toDataURL(); //png 기본값. "image/jpeg"
    const link = document.createElement("a");
    link.href = image;
    link.download = "paingJS_EXPORT";
    link.click(); //fake click
}


function canvasClear(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function eraserModeClick(){
    if(filling){
        handleModeClick()
    }
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 25;
}



if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}


Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);


if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick)
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}

if(clearBtn){
    clearBtn.addEventListener("click", canvasClear)
}

if(eraserBtn){
    eraserBtn.addEventListener("click", eraserModeClick)
}