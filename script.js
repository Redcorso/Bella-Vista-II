const galleryItems = [
  {
    src: "assets/fachada.png",
    alt: "Fachada iluminada do Residencial Bella Vista II",
    caption: "Fachada contemporânea com iluminação cênica e presença urbana.",
  },
  {
    src: "assets/piscina-aerea.png",
    alt: "Vista aérea da área de lazer",
    caption: "Implantação do lazer com piscina, deck e paisagismo privativo.",
  },
  {
    src: "assets/deck-piscina.png",
    alt: "Deck gourmet integrado à piscina",
    caption: "Deck gourmet integrado à área social da residência.",
  },
  {
    src: "assets/lazer-piscina.png",
    alt: "Lounge externo com piscina",
    caption: "Lounge externo com iluminação quente e atmosfera sofisticada.",
  },
  {
    src: "assets/espaco-gourmet.png",
    alt: "Espaço gourmet com pergolado",
    caption: "Espaço gourmet com pergolado, bancada e área de convivência.",
  },
  {
    src: "assets/piscina-jardim.png",
    alt: "Piscina com jardim e cascata",
    caption: "Piscina com cascata, jardim e acabamento de alto padrão.",
  },
  {
    src: "assets/area-externa.png",
    alt: "Área externa conectada ao living",
    caption: "Área externa conectada ao living para receber com conforto.",
  },
];

const progressBar = document.querySelector(".scroll-progress");
const revealElements = document.querySelectorAll(".reveal");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");
const nextButton = document.querySelector(".lightbox-nav.next");
const prevButton = document.querySelector(".lightbox-nav.prev");
let activeGalleryIndex = 0;

// Atualiza a barra superior para dar ritmo de apresentação ao rolar.
function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

// Anima seções quando entram no viewport.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element) => revealObserver.observe(element));

function renderLightbox(index) {
  activeGalleryIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeGalleryIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.caption;
}

function openLightbox(index) {
  renderLightbox(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-gallery]").forEach((button) => {
  button.addEventListener("click", () => {
    openLightbox(Number(button.dataset.gallery));
  });
});

nextButton.addEventListener("click", () => renderLightbox(activeGalleryIndex + 1));
prevButton.addEventListener("click", () => renderLightbox(activeGalleryIndex - 1));
closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") renderLightbox(activeGalleryIndex + 1);
  if (event.key === "ArrowLeft") renderLightbox(activeGalleryIndex - 1);
});

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();
