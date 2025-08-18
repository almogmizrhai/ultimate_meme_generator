

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
            ctx.font = `${line.size}px Impact`
            ctx.fillStyle = line.color
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2
            ctx.textAlign = 'center'

            const yPos = 50 + (idx * 40)
            ctx.fillText(line.txt, canvas.width / 2, yPos)
            ctx.strokeText(line.txt, canvas.width / 2, yPos)
        })
    }
}

function onSetLineTxt(newTxt) {
    setLineTxt(newTxt)  
    renderMeme()         
}
