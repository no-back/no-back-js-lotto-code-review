import { $ } from "../utils/dom.js";
import { NUM, MESSAGE } from "../utils/const.js";

export default class PurchaseAmountForm {
  constructor() {
    this.$purchaseAmountForm = $("#purchase-amount-form");
    this.$purchaseAmountInput = $("#purchase-amount-input");
    this.$lottoTickets = $("#issuance-lotto-tickets");

    this.initEventListener();
    this.$purchaseAmountInput.focus();
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

    // TODO : 로또 발급 함수 호출
    // TODO : 라벨 업데이트, 로또리스트 업데이트 분리
    this.lottoTickets = [];
    this.updateLottoTickets(purchaseInputValue);

    $(".lotto-numbers-toggle-button").checked = false;
    $("#issuance-result").style.display = "block";
    $("#winning-number-form").style.display = "block";
  }

  isValidatePurchaseAmount = (purchaseInputValue) => {
    purchaseInputValue = purchaseInputValue;
    if (purchaseInputValue === "") return false;

    if (purchaseInputValue % NUM.LOTTO_PRICE !== 0) {
      alert(MESSAGE.ALERT_LOTTO_PRICE);
      return false;
    }
    return true;
  };

  updateLottoTickets = (purchaseInputValue) => {
    this.lottoCount = purchaseInputValue / NUM.LOTTO_PRICE;
    this.updateIssuanceLabel(this.lottoCount);
    this.createLottoTickets();

    this.$lottoTickets.classList.remove("flex-col");
    this.$purchaseAmountInput.value = ""; // TODO : 초기화 함수화
  };

  updateIssuanceLabel(lottoCount) {
    $("#issuance-label").textContent = `총 ${lottoCount}개를 구매하였습니다.`;
  }

  createLottoTickets() {
    this.autoNumberingLottoTicket();

    this.$lottoTickets.innerHTML = this.lottoTickets
      .map((ticket) => this.lottoTicketTemplate(ticket))
      .join("");
  }

  autoNumberingLottoTicket() {
    for (let i = 0; i < this.lottoCount; i++) {
      this.lottoTickets.push({ lottoNumbers: [] });
    }

    this.lottoTickets.forEach((ticket) => {
      let lottoNumbers = [];
      for (let j = 0; j < NUM.LOTTO_NUM_COUNT; j++) {
        const randomNumber =
          Math.floor(Math.random() * NUM.LOTTO_MAX_NUMBER) + 1;
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
          <span class="lotto-detail" style="display: none;" data-number="ticket">${item.lottoNumbers}</span>
      </li>`;
  };
}
