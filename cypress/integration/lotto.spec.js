describe("lotto-domain-test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // key event
  it("input창에 문자열 입력 시 값이 입력되지 않는다. ", () => {
    cy.get("#purchase-amount-input").type("a");
    cy.get("#purchase-amount-input").should("have.value", "");
  });
  it("input창에 특수문자 입력 시 값이 입력되지 않는다. ", () => {
    cy.get("#purchase-amount-input").type("-");
    cy.get("#purchase-amount-input").should("have.value", "");
  });

  it("엔터 키 입력 시 로또 구입 금액이 1000 단위가 아닌 경우 alert 경고를 띄운다. ", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get("#purchase-amount-input")
      .type("1100{enter}")
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "로또 구입 금액을 1,000원 단위로 입력해 주세요."
        );
      });
  });

  it("엔터 키 입력 시 로또 구입 금액이 1000 단위가 아닌 경우 input값을 비운다. ", () => {
    cy.get("#purchase-amount-input")
      .type("1100{enter}")
      .then(() => {
        expect(cy.get("#purchase-amount-input").should("have.value", ""));
      });
  });

  it("엔터 키 입력 시 로또 UI의 <label>에 로또 구입 금액의 1000 단위 개수를 띄운다.", () => {
    cy.get("#purchase-amount-input").type(`10000{enter}`);
    cy.get("#issuance-label").should("have.text", "총 10개를 구매하였습니다.");
  });

  it("엔터 키 입력 시 로또 UI가 갱신된다.", () => {
    cy.get("#purchase-amount-input").type(`10000{enter}`);
    cy.get("#purchase-amount-input").type(`90000{enter}`);
    cy.get("#issuance-label").should("have.text", "총 10개를 구매하였습니다.");
  });

  // click event
  it("확인버튼 클릭 시 로또 구입 금액이 1000 단위가 아닌 경우 alert 경고를 띄운다. ", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get("#purchase-amount-input").type("1100");
    cy.get("#purchase-amount-result-button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "로또 구입 금액을 1,000원 단위로 입력해 주세요."
        );
      });
  });
  it("확인버튼 클릭 시 로또 구입 금액이 1000 단위가 아닌 경우 input값을 비운다. ", () => {
    cy.get("#purchase-amount-input").type("1100");
    cy.get("#purchase-amount-result-button")
      .click()
      .then(() => {
        expect(cy.get("#purchase-amount-input").should("have.value", ""));
      });
  });
  it("확인버튼 클릭 시 로또 UI의 <label>에 로또 구입 금액의 1000 단위 개수를 띄운다.", () => {
    cy.get("#purchase-amount-input").type(10000);
    cy.get("#purchase-amount-result-button").click();
    cy.get("#issuance-label").should("have.text", "총 10개를 구매하였습니다.");
  });

  // key event
  it("로또 금액 입력 후 엔터 키 입력 시 번호보기 토글 상태를 초기화한다. ", () => {});
  it("로또 <span> UI의 당첨 번호가 띄워진 상태에서 로또 금액 입력 후 엔터 키 입력 시 번호보기 토글 상태를 초기화한다. ", () => {});

  //click event
  it("로또 금액 입력 후 확인버튼 클릭 시 번호보기 토글 상태를 초기화한다. ", () => {});
  it("로또 <span> UI의 당첨 번호가 띄워진 상태에서 로또 금액 입력 후 확인버튼 클릭 시 번호보기 토글 상태를 초기화한다. ", () => {});

  it("로또 <span> UI의 당첨 번호는 1부터 45 사이 값이다. ", () => {}); // check : 보이지 않아도 체크, random number
  it("로또 <span> UI의 당첨 번호는 티켓 별 중복 숫자가 없다. ", () => {});
});

describe("lotto-ui-test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // default
  it("초기 로드 시 로또 UI가 노출되지 않는다.", () => {
    cy.get("#issuance-result").should("be.not.visible");
    cy.get("#winning-number-form").should("be.not.visible");
  });
  it("로또 금액 입력값이 없는 경우 placeholder에 '구입 금액' 텍스트가 보여진다.", () => {
    cy.reload();
    cy.get("#purchase-amount-input").should(
      "have.attr",
      "placeholder",
      "구입 금액"
    );
    cy.get("#purchase-amount-input").should("have.value", "");
  });
  it("엔터 키 입력 시 input 값이 없는 경우 로또 UI를 띄우지 않는다. ", () => {
    cy.reload();
    cy.get("#purchase-amount-input").type(`{enter}`);
    cy.get("#issuance-result").should("be.not.visible");
  });
  it("확인버튼 클릭 시 input 값이 없는 경우 로또 UI를 띄우지 않는다. ", () => {
    cy.reload();
    cy.get("#purchase-amount-result-button").click();
    cy.get("#issuance-result").should("be.not.visible");
  });

  // key 입력 시
  it("엔터 키 입력 시 로또 UI를 띄운다. ", () => {
    cy.get("#purchase-amount-input").type(`1000{enter}`);
    cy.get("#issuance-result").should("be.visible");
  });
  it("엔터 키 입력 시 로또 구입 금액의 1000 단위 개수만큼 로또 <span> UI를 띄운다. ", () => {
    cy.get("#purchase-amount-input").type(`4000{enter}`);
    cy.get("#issuance-lotto-tickets").children("li").should("have.length", 4);
  });

  // click 시
  it("확인버튼 클릭 시 로또 UI를 띄운다. ", () => {
    cy.get("#purchase-amount-input").type(1000);
    cy.get("#purchase-amount-result-button").click();
    cy.get("#issuance-result").should("be.visible");
  });
  it("확인버튼 클릭 시 로또 구입 금액의 1000 단위 개수만큼 로또 <span> UI를 띄운다. ", () => {
    cy.get("#purchase-amount-input").type(4000);
    cy.get("#purchase-amount-result-button").click();
    cy.get("#issuance-lotto-tickets").children("li").should("have.length", 4);
  });

  it("번호보기 토글 시 로또 <span> UI의 당첨 번호 숫자를 띄운다.", () => {
    cy.get("#purchase-amount-input").type(1000);
    cy.get("#purchase-amount-result-button").click();
    cy.get(".text-base").click();
    cy.get(".lotto-detail").should("be.visible");
  });
  it("번호보기 토글 시 로또 <span> UI의 당첨 번호 숫자를 가린다.", () => {
    cy.get("#purchase-amount-input").type(1000);
    cy.get("#purchase-amount-result-button").click();
    cy.get(".text-base").click();
    cy.get(".text-base").click();
    cy.get(".lotto-detail").should("be.not.visible");
  });
});
