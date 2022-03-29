import { $ } from "../utils/dom.js";

export const onFocusWinningNumberInput = (e) => {
  if (e.target.value.length >= e.target.maxLength) {
    e.preventDefault();
    e.target.nextElementSibling === null
      ? $(".bonus-number").focus()
      : e.target.nextElementSibling.focus();
  }
};
