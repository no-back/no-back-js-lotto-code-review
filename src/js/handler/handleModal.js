import { $, $$ } from "../utils/dom.js";
import { onModalClose } from "../view/Modal.js";
import { hideWinningNumberForm } from "../view/WinningNumberForm.js";
import { initIssuanceResultSection } from "./initIssuanceResultSection.js";
import { hideIssuanceResultSection } from "../view/IssuanceResultSection.js";

export const handleModal = ({ currentTarget }, lotto) => {
  if (currentTarget.classList.contains("close-button")) {
    onModalClose();
    return;
  }

  if (currentTarget.classList.contains("restart-button")) {
    onModalClose();
    restartLottoGame(lotto);
    lotto.clear();
  }
};

export const restartLottoGame = () => {
  $("#purchase-amount-input").value = "";
  $$(".winning-number").forEach((winningNumberInput) => {
    winningNumberInput.value = "";
  });
  $(".bonus-number").value = "";

  hideWinningNumberForm();
  initIssuanceResultSection();
  hideIssuanceResultSection();
};
