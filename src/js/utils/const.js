export const NUM = Object.freeze({
  LOTTO_PRICE: 1000,
  LOTTO_NUM_COUNT: 6,
  LOTTO_MIN_NUMBER: 1,
  LOTTO_MAX_NUMBER: 45,
});

export const MESSAGE = Object.freeze({
  ALERT_LOTTO_PRICE: "로또 구입 금액을 1,000원 단위로 입력해 주세요.",
  ALERT_WINNING_NUMBER_RANGE: "",
  ALERT_LOTTO_DUPLICATED_NUMBER:
    "로또 번호에는 중복된 숫자를 입력할 수 없습니다.",
});

export const VALUE = Object.freeze({
  HIT_COUNT: {
    NONE: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
  },

  WINNING_RANK: {
    NONE: 0,
    FIRST: 1,
    SECOND: 2,
    THIRD: 3,
    FOURTH: 4,
    FIFTH: 5,
  },

  WINNING_PRICE: {
    FIRST: 2000000000,
    SECOND: 30000000,
    THIRD: 1500000,
    FOURTH: 50000,
    FIFTH: 5000,
    NONE: 0,
  },
});
