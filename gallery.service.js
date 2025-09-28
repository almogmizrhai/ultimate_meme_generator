// gallery service

'use strict'


const STORAGE_KEY = 'picsDB'

var gPics = loadFromStorage(STORAGE_KEY) || []

function getPics() {
    return gPics
}

function savePic(data){
    
    const pic = _createPic(data)
    gPics.push(pic)
    
    _savePicsToStorage()
}

function removePic(picId) {
    const picIdx = getPicById(picId)
    if (picIdx === -1) return
    gPics.splice(picIdx, 1)
    _savePicsToStorage()
}

function getPicById(picId) {
    return gPics.findIndex(pic => pic.id === picId)
}

function _createPic(data){
    return {
        url: data,
        id: makeId(4),
    }
}

function _savePicsToStorage() {
    saveToStorage(STORAGE_KEY, gPics)
}

function loadPicFromStorageById(picId) {
    const pics = loadFromStorage(STORAGE_KEY) || []
    return pics.find(pic => pic.id === picId) || null
}

