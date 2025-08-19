

'use strict'


var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('#meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    renderGallery()
}
