import { $, $$ } from "../utils/dom.js";
import { NUM, MESSAGE } from "../utils/const.js";
import Modal from "./Modal.js";
export default class WinningNumberForm {
  constructor() {
    this.$winningNumberForm = $("#winning-number-form");
    this.$winningNumberContainer = $("#winning-numbers-container");
    // this.$allWinningNumbers = $$("[data-number='winning']");
    this.$winningNumbers = $$(".winning-number");
    this.$bonusNumber = $(".bonus-number");
    this.winningNumbers = [];
    this.initEventListener();
  }

  initEventListener() {
    this.$winningNumberForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.showWinningResultModal();
    });
    this.$winningNumberContainer.addEventListener("input", (e) => {
      // TODO : "input"이 적절한가
      // TODO : input 클릭 후 입력 시 preventDefault()..
      // validate 함수 분리
      if (e.target.value.length >= e.target.maxLength) {
        e.preventDefault(); // check
        e.target.nextElementSibling === null
          ? this.$bonusNumber.focus()
          : e.target.nextElementSibling.focus();
      }
      // TODO : 보너스번호 무한 입력 preventDefault()
    });
  }
  showWinningResultModal() {
    const winningNumberSet = this.createWinningNumbers();
    if (this.isDuplicatedWinningNumbers(winningNumberSet)) {
      alert(MESSAGE.ALERT_LOTTO_DUPLICATED_NUMBER);
      return;
    }
    this.winningNumbers = winningNumberSet; // TODO : Array <- Set?
    this.compareLottoNumbers();

    const WinningResultModal = new Modal(); // 모달창에 배열 데이터를 넘긴다.
    WinningResultModal.onModalShow();
  }

  createWinningNumbers() {
    const winningNumberSet = new Set(
      [...this.$winningNumbers].map((node) => {
        return node.value;
      })
    );
    const bonusValue = this.$bonusNumber.value;
    winningNumberSet.add(bonusValue);

    return winningNumberSet;
  }

  isDuplicatedWinningNumbers(winningNumberSet) {
    if (winningNumberSet.size !== NUM.LOTTO_NUM_COUNT + 1) return true;
    else return false;
  }

  compareLottoNumbers() {
    // 기존 로또티켓 번호와 당첨 번호를 비교한다
    //(input 이벤트마다 당첨결과 객체를 업데이트? 결과 확인 시에만 업데이트? 실시간 상태변경의 필요성..)
    // const winningNumbers = this.winningNumbers;
    // const lottoTickets = this.lottoTickets;
  }
}
// 다시 시작하기 버튼을 누르면 LottoApp 상태를 초기화한다.
