import { randomId } from "shared-kernel";

customElements.define("masonry-gallery", class extends HTMLElement {
    connectedCallback() {
        imagesLoaded(this, createGallery.bind(this));
    }
});

function createGallery() {
    const lightboxId = this.getAttribute("lightbox-id") ?? randomId();

    const pictures = this.querySelectorAll("picture");
    this.classList.add("gallery");
    this.classList.add("gallery--grid");

    const galleryWrap = wrapGallery(pictures, lightboxId);
    this.appendChild(galleryWrap);

    var masonry = new Masonry(galleryWrap, {
        itemSelector: '.gallery__item',
        transitionDuration: 0
    });
}

function wrapGallery(pictures, lightboxId) {
    const galleryWrap = document.createElement("div");
    galleryWrap.classList.add("gallery__wrap");
    pictures.forEach(picture => galleryWrap.appendChild(wrapPicture(picture, lightboxId)));

    return galleryWrap;
}

function wrapPicture(picture, lightboxId) {
    const img = picture.querySelector("img");
    const title = img.getAttribute("title");

    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery__item");

    const lightboxLink = document.createElement("a");
    lightboxLink.classList.add("gallery__item__link");
    lightboxLink.setAttribute("data-lightbox", lightboxId);
    if(title)
        lightboxLink.setAttribute("data-title", title);
    lightboxLink.setAttribute("href", img.attributes["src"].value);

    lightboxLink.appendChild(picture);
    galleryItem.appendChild(lightboxLink);

    return galleryItem;
}