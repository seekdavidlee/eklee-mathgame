import { Question } from './question';
import { Difficulty } from './difficulty.enum';

describe('Question', () => {
  it('should create an instance', () => {
    expect(new Question(Difficulty.Easy)).toBeTruthy();
  });
});
