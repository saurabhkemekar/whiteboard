const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouseDown = false;
let canvasTool = canvas.getContext("2d");
let undoRedoTracker = new Array();
let track = 0;

canvas.addEventListener("mousedown", (e) => {
  if (isPencilPropertiesOpen || isErasorClicked) {
    const { x, y } = getMouseCoord(e.clientX, e.clientY);
    let data = { x: x, y: y, ...pencilStyleProperties };
    mouseDown = true;
    beginPath(data);
  }
});

function beginPath(data) {
  canvasTool.strokeStyle = data.color;
  canvasTool.lineWidth = data.stroke;
  canvasTool.globalAlpha = data.opacity;
  canvas.style.cursor = "crosshair";
  canvasTool.beginPath();
  canvasTool.moveTo(data.x, data.y);
}
canvas.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    const { x, y } = getMouseCoord(e.clientX, e.clientY);
    drawPath({ x, y });
  }
});

function drawPath(data) {
  canvasTool.lineTo(data.x, data.y);
  canvasTool.stroke();
}

canvas.addEventListener("mouseup", () => {
  mouseDown = false;
  undoRedoTracker.push(canvas.toDataURL());
  track = undoRedoTracker.length;
  canvas.style.cursor = "auto";
});

undo.addEventListener("click", (e) => {
  if (track > 0) track--;
  // undoRedoCanvas({ undoRedoTracker, track });
  undoRedoCanvas({ undoRedoTracker, track });
});

redo.addEventListener("click", (e) => {
  if (track < undoRedoTracker.length - 1) track++;
  undoRedoCanvas({ undoRedoTracker, track });
});

function undoRedoCanvas(obj) {
  track = obj.track;
  undoRedoTracker = obj.undoRedoTracker;
  let url = undoRedoTracker[track];
  let img = new Image();
  img.src = url;
  img.onload = (e) => {
    canvasTool.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

function getMouseCoord(clientX, clientY) {
  const pos = canvas.getBoundingClientRect();
  return { x: clientX - pos.left, y: clientY - pos.top };
}
