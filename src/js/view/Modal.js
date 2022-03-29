import { $, $$ } from "../utils/dom.js";

export const onModalShow = () => {
  $(".modal").classList.add("open");
};

export const onModalClose = () => {
  $(".modal").classList.remove("open");
};

export const renderRankCount = (rankCountMap) => {
  const $$resultRankCount = $$(".result-rank-count");
  $$resultRankCount.forEach(($resultRankCount, index) => {
    $resultRankCount.innerText = `${
      rankCountMap[$$resultRankCount.length - index]
    }개`;
  });
};

export const renderTotalYield = (totalYield) => {
  $(
    "#result-total-yield"
  ).innerText = `당신의 총 수익률은 ${totalYield}%입니다.`;
};

export const renderModal = (rankCountMap, totalYield) => {
  renderTotalYield(totalYield);
  renderRankCount(rankCountMap);
};
