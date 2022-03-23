export default class Modal {
  constructor() {
    this.$showResultButton = $(".open-result-modal-button");
    this.$modalClose = $(".modal-close");
    this.$modal = $(".modal");
  }
  onModalShow() {
    this.$modal.classList.add("open");
  }

  onModalClose() {
    this.$modal.classList.remove("open");
  }

  init() {
    this.$showResultButton.addEventListener("click", onModalShow);
    this.$modalClose.addEventListener("click", onModalClose);
  }
}
