import PurchasedLotto from "./PurchasedLotto.js";
import InputPurchaseAmount from "./InputPurchaseAmount.js";
import LottoTicket from "../model/LottoTicket.js";

export default class App {
  constructor() {
    this.lottoTickets = [];

    this.inputPurchaseAmount = new InputPurchaseAmount({
      createLottoTickets: this.createLottoTickets.bind(this),
    });
    this.purchasedLotto = new PurchasedLotto({
      lottoTickets: this.lottoTickets,
    });
  }

  createLottoTickets(numOfLotto) {
    this.setState({
      lottoTickets: Array(numOfLotto).fill().map((v) => new LottoTicket()),
    });
  }

  setState({ lottoTickets }) {
    this.lottoTickets = lottoTickets;
    this.purchasedLotto.setState({ lottoTickets: this.lottoTickets });
  }
}
