export class Carousel {
  constructor(carouselElement) {
    this.carouselBox = carouselElement.querySelector(".carousel__box");
    this.slides = carouselElement.querySelectorAll(".slide");
    this.nextBtn = carouselElement.querySelector(".btn-next");
    this.prevBtn = carouselElement.querySelector(".btn-prev");
    this.currentIndex = 0;
    this.prevIndex = null;
    this.slideStep = this.slides[1].getBoundingClientRect().x;
    this.init();
  }

  init() {
    this.prevBtn.addEventListener("click", this.prevSlide.bind(this));
    this.nextBtn.addEventListener("click", this.nextSlide.bind(this));

    this.handleResize();

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 200);
    });
  }

  nextSlide() {
    this.prevIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;

    this.carouselBox.classList.add("active");
    this.carouselBox.style.transform = `translateX(-${this.slideStep}px)`;

    setTimeout(() => {
      this.carouselBox.appendChild(this.slides[this.prevIndex]);
      this.carouselBox.classList.remove("active");
      this.carouselBox.style.transform = "";
    }, 500);
  }

  prevSlide() {
    this.prevIndex = this.currentIdex;
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.carouselBox.style.transform = `translateX(-${this.slideStep}px)`;
    this.carouselBox.insertBefore(
      this.slides[this.currentIndex],
      this.carouselBox.firstChild
    );

    setTimeout(() => {
      this.carouselBox.style.transform = "";
      this.carouselBox.classList.add("active");
    }, 10);

    setTimeout(() => {
      this.carouselBox.classList.remove("active");
    }, 490);
  }

  handleResize() {
    this.slideStep = this.slides[1].getBoundingClientRect().x;

    const slideImg = document.querySelector(".slide__img");
    const imgHeight = slideImg.offsetHeight;

    this.nextBtn.style.top = `${imgHeight / 2}px`;
    this.prevBtn.style.top = `${imgHeight / 2}px`;
    this.nextBtn.style.right = `${imgHeight / 2}px`;
    this.prevBtn.style.left = `${imgHeight / 2}px`;
    this.nextBtn.style.transform = `translate(50%,-50%)`;
    this.prevBtn.style.transform = `translate(-50%,-50%)`;
  }
}
