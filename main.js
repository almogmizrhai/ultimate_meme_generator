//main

'use strict'


var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('#meme-canvas')
    
    if (gElCanvas) {
        gCtx = gElCanvas.getContext('2d')
        gElCanvas.addEventListener('click', onCanvasClick)
    }

    if (document.querySelector('.saved-pics')) {
        renderPics()
    }
    
    if (document.querySelector('.gallery-container')) {
        renderGallery()
    }
}
