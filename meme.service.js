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