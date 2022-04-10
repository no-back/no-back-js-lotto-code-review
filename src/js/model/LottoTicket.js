import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBERS_LENGTH,
  BONUS_CHECK_REQUIRED_COUNT,
  BONUS_COUNT,
} from "../utils/constants.js";

export default class LottoTicket {
  constructor() {
    this.lottoNumberList = this.createLottoNumberList().sort((a, b) => a - b);
    this.totalMatchCount = 0;
  }

  createLottoNumberList(array = []) {
    const number = getRandomNumber(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER);
    if (array.length >= LOTTO_NUMBERS_LENGTH) return array;

    if (!array.includes(number)) {
      array.push(number);
    }

    return this.createLottoNumberList(array);
  }

  setTotalMatchCount({ winningNumberList, bonusNumber }) {
    const totalMatchCount = this.getWinningNumberListMatchCount(winningNumberList);
    this.totalMatchCount =
      totalMatchCount === BONUS_CHECK_REQUIRED_COUNT
        ? totalMatchCount + this.getBonusNumberMatchCount(bonusNumber)
        : totalMatchCount;
  }

  getWinningNumberListMatchCount(winningNumberList) {
    return this.lottoNumberList.reduce(
      (acc, num) => acc + winningNumberList.includes(num),
      0
    );
  }

  getBonusNumberMatchCount(bonusNumber) {
    return this.lottoNumberList.includes(bonusNumber) ? BONUS_COUNT : 0;
  }
}

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
