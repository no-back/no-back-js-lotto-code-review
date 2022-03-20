import { $$, $lottoNumbersToggleButton, $lottoTickets } from "../dom.js";
export default class IssuanceResultSection {
  constructor() {
    this.isToggled = false;
    this.init();
  }

  init() {
    $lottoNumbersToggleButton.addEventListener("click", (e) =>
      this.toggleLottoNumber()
    );
  }

  toggleLottoNumber(e) {
    [...$$(".lotto-detail")].map((item) =>
      item.style.display == "none"
        ? (item.style.display = "inline")
        : (item.style.display = "none")
    );
    $lottoTickets.classList.contains("flex-col")
      ? $lottoTickets.classList.remove("flex-col")
      : $lottoTickets.classList.add("flex-col");
    this.isToggled = !this.isToggled;
  }
}
