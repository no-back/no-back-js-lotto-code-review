import PurchaseAmountForm from "./PurchaseAmountForm.js";
import IssuanceResultSection from "./IssuanceResultSection.js";
import WinningNumberForm from "./WinningNumberForm.js";

export default class LottoApp {
  constructor() {
    this.purchasedAmount = 0;
    this.lottoCount = 0;
    this.lottoTickets = [];

    this.purchageAmountForm = new PurchaseAmountForm();
    this.issuaranceResultSection = new IssuanceResultSection();
    this.winningNumberForm = new WinningNumberForm();
  }
}
