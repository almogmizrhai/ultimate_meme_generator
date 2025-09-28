//gallery controller 

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

function renderPics(){
    const elSavedPics = document.querySelector('.saved-pics')
    if (!elSavedPics) return

    const pics = getPics()
    var strHtml = pics.map(pic => {
        return `
        <div class="pic-card">
            <img class="pic" src="${pic.url}" onclick="onSelectPic('${pic.id}')" />
            <div class="pic-btns flex">
            <button class="btn" onclick="onRemovePic('${pic.id}')">❌</button>
            <button class="btn" onclick="onSelectPic('${pic.id}')">🖌️</button>
            </div>
        </div>
        `
    })
    document.querySelector('.saved-pics').innerHTML = strHtml.join('')
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

function onSavePic(ev){
    ev.preventDefault()

    const canvasData = gElCanvas.toDataURL('image/png') //תומך רקע שקוף
    savePic(canvasData)
    renderPics()
}

function onRemovePic(picId){
    removePic(picId)
    renderPics()
}

function onSelectPic(picId){
    const pic = loadPicFromStorageById(picId)
    if(pic === -1) return
    const img = new Image()
    img.src = pic.url

    img.onload = () => {
        setImg(picId)   
        renderMeme()    
    }
}