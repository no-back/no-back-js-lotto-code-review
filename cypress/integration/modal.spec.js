import { MESSAGE } from "../../src/js/utils/const.js";

describe("winning-result-modal-test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const initLotto = () => {
    cy.get("#purchase-amount-input").type(`5000{enter}`);
  };

  const checkTypeEvent = (type) => {
    if (type == "correct")
      cy.get(".winning-number").first().type("1011121314151617");
    else if (type == "outOfRange")
      cy.get(".winning-number").first().type("10111213141550");
    else if (type == "duplicatedValue")
      cy.get(".winning-number").first().type("10111213141510");
  };

  it("당첨 번호 입력창은 세 자리 숫자 이상 입력할 수 없다. ", () => {
    initLotto();
    cy.get(".winning-number").first().type("10");
    cy.get(".winning-number").first().type("0");
    cy.get(".winning-number").first().should("have.value", "10");
  });

  it("당첨 번호 입력창은 두 자리 숫자 입력 시 다음 칸으로 focus가 넘어간다. ", () => {
    initLotto();
    cy.get(".winning-number").first().type("100");
    cy.focused().should("have.value", "0");
  });

  it("당첨 번호를 완성하고 결과 확인하기 버튼을 누르면 모달창을 띄운다. ", () => {
    initLotto();
    checkTypeEvent("correct");
    cy.get(".open-result-modal-button").click();
    cy.get(".open").should("exist");
  });

  it("당첨 번호를 완성하지 않고 결과 확인하기 버튼을 누르면 모달창을 띄우지 않는다. ", () => {
    initLotto();
    cy.get(".winning-number").first().type("1");
    cy.get(".open-result-modal-button").click();
    cy.get(".open").should("not.exist");
  });

  it("당첨 번호 입력값이 1~45 사이 값이 아니면 모달창을 띄우지 않는다. ", () => {
    initLotto();
    checkTypeEvent("outOfRange");
    cy.get(".open-result-modal-button").click();
    cy.get(".open").should("not.exist");
  });

  it("당첨 번호 입력창에 중복 숫자가 있는 상태에서 결과 확인하기 버튼을 누르면 alert 창을 띄운다. ", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    initLotto();

    checkTypeEvent("duplicatedValue");
    cy.get(".open-result-modal-button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          MESSAGE.ALERT_LOTTO_DUPLICATED_NUMBER
        );
      });
  });

  it("다시 시작하기 버튼을 누르면 LottoApp 상태를 초기화한다. ", () => {
    initLotto();
    checkTypeEvent("correct");
    cy.get(".open-result-modal-button").click();
    cy.get(".result-reset").click();
    cy.get("#issuance-result").should("not.exist");
  });
});
