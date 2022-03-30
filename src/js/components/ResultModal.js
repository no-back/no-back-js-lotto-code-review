import {
  GET_PRIZE,
  LOTTO_PRICE,
  WINNING_PRIZE,
  YIELD_DECIMAL_POINT,
  YIELD_MESSAGE,
} from "../utils/constants.js";
import { $ } from "../utils/DOM.js";

export default class ResultModal {
  constructor({ isVisible, lottoTickets, winningNumber, onRestart }) {
    this.$modal = $(".modal");
    this.$modalClose = $(".modal-close");
    this.$resultTable = $(".result-table");
    this.$resultTableBody = $(".result-table-body");
    this.$yield = $(".yield");
    this.$resetButton = $(".reset-button");

    this.isVisible = isVisible;
    this.lottoTickets = lottoTickets;
    this.winningNumber = winningNumber;

    this.onRestart = onRestart;

    this.init();
  }

  init() {
    this.$modalClose.addEventListener("click", this.closeModal.bind(this));
    this.$modalClose.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        this.closeModal();
      }
    });
    this.$resetButton.addEventListener("click", () => {
      this.onRestart();
      this.closeModal();
    });
    this.$resetButton.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        this.onRestart();
        this.closeModal();
      }
    });
  }

  showModal(e) {
    e.preventDefault();
    this.setState({ isVisible: true });
  }

  closeModal() {
    this.setState({ isVisible: false });
  }

  setState({ isVisible, lottoTickets, winningNumber }) {
    this.isVisible = isVisible ?? this.isVisible;
    this.lottoTickets = lottoTickets ?? this.lottoTickets;
    this.winningNumber = winningNumber ?? this.winningNumber;

    this.setTotalMatchCountList();
    this.render();
  }

  getMeaningProfitRate() {
    const profit = this.lottoTickets.reduce(
      (acc, lottoTicket) => acc + GET_PRIZE(lottoTicket.totalMatchCount),
      0
    );
    const loss = this.lottoTickets.length * LOTTO_PRICE;
    const profitRate = getRealProfitRate(profit, loss);
    return profitRate % 1 !== 0
      ? +profitRate.toFixed(YIELD_DECIMAL_POINT)
      : profitRate;
  }

  setTotalMatchCountList() {
    if (
      this.lottoTickets.length > 0 &&
      Object.keys(this.winningNumber).length > 0
    ) {
      this.lottoTickets.forEach((lottoTicket) =>
        lottoTicket.setTotalMatchCount(this.winningNumber)
      );
    }
  }

  createTableBodyHTML() {
    return Object.keys(WINNING_PRIZE)
      .sort((a, b) => a - b)
      .map((key) => {
        const { DESCRIPTION, PRIZE } = WINNING_PRIZE[key];
        return this.createTableRowHTML({
          DESCRIPTION,
          PRIZE,
          countOfWinningLotto: this.lottoTickets.filter(
            (lottoTicket) => lottoTicket.totalMatchCount === +key
          ).length,
        });
      })
      .join("");
  }

  createTableRowHTML({ DESCRIPTION, PRIZE, countOfWinningLotto }) {
    return `
      <tr class="text-center">
        <td class="p-3">${DESCRIPTION}</td>
        <td class="p-3">${PRIZE.toLocaleString()}</td>
        <td class="p-3">${countOfWinningLotto}개</td>
      </tr>
    `;
  }
  render() {
    if (!this.isVisible) {
      this.$modal.classList.remove("open");
      return;
    }

    this.$resultTableBody.innerHTML = this.createTableBodyHTML();
    this.$yield.textContent = YIELD_MESSAGE(this.getMeaningProfitRate());
    this.$modal.classList.add("open");
  }
}

const getRealProfitRate = (profit, loss) => ((profit - loss) / loss) * 100;
