import { randomId } from "shared-kernel";

import Glide from "@glidejs/glide";

customElements.define(
  "glider-gallery",
  class extends HTMLElement {
    connectedCallback() {
      imagesLoaded(this, createGallery.bind(this));
    }
  }
);

function createGallery() {
  const lightboxId = this.getAttribute("lightbox-id") ?? randomId();
  this.removeAttribute("lightbox-id");
  const perViewMax = this.getAttribute("per-view-max") ?? 4;
  const perViewXsmall = this.getAttribute("per-view-xsmall") ?? 2;//480
  const perViewSmall = this.getAttribute("per-view-small") ?? 1; //768

  const images = this.querySelectorAll("img");
  const gallery = wrapGallery(images, lightboxId);
  this.appendChild(gallery);

  const glide = new Glide(gallery, {
    type: "carousel",
    perView: perViewMax,
    focusAt: "center",
    breakpoints: {
      768: {
        perView: perViewXsmall,
      },
      480: {
        perView: perViewSmall,
      },
    },
  });
  glide.mount();
}

function wrapGallery(images, lightboxId) {
  const glide = document.createElement("div");
  glide.classList.add("glide");

  const glideTrack = document.createElement("div");
  glideTrack.classList.add("glide__track");
  glideTrack.setAttribute("data-glide-el", "track");
  glide.appendChild(glideTrack);

  const glideSlides = document.createElement("ul");
  glideSlides.classList.add("glide__slides");
  glideTrack.appendChild(glideSlides);

  images.forEach(img => glideSlides.appendChild(wrapImage(img, lightboxId)));

  const glideBullets = document.createElement("div");
  glideBullets.classList.add("glide__bullets");
  glideBullets.setAttribute("data-glide-el", "controls[nav]");
  glide.appendChild(glideBullets);

  images.forEach((_, index) => {
    glideBullets.appendChild(createBullet(index));
  });

  return glide;
}

function wrapImage(img, lightboxId) {
  const slide = document.createElement("li");
  slide.classList.add("glide__slide");

  const title = img.getAttribute("title");
  const lightboxLink = document.createElement("a");
  lightboxLink.setAttribute("data-lightbox", lightboxId);
  if(title)
    lightboxLink.setAttribute("data-title", title);
  lightboxLink.style = "border-bottom: none";
  lightboxLink.setAttribute("href", img.attributes["src"].value);
  lightboxLink.appendChild(img);
  slide.appendChild(lightboxLink);

  return slide;
}

function createBullet(index) {
  const bullet = document.createElement("button");
  bullet.classList.add("glide__bullet");

  return bullet;
}