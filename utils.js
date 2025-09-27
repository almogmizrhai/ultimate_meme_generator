

'use strict'


function makeId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''
    for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return id
}

function getTextWidth(line) {
    const ctx = gElCanvas.getContext('2d')
    ctx.font = `${line.size}px ${line.font || 'Impact'}`
    const metrics = ctx.measureText(line.txt)
    return metrics.width
}

function getTextHeight(line) {
    const ctx = gElCanvas.getContext('2d')
    ctx.font = `${line.size}px ${line.font || 'Impact'}`
    const metrics = ctx.measureText(line.txt)
    return (metrics.actualBoundingBoxAscent || line.size * 0.8) + (metrics.actualBoundingBoxDescent || line.size * 0.2)
}