const toolsContainer = document.querySelector(".tools-container");
const pencil = document.querySelector(".pencil");
const pencilProperties = document.querySelector(".pencil-properties");
const container = document.querySelector(".container");
let isPencilPropertiesOpen = false;
const hamburgerMenu = document.querySelector(".hamburger-menu");
const addNotes = document.querySelector(".add-text");
const notesContainer = document.querySelector(".main");
const textArea = document.getElementsByTagName("textArea");
const minimizeTextArea = document.querySelector(".minimize");
const pencilColor = document.querySelectorAll(".select-pencil-color");
const pencilOpacity = document.querySelector(".pencil-opacity");
const pencilStrokeWidth = document.querySelector(".pencil-stroke-width");
const addImage = document.querySelector(".add-image");
const erasor = document.querySelector(".eraser");
const download = document.querySelector(".download");
const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");
// const theme = document.querySelector(".theme");
const initialPeniclStyleProperties = {
  color: "black",
  opacity: 1,
  stroke: 1,
};
let pencilStyleProperties = { ...initialPeniclStyleProperties };
let isErasorClicked = false;
pencil.addEventListener("click", (event) => {
  if (isPencilPropertiesOpen === false) {
    unSelectOtherOption();
    pencilProperties.style.display = "block";
    pencil.style.backgroundColor = "#f1eaff";
    pencilStyleProperties.color = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--black");
    pencilStyleProperties = { ...initialPeniclStyleProperties };
  } else {
    pencilProperties.style.display = "none";
    pencil.style.border = "none";
    pencil.style.backgroundColor = "transparent";
  }
  isPencilPropertiesOpen = !isPencilPropertiesOpen;
});

// minimizeTextArea.addEventListener("click", (event) => {
//   event.target.style.display = "none";
// });
addNotes.addEventListener("click", (event) => {
  const textElement = document.createElement(`div`);
  textElement.setAttribute("class", "sticky-container");
  textElement.innerHTML = `
          <div class="sticky">
            <textarea></textarea>
          </div>
        `;
  document.body.appendChild(textElement);
  addFunctionalityToStickyElement(textElement);
});

addImage.addEventListener("click", (event) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (event) => {
    const imageObj = input.files[0];
    const imageURL = URL.createObjectURL(imageObj);
    const imageElement = document.createElement(`div`);
    imageElement.setAttribute("class", "sticky-container");
    imageElement.innerHTML = `
            <div class="sticky">
              <img src=${imageURL} alt="img" class="image"/>
            </div>
          `;
    document.body.appendChild(imageElement);
    addFunctionalityToStickyElement(imageElement);
  });
});

function addFunctionalityToStickyElement(element) {
  // Remove sticky element if delete is pressed

  element.onkeydown = (event) => {
    if (event.key === "Delete") {
      document.body.removeChild(element);
    }
  };
  element.onmousedown = function (event) {
    addDragAndDropFunction(event, element);
  };

  element.ondragstart = function () {
    return false;
  };
}
function addDragAndDropFunction(event, element) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}

pencilColor.forEach((colorEle) => {
  colorEle.addEventListener("click", (event) => {
    pencilStyleProperties.color = getComputedStyle(colorEle).backgroundColor;
  });
});

pencilOpacity.addEventListener("change", (event) => {
  pencilStyleProperties.opacity = Number(event.target.value) / 10;
});

pencilStrokeWidth.addEventListener("change", (event) => {
  pencilStyleProperties.stroke = Number(event.target.value);
});

download.addEventListener("click", (event) => {
  const anchor = document.createElement("a");
  const url = canvas.toDataURL();
  anchor.href = url;
  anchor.download = "whiteboard.jpg";
  anchor.click();
});

erasor.addEventListener("click", (e) => {
  if (isErasorClicked) {
    pencilStyleProperties.color = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--black");
    isErasorClicked = false;
    erasor.style.backgroundColor = "transparent";
  } else {
    unSelectOtherOption();
    erasor.style.backgroundColor = "#f1eaff";
    pencilStyleProperties.color = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--white");

    isErasorClicked = true;
  }
});

function unSelectOtherOption() {
  pencil.style.backgroundColor = "transparent";
  erasor.style.backgroundColor = "transparent";
}

// theme.addEventListener("click", () => {
//   if (container.getAttribute("data-theme") === "dark") {
//     theme.innerHTML =
//       ' <span class="material-symbols-outlined icon"> light_mode </span>';
//     container.setAttribute("data-theme", "light");
//   } else {
//     theme.innerHTML =
//       '<span class="material-symbols-outlined icon"> dark_mode </span>';
//     container.setAttribute("data-theme", "dark");
//   }
// });

// theme.click();

hamburgerMenu.addEventListener("click", (event) => {
  console.log("HERE");
  if (getComputedStyle(toolsContainer).display === "none") {
    toolsContainer.style.display = "flex";
  } else {
    toolsContainer.style.display = "none";
    pencilProperties.style.display = "none";
  }
});
