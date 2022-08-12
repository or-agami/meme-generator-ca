'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
// var sizes = { xxxxxs: '0.4', xxxxs: '0.5', xxxs: '0.6', xxs: '0.7', xs: '0.8', s: '0.9', m: '1', l: '1.1', xl: '1.2', xxl: '1.3', xxxl: '1.4'}
var gMemesImgs = [
    { id: 1, url: 'assets/img/1.jpg', keywords: ['funny', 'cat'], size: 'xs' },
    { id: 2, url: 'assets/img/2.jpg', keywords: ['funny', 'cat'], size: 'xxs' },
    { id: 3, url: 'assets/img/3.jpg', keywords: ['funny', 'cat'], size: 's' },
    { id: 4, url: 'assets/img/4.jpg', keywords: ['funny', 'cat'], size: 'xxs' },
    { id: 5, url: 'assets/img/5.jpg', keywords: ['funny', 'cat'], size: 'xxs' },
    { id: 6, url: 'assets/img/6.jpg', keywords: ['funny', 'cat'], size: 's' },
    { id: 7, url: 'assets/img/7.jpg', keywords: ['funny', 'cat'], size: 'xs' },
    { id: 8, url: 'assets/img/8.jpg', keywords: ['funny', 'cat'], size: 'm' },
    { id: 9, url: 'assets/img/9.jpg', keywords: ['funny', 'cat'], size: 'xxs' },
    { id: 10, url: 'assets/img/10.jpg', keywords: ['funny', 'cat'], size: 'xs' },
    { id: 11, url: 'assets/img/11.jpg', keywords: ['funny', 'cat'], size: 'xs' },
    { id: 12, url: 'assets/img/12.jpg', keywords: ['funny', 'cat'], size: 'xs' },
    { id: 13, url: 'assets/img/13.jpg', keywords: ['funny', 'cat'], size: 'xxs' },
    { id: 14, url: 'assets/img/14.jpg', keywords: ['funny', 'cat'], size: 'xs' },
    { id: 15, url: 'assets/img/15.jpg', keywords: ['funny', 'cat'], size: 'xxxs' },
    { id: 16, url: 'assets/img/16.jpg', keywords: ['funny', 'cat'], size: 'xxs' },
    { id: 17, url: 'assets/img/17.jpg', keywords: ['funny', 'cat'], size: 'xxs' },
    { id: 18, url: 'assets/img/18.jpg', keywords: ['funny', 'cat'], size: 'xs' },
    { id: 19, url: 'assets/img/19.jpg', keywords: ['funny', 'cat'], size: 'xxs' },
    { id: 20, url: 'assets/img/20.jpg', keywords: ['funny', 'cat'], size: 'xxs' },
    { id: 21, url: 'assets/img/21.jpg', keywords: ['funny', 'cat'], size: 's' },
    { id: 22, url: 'assets/img/22.jpg', keywords: ['funny', 'cat'], size: 'xxs' },
    { id: 23, url: 'assets/img/23.jpg', keywords: ['funny', 'cat'], size: 's' },
    { id: 24, url: 'assets/img/24.jpg', keywords: ['funny', 'cat'], size: 'xxs' },
    { id: 25, url: 'assets/img/25.jpg', keywords: ['funny', 'cat'], size: 'xxs' },
    { id: 26, url: 'assets/img/26.jpg', keywords: ['funny', 'cat'], size: 'm' },
]

function getImgForDisplay() {
    return gMemesImgs
}

function getImgUrlById(imgId) {
    const memeImg = gMemesImgs.find(meme => meme.url.includes(`img/${imgId}.jpg`))
    return memeImg.url
}