'use strict'

const gElCanvas = document.getElementById('canvas')
const gCtx = gElCanvas.getContext('2d')

function drawImgFromLocal(imgSrc) {
    var img = new Image()
    img.src = imgSrc;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
    }
}

function drawImgFromRemote() {
    var img = new Image()
    img.src = 'http://steamcdn-a.akamaihd.net/steam/apps/431960/ss_39ed0a9730b67a930acb8ceed221cc968bee7731.1920x1080.jpg?t=1571786836';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
    }
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-image.jpg'
}

function onGoToGallery() {
    const elEditorWindow = document.querySelector('.main-meme-editor')
    elEditorWindow.hidden = true
    
    console.log('onGoToGallery');
    goToGallery()
}

function goToEditor(imgUrl) {
    const elEditorWindow = document.querySelector('.main-meme-editor')
    elEditorWindow.hidden = false
    console.log('goToEditor');
    drawImgFromLocal(imgUrl)
}