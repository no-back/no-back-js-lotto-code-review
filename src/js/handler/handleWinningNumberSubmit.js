import { $, $$ } from "../utils/dom.js";
import { NUM, MESSAGE, VALUE } from "../utils/const.js";
import { onModalShow, renderModal } from "../view/Modal.js";

export const handleWinningNumberSubmit = (lotto) => {
  const winningNumbers = [...$$(".winning-number")].map((node) => {
    return +node.value;
  });
  const bonusNumber = +$(".bonus-number").value;
  const winningInputNumbers = [...winningNumbers, bonusNumber];

  if (!isValidWinningNumbers(winningInputNumbers)) {
    alert(MESSAGE.ALERT_LOTTO_DUPLICATED_NUMBER);
    return;
  }

  lotto.lottoTickets.forEach((ticket) => {
    compareLottoNumbers(ticket, winningNumbers, bonusNumber);
  });

  renderModal(getRankCountMap(lotto), getTotalYield(lotto));
  onModalShow(); // 모달창에 배열 데이터를 넘긴다.
};

const isValidWinningNumbers = (winningInputNumbers) => {
  return new Set(winningInputNumbers).size == NUM.LOTTO_NUM_COUNT + 1
    ? true
    : false;
};

const compareLottoNumbers = (ticket, winningNumbers, bonusNumber) => {
  // 기존 로또티켓 번호와 당첨 번호를 비교한다
  // input 이벤트마다 당첨결과 객체를 업데이트? 결과 확인 시에만 업데이트? 실시간 상태변경의 필요성

  const winningCount = getWinningCount([
    ...ticket.lottoNumbers,
    ...winningNumbers,
  ]);
  const hasBonusCount = ticket.lottoNumbers.includes(bonusNumber);
  const winningRank = getWinningRank(winningCount, hasBonusCount);
  const profit = getProfit(winningRank);

  ticket.setWinningRank(winningRank);
  ticket.setProfit(profit);
};

const getWinningCount = (nums) => {
  return nums.length - new Set(nums).size;
};

const getRankCountMap = (lotto) => {
  const rankCountMap = {
    [VALUE.WINNING_RANK.FIRST]: 0,
    [VALUE.WINNING_RANK.SECOND]: 0,
    [VALUE.WINNING_RANK.THIRD]: 0,
    [VALUE.WINNING_RANK.FOURTH]: 0,
    [VALUE.WINNING_RANK.FIFTH]: 0,
    [VALUE.WINNING_RANK.NONE]: 0,
  };

  lotto.lottoTickets.forEach(({ winningRank }) => {
    rankCountMap[winningRank] += 1;
  });

  return rankCountMap;
};

const getTotalYield = (lotto) => {
  const totalProfit = lotto.lottoTickets.reduce((acc, ticket) => {
    return (acc += ticket.profit);
  }, 0);

  return Number(((totalProfit / lotto.purchaseAmount) * 100).toFixed(2));
};

const getProfit = (winningRank) => {
  const profits = {
    [VALUE.WINNING_RANK.FIRST]: VALUE.WINNING_PRICE.FIRST,
    [VALUE.WINNING_RANK.SECOND]: VALUE.WINNING_PRICE.SECOND,
    [VALUE.WINNING_RANK.THIRD]: VALUE.WINNING_PRICE.THIRD,
    [VALUE.WINNING_RANK.FOURTH]: VALUE.WINNING_PRICE.FOURTH,
    [VALUE.WINNING_RANK.FIFTH]: VALUE.WINNING_PRICE.FIFTH,
    [VALUE.WINNING_RANK.NONE]: VALUE.WINNING_PRICE.NONE,
  };

  return profits[winningRank] || VALUE.WINNING_PRICE.NONE;
};

const getWinningRank = (winningCount, hasBonusCount) => {
  return hasBonusCount && winningCount === VALUE.HIT_COUNT.FIVE
    ? VALUE.WINNING_RANK.SECOND
    : getRank(winningCount);
};

const getRank = (winningCount) => {
  const rank = {
    [VALUE.HIT_COUNT.SIX]: VALUE.WINNING_RANK.FIRST,
    [VALUE.HIT_COUNT.FIVE]: VALUE.WINNING_RANK.THIRD,
    [VALUE.HIT_COUNT.FOUR]: VALUE.WINNING_RANK.FOURTH,
    [VALUE.HIT_COUNT.THREE]: VALUE.WINNING_RANK.FIFTH,
    [VALUE.HIT_COUNT.TWO]: VALUE.WINNING_RANK.NONE,
    [VALUE.HIT_COUNT.ONE]: VALUE.WINNING_RANK.NONE,
    [VALUE.HIT_COUNT.NONE]: VALUE.WINNING_RANK.NONE,
  };

  return rank[winningCount] || VALUE.WINNING_RANK.NONE;
};
