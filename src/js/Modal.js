export class Modal {
  constructor(modalId, openBtnId, closeBtnId, videoId = null) {
    this.modal = document.getElementById(modalId);
    this.openBtn = document.getElementById(openBtnId);
    this.closeBtn = document.getElementById(closeBtnId);
    this.video = videoId ? document.getElementById(videoId) : null;

    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.initEvents();
  }

  initEvents() {
    this.openBtn.addEventListener("click", this.openModal);
    this.closeBtn.addEventListener("click", this.closeModal);
    this.modal.addEventListener("click", this.handleBackdropClick);
  }

  openModal() {
    this.modal.classList.add("open");
    this.modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", this.handleKeydown);

    if (this.video) {
      this.video
        .play()
        .catch((error) =>
          console.warn(
            "ModalController: Не вдалося автоматично відтворити відео.",
            error
          )
        );
      this.video.setAttribute("tabindex", "-1");
      this.video.focus();
    } else {
      this.modal.setAttribute("tabindex", "-1");
      this.modal.focus();
    }
  }

  closeModal() {
    if (!this.modal.classList.contains("open")) return;

    this.modal.classList.remove("open");
    this.modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", this.handleKeydown);

    if (this.video) {
      this.video.pause();
      this.video.currentTime = 0;
    }

    this.modal.removeAttribute("tabindex");
    if (this.openBtn) {
      this.openBtn.focus();
    }
  }

  handleBackdropClick(event) {
    if (event.target === this.modal) {
      this.closeModal();
    }
  }

  handleKeydown(event) {
    if (event.key === "Escape") {
      this.closeModal();
    }
    if (event.code === "Space") {
      event.preventDefault();
      this.toggleVideoPlayback();
    }
  }
}
