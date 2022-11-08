const { Console, Random } = require('@woowacourse/mission-utils');

class App {
  constructor(guessNum) {
    this.guessNum = this.generateGuessNum();
  }
  generateGuessNum() {
    const computer = [];
    while (computer.length < 3) {
      const number = Random.pickNumberInRange(1, 9);
      if (!computer.includes(number)) {
        computer.push(number);
      }
    }
    return computer;
  }
  play() {
    Console.print('숫자 야구 게임을 시작합니다');
    this.getInput();
  }
  getInput() {
    Console.print(`=== 테스트용 정답 : ${this.guessNum} ===`);
    Console.readLine('숫자를 입력해주세요 : ', (answer) => {
      const userNumbers = answer.split('');
      if (this.checkInput(userNumbers)) {
        this.gameProceed(userNumbers, this.guessNum);
      }
    });
  }

  checkInput(input) {
    input.forEach((el) => {
      if (isNaN(parseInt(el)) || el === 0) {
        throw new RangeError();
      }
    });
    if (input.length !== 3) {
      throw new RangeError();
    }
    if (new Set(input).size !== 3) {
      throw new RangeError();
    }
    return true;
  }

  gameProceed(userNumbers, guessNum) {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < guessNum.length; i++) {
      const index = userNumbers.indexOf(guessNum[i].toString());
      if (index === i) {
        strike += 1;
      }
      if (index !== -1 && index !== i) {
        ball += 1;
      }
    }
    this.printScore(strike, ball);
    if (this.guessNum.join('') === userNumbers.join('')) {
      return this.printWin();
    }
    this.getInput();
  }

  printScore(strike, ball) {
    if (ball === 0 && strike === 0) {
      return Console.print('낫싱');
    }
    if (strike === 0) {
      return Console.print(`${ball}볼`);
    }
    if (ball === 0) {
      return Console.print(`${strike}스트라이크`);
    }
    return Console.print(`${ball}볼 ${strike}스트라이크`);
  }

  printWin() {
    Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
    Console.readLine(
      '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n',
      (answer) => {
        switch (answer) {
          case '1':
            this.guessNum = this.generateGuessNum();
            this.getInput();
            break;
          case '2':
            Console.close();
            break;
          default:
            this.printWin();
        }
      }
    );
  }
}

const app = new App();
app.play();
module.exports = App;
