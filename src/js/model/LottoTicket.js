import { getRandomNumber } from "../utils/utils.js";
import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBERS_LENGTH,
  BONUS_CHECK_REQUIRED_COUNT,
  BONUS_COUNT,
} from "../utils/constants.js";

export default class LottoTicket {
  constructor() {
    this.lottoNumberList = this.createLottoNumbers().sort((a, b) => a - b);
    this.totalMatchCount = 0;
  }

  createLottoNumbers(array = []) {
    const number = getRandomNumber(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER);
    if (array.length >= LOTTO_NUMBERS_LENGTH) return array;

    if (!array.includes(number)) {
      array.push(number);
    }

    return this.createLottoNumbers(array);
  }

  setTotalMatchCount({ winningNumbers, bonusNumber }) {
    const totalMatchCount = this.getWinningNumbersMatchCount(winningNumbers);

    this.totalMatchCount =
      totalMatchCount === BONUS_CHECK_REQUIRED_COUNT
        ? totalMatchCount + this.getBonusNumberMatchCount(bonusNumber)
        : totalMatchCount;
  }

  getWinningNumbersMatchCount(winningNumbers) {
    return this.lottoNumberList.reduce(
      (acc, num) => acc + +(winningNumbers.includes(num), 0)
    );
  }

  getBonusNumberMatchCount(bonusNumber) {
    return this.lottoNumberList.includes(bonusNumber) ? BONUS_COUNT : 0;
  }
}
