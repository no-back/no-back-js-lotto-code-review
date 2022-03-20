import { $showResultButton, $modalClose, $modal } from "../dom.js";

export default class Modal {
  onModalShow() {
    $modal.classList.add("open");
  }

  onModalClose() {
    $modal.classList.remove("open");
  }

  init() {
    $showResultButton.addEventListener("click", onModalShow);
    $modalClose.addEventListener("click", onModalClose);
  }
}
