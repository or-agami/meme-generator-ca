'use strict'

function toggleNav(elOpenNavBtn) {
    const elMainNav = document.querySelector('.main-nav')
    elMainNav.classList.toggle('main-nav-open')
    elOpenNavBtn.classList.toggle('is-open')
    document.body.classList.toggle('main-nav-open')
}