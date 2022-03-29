import { $ } from "../utils/dom.js";
import Lotto from "../model/Lotto.js";
import { handlePurchaseAmountSubmit } from "../handler/handlePurchaseAmountSubmit.js";
import { handleWinningNumberSubmit } from "../handler/handleWinningNumberSubmit.js";
import { onFocusWinningNumberInput } from "../handler/onFocusWinningNumberInput.js";
import { onToggleIssuanceResult } from "../handler/onToggleIssuanceResult.js";
import { handleModal } from "../handler/handleModal.js";

export default class LottoApp {
  constructor() {
    const lotto = new Lotto();

    $("#purchase-amount-form").addEventListener("submit", (e) => {
      e.preventDefault();
      handlePurchaseAmountSubmit(lotto);
    });

    $(".lotto-numbers-toggle-button").addEventListener("click", (e) =>
      onToggleIssuanceResult()
    );

    $("#winning-numbers-container").addEventListener("input", (e) => {
      onFocusWinningNumberInput(e);
    });

    $("#winning-number-form").addEventListener("submit", (e) => {
      e.preventDefault();
      handleWinningNumberSubmit(lotto);
    });

    $(".restart-button").addEventListener("click", (e) =>
      handleModal(e, lotto)
    );
    $(".modal-close").addEventListener("click", (e) => handleModal(e, lotto));
  }
}
