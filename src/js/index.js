import { $, $$ } from "./dom.js";

const $showResultButton = $(".open-result-modal-button");
const $modalClose = $(".modal-close");
const $modal = $(".modal");
const $lottoNumbersToggleButton = $(".lotto-numbers-toggle-button");

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
    this.purchageAmountForm = new PurchaseAmountForm(
      $("#purchase-amount-form")
    );
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
    // init event listeners
    $("#purchase-amount-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    $("#purchase-amount-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.showIssuanceResultSection();
    });

    $("#purchase-amount-result-button").addEventListener("click", (e) =>
      this.showIssuanceResultSection()
    );
  }

  showIssuanceResultSection() {
    // valitate 기능
    // 로또 발급 함수 호출
  }

  updateLottoTickets = () => {
    // 로또 발급상태 초기화
    // 로또 라벨 갱신, 티켓 리스트 갱신
    // 자동 발급숫자 부여
    // style 변경
  };
}

class IssuanceResultSection extends LottoApp {
  constructor($element) {
    super($element);
    this.init();
    this.isToggled = false;
  }

  init() {
    // init event listeners
    $(".lotto-numbers-toggle-button").addEventListener("click", (e) =>
      this.toggleLottoNumber()
    );
  }

  toggleLottoNumber(e) {
    // switch 토글 기능 (style)
  }
}

class WinningNumberForm extends LottoApp {
  constructor($element) {
    super($element);
  }
}

const lottoApp = new LottoApp();
lottoApp.init();
