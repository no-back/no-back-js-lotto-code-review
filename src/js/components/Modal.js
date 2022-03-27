import { $ } from "../utils/dom.js";

export default class Modal {
  constructor() {
    this.$modalClose = $(".modal-close");
    this.$modal = $(".modal");
    this.$resultReset = $(".result-reset");

    this.$modalClose.addEventListener("click", () => this.onModalClose());
    // this.$resultReset.addEventListener("click", () => this.initLottoApp());
  }
  onModalShow() {
    this.$modal.classList.add("open");
  }

  onModalClose() {
    this.$modal.classList.remove("open");
  }
}
