const imageObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.unobserve(img);
          });
        },
        {
          rootMargin: "200px",
          threshold: 0.01,
        }
      )
    : null;

function observeImage(img) {
  img.addEventListener(
    "load",
    () => {
      img.classList.add("loaded");
    },
    { once: true }
  );

  if (!imageObserver) {
    img.src = img.dataset.src;
    return;
  }

  imageObserver.observe(img);
}

function preloadImage(src) {
  if (!src) return;

  const image = new Image();
  image.src = src;
}

globalThis.observeImage = observeImage;
globalThis.preloadImage = preloadImage;