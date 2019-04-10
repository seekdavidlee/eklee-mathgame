import { Difficulty } from './difficulty.enum';
import { GameType } from './gameType.enum';

export class Question {

    private _gameType: GameType;
    private _difficulty: Difficulty;

    constructor(difficulty: Difficulty, gameType: GameType) {

        this._gameType = gameType;
        this._difficulty = difficulty;

        this.init();
    }

    init(): void {

        let min: number;
        let max: number;

        switch (this._difficulty) {
            case Difficulty.Easy:
                min = 1;
                max = 9
                break;

            case Difficulty.Normal:
                min = 1;
                max = 99
                break;

            case Difficulty.Hard:
                min = 1;
                max = 999
                break;
        }

        this.number1 = this.randomIntFromInterval(min, max);
        this.number2 = this.randomIntFromInterval(min, max);

        if (this._gameType == GameType.Subtraction) {
            if (this.number1 < this.number2) {
                let temp = this.number1;
                this.number1 = this.number2;
                this.number2 = temp;
            }
        }

        this.theQuestion = this.getQuestion();
    }

    number1: number;
    number2: number;
    theAnswer: number = null;
    theQuestion: string;

    randomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    answer(answer: number): void {
        this.theAnswer = answer;
    }

    correct(): boolean {
        if (this._gameType == GameType.Subtraction) {
            return this.theAnswer === (this.number1 - this.number2);
        }
        return this.theAnswer === (this.number1 + this.number2);
    }

    private getQuestion(): string {

        let compare: string;

        if (this._gameType == GameType.Addition) {
            compare = "+";
        }

        if (this._gameType == GameType.Subtraction) {
            compare = "-";
        }

        return this.number1 + " " + compare + " " + this.number2;
    }
}
