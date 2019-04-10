import { Component, OnInit } from '@angular/core';
import { Question } from './question';
import { Difficulty } from './difficulty.enum';
import { GameType } from "./gameType.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.assertIfFullScreenAvailable();
  }

  title = 'eklee-mathgame';
  isFullScreen: boolean = false;
  answer: string = "";
  score: number = 0;
  questions: Question[] = [];
  maxQuestions: number = 10;
  showResult: boolean = false;
  difficulty: Difficulty = Difficulty.Easy;
  showGamesDialog: boolean = true;
  gameType: GameType;

  click(number: number): void {
    this.answer += number.toString();
  }

  clear(): void {
    this.answer = "";
  }

  submit(): void {

    if (this.answer === "") {
      return;
    }

    let question = this.questions[this.questions.length - 1];
    question.answer(parseInt(this.answer));
    this.answer = "";

    if (question.correct()) {
      this.score += 1;
    }

    console.log("Qns=" + this.questions.length + ",max=" + this.maxQuestions);
    if (this.questions.length === this.maxQuestions) {
      this.showResult = true;
    } else {

      let nextQuestion: Question = null;

      while (nextQuestion === null) {
        nextQuestion = new Question(this.difficulty, this.gameType);
        let isAsked = nextQuestion.theQuestion;
        let found = this.questions.filter(f => f.theQuestion === isAsked);
        if (found.length > 0) {
          nextQuestion = null;
        }
      }

      this.questions.push(nextQuestion);
    }
  }

  closeResult(): void {
    this.showResult = false;
    this.score = 0;
    this.questions.length = 0;
    this.questions.push(new Question(this.difficulty, this.gameType));
  }

  private _fullScreenMethod: any;

  private assertIfFullScreenAvailable(): void {
    let elem = document.documentElement;
    this._fullScreenMethod = elem.requestFullscreen ||
      elem['webkitRequestFullScreen'] || elem['mozRequestFullscreen']
      ||
      elem['msRequestFullscreen'];

    if (!this._fullScreenMethod) {
      this.isFullScreen = true;
    }
  }

  fullScreen(): void {

    if (this._fullScreenMethod) {
      this._fullScreenMethod.call(document.documentElement);
      this.isFullScreen = true;
    }
  }

  setDifficulty(value: string): void {
    switch (value) {
      case "normal":
        this.difficulty = Difficulty.Normal;
        break;

      case "easy":
        this.difficulty = Difficulty.Easy;
        break;

      case "hard":
        this.difficulty = Difficulty.Hard;
        break;
    }
    this.closeResult();
  }

  selectGame(gameType: string): void {

    switch (gameType) {
      case "addition":
        this.gameType = GameType.Addition;
        break;

      case "subtraction":
        this.gameType = GameType.Subtraction;
        break;
    }
    this.showGamesDialog = false;
    this.questions.push(new Question(this.difficulty, this.gameType));
  }

  newGame(): void {
    this.score = 0;
    this.questions.length = 0;
    this.showGamesDialog = true;
  }
}
