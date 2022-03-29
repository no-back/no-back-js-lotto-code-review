export default class LottoTicket {
  constructor() {
    this.lottoNumbers = [];
    this.WinningRank = 0;
    this.profit = 0;
  }

  setLottoNumbers(numbers) {
    this.lottoNumbers = numbers;
  }

  getLottoNumbers() {
    return this.lottoNumbers;
  }

  setWinningRank(winningRank) {
    this.winningRank = winningRank;
  }

  setProfit(profit) {
    this.profit = profit;
  }
}
