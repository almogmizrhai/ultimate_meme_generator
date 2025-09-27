// controller

'use strict'



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

// פונקציה שמחזירה את המרחב של הטקסט
function measureLine(line) {
    const ctx = gElCanvas.getContext('2d')
    ctx.font = `${line.size}px ${line.font || 'Impact'}`
    const metrics = ctx.measureText(line.txt)
    const width = metrics.width
    const height = (metrics.actualBoundingBoxAscent || line.size * 0.8) +
                   (metrics.actualBoundingBoxDescent || line.size * 0.2)
    return { width, height }
}

function updateEditorForLine(line) {
    const elInput = document.querySelector('.input-text')
    elInput.value = line.txt || ''

}

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

function drawTextBox(ctx, line) {
    ctx.save()

    ctx.font = `${line.size}px Impact`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const textMetrics = ctx.measureText(line.txt || 'New line')
    const padding = 10

    const textWidth = textMetrics.width
    const ascent = textMetrics.actualBoundingBoxAscent || line.size * 0.8
    const descent = textMetrics.actualBoundingBoxDescent || line.size * 0.2
    const textHeight = ascent + descent

    const x = line.x
    const y = line.y

    ctx.strokeStyle = '#ADB8D6'
    ctx.lineWidth = 1.5

    ctx.strokeRect(
        x - textWidth / 2 - padding,
        y - ascent - padding,
        textWidth + padding * 2,
        textHeight + padding * 2
    )

    ctx.restore()
}

function onDeleteLine() { console.log('Delete line') }

function onChangeFontSize(diff) { console.log('Font size change:', diff) }
function onAlignText(align) { console.log('Align text:', align) }

function onSetFillColor(color) { console.log('Fill color:', color) }
function onSetStrokeColor(color) { console.log('Stroke color:', color) }
function onSetFont(font) { console.log('Font:', font) }