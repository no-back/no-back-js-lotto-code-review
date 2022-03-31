import {
  LOTTO_MAX_NUMBER,
  LOTTO_PRICE,
  WINNING_NUMBER_CHECK_MESSAGE,
} from "../../src/js/utils/constants";

describe("당첨 번호 입력 검사", () => {
  const MIN = 1;
  const MAX = 100;
  const validPurchaseAmount =
    (Math.floor(Math.random() * (MAX - MIN)) + MIN) * LOTTO_PRICE;
  const inValidPurchaseAmount = Math.floor(Math.random() * 1000);
  const inputPurchaseAmount = (bool) => {
    if (bool) {
      cy.get("[data-purchase-form='input']")
        .type(validPurchaseAmount)
        .type("{enter}");
    } else {
      cy.get("[data-purchase-form='input']")
        .type(inValidPurchaseAmount)
        .type("{enter}");
    }
  };
  Cypress.Commands.add("submitValue", (bool) => inputPurchaseAmount(bool));
  beforeEach(() => {
    cy.visit("/");
    cy.submitValue(true);
  });

  

});

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    const randomPosition = Math.floor(Math.random() * (index + 1));
    const temporary = array[index];
    array[index] = array[randomPosition];
    array[randomPosition] = temporary;
  }
  return array;
}
