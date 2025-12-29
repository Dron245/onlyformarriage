import "./main.min.js";
import "./common.min.js";
document.addEventListener("DOMContentLoaded", () => {
  const BREAKPOINT = 900;
  const DEBOUNCE_DELAY = 150;
  let resizeTimeout;
  function debounce(fn) {
    return () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(fn, DEBOUNCE_DELAY);
    };
  }
  function moveImgData() {
    document.querySelectorAll(".questionnaires__slide").forEach((slide) => {
      const imgData = slide.querySelector(".questionnaires__img-data");
      const content = slide.querySelector(".questionnaires__top-slide");
      if (!imgData || !content) return;
      if (!imgData.dataset.originSaved) {
        imgData._originalParent = imgData.parentNode;
        imgData._originalNext = imgData.nextElementSibling;
        imgData.dataset.originSaved = "true";
      }
      if (window.innerWidth <= BREAKPOINT) {
        if (!content.contains(imgData)) {
          content.prepend(imgData);
        }
      } else {
        if (content.contains(imgData)) {
          if (imgData._originalNext) {
            imgData._originalParent.insertBefore(
              imgData,
              imgData._originalNext
            );
          } else {
            imgData._originalParent.append(imgData);
          }
        }
      }
    });
  }
  moveImgData();
  window.addEventListener("resize", debounce(moveImgData));
});
