import { LOTTO_PRICE } from "../../src/js/utils/constants";

describe("당첨 번호 입력 검사", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  const MIN = 1;
  const MAX = 100;
  const purchaseAmount =
    (Math.floor(Math.random() * (MAX - MIN)) + MIN) * LOTTO_PRICE;
});
