export default class Lotto {
  constructor() {
    this.clear();
  }

  getLottoTickets() {
    return this.lottoTickets;
  }

  setPurchaseAmount(purchaseAmount) {
    this.purchaseAmount = purchaseAmount;
  }

  addTicket(ticket) {
    this.lottoTickets.push(ticket);
  }

  clear() {
    this.lottoTickets = [];
    this.purchaseAmount = 0;
  }
}
