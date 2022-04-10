import { PURCHASED_QUANTITY_MESSAGE } from "../utils/constants.js";
import { $, $$, hide, show } from "../utils/DOM.js";
export default class PurchasedLotto {
  constructor({ lottoTicketList }) {
    this.$purchasedLottoSection = $(".purchased-lotto-section");
    this.$lottoTicketContainer = $(".lotto-ticket-container");
    this.$purchasedLottoLabel = $(".purchased-lotto-label");
    this.$lottoNumbersToggleButton = $(".lotto-numbers-toggle-button");
    this.lottoTicketList = lottoTicketList;

    this.init();
    this.render();
  }

  init() {
    $(".switch").addEventListener("click", (e) =>
      this.onToggleShowingNumberList(e)
    );
    this.$lottoNumbersToggleButton.checked = false;
  }

  onToggleShowingNumberList({ target }) {
    if (target.type === "checkbox") {
      target.checked ? this.showNumberList() : this.hideNumberList();
    }
  }
  showNumberList() {
    this.$lottoTicketContainer.classList.add("flex-col");
    $$(".lotto-numbers").forEach(($lottoNumbers) => show($lottoNumbers));
  }

  hideNumberList() {
    this.$lottoTicketContainer.classList.remove("flex-col");
    $$(".lotto-numbers").forEach(($lottoNumbers) => hide($lottoNumbers));
  }
  reset() {
    hide(this.$purchasedLottoSection);
    this.$lottoNumbersToggleButton.checked = false;
    this.hideNumberList();
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

  changeStateAndView({ lottoTicketList }) {
    this.setState({ lottoTicketList })
    this.render()
  }

  setState({ lottoTicketList }) {
    this.lottoTicketList = lottoTicketList;
  }
  render() {
    const countOfLotto = this.lottoTicketList.length;

    if (!countOfLotto) {
      this.reset();
      return;
    }

    show(this.$purchasedLottoSection);
    this.$purchasedLottoLabel.innerHTML =
      PURCHASED_QUANTITY_MESSAGE(countOfLotto);
    this.$lottoTicketContainer.innerHTML = this.lottoTicketList
      .map(this.createLottoTicketHTML)
      .join("");
    if (this.$lottoNumbersToggleButton.checked === false) {
      this.hideNumberList();
    }
  }
}
