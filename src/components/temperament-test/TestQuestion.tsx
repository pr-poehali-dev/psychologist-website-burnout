import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { eysenckQuestions } from './testData';

interface TestQuestionProps {
  currentQuestion: number;
  answers: (string | null)[];
  onAnswer: (value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const TestQuestion = ({ currentQuestion, answers, onAnswer, onNext, onPrevious }: TestQuestionProps) => {
  const progress = ((currentQuestion + 1) / eysenckQuestions.length) * 100;
  const isLastQuestion = currentQuestion === eysenckQuestions.length - 1;
  const question = eysenckQuestions[currentQuestion];

  const options = question.answer === 'people' 
    ? [
        { text: 'Найти в книге', value: 'book' },
        { text: 'Спросить у людей', value: 'people' }
      ]
    : [
        { text: 'Да', value: 'yes' },
        { text: 'Нет', value: 'no' }
      ];

  return (
    <section id="temperament-test" className="py-20 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
            <Icon name="User" size={32} className="text-purple-600" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Тест на темперамент
          </h2>
          <p className="text-gray-600 mb-2">
            Опросник Айзенка для определения типа темперамента
          </p>
          <div className="text-sm text-gray-500">
            Вопрос {currentQuestion + 1} из {eysenckQuestions.length}
          </div>
        </div>

        <Card className="shadow-xl border-2 border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="mb-4">
              <Progress value={progress} className="h-3" />
            </div>
            <CardTitle className="text-2xl text-center">
              {question.text}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <RadioGroup
              value={answers[currentQuestion] || ''}
              onValueChange={onAnswer}
              className="space-y-4"
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-purple-50 ${
                    answers[currentQuestion] === option.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200'
                  }`}
                >
                  <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                  <Label
                    htmlFor={`option-${option.value}`}
                    className="flex-1 cursor-pointer text-lg"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-3 mt-8">
              <Button
                onClick={onPrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="flex-1"
              >
                <Icon name="ChevronLeft" size={20} className="mr-2" />
                Назад
              </Button>
              <Button
                onClick={onNext}
                disabled={!answers[currentQuestion]}
                className="flex-1"
              >
                {isLastQuestion ? 'Завершить тест' : 'Далее'}
                <Icon name="ChevronRight" size={20} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TestQuestion;
