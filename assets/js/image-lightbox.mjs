import { randomId } from "shared-kernel";

customElements.define("image-lightbox", class extends HTMLElement {
    connectedCallback() {
        imagesLoaded(this, createLightbox.bind(this));
    }
});

function createLightbox() {
    const img = this.querySelector("img");
    const lightboxId = this.getAttribute("lightbox-id") ?? randomId();
    this.removeAttribute("lightbox-id");
    
    const lightboxLink = wrapImage(img, lightboxId);
    this.appendChild(lightboxLink);

    refreshFsLightbox();
}

function wrapImage(img, lightboxId) {
  const lightboxLink = document.createElement("a");
  lightboxLink.setAttribute("data-fslightbox", lightboxId);
  lightboxLink.style = "border-bottom: none";
  lightboxLink.setAttribute("href", img.attributes["src"].value);
  lightboxLink.appendChild(img);
  return lightboxLink;
}