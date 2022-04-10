import {
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  MAX_LOTTO_NUMBER_LENGTH,
  WINNING_NUMBER_CHECK_MESSAGE,
  WINNING_NUMBER_LENGTH,
} from "../utils/constants.js";
import { $, $$, disable, enable, hide, show } from "../utils/DOM.js";

export default class WinningNumberInput {
  constructor({ isVisible, updateWinningNumber, onShowModal }) {
    this.$winningNumberForm = $(".winning-number-form");
    this.$winningNumberInputList = $$(".winning-number");
    this.$bonusNumberInput = $(".bonus-number");
    this.$winningNumberCheckMessage = $(".winning-number-check-message");
    this.$openResultModalButton = $(".open-result-modal-button");

    this.isFulfilled = false;
    this.winningNumber = {};
    this.checkMessage = "";
    this.isVisible = isVisible;
    this.updateWinningNumber = updateWinningNumber;
    this.onShowModal = onShowModal;

    this.init();
  }

  init() {
    this.$winningNumberForm.addEventListener(
      "keyup",
      this.onChangeWinningNumberInput.bind(this)
    );
    this.$winningNumberForm.addEventListener(
      "submit",
      this.onShowModal.bind(this)
    );
  }

  onChangeWinningNumberInput(e) {
    this.onHandleWinningInput(e, MAX_LOTTO_NUMBER_LENGTH);

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
        winningNumbers: winningNumbers.map((v) => Number(v)),
        bonusNumber: +bonusNumber,
      },
    });
    this.updateWinningNumber(this.winningNumber);
  }

  onHandleWinningInput(e, maxLength) {
    if (!e.key.match(/^[0-9]$/)) return;
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.substr(0, maxLength);
    }
    if (
      e.target.value.length >= 2 &&
      e.target.value <= LOTTO_MAX_NUMBER &&
      e.target.nextElementSibling
    ) {
      e.target.nextElementSibling.focus();
    }
    if (lastSibling(e.target)?.value.length >= 2) {
      $("#bonus-number").focus()
    }
  }
  validateWinningNumber(numberListWithoutBlank) {
    if (
      hasElementOutOfRange(numberListWithoutBlank, {
        min: LOTTO_MIN_NUMBER,
        max: LOTTO_MAX_NUMBER,
      })
    ) {
      return {
        isFulfilled: false,
        checkMessage: WINNING_NUMBER_CHECK_MESSAGE.OUT_OF_RANGE,
      };
    }
    if (hasReduplicatedElement(numberListWithoutBlank)) {
      return {
        isFulfilled: false,
        checkMessage: WINNING_NUMBER_CHECK_MESSAGE.REDUPLICATED,
      };
    }
    if (isLessThenLength(numberListWithoutBlank, WINNING_NUMBER_LENGTH)) {
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

  setState({ isVisible, isFulfilled, checkMessage, winningNumber }) {
    if (typeof isVisible === "boolean") {
      this.isVisible = isVisible;
      this.renderWinningInputForm();
    }
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

  renderWinningInputForm() {
    if (!this.isVisible) {
      hide(this.$winningNumberForm);
      disable(this.$openResultModalButton);
      this.$winningNumberCheckMessage.textContent = "";
      return;
    }
    show(this.$winningNumberForm);
  }
}

const hasElementOutOfRange = (list, { min, max }) => {
  return list.some((element) => element < min || element > max);
};

const hasReduplicatedElement = (list) => {
  return new Set(list).size !== list.length;
};

const isLessThenLength = (list, expectedLength) => {
  return list.length < expectedLength;
};

function lastSibling(node) {
  let tempObj = node.parentNode.lastChild;
  while (tempObj.nodeType != 1 && tempObj.previousSibling != null) {
    tempObj = tempObj.previousSibling;
  }
  return tempObj.nodeType == 1 ? tempObj : false;
}
