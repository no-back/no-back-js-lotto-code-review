import {
  ALERT_MESSAGE,
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_NUMBERS_LENGTH,
  LOTTO_PRICE,
  PURCHASED_QUANTITY_MESSAGE,
} from "../../src/js/utils/constants.js";

describe("구매한 로또 UI Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  const MIN = 1;
  const MAX = 100;
  const purchaseAmount =
    (Math.floor(Math.random() * (MAX - MIN)) + MIN) * LOTTO_PRICE;
  const countOfLotto = purchaseAmount / LOTTO_PRICE;

  const newPurchaseAmount =
    (Math.floor(Math.random() * (MAX - MIN)) + MIN) * LOTTO_PRICE;
  const newCountOfLotto = newPurchaseAmount / LOTTO_PRICE;

  it("로또를 구입한 후 입력된 로또 구입 금액으로 발급한 로또에 관란 섹션이 화면에 표시한다.", () => {
    cy.get(".purchase-form__input").type(purchaseAmount).type("{enter}");
    cy.get(".purchased-lotto-section")
      .should("have.css", "display", "block")
      .and("be.visible");
  });

  it("발급한 로또의 개수가 일치한다.", () => {
    cy.get(".purchase-form__input").type(purchaseAmount).type("{enter}");
    cy.get(".purchased-lotto-label").should(
      "have.text",
      PURCHASED_QUANTITY_MESSAGE(countOfLotto)
    );
    cy.get(".lotto-ticket-container > li").should("have.length", countOfLotto);
  });

  it("로또를 구입한 후 입력된 로또 구입 금액으로 발급한 로또를 화면에 표시한다.", () => {
    cy.get(".purchase-form__input").type(purchaseAmount).type("{enter}");
    cy.get(".purchased-lotto-label").should(
      "have.text",
      PURCHASED_QUANTITY_MESSAGE(countOfLotto)
    );
  });

  it("로또를 구입한 후 번호보기 토글은 false 상태이다.", () => {
    cy.get(".purchase-form__input").type(purchaseAmount).type("{enter}");
    cy.get(".lotto-numbers-toggle-button").should("not.be.checked");
  });

  it("번호보기 토글이 비활성화되어 있는 상태에서 토글을 누르면, 로또 아이콘이 세로로 배치되고 로또 번호가 표시된다.", () => {
    cy.get(".purchase-form__input").type(purchaseAmount).type("{enter}");
    cy.get(".switch").click();
    cy.get(".lotto-numbers-toggle-button").should("be.checked");
    cy.get(".lotto-ticket-container").should("have.class", "flex-col");
    cy.get(".lotto-numbers").should("be.visible");
  });
  it("표시된 로또 번호의 개수, 중복여부, 범위를 검사한다", () => {
    cy.get(".purchase-form__input").type(purchaseAmount).type("{enter}");
    cy.get(".switch").click();
    cy.get(".lotto-numbers").each(($lotto) => {
      const lottoNumbers = $lotto.text().split(",");
      expect(lottoNumbers.length).to.be.equal(LOTTO_NUMBERS_LENGTH);
      expect(lottoNumbers.length).to.be.equal(new Set(lottoNumbers).size);
      lottoNumbers.forEach((lottoNumber) => {
        expect(+lottoNumber).to.be.within(LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER);
      });
    });
  });

  it("로또를 재구입할 경우 기존의 구매한 로또를 삭제하고 새로 구매한 로또를 보여준다.", () => {
    cy.get(".purchase-form__input").type(purchaseAmount).type("{enter}");
    cy.get(".purchase-form__input").clear();
    cy.get(".purchase-form__input").type(newPurchaseAmount).type("{enter}");
    cy.get(".purchased-lotto-label").should(
      "have.text",
      PURCHASED_QUANTITY_MESSAGE(newCountOfLotto)
    );
  });
  it("로또를 재구입할 경우 번호보기 토글 버튼은 초기화 된다.", () => {
    cy.get(".purchase-form__input").type(purchaseAmount).type("{enter}");
    cy.get(".switch").click();
    cy.get(".purchase-form__input").clear();
    cy.get(".purchase-form__input").type(newPurchaseAmount).type("{enter}");
    cy.get(".lotto-numbers-toggle-button").should("not.be.checked");
  });
});
