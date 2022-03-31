import {
  LOTTO_MAX_NUMBER,
  LOTTO_PRICE,
  WINNING_NUMBER_CHECK_MESSAGE,
} from "../../src/js/utils/constants";
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
describe("당첨 번호 입력 검사", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.submitValue(true);
  });

  it("로또를 구매하면 당첨번호를 입력할 수 있는 창이 나타난다.", () => {
    cy.get("[data-winning-number='form']").should("be.visible");
  });

  it("당첨번호를 입혁할 수 있는 창이 나타날 경우, 결과 확인 버튼이 비활성화 되어 있다.", () => {
    cy.get('[data-button="modal-open-button"]').should("be.disabled");
  });

  it("당첨번호를 2자리 이상 입력할 경우 마지막 input을 제외하고 다음 input으로 이동한다.", () => {
    const inValidWinningNumberList = [12, 22, 23, 25, 26];
    cy.get('[data-input="winning-number-input"]')
      .then(($inputList) => {
        return $inputList.slice(0, 4);
      })
      .each(($el, index) => {
        cy.wrap($el).type(inValidWinningNumberList[index]);
        cy.wrap($el).next().should("have.focus");
      });
  });

  it("6개의 당첨번호와 1개의 보너스 번호가 모두 정상 입력되어야 결과 확인 버튼이 활성화된다.", () => {
    const winningNumberList = [1, 2, 3, 4, 5, 6];
    const inValidBonusNumber = 7;
    const { LESS_THEN_LENGTH } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('[data-input="winning-number-input"]').each(($el, index) => {
      cy.wrap($el).type(winningNumberList[index]);
      cy.get('[data-button="modal-open-button"]').should("be.disabled");
      cy.get('[data-winning-number="check-message"]').should(
        "have.text",
        LESS_THEN_LENGTH
      );
      cy.get('[data-winning-number="check-message"]').should(
        "have.class",
        "text-red"
      );
    });
    cy.get('[data-winning-number="bonus-number"]').type(inValidBonusNumber);
    cy.get('[data-button="modal-open-button"]').should("not.be.disabled");
  });
  it("입력된 번호가 1~45 범위가 아니면, 입력칸 하단에 재입력 요청 메세지를 표시한다.", () => {
    const inValidWinningNumberList = shuffle([77, 1, 2, 4, 5, 6]);
    const validBonusNumber = 1;
    const { OUT_OF_RANGE } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('[data-input="winning-number-input"]').each(($el, index) => {
      cy.wrap($el).type(inValidWinningNumberList[index]);
      cy.get('[data-button="modal-open-button"]').should("be.disabled");
      if (inValidWinningNumberList[index] > LOTTO_MAX_NUMBER) {
        cy.get('[data-winning-number="check-message"]').should(
          "have.text",
          OUT_OF_RANGE
        );
        cy.get('[data-winning-number="check-message"]').should(
          "have.class",
          "text-red"
        );
      }
    });
    cy.get('[data-winning-number="bonus-number"]').type(validBonusNumber);
    cy.get('[data-button="modal-open-button"]').should("be.disabled");
  });

  it("입력된 번호에 중복값이 존재할 경우, 입력칸 하단에 재입력 요청 메세지를 표시한다.", () => {
    const inValidWinningNumberList = shuffle([9, 12, 23, 25, 23, 33]);
    const bonusNumber = 44;
    const inputNumberList = [];
    const { REDUPLICATED } = WINNING_NUMBER_CHECK_MESSAGE;
    cy.get('[data-input="winning-number-input"]').each(($el, index) => {
      cy.wrap($el).type(inValidWinningNumberList[index]);
      if (inputNumberList.includes(inValidWinningNumberList[index])) {
        cy.get('[data-winning-number="check-message"]').should(
          "have.text",
          REDUPLICATED
        );
        cy.get('[data-winning-number="check-message"]').should(
          "have.class",
          "text-red"
        );
      } else inputNumberList.push(inValidWinningNumberList[index]);
    });
    cy.get('[data-winning-number="bonus-number"]').type(bonusNumber);
    cy.get('[data-button="modal-open-button"]').should("be.disabled");
  });

  it("입력된 번호가 올바를 경우, 입력칸 하단에 결과 확인 가능 메세지를 표시한다.", () => {
    const winningNumberList = shuffle([1, 5, 15, 35, 45, 22]);
    const bonusNumber = 19;
    const { FULFILLED, LESS_THEN_LENGTH } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('[data-input="winning-number-input"]').each(($el, index) => {
      cy.wrap($el).type(winningNumberList[index]);
    });
    cy.get('[data-winning-number="bonus-number"]').type(bonusNumber);
    cy.get('[data-winning-number="check-message"]').should(
      "have.text",
      FULFILLED
    );
    cy.get('[data-winning-number="check-message"]').should(
      "have.class",
      "text-green"
    );
  });

  it("모든 번호가 올바르게 입력된 후 입력한 숫자를 지우면, 입력칸 하단에 재입력 요청 메세지를 표시한다.", () => {
    const winningNumberList = shuffle([1, 5, 15, 35, 45, 22]);
    const bonusNumber = 7;
    const { FULFILLED, LESS_THEN_LENGTH } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('[data-input="winning-number-input"]').each(($el, index) => {
      cy.wrap($el).type(winningNumberList[index]);
    });
    cy.get('[data-winning-number="bonus-number"]').type(bonusNumber);
    cy.get('[data-winning-number="check-message"]').should(
      "have.text",
      FULFILLED
    );
    cy.get('[data-winning-number="bonus-number"]').type("{backspace}");
    cy.get('[data-winning-number="check-message"]').should(
      "have.text",
      LESS_THEN_LENGTH
    );
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

const winningNumberObj = {
  winningNumberList: [1, 2, 3, 4, 5, 6],
  bonusNumber: 7,
};

const inputAndClickModalButton = () => {
  const { winningNumberList, bonusNumber } = winningNumberObj;

  cy.get('[data-input="winning-number-input"]').each(($el, index) => {
    cy.wrap($el).type(winningNumberList[index]);
  });
  cy.get('[data-winning-number="bonus-number"]').type(bonusNumber);
  cy.get('[data-button="modal-open-button"]').click();
};
Cypress.Commands.add("clickModalButton", inputAndClickModalButton);

describe("당첨 결과 모달 검사", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.submitValue(true);
  });

  it("로또 구매 및 당첨 번호 입력을 마치고 결과확인 버튼을 클릭하면 당첨 결과 모달이 표시된다.", () => {
    cy.clickModalButton();
    cy.get('[data-modal="modal-section"]').should("be.visible");
  });
  it("다시 시작하기 버튼을 클릭하면, 모달이 사라지고 화면이 초기화된다.", () => {
    cy.clickModalButton();
    cy.get('[data-reset="reset-button"]').click();
    cy.get('[data-modal="modal-section"]').should("not.be.visible");
    cy.get('[data-winning-number="form"]').should("not.be.visible");
    cy.get('[data-purchase-form="input"]').should("have.text", "");
    cy.get('[data-lotto-number-toggle="button"]').should("not.be.checked");
    cy.get('[data-input="winning-number-input"]').each(($el) => {
      cy.wrap($el).should("have.text", "");
    });
  });
});
