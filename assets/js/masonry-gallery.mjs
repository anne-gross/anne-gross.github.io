customElements.define("masonry-gallery", class extends HTMLElement {
    connectedCallback() {
        imagesLoaded(this, createGallery.bind(this));
    }
});

function createGallery() {
    const pictures = this.querySelectorAll("picture");
    this.classList.add("gallery");
    this.classList.add("gallery--grid");

    const galleryWrap = wrapGallery(pictures);
    this.appendChild(galleryWrap);

    var masonry = new Masonry(galleryWrap, {
        itemSelector: '.gallery__item',
        transitionDuration: 0
    });

    refreshFsLightbox();
}

function wrapGallery(pictures) {
    const galleryWrap = document.createElement("div");
    galleryWrap.classList.add("gallery__wrap");
    pictures.forEach(picture => galleryWrap.appendChild(wrapPicture(picture)));

    return galleryWrap;
}

function wrapPicture(picture) {
    const img = picture.querySelector("img");

    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery__item");

    const galleryLink = document.createElement("a");
    galleryLink.classList.add("gallery__item__link");
    galleryLink.setAttribute("data-fslightbox", "");
    galleryLink.setAttribute("href", img.attributes["src"].value);

    galleryLink.appendChild(picture);
    galleryItem.appendChild(galleryLink);

    return galleryItem;
}