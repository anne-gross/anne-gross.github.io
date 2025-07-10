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
    const glide = new Glide(".glide", {
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
  }
  