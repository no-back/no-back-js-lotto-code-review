import { WINNING_NUMBER_CHECK_MESSAGE } from "../utils/constants.js";
import { $, $$ } from "../utils/DOM.js";

export default class WinningNumberInput {
  constructor({ updateWinningNumber, onShowModal }) {
    this.$winningNumberForm = $(".winning-number-form");
    this.$winningNumberInputs = $$("winning-number");
    this.$bonusNumberInput = $(".bonus-number");
    this.$winningNumberCheckMessage = $(".winning-number-check-message");
    this.$openResultModalButton = $(".open-result-modal-button");

    this.isFulfilled = false;
    this.winningNumber = {};
    this.checkMessage = "";
    this.updateWinningNumber = updateWinningNumber;
    this.onShowModal = onShowModal;
    this.init();
  }

  
}

const hasReduplicatedElement = (list) => {
  return new Set(list).size !== list.length;
};
