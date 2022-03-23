import { $ } from "../dom.js";

export default class PurchaseAmountForm {
  constructor() {
    this.$purchaseAmountForm = $("#purchase-amount-form");
    this.$purchaseAmountInput = $("#purchase-amount-input");
    this.$purchaseResultButton = $("#purchase-amount-result-button");
    this.$lottoTickets = $("#issuance-lotto-tickets");
    this.purchasedAmount = 0;
    this.init();
  }

  init() {
    this.initEventListener();
  }

  initEventListener() {
    this.$purchaseAmountForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.$purchaseAmountInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.showIssuanceResultSection();
    });

    this.$purchaseResultButton.addEventListener("click", (e) =>
      this.showIssuanceResultSection()
    );
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

    $("#issuance-result").style.display = "block";
    $("#winning-number-form").style.display = "block";
  }

  isValidatePurchaseAmount = (purchaseInputValue) => {
    purchaseInputValue = +purchaseInputValue;
    if (purchaseInputValue === "") return false;

    if (purchaseInputValue % 1000 !== 0) {
      alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
      return false;
    }

    if (purchaseInputValue >= 1000 && purchaseInputValue <= 100000) return true;
  };

  updateLottoTickets = () => {
    this.lottoTickets = [];
    this.lottoCount = this.purchasedAmount / 1000;
    // TODO - 토글버튼 초기화

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
  };

  autoNumberingLottoTicket() {
    this.lottoTickets.map((ticket) => {
      let lottoNumbers = [];
      for (let j = 0; j < 6; j++) {
        const randomNumber = Math.ceil(Math.random() * 45);
        lottoNumbers.push(randomNumber);
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
