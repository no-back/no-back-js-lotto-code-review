import PurchasedLotto from "./PurchasedLotto.js";
import InputPurchaseAmount from "./InputPurchaseAmount.js";
import LottoTicket from "../model/LottoTicket.js";

export default class App {
  constructor() {
    this.LottoTickets = [];

    this.inputPurchaseAmount = new InputPurchaseAmount({
      createdLottoTickets: this.createLottoTickets.bind(this),
    });
    this.purchasedLotto = new PurchasedLotto({
      lottoTickets: this.lottoTickets,
    });
  }

  createLottoTickets(numbersOfLotto) {
    this.setState({
      lottoTickets: [numbersOfLotto].fill().map((v) => new LottoTicket()),
    });
  }

  setState({ lottoTickets }) {
    this.lottoTickets = lottoTickets;
    this.purchasedLotto.setState({ lottoTickets: this.lottoTickets });
  }
}
