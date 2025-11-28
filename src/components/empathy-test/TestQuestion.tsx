import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { empathyQuestions } from './testData';

interface TestQuestionProps {
  currentQuestion: number;
  answers: number[];
  onAnswer: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const TestQuestion = ({ currentQuestion, answers, onAnswer, onNext, onPrevious }: TestQuestionProps) => {
  const progress = ((currentQuestion + 1) / empathyQuestions.length) * 100;
  const isLastQuestion = currentQuestion === empathyQuestions.length - 1;

  const options = [
    { text: 'Не знаю', value: 0 },
    { text: 'Никогда или нет', value: 1 },
    { text: 'Иногда', value: 2 },
    { text: 'Часто', value: 3 },
    { text: 'Почти всегда', value: 4 },
    { text: 'Всегда или да', value: 5 }
  ];

  return (
    <section id="empathy-test" className="py-20 px-4 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-teal-100 rounded-full mb-4">
            <Icon name="Heart" size={32} className="text-teal-600" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Тест на эмпатию
          </h2>
          <p className="text-gray-600 mb-2">
            Методика диагностики уровня эмпатических способностей В.В. Бойко
          </p>
          <div className="text-sm text-gray-500">
            Вопрос {currentQuestion + 1} из {empathyQuestions.length}
          </div>
        </div>

        <Card className="shadow-xl border-2 border-teal-100">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
            <div className="mb-4">
              <Progress value={progress} className="h-3" />
            </div>
            <CardTitle className="text-2xl text-center">
              {empathyQuestions[currentQuestion].text}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-center text-gray-600 mb-6">
              Оцените, насколько это утверждение соответствует вашему поведению
            </p>
            
            <RadioGroup
              value={answers[currentQuestion]?.toString()}
              onValueChange={(value) => onAnswer(parseInt(value))}
              className="space-y-3"
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-teal-50 ${
                    answers[currentQuestion] === option.value
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200'
                  }`}
                >
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                  <Label
                    htmlFor={`option-${option.value}`}
                    className="flex-1 cursor-pointer text-base"
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
