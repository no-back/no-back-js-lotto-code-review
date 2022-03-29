import { $, $$ } from "../utils/dom.js";

export const showIssuanceResultSection = (lottoCount) => {
  $(".lotto-numbers-toggle-button").checked = false;
  $("#issuance-label").textContent = `총 ${lottoCount}개를 구매하였습니다.`;
  $("#issuance-result").style.display = "block";
  initPurchaseAmountInput();
};
export const initPurchaseAmountInput = () => {
  $("#purchase-amount-input").value = "";
};

export const hideIssuanceResultSection = () => {
  $("#purchase-amount-input").value = "";
  $("#issuance-result").style.display = "none";
};
