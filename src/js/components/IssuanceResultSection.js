import { $, $$ } from "../dom.js";

export default class IssuanceResultSection {
  constructor() {
    this.$lottoNumbersToggleButton = $(".lotto-numbers-toggle-button");
    this.$lottoTickets = $("#issuance-lotto-tickets");
    this.init();
  }

  init() {
    this.$lottoNumbersToggleButton.addEventListener("click", (e) =>
      this.toggleLottoNumber()
    );
  }

  toggleLottoNumber(e) {
    [...$$(".lotto-detail")].forEach((item) =>
      item.style.display == "none"
        ? (item.style.display = "inline")
        : (item.style.display = "none")
    );
    this.$lottoTickets.classList.contains("flex-col")
      ? this.$lottoTickets.classList.remove("flex-col")
      : this.$lottoTickets.classList.add("flex-col");

    // TODO : display, class 싱크 처리
  }
}
