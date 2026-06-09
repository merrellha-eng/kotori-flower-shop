const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const gallery = document.querySelector(".gallery");
const galleryQuery = window.matchMedia("(max-width: 900px)");
let gallerySwiper = null;

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    });
  });
}

function updateGallerySwiper() {
  if (!gallery || typeof Swiper === "undefined") {
    return;
  }

  if (galleryQuery.matches && !gallerySwiper) {
    gallerySwiper = new Swiper(gallery, {
      slidesPerView: 1,
      spaceBetween: 12,
      loop: true,
      loopAdditionalSlides: 1,
      speed: 1000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      grabCursor: true,
      navigation: {
        nextEl: ".gallery .gallery-button-next",
        prevEl: ".gallery .gallery-button-prev",
      },
      breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
      },
    });
  }

  if (!galleryQuery.matches && gallerySwiper) {
    gallerySwiper.destroy(false, true);
    gallerySwiper = null;
  }
}

updateGallerySwiper();
galleryQuery.addEventListener("change", updateGallerySwiper);
