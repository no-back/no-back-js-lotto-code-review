import PurchasedLotto from "./PurchasedLotto.js";
import PurchaseAmountInput from "./PurchaseAmountInput.js";
import LottoTicket from "../model/LottoTicket.js";
import WinningNumberInput from "./WinningNumberInput.js";
import ResultModal from "./ResultModal.js";

export default class App {
  constructor() {
    this.lottoTickets = [];
    this.winningNumber = {};

    this.purchaseAmountInput = new PurchaseAmountInput({
      createLottoTickets: this.createLottoTickets.bind(this),
    });
    this.winningNumberInput = new WinningNumberInput({
      isVisible: false,
      updateWinningNumber: this.updateWinningNumber.bind(this),
      onShowModal: this.onShowModal.bind(this),
    });
    this.resultModal = new ResultModal({
      isVisible: false,
      lottoTickets: this.lottoTickets,
      winningNumber: this.winningNumber,
      onRestart: this.onRestart.bind(this),
    });
  }

  showPurchasedLotto() {
    this.purchasedLotto = new PurchasedLotto({
      lottoTickets: this.lottoTickets,
    });
  }

  setState({ lottoTickets, winningNumber }) {
    if (lottoTickets) {
      this.lottoTickets = lottoTickets;
      this.purchasedLotto.changeStateAndView({
        lottoTickets: this.lottoTickets,
      });
      this.winningNumberInput.setState({ isVisible: lottoTickets.length > 0 });
      this.resultModal.changeStateAndView({ lottoTickets: this.lottoTickets });
    }
    if (winningNumber) {
      this.winningNumber = winningNumber;
      this.resultModal.changeStateAndView({
        winningNumber: this.winningNumber,
      });
    }
  }

  createLottoTickets(countOfLotto) {
    this.showPurchasedLotto();
    this.setState({
      lottoTickets: Array(countOfLotto)
        .fill()
        .map(() => new LottoTicket()),
    });
  }

  updateWinningNumber(winningNumber) {
    this.setState({ winningNumber });
  }

  onShowModal(e) {
    this.resultModal.showModal(e);
  }

  onRestart() {
    this.setState({ lottoTickets: [], winningNumber: {} });
    this.purchaseAmountInput.reset();
  }
}
