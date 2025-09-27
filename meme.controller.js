// controller

'use strict'


function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')

    const imgsHTML = gImgs
        .map((img, idx) => {
            if (idx === 0) {
                return `<input type="file" id="file-input" style="display:none" onchange="onUploadImg(event)">
                <img src="${img.url}" onclick="document.getElementById('file-input').click()" alt="Upload">`
            } else {
                return `<img src="${img.url}" onclick="onImgSelect('${img.id}')" alt="meme image">`
            }
        })
        .join('')

    elGallery.innerHTML = imgsHTML
}

function renderMeme() {
    const meme = getMeme()
    const imgObj = getImgById(meme.selectedImgId)

    if (!imgObj) {
        console.error('Image not found for ID:', meme.selectedImgId)
        return
    }

    const canvas = document.getElementById('meme-canvas')
    const ctx = canvas.getContext('2d')

    const img = new Image()
    img.src = imgObj.url

    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height) 
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        meme.lines.forEach((line, idx) => {
            drawText(ctx, line)
            if (idx === meme.selectedLineIdx) {
                drawTextBox(ctx, line)
            }
        })
    }
}

function onCanvasClick(ev) {
    console.log('Canvas clicked at:', ev.offsetX, ev.offsetY)
    const meme = getMeme()
    const clickX = ev.offsetX
    const clickY = ev.offsetY

    const clickedLineIdx = meme.lines.findIndex(line => {
        const textMetrics = measureLine(line) 
        const left = line.x - textMetrics.width / 2
        const right = line.x + textMetrics.width / 2
        const top = line.y - textMetrics.height / 2
        const bottom = line.y + textMetrics.height / 2
        return clickX >= left && clickX <= right && clickY >= top && clickY <= bottom
    })

    if (clickedLineIdx !== -1) {
        meme.selectedLineIdx = clickedLineIdx
        updateEditorForLine(meme.lines[clickedLineIdx])
        renderMeme()
    }
}

function onUploadImg(ev) {

    if (!ev || !ev.target || !ev.target.files || !ev.target.files[0]) return;

    loadImageFromInput(ev, (img) => {
        const newImg = addImgFromUrl(img.src) 
        setImg(newImg.id)

        document.querySelector('.gallery-container').classList.add('hide')
        document.querySelector('.meme-container').classList.remove('hide')

        renderMeme()
    })
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result

        img.onload = () => {
            onImageReady(img)
        }
    }

    reader.readAsDataURL(ev.target.files[0])
}

function onImgSelect(imgId) {
    setImg(imgId) 

    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.meme-container').classList.remove('hide')

    renderMeme()
}

function onSetLineTxt(newTxt) {
    setLineTxt(newTxt)  
    renderMeme()         
}

function onDownloadMeme(elLink){
    const elCanvas = document.querySelector('#meme-canvas')
    const dataUrl = elCanvas.toDataURL("image/png")
    elLink.href = dataUrl 
    console.log('Downloading meme...')
}

function onAddLine() { 
    console.log('Add line')
    addLine()
    renderMeme()
}

function onSwitchLine() { 
    console.log('Switch line') 
    const meme = getMeme()
    meme.selectedLineIdx = (meme.selectedLineIdx + 1) % meme.lines.length
    renderMeme()
}

function onDeleteLine() { 
    const meme = getMeme()
    if (meme.lines.length === 0) return
    deleteLine(meme)

    renderMeme()
}

function onChangeFontSize(diff) { 
    console.log('Font size change:', diff)
    changeFontSize(diff)
    renderMeme()
}

function onAlignText(align) { 
    console.log('Align text to the:', align) 
    alignText(align)
    renderMeme()
}

function onSetFillColor(color) { console.log('Fill color:', color) }
function onSetStrokeColor(color) { console.log('Stroke color:', color) }
function onSetFont(font) { console.log('Font:', font) }