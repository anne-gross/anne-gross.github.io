import { randomId } from "shared-kernel";

customElements.define("image-lightbox", class extends HTMLElement {
    connectedCallback() {
        document.addEventListener('DOMContentLoaded', createLightbox.bind(this));
    }
});

function createLightbox() {
    const img = this.querySelector("img");
    const lightboxId = this.getAttribute("lightbox-id") ?? randomId();
    const title = img.getAttribute("title");
    this.removeAttribute("lightbox-id");
    
    const lightboxLink = wrapImage(img, lightboxId, title);
    this.appendChild(lightboxLink);
}

function wrapImage(img, lightboxId, title) {
  const lightboxLink = document.createElement("a");
  lightboxLink.setAttribute("data-lightbox", lightboxId);
  if(title)
    lightboxLink.setAttribute("data-title", title);
  lightboxLink.style = "border-bottom: none";
  lightboxLink.setAttribute("href", img.attributes["src"].value);
  lightboxLink.appendChild(img);
  return lightboxLink;
}