import { $ } from "../dom.js";

export default class Modal {
  constructor() {
    this.$modalClose = $(".modal-close");
    this.$modal = $(".modal");

    this.$modalClose.addEventListener("click", () => this.onModalClose());
  }
  onModalShow() {
    this.$modal.classList.add("open");
  }

  onModalClose() {
    this.$modal.classList.remove("open");
  }
}
