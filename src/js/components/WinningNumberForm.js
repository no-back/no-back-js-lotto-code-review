import { $, $$ } from "../dom.js";
import Modal from "./Modal.js";
export default class WinningNumberForm {
  constructor() {
    this.$winningNumberForm = $("#winning-number-form");
    this.$openResultModalButton = $(".open-result-modal-button");
    this.initEventListener();
  }

  initEventListener() {
    this.$winnigNumbers = $(".winning-number"); // inputs
    this.$winningNumberContainer = $("#winning-numbers-container");

    this.$winningNumberForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.showWinningResultModal();
    });
    this.$winningNumberContainer.addEventListener("input", (e) => {
      // TODO : input 클릭 후 입력 시 preventDefault()
      // validate 함수 분리
      if (e.target.value.length >= e.target.maxLength) {
        e.preventDefault(); // check
        e.target.nextElementSibling === null
          ? $(".bonus-number").focus()
          : e.target.nextElementSibling.focus();
      }
    });
  }
  showWinningResultModal() {
    const WinningResultModal = new Modal();
    WinningResultModal.onModalShow();
  }
}
