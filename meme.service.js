// service

'use strict'


var gImgs = [...Array(18).keys()].map(i => ({
    id: makeId(4),
    url: `img/${i + 1}.jpg`,
    keywords: []
}))

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        { txt: 'New Line', size: 40, color: 'white', x: 250, y: 50 }
    ]
}

var gKeywords = ['funny', 'cat', 'baby', 'dog', 'politics', 'love', 'sports', 'memes']

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2, }

function getMeme(){
    return gMeme
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
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

function drawText(ctx, line) {
    ctx.font = `${line.size}px Impact`
    ctx.fillStyle = line.color
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.textAlign = 'center'

    ctx.fillText(line.txt, line.x, line.y)
    ctx.strokeText(line.txt, line.x, line.y)
}


function addLine() {
    document.querySelector('.input-text').value=''
    const yPos = getNewLineY() 
    const newLine = {
        txt: 'New line',
        size: 40,
        color: 'white',
        x: gElCanvas.width / 2,
        y: yPos
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme()
    console.log(newLine)
}

function deleteLine(meme){
    if (gMeme.lines.length === 0) return
    const idx = meme.selectedLineIdx
    meme.lines.splice(idx, 1)

    if (meme.lines.length === 0) {
        meme.selectedLineIdx = -1
    } else if (idx >= meme.lines.length) {
        meme.selectedLineIdx = meme.lines.length - 1
    }

    const elInput = document.querySelector('.input-text')
    if (meme.selectedLineIdx !== -1) {
        elInput.value = meme.lines[meme.selectedLineIdx].txt
    } else {
        elInput.value = ''
    }
}

function getNewLineY() {
    const lineCount = gMeme.lines.length
    if (lineCount === 0) return 50          // למעלה
    if (lineCount === 1) return gElCanvas.height - 50 // למטה
    return gElCanvas.height / 2             // באמצע
}

function addImgFromUrl(url) {
    const img = _createImg(url, [])
    gImgs.push(img)
    return img 
}

function _createImg(url, keywords) {
    return {
        id: makeId(4),
        url,
        keywords
    }
}