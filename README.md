<p align="middle" >
  <img width="200px;" src="./src/images/lotto_ball.png"/>
</p>
<h2 align="middle">행운의 로또</h2>
<p align="middle">자바스크립트로 구현하는 로또 어플리케이션</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

<p align="middle">
  <a href="https://next-step.github.io/js-lotto">🖥️ 데모 링크</a>
</p>

## 🔥 Projects!

<p align="middle">
  <img width="400" src="./src/images/lotto_ui.png">
</p>

<br>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br/>

## 구현 기능
## 1단계 - 구현기능 목록
- 로또 구입 금액을 입력 받는다. <br/>
  - [x] 최소 화폐단위 미만의 자리수가 포함된 경우 알림
  - [x] 1000원 미만의 금액이 입력될 경우 알림
  - [x] 1000원 초과 및 1000원으로 나누어 떨어지지 않을 경우 alert로 거스름돈 금액을 알려주고 구매 진행
- 금액으로 살 수 있는 개수만큼 로또 발급 <br/>
  - [x] 모든 로또는 자동구매 옵션으로 발급한다.
  - [x] 로또 한 장 당 번호의 개수는 6개로 한다.
  - [x] 번호는 1 - 45 사이의 랜덤 값으로 구성한다.
  - [x] 각 번호는 서로 중복되지 않는다.
  - [x] 각 번호는 오름차순으로 정렬되어 있다.
- 번호보기 토글 버튼을 통해 로또 번호 표시여부를 결정할 수 있다. <br/>
  - [x] 최초 번호보기 option은 false이다.
  - [x] 번호보기 버튼을 누를 경우 구매한 로또의 번호가 나타난다.
  - [x] 다시 한번 누를 경우 번호가 나타나지 않는다.
  - [x] 새로 금액을 입력하여 로또를 구매할 경우 번호보기는 다시 false가 된다.
<hr />

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br/>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/next-step/js-lotto/issues)에 등록해주세요.

<br/>

## 📝 License

This project is [MIT](https://github.com/next-step/js-lotto/blob/main/LICENSE) licensed.
