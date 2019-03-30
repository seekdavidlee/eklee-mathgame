import { Component, OnInit } from '@angular/core';
import { Question } from './question';
import { Difficulty } from './difficulty.enum';

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

  constructor() {
    this.questions.push(new Question(this.difficulty));
  }

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

    if (this.questions.length === this.maxQuestions) {
      this.showResult = true;
    } else {
      this.questions.push(new Question(this.difficulty));
    }
  }

  closeResult(): void {
    this.showResult = false;
    this.score = 0;
    this.questions.length = 0;
    this.questions.push(new Question(this.difficulty));
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

  setDifficulty(value: any): void {
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
}
