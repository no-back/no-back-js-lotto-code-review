import { $ } from "../utils/DOM.js";

export default class ResultModal {
  constructor({ isVisible, lottoTickets, winningNumber, onRestart }) {
    this.$modal = $(".modal");
    this.$modal = $(".modal-close");
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
    this.$modal.addEventListener("click", this.closeModal.bind(this));
    this.$resetButton.addEventListener("click", () => {
      this.onRestart();
      this.closeModal();
    });
  }

  setState({ isVisible, lottoTickets, winningNumber }) {
    this.isVisible = isVisible ?? this.isVisible;
    this.lottoTickets = lottoTickets ?? this.lottoTickets;
    this.winningNumber = winningNumber ?? this.winningNumber;
  }

  showModal(e) {
    e.preventDefault();
    this.setState({ isVisible: true });
  }

  closeModal() {
    this.setState({ isVisible: false });
  }


}
