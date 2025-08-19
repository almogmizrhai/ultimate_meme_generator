

'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')

    const imgsHTML = gImgs
        .map(img => `<img src="${img.url}" onclick="onImgSelect(${img.id})" alt="meme image">`)
        .join('')

    elGallery.innerHTML = imgsHTML
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
    ctx.lineWidth = 1

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