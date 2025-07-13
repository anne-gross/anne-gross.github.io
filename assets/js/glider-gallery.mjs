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
    const lightboxId = this.getAttribute("lightbox-id");
    this.removeAttribute("lightbox-id");
    const images = this.querySelectorAll("img");
    const gallery = wrapGallery(images, lightboxId);
    this.appendChild(gallery);
  
    const glide = new Glide(gallery, {
      type: "carousel",
      perView: 4,
      focusAt: "center",
      breakpoints: {
        800: {
          perView: 2,
        },
        480: {
          perView: 1,
        },
      },
    });
    glide.mount();

    refreshFsLightbox();
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
  
    const lightboxLink = document.createElement("a");
    lightboxLink.setAttribute("data-fslightbox", lightboxId);
    lightboxLink.style = "border-bottom: none";
    lightboxLink.setAttribute("href", img.attributes["src"].value);
    lightboxLink.appendChild(img);
    slide.appendChild(lightboxLink);
  
    return slide;
  }
  
  function createBullet(index) {
    const bullet = document.createElement("button");
    bullet.classList.add("glide__bullet");
    bullet.setAttribute("data-fslightbox", `=${index}`);
  
    return bullet;
  }