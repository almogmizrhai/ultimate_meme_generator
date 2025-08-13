

'use strict'


var gImgs = [...Array(18).keys()].map(i => ({
    id: i + 1,
    url: `img/${i + 1}.jpg`,
    keywords: []
}))

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        { txt: '', size: 40, color: 'white' }
    ]
}

var gKeywords = ['funny', 'cat', 'baby', 'dog', 'politics', 'love', 'sports', 'memes']

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

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

