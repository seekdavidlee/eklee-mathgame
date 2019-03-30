import { Difficulty } from './difficulty.enum';

export class Question {

    constructor(difficulty: Difficulty) {

        let min: number;
        let max: number;

        switch (difficulty) {
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
    }

    number1: number;
    number2: number;
    theAnswer: number = null;

    randomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    answer(answer: number): void {
        this.theAnswer = answer;
    }

    correct(): boolean {
        return this.theAnswer === (this.number1 + this.number2);
    }
}
