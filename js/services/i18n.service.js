const LANG_STORAGE_KEY = 'user-lang'
const gTrans = {
  'gallery': {
    en: 'Gallery',
    he: 'ספרייה'
  },
  'memes': {
    en: 'Memes',
    he: 'ממים'
  },
  'about': {
    en: 'About',
    he: 'אודות'
  },
  'search-by-keywords': {
    en: 'Search By Keywords',
    he: 'חיפוש לפי מילות מפתח'
  },
  'back-to-gallery': {
    en: 'Back to gallery',
    he: 'חזרה לגלריה'
  },
  'edit-text-lines': {
    en: 'Edit Text Lines',
    he: 'ערוך שורות טקסט'
  },
  'switch-line': {
    en: 'Switch Line',
    he: 'החלפת שורה'
  },
  'add-line': {
    en: 'Add Line',
    he: 'הוספת שורה'
  },
  'save-meme': {
    en: 'Save Meme',
    he: 'שמירת מם'
  },
  'download-meme': {
    en: 'Download Meme',
    he: 'הורדת מם'
  },
  'share-meme-to-facebook': {
    en: 'Share Meme To Facebook',
    he: 'שיתוף לפייסבוק'
  },
  'delete-line': {
    en: 'Delete Line',
    he: 'מחיקת שורה'
  },
  'move-up': {
    en: 'Move Up',
    he: 'הזז למעלה'
  },
  'move-down': {
    en: 'Move Down',
    he: 'הזז למטה'
  },
  'increase-size': {
    en: 'Increase Size',
    he: 'הגדל טקסט'
  },
  'decrease-size': {
    en: 'Decrease Size',
    he: 'הקטן טקסט'
  },
  'align-left': {
    en: 'Align Left',
    he: 'יישר שמאלה'
  },
  'align-center': {
    en: 'Align Center',
    he: 'יישר למרכז'
  },
  'align-right': {
    en: 'Align Right',
    he: 'יישר ימינה'
  },
  'text-color': {
    en: 'Text Color',
    he: 'צבע טקסט'
  },
  'stroke-color': {
    en: 'Stroke Color',
    he: 'צבע מסגרת:'
  },
  'enter-text': {
    en: 'Enter Text',
    he: 'הכנס טקסט'
  },
}

var gUserLang = 'en'

function initI18nService() {
  setLang()
  document.body.classList = gUserLang
  document.querySelector('.lang-select').value = gUserLang
}

function setLang(lang) {
  if (!lang) {
    lang = _loadLangFromStorage()
    if (!lang) lang = 'en'
  }
  gUserLang = lang
  _saveLangToStorage()
}

function getLang() {
  return gUserLang
}

function transDocument() {
  const elsText = document.querySelectorAll('[data-texttrans]')
  elsText.forEach(el => {
    el.innerText = gTrans[el.dataset.texttrans][gUserLang]
  })
  const elsPlaceholder = document.querySelectorAll('[data-placeholdertrans]')
  elsPlaceholder.forEach(el => {
    el.placeholder = gTrans[el.dataset.placeholdertrans][gUserLang]
  })
  const elsTitle = document.querySelectorAll('[data-titletrans]')
  elsTitle.forEach(el => {
    el.title = gTrans[el.dataset.titletrans][gUserLang]
  })

}

function _loadLangFromStorage() {
  return loadFromStorage(LANG_STORAGE_KEY)
}

function _saveLangToStorage() {
  saveToStorage(LANG_STORAGE_KEY, gUserLang)
}