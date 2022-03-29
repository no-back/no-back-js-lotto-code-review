import { NUM, MESSAGE } from "../utils/const.js";
import { $ } from "../utils/dom.js";
import LottoTicket from "../model/LottoTicket.js";
import { showIssuanceResultSection } from "../view/IssuanceResultSection.js";
import { showWinningNumberForm } from "../view/WinningNumberForm.js";

export const handlePurchaseAmountSubmit = (lotto) => {
  const purchaseInputValue = $("#purchase-amount-input").value;

  if (!isValidPurchaseAmount(purchaseInputValue)) {
    alert(MESSAGE.ALERT_LOTTO_PRICE);
    $("#purchase-amount-input").value = "";
    return;
  }
  lotto.clear();
  lotto.setPurchaseAmount(purchaseInputValue);
  const purchasedTicketCount = purchaseInputValue / NUM.LOTTO_PRICE;

  for (let i = 0; i < purchasedTicketCount; i++) {
    lotto.addTicket(new LottoTicket());
  }

  autoNumberingLottoTicket(lotto);

  $("#issuance-lotto-tickets").innerHTML = lotto.lottoTickets
    .map((ticket) => lottoTicketTemplate(ticket))
    .join("");

  showIssuanceResultSection(purchasedTicketCount);
  showWinningNumberForm();
};

const isValidPurchaseAmount = (purchaseInputValue) => {
  return purchaseInputValue === "" || purchaseInputValue % NUM.LOTTO_PRICE !== 0
    ? false
    : true;
};
// TODO : high-order function
const autoNumberingLottoTicket = (lotto) => {
  lotto.lottoTickets.forEach((ticket) => {
    let lottoNumbers = [];
    for (let j = 0; j < NUM.LOTTO_NUM_COUNT; j++) {
      const randomNumber = Math.floor(Math.random() * NUM.LOTTO_MAX_NUMBER) + 1;
      lottoNumbers.includes(randomNumber)
        ? j--
        : lottoNumbers.push(randomNumber);
    }
    ticket.lottoNumbers = lottoNumbers;
  });
};

const lottoTicketTemplate = (ticket) => {
  return `<li class="mx-1 text-4xl lotto-wrapper">
        <span class="lotto-icon">🎟️</span>
        <span class="lotto-detail" style="display: none;" data-number="ticket">${ticket.lottoNumbers}</span>
    </li>`;
};
