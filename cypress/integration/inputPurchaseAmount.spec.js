import { ALERT_MESSAGE, LOTTO_PRICE } from "../../src/js/utils/constants.js";

describe("구매 금액 입력", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("input 창에 문자열을 입력 시 값이 입력되지 않는다.", () => {
    cy.get("[data-purchase-form='input']").type("abc");
    cy.get("[data-purchase-form='input']").should("have.text", "");
  });

  it("입력된 금액이 1000원 미만의 금액이 입력된 경우 클릭하더라도 로또를 구매할 수 없다.", () => {
    const purchaseAmount = Math.floor(Math.random() * 1000);
    cy.get("[data-purchase-form='input']").type(purchaseAmount);
    cy.get("[data-purchase-form='button']").click();
    cy.get("[data-purchased-lotto='section']").should(
      "have.css",
      "display",
      "none"
    );
  });
  it("입력된 금액이 1000원 초과일 경우, 1000 단위로 나누어 떨어지지 않는다면 alert로 거스름돈 금액을 알려주고 구매한 로또는 표시한다.", () => {
    const MIN = 1001;
    const MAX = 1999;
    const amountWithChange = Math.floor(Math.random() * (MAX - MIN)) + MIN;
    const change = amountWithChange % LOTTO_PRICE;
    const alertStub = cy.stub();

    cy.on("window:alert", alertStub);
    cy.get("[data-purchase-form='input']")
      .type(amountWithChange)
      .type("{enter}")
      .then(() => {
        if (change > 0) {
          const actualMessage = alertStub.getCall(0).lastArg;
          expect(actualMessage).to.equal(
            ALERT_MESSAGE.PURCHASE_AMOUNT_HAS_CHANGE(change)
          );
        }
      });
  });
  it("입력된 금액이 로또 주문 금액으로 나눠질 경우, 확인 버튼을 누름과 동시에 로또 구매가 가능하다.", () => {
    const MIN = 1000;
    const MAX_COUNT = 100;
    const purchaseAmount = Math.floor(Math.random() * MAX_COUNT) * 1000 + MIN;
    cy.get("[data-purchase-form='input']").type(purchaseAmount).type("{enter}");
    cy.get("[data-purchased-lotto='section']").should("be.visible");
  });
});
