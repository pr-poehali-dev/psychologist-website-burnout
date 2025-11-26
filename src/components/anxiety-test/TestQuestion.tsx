import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { baiQuestions, options } from './testData';

interface TestQuestionProps {
  currentQuestion: number;
  answers: number[];
  onAnswer: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const TestQuestion = ({ currentQuestion, answers, onAnswer, onNext, onPrevious }: TestQuestionProps) => {
  const progress = ((currentQuestion + 1) / baiQuestions.length) * 100;
  const isLastQuestion = currentQuestion === baiQuestions.length - 1;

  return (
    <section id="anxiety-test" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <Icon name="ClipboardList" size={32} className="text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Тест тревожности Бека (BAI)
          </h2>
          <p className="text-gray-600 mb-2">
            Beck Anxiety Inventory - стандартизированный опросник для оценки уровня тревожности
          </p>
          <div className="text-sm text-gray-500">
            Вопрос {currentQuestion + 1} из {baiQuestions.length}
          </div>
        </div>

        <Card className="shadow-xl border-2 border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="mb-4">
              <Progress value={progress} className="h-3" />
            </div>
            <CardTitle className="text-2xl text-center">
              {baiQuestions[currentQuestion]}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-center text-gray-600 mb-6">
              Насколько вас беспокоил этот симптом в течение последней недели?
            </p>
            
            <RadioGroup
              value={answers[currentQuestion]?.toString()}
              onValueChange={(value) => onAnswer(parseInt(value))}
              className="space-y-4"
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-blue-50 ${
                    answers[currentQuestion] === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
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
                disabled={answers[currentQuestion] === undefined}
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
