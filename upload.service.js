// storage

'use strict'


function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    var data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}