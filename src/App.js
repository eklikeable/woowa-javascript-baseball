const MissionUtils = require('@woowacourse/mission-utils');

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
    // 입력값이 3개가 아닌경우
    if (input.length !== 3) {
      throw new RangeError();
    }
    // 중복값이 있는경우
    if (new Set(input).size !== 3) {
      throw new Error();
    }
    // 숫자가 아닌 값이 입력 될 경우
    input.forEach((el) => {
      if (isNaN(parseInt(el))) {
        throw new TypeError();
      }
    });
    return true;
  }
  gameProceed(userNumbers, guessNum) {}
  printScore(strike, ball) {}

  printWin() {
    MissionUtils.Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
    MissionUtils.Console.readLine(
      '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.',
      (answer) => {
        switch (answer) {
          case '1':
            this.play();
            break;
          case '2':
            MissionUtils.Console.close();
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
