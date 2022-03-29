import {
  WINNING_NUMBER_CHECK_MESSAGE,
  WINNING_NUMBER_LENGTH,
} from "../utils/constants.js";
import { $, $$, disable, enable } from "../utils/DOM.js";

export default class WinningNumberInput {
  constructor({ updateWinningNumber, onShowModal }) {
    this.$winningNumberForm = $(".winning-number-form");
    this.$winningNumberInputList = $$(".winning-number");
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

  init() {
    this.$winningNumberForm.addEventListener(
      "keyup",
      this.onChangeWinningNumberInput.bind(this)
    );
    this.$openResultModalButton.addEventListener("submit", (e) => {
      e.preventDefault();
      this.onShowModal.bind(this);
    });
  }

  onChangeWinningNumberInput(e) {
    if (e.target.type != "number") return;

    const { winningNumbers, bonusNumber } = {
      winningNumbers: [
        ...e.currentTarget.querySelectorAll(".winning-number"),
      ].map(($input) => $input.value),
      bonusNumber: e.currentTarget.querySelector(".bonus-number").value,
    };

    const { isFulfilled, checkMessage } = this.validateWinningNumber(
      [...winningNumbers, bonusNumber].filter((v) => v !== "").map((v) => +v)
    );
    this.setState({ isFulfilled, checkMessage });

    if (!this.isFulfilled) return;

    this.setState({
      winningNumber: {
        winningNumbers: winningNumbers.map((v) => +v),
        bonusNumber: +bonusNumber,
      },
    });
    this.updateWinningNumber(this.winningNumber);
  }

  validateWinningNumber(numbersWithoutBlank) {
    if (hasReduplicatedElement(numbersWithoutBlank)) {
      return {
        isFulfilled: false,
        checkMessage: WINNING_NUMBER_CHECK_MESSAGE.REDUPLICATED,
      };
    }
    if (isLessThenLength(numbersWithoutBlank, WINNING_NUMBER_LENGTH)) {
      return {
        isFulfilled: false,
        checkMessage: WINNING_NUMBER_CHECK_MESSAGE.LESS_THEN_LENGTH,
      };
    }
    return {
      isFulfilled: true,
      checkMessage: WINNING_NUMBER_CHECK_MESSAGE.FULFILLED,
    };
  }

  setState({ isFulfilled, checkMessage, winningNumber }) {
    if (typeof isFulfilled === "boolean") {
      this.isFulfilled = isFulfilled;
    }

    if (
      typeof checkMessage === "string" &&
      this.checkMessage !== checkMessage
    ) {
      this.checkMessage = checkMessage;
      this.renderCheckMessage();
    }

    if (typeof winningNumber === "object") {
      this.winningNumber = winningNumber;
    }
  }

  renderCheckMessage() {
    this.$winningNumberCheckMessage.textContent = this.checkMessage;
    if (!this.isFulfilled) {
      this.$winningNumberCheckMessage.classList.replace(
        "text-green",
        "text-red"
      );
      disable(this.$openResultModalButton);
      return;
    }

    this.$winningNumberCheckMessage.classList.replace("text-red", "text-green");
    enable(this.$openResultModalButton);
  }
}

const hasReduplicatedElement = (list) => {
  return new Set(list).size !== list.length;
};

export const isLessThenLength = (list, expectedLength) => {
  return list.length < expectedLength;
};
