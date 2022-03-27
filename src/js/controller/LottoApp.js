import PurchaseAmountForm from "../components/PurchaseAmountForm.js";
import IssuanceResultSection from "../components/IssuanceResultSection.js";
import WinningNumberForm from "../components/WinningNumberForm.js";

export default class LottoApp {
  constructor() {
    this.purchageAmountForm = new PurchaseAmountForm();
    this.issuaranceResultSection = new IssuanceResultSection();
    this.winningNumberForm = new WinningNumberForm();
  }
}
