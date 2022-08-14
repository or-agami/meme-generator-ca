'use strict'

var gKeywordsSearch = []
var gFilterBy = ''
var gUploadFromLocalImgUrl = `assets/img/upload.png`
var gMemesImgs = [
    { id: 1, url: 'assets/img/1.jpg', keywords: ['serious', 'tramp', 'politicians', 'angry', 'רציני', 'טראמפ', 'פוליקאי', 'עצבני'], size: 'xs' },
    { id: 2, url: 'assets/img/2.jpg', keywords: ['together', 'sweet', 'dog', 'cute', 'ביחד', 'חמוד', 'כלב', 'מתוק'], size: 'xxs' },
    { id: 3, url: 'assets/img/3.jpg', keywords: ['together', 'baby', 'sleep', 'cute', 'sweet', 'dog', 'ביחד', 'תינוק', 'ישן', 'ישנים'], size: 's' },
    { id: 4, url: 'assets/img/4.jpg', keywords: ['computer', 'pc', 'sleep', 'cute', 'sweet', 'cat', 'מחשב', 'ישן', 'חמוד', 'מתוק', 'חתול'], size: 'xxs' },
    { id: 5, url: 'assets/img/5.jpg', keywords: ['funny', 'victory', 'baby', 'boy', 'yes', 'yeah', 'win', 'מצחיק', 'ניצחון', 'ילד', 'תינוק', 'יש', 'ניצחתי'], size: 'xxs' },
    { id: 6, url: 'assets/img/6.jpg', keywords: ['history', 'ancient', 'aliens', 'professor', 'explain', 'it is like that', 'it\'s like that', 'זה ככה', 'זה ממש ככה', 'הסבר'], size: 'xs' },
    { id: 7, url: 'assets/img/7.jpg', keywords: ['funny', 'baby', 'shock', 'see', 'happy', 'realize', 'מצחיק', 'תינוק', 'שוק', 'שמע', 'הלם', 'בהלם'], size: 'xs' },
    { id: 8, url: 'assets/img/8.jpg', keywords: ['funny', 'hat', 'hear', 'listen', 'talk', 'too much', 'מצחיק', 'מקשיב', 'חופר', 'מדבר יותר מידי'], size: 's' },
    { id: 9, url: 'assets/img/9.jpg', keywords: ['funny', 'baby', 'laughing', 'planning', 'plan', 'mean', 'evil', 'laugh', 'מצחיק', 'תינוק', 'צוחק', 'מתכנן', 'רשע', 'רע', 'צוחק'], size: 'xxs' },
    { id: 10, url: 'assets/img/10.jpg', keywords: ['politicians', 'obama', 'us', 'america', 'laugh', 'laughing', 'funny', 'פוליטיקאי', 'אובמה', 'מצחיק', 'צוחק', 'נקרע מצחוק'], size: 'xs' },
    { id: 11, url: 'assets/img/11.jpg', keywords: ['kiss', 'kissing', 'fight', 'love', 'levers', 'wrestling', 'fighting', 'נשיקה', 'מתנשקים', 'התאבקות', 'קרב', 'ריב'], size: 'xs' },
    { id: 12, url: 'assets/img/12.jpg', keywords: ['what', 'you', 'would', 'told', 'now', 'understand', 'see', 'what you would do', 'עשית', 'מה', 'אמרתי לך', 'מבין', 'רואה', 'מה אתם הייתם עושים'], size: 'xs' },
    { id: 13, url: 'assets/img/13.jpg', keywords: ['funny', 'leonardo', 'wine', 'champagne', 'told you', 'good', 'מצחיק', 'צוחק', 'לאונרדו', 'יין', 'שמפנייה', 'אמרתי לך', 'טוב'], size: 'xxs' },
    { id: 14, url: 'assets/img/14.jpg', keywords: ['matrix', 'shock', 'wondering', 'see', 'מטריקס', 'שוק', 'בשוק', 'הלם', 'בהלם', 'תוהה', 'לא מבין', 'לא הבנתי'], size: 'xs' },
    { id: 15, url: 'assets/img/15.jpg', keywords: ['one does not simply', 'one does\'nt simply', 'movie', 'אי אפשר פשוט', 'לא ייתכן'], size: 'xxxs' },
    { id: 16, url: 'assets/img/16.jpg', keywords: ['star trek', 'patrick', 'laugh', 'laughing', 'funny', 'see', 'embarrassing', 'מסע בין כוכבים', 'פטריק', 'צוחק', 'מובך', 'מביך', 'מצחיק'], size: 'xxs' },
    { id: 17, url: 'assets/img/17.jpg', keywords: ['putin', 'scary', 'russia', 'explain', 'פוטין', 'מפחיד', 'פוליטיקאי', 'הסבר'], size: 'xxs' },
    { id: 18, url: 'assets/img/18.jpg', keywords: ['everywhere', 'everything will be yours', 'funny', 'כל זה שלך', 'מצחיק'], size: 'xxs' },
    { id: 19, url: 'assets/img/19.jpg', keywords: ['alone', 'fine', 'but', 'not', 'dance', 'לבד', 'כיף', 'ריקוד'], size: 'xxxs' },
    { id: 20, url: 'assets/img/20.jpg', keywords: ['oprah', 'you have got', 'you\'ve got', 'אופרה', 'קיבלת', 'קיבלתם'], size: 'xxs' },
    { id: 21, url: 'assets/img/21.jpg', keywords: ['no', 'what are you doing', 'shock', 'לא', 'מה עשית', 'מה אתה עושה', 'הלם', 'בהלם'], size: 'xxs' },
    { id: 22, url: 'assets/img/22.jpg', keywords: ['drevil', 'funny', 'sure', 'sarcasm', 'מצחיק', 'ציני', 'סרקזם', 'כן בטח', 'ברור'], size: 'xxxs' },
    { id: 23, url: 'assets/img/23.jpg', keywords: ['funny', 'dancing', 'happy', 'מצחיק', 'כיף', 'שמח', 'שמחים', 'רוקדים', 'ריקוד'], size: 'xxs' },
    { id: 24, url: 'assets/img/24.jpg', keywords: ['serious', 'told you', 'tramp', 'politicians', 'angry', 'אמרתי לך', 'רציני', 'טראמפ', 'פוליטיקאי', 'כועס'], size: 'xxs' },
    { id: 25, url: 'assets/img/25.jpg', keywords: ['funny', 'dog', 'painful', 'מצחיק', 'כלב', 'כואב'], size: 'xxs' },
]

function initGalleryService() {
    gMemesImgs.map(memeImg => memeImg.keywords.forEach(keyword => {
        if (!gKeywordsSearch.includes(keyword)) gKeywordsSearch.push(keyword)
    }))
}

function getImgUrlById(imgId) {
    const memeImg = gMemesImgs.find(meme => meme.id === imgId)
    return memeImg.url
}

function getUploadFromLocalImgUrl() {
    return gUploadFromLocalImgUrl
}

function setImgFromInput(img) {
    const nextId = gMemesImgs[gMemesImgs.length - 1].id + 1
    const url = img.src
    gMemesImgs.push({ id: nextId, url })
}

function setFilterBy(keyword) {
    gFilterBy = keyword
}

function getImgForDisplay() {
    if (gFilterBy === '') return gMemesImgs
    return gMemesImgs.filter(memeImg => (memeImg.keywords.join(' ').includes(gFilterBy.toLowerCase()))
        || (memeImg.keywords.includes(gFilterBy.toLowerCase)))
}

function autocompleteMatch(input) {
    if (input == '') return []
    let reg = new RegExp(input)
    return gKeywordsSearch.filter((term) => {
        if (term.match(reg)) return term
    })
}