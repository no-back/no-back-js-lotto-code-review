import PurchasedLotto from "./PurchasedLotto.js";
import PurchaseAmountInput from "./PurchaseAmountInput.js";
import LottoTicket from "../model/LottoTicket.js";
import WinningNumberInput from "./WinningNumberInput.js";
import ResultModal from "./ResultModal.js";

export default class App {
  constructor() {
    this.lottoTicketList = [];
    this.winningNumber = {};

    this.purchaseAmountInput = new PurchaseAmountInput({
      createLottoTicketList: this.createLottoTicketList.bind(this),
    });
    this.winningNumberInput = new WinningNumberInput({
      isVisible: false,
      updateWinningNumber: this.updateWinningNumber.bind(this),
      onShowModal: this.onShowModal.bind(this),
    });
    this.resultModal = new ResultModal({
      isVisible: false,
      lottoTicketList: this.lottoTicketList,
      winningNumber: this.winningNumber,
      onRestart: this.onRestart.bind(this),
    });
  }

  showPurchasedLotto() {
    this.purchasedLotto = new PurchasedLotto({
      lottoTicketList: this.lottoTicketList,
    });
  }

  setState({ lottoTicketList, winningNumber }) {
    if (lottoTicketList) {
      this.lottoTicketList = lottoTicketList;
      this.purchasedLotto.changeStateAndView({
        lottoTicketList: this.lottoTicketList,
      });
      this.winningNumberInput.setState({ isVisible: lottoTicketList.length > 0 });
      this.resultModal.changeStateAndView({ lottoTicketList: this.lottoTicketList });
    }
    if (winningNumber) {
      this.winningNumber = winningNumber;
      this.resultModal.changeStateAndView({
        winningNumber: this.winningNumber,
      });
    }
  }

  createLottoTicketList(countOfLotto) {
    this.showPurchasedLotto();
    this.setState({
      lottoTicketList: Array(countOfLotto)
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
    this.setState({ lottoTicketList: [], winningNumber: {} });
    this.purchaseAmountInput.reset();
  }
}
