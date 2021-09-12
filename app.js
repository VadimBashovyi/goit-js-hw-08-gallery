import galleryItems from './refs.js'
// получаемо доступ
const imgGallery = document.querySelector(`ul.js-gallery`)
const modalWindow = document.querySelector(`.js-lightbox`)
const modalImg = document.querySelector(`img.lightbox__image`)

// *
imgGallery.insertAdjacentHTML('afterbegin', createImgGallery(galleryItems))
imgGallery.addEventListener('click', clickGalleryImg)

function createImgGallery(el) {
  return el
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a class="gallery__link" href = "${original}">
    <img class="gallery__image" src="${preview}" data-source="${original}"  alt="${description}"/></a></li>`
    })
    .join('')
}

modalWindow.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('lightbox__overlay') ||
    e.target.dataset.action === 'close-lightbox'
  ) {
    closeModalImg()
  }
  if (
    e.target.classList.contains('lightbox__image') ||
    e.target.dataset.type === 'swaipe-left'
  ) {
    onLeftClickBtn()
  }
  if (e.target.dataset.type === 'swaipe-right') {
    onRightClickBtn()
  }
})

function modalSrc(src, alt) {
  modalImg.src = src
  modalImg.alt = alt
}

function clickGalleryImg(element) {
  window.addEventListener('keydown', onClickEsc)
  window.addEventListener('keydown', onPressArrowLeft)
  window.addEventListener('keydown', onPressArrowRight)
  if (!element.target.classList.contains('gallery__image')) return
  element.preventDefault()
  modalWindow.classList.add('is-open')
  modalSrc(element.target.dataset.source, element.target.alt)
}

function closeModalImg(e) {
  window.removeEventListener('keydown', onPressArrowLeft)
  window.removeEventListener('keydown', onPressArrowRight)
  window.removeEventListener('keydown', onClickEsc)
  modalWindow.classList.remove('is-open')
  modalSrc('', '')
}

function onClickEsc(event) {
  if (event.code === 'Escape') {
    closeModalImg()
  }
}
// swaipe

// const swaipeLeftImg = document.querySelector('.lightbox__swaipe-left')
// const swaipeRightImg = document.querySelector('.lightbox__swaipe-right')

// function onLeftClickBtn(event) {
//   for (let i = 0; i < galleryItems.length; i += 1) {
//     if (modalImg.src === galleryItems[i].original) {
//       let swaipeNextImgGallery = i + 1
//       if (swaipeNextImgGallery > galleryItems.length - 1)
//         swaipeNextImgGallery = 0
//     }
//     modalImg.src = galleryItems[swaipeNextImgGallery].original
//     return
//   }
// }

// function onRightClickBtn(event) {
//   for (let i = 0; i < galleryItems.length; i += 1) {
//     if (modalImg.src === galleryItems[i].original) {
//       let swaipeNextImgGallery = i - 1
//       if (swaipeNextImgGallery < 0) {
//         swaipeNextImgGallery = galleryItems.length - 1
//       }
//     }
//     modalImg.src = galleryItems[swaipeNextImgGallery].original
//     return
//   }
// }
// *
function indexImgGallery(src) {
  return galleryItems.indexOf(galleryItems.find((el) => el.original === src))
}

function onLeftClickBtn() {
  let isIndexImgNew = indexImgGallery(modalImg.getAttribute('src'))
  if (isIndexImgNew === galleryItems.length - 1) isIndexImgNew = -1
  modalSrc(
    galleryItems[isIndexImgNew + 1].original,
    galleryItems[isIndexImgNew + 1].description,
  )
}

function onRightClickBtn() {
  let isIndexImgNew = indexImgGallery(modalImg.getAttribute('src'))
  if (isIndexImgNew == 0) isIndexImgNew = galleryItems.length
  modalSrc(
    galleryItems[isIndexImgNew - 1].original,
    galleryItems[isIndexImgNew - 1].description,
  )
}

function onPressArrowLeft(event) {
  if (event.code === 'ArrowLeft') {
    onLeftClickBtn()
  }
}
function onPressArrowRight(event) {
  if (event.code === 'ArrowRight') {
    onRightClickBtn()
  }
}
