import {
  $,
  $$,
  $showResultButton,
  $modalClose,
  $modal,
  $lottoNumbersToggleButton,
  $purchaseForm,
  $purchaseAmountInput,
  $purchaseResultButton,
  $lottoTickets,
} from "./dom.js";

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

class LottoApp {
  constructor() {
    this.purchasedAmount = 0;
    this.lottoCount = 0;
    this.lottoTickets = [];
  }

  init() {
    this.render();
  }

  render() {
    this.purchageAmountForm = new PurchaseAmountForm($purchaseForm);
    this.issuaranceResultSection = new IssuanceResultSection(
      $("#issuance-result")
    );
    this.winningNumberForm = new WinningNumberForm($("#winning-number-form"));
  }
}

class PurchaseAmountForm extends LottoApp {
  constructor($element) {
    super($element);
    this.init();
  }

  init() {
    $purchaseForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    $purchaseAmountInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.showIssuanceResultSection();
    });

    $purchaseResultButton.addEventListener("click", (e) =>
      this.showIssuanceResultSection()
    );
  }

  showIssuanceResultSection() {
    // valitate 기능
    const purchaseInputValue = $purchaseAmountInput.value;
    if (!this.isValidatePurchaseAmount(purchaseInputValue)) {
      $purchaseAmountInput.value = "";
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
    // 로또 발급상태 초기화
    this.lottoTickets = [];
    this.lottoCount = this.purchasedAmount / 1000;
    // TODO - 토글버튼 초기화

    // 로또 라벨 갱신, 티켓 리스트 갱신
    $(
      "#issuance-label"
    ).textContent = `총 ${this.lottoCount}개를 구매하였습니다.`;

    for (let i = 0; i < this.lottoCount; i++) {
      this.lottoTickets.push({ lottoNumbers: [] });
    }

    // 자동 발급숫자 부여
    this.autoNumberingLottoTicket(); // <> ManualNumbering

    // 티켓 리스트 DOM 변경
    $lottoTickets.innerHTML = this.lottoTickets
      .map((ticket) => this.lottoTicketTemplate(ticket))
      .join("");
  };

  autoNumberingLottoTicket() {
    this.lottoTickets.map((ticket) => {
      for (let i = 0; i < this.lottoTickets.length; i++) {
        let lottoNumbers = [];
        for (let j = 0; j < 6; j++) {
          const randomNumber = Math.ceil(Math.random() * 45);
          lottoNumbers.push(randomNumber);
        }
        this.lottoTickets[i].lottoNumbers = lottoNumbers;
      }
    });
  }

  lottoTicketTemplate = (item) => {
    return `<li class="mx-1 text-4xl lotto-wrapper">
        <span class="lotto-icon">🎟️</span>
        <span class="lotto-detail" style="display: none;">${item.lottoNumbers}</span>
    </li>`;
  };
}

class IssuanceResultSection extends LottoApp {
  constructor($element) {
    super($element);
    this.isToggled = false;
    this.init();
  }

  init() {
    $lottoNumbersToggleButton.addEventListener("click", (e) =>
      this.toggleLottoNumber()
    );
  }

  toggleLottoNumber(e) {
    // switch 토글 기능 (style)
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

class WinningNumberForm extends LottoApp {
  constructor($element) {
    super($element);
  }
}

const lottoApp = new LottoApp();
lottoApp.init();
