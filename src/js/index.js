import { DisclosureNav } from "./DisclosureNav.js";
import { Toggleable } from "./Toggleable.js";
import { Modal } from "./Modal.js";
import { initTimer } from "./timer.js";
import { Tabs } from "./Tabs.js";
import { setupCarouselHighlighting } from "./scrollHightlight.js";
import { Carousel } from "./Carousel.js";
import AOS from "aos";
import "aos/dist/aos.css";

const initUI = () => {
  const navBox = document.getElementById("nav-box");
  const timerContainer = document.getElementById("timer");
  const modalVideo = document.getElementById("modal-video");
  const tabLists = document.querySelector(".events__tablist");

  setupCarouselHighlighting("carousel-scroll", ".testimonials__item", "active");

  if (modalVideo) {
    new Toggleable(modalVideo, {
      triggerSelector: "[data-trigger]",
      activeTargetElementClass: "is_active",
      activeTriggerClass: "is_active",
    });
  }

  if (navBox) {
    new Toggleable(navBox, {
      triggerSelector: "[data-trigger]",
      activeTargetElementClass: "is_active",
      activeTriggerClass: "is_active",
    });
  }

  if (timerContainer) {
    initTimer(
      { days: 43, hours: 23, minutes: 59, seconds: 59 },
      timerContainer
    );
  }

  AOS.init();

  new Modal("modalBackdrop", "openModalBtn", "closeModalBtn", "modalVideo");

  const menu = document.querySelector(".disclosure-nav");

  if (menu) {
    new DisclosureNav(menu);
  }

  new Tabs(tabLists);

  const cleanupCarousel = setupCarouselHighlighting(
    "carousel-scroll",
    ".testimonials__item",
    "active"
  );

  const carousel = document.querySelector(".carousel");
  new Carousel(carousel);

  // [...document.querySelectorAll("*")].forEach((el) => {
  //   el.style.outline = "1px solid #c45";
  // });
  const copy = document.querySelector(".logos-slide").cloneNode(true);
  document.querySelector(".logos").appendChild(copy);
};

document.addEventListener("DOMContentLoaded", initUI);
