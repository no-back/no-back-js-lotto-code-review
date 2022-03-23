import { $ } from "../dom.js";
import { LOTTO_PRICE, MESSAGE } from "../const.js";

export default class PurchaseAmountForm {
  constructor() {
    this.$purchaseAmountForm = $("#purchase-amount-form");
    this.$purchaseAmountInput = $("#purchase-amount-input");
    this.$purchaseResultButton = $("#purchase-amount-result-button");
    this.$lottoTickets = $("#issuance-lotto-tickets");
    this.purchasedAmount = "";
    this.init();
  }

  init() {
    this.initEventListener();
  }

  initEventListener() {
    this.$purchaseAmountForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.showIssuanceResultSection();
    });

    // TODO : 실시간 data state check(keyinput)
    // 이전 값과 다를때만 재렌더링
  }

  showIssuanceResultSection() {
    // valitate 기능
    let purchaseInputValue = this.$purchaseAmountInput.value;
    if (!this.isValidatePurchaseAmount(purchaseInputValue)) {
      this.$purchaseAmountInput.value = "";
      return;
    }

    // 로또 발급 함수 호출
    this.purchasedAmount = purchaseInputValue;
    this.updateLottoTickets();

    $(".lotto-numbers-toggle-button").checked = false;
    $("#issuance-result").style.display = "block";
    $("#winning-number-form").style.display = "block";
  }

  isValidatePurchaseAmount = (purchaseInputValue) => {
    purchaseInputValue = purchaseInputValue;
    if (purchaseInputValue === "") return false;

    if (purchaseInputValue % LOTTO_PRICE !== 0) {
      alert(MESSAGE.ALERT_LOTTO_PRICE);
      return false;
    }
    return true;
  };

  updateLottoTickets = () => {
    this.lottoTickets = [];
    this.lottoCount = this.purchasedAmount / LOTTO_PRICE;

    $(
      "#issuance-label"
    ).textContent = `총 ${this.lottoCount}개를 구매하였습니다.`;

    for (let i = 0; i < this.lottoCount; i++) {
      this.lottoTickets.push({ lottoNumbers: [] });
    }

    this.autoNumberingLottoTicket();

    this.$lottoTickets.innerHTML = this.lottoTickets
      .map((ticket) => this.lottoTicketTemplate(ticket))
      .join("");

    this.$lottoTickets.classList.remove("flex-col");
  };

  autoNumberingLottoTicket() {
    this.lottoTickets.forEach((ticket) => {
      let lottoNumbers = [];
      for (let j = 0; j < 6; j++) {
        const randomNumber = Math.floor(Math.random() * 44) + 1;
        lottoNumbers.includes(randomNumber)
          ? j--
          : lottoNumbers.push(randomNumber);
      }
      ticket.lottoNumbers = lottoNumbers;
    });
  }

  lottoTicketTemplate = (item) => {
    return `<li class="mx-1 text-4xl lotto-wrapper">
          <span class="lotto-icon">🎟️</span>
          <span class="lotto-detail" style="display: none;">${item.lottoNumbers}</span>
      </li>`;
  };
}
