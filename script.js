/* UI Declarations */
const defaultColor = '#04AA6D'
const defaultMode = 'color'
const defaultSize = 16

let currentColor = defaultColor
let currentMode = defaultMode
let currentSize = defaultSize


const sqColor = document.querySelector('.sqColor')
const colorBtn = document.querySelector('.colorBtn')
const rainbowBtn = document.querySelector('.rainbowBtn')
const eraserBtn = document.querySelector('.eraserBtn')
const gridLineBtn = document.querySelector('.gridLineBtn')
const clearBtn = document.querySelector('.clearBtn')
const gridSizeSlider = document.querySelector(".gridSizeSlider")
const gridSize = document.querySelector(".gridSize")
const gridContainer = document.querySelector('.grid-container')

/* UI Functions */

sqColor.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
gridLineBtn.onclick = (e) => toggleGridLine()
clearBtn.onclick = () => reloadGrid()
gridSizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
gridSizeSlider.onchange = (e) => changeSize(e.target.value)

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode) {
    activateBtn(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    clearGrid()
    genSquareDiv(currentSize)
}

function updateSizeValue(value) {
    gridSize.textContent = `Grid Size: ${value} x ${value}`
}
 
function reloadGrid() {
    clearGrid()
    genSquareDiv(currentSize)
}

function clearGrid() {
    gridContainer.textContent = ''
 }

function genSquareDiv(size) {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const sqDiv = document.createElement("div");
        sqDiv.classList.add('sq-div')
        sqDiv.addEventListener('mouseover', changeColor)
        sqDiv.addEventListener('mousedown', changeColor)
        gridContainer.appendChild(sqDiv)
    }
       /* const rowDiv = document.createElement("div");
        rowDiv.classList.add('row-div')
        rowDiv.textContent = 'test'
        rowDiv.addEventListener('mouseover', changeColor)
        rowDiv.addEventListener('mousedown', changeColor)
        gridContainer.appendChild(rowDiv) */

       /* for (let i = 0; i < size; i++) { *///squares
}

function toggleGridLine(){
    let sqDivs = document.querySelectorAll('.sq-div')
    sqDivs.forEach(sqDiv => {
        sqDiv.classList.toggle("sq-div-off")
    })
    gridLineBtn.classList.remove('active')
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = '#ffffff'
    }
}

function activateBtn(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active')
    }
  }

window.onload = () => {
    genSquareDiv(defaultSize)
    activateBtn(defaultMode)
  }
