import { PURCHASED_QUANTITY_MESSAGE } from "../utils/constants.js";
import { $, $$, hide, show } from "../utils/DOM.js";
export default class PurchasedLotto {
  constructor({ lottoTickets }) {
    this.$purchasedLottoSection = $(".purchased-lotto-section");
    this.$lottoTicketContainer = $(".lotto-ticket-container");
    this.$purchasedLottoLabel = $(".purchased-lotto-label");
    this.$lottoNumbersToggleButton = $(".lotto-numbers-toggle-button");
    this.lottoTickets = lottoTickets;

    this.init();
    this.render();
  }

  init() {
    $(".switch").addEventListener("click", (e) =>
      this.onToggleShowingNumbers(e)
    );
    this.$lottoNumbersToggleButton.checked = false;
  }

  onToggleShowingNumbers({ target }) {
    if (target.type === "checkbox") {
      target.checked ? this.showNumbers() : this.hideNumbers();
    }
  }
  showNumbers() {
    this.$lottoTicketContainer.classList.add("flex-col");
    $$(".lotto-numbers").forEach(($lottoNumbers) => show($lottoNumbers));
  }

  hideNumbers() {
    this.$lottoTicketContainer.classList.remove("flex-col");
    $$(".lotto-numbers").forEach(($lottoNumbers) => hide($lottoNumbers));
  }
  reset() {
    hide(this.$purchasedLottoSection);
    this.$lottoNumbersToggleButton.checked = false;
    this.hideNumbers();
  }

  createLottoTicketHTML(lottoTicket) {
    return `
    <li class="mx-1 text-4xl d-flex items-center">
   🎟️
      <span class="text-xl ml-5 d-none lotto-numbers" data-lotto-numbers="span">
        ${lottoTicket.lottoNumberList.join(", ")}
      </span>
    </li>`;
  }

  setState({ lottoTickets }) {
    this.lottoTickets = lottoTickets;
    this.render();
  }
  render() {
    const countOfLotto = this.lottoTickets.length;

    if (!countOfLotto) {
      this.reset();
      return;
    }

    show(this.$purchasedLottoSection);
    this.$purchasedLottoLabel.innerHTML =
      PURCHASED_QUANTITY_MESSAGE(countOfLotto);
    this.$lottoTicketContainer.innerHTML = this.lottoTickets
      .map(this.createLottoTicketHTML)
      .join("");
    if (this.$lottoNumbersToggleButton.checked === false) {
      this.hideNumbers();
    }
  }
}
