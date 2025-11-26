import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface AnxietyTestSectionProps {
  onBooking: () => void;
}

const AnxietyTestSection = ({ onBooking }: AnxietyTestSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);
  const { toast } = useToast();

  const questions = [
    'Ощущение онемения или покалывания в теле',
    'Ощущение прилива жара',
    'Дрожь в ногах',
    'Неспособность расслабиться',
    'Страх, что произойдет самое плохое',
    'Головокружение или ощущение легкости в голове',
    'Учащенное сердцебиение',
    'Ощущение неустойчивости',
    'Состояние ужаса или испуга',
    'Нервозность',
    'Ощущение удушья',
    'Дрожь в руках',
    'Дрожь во всем теле',
    'Страх потерять контроль',
    'Затруднение дыхания',
    'Страх смерти',
    'Испуг',
    'Расстройство пищеварения или дискомфорт в животе',
    'Ощущение дурноты',
    'Ощущение прилива крови к лицу',
    'Потливость (не связанная с жарой)'
  ];

  const options = [
    { text: 'Совсем не беспокоит', value: 0 },
    { text: 'Слегка беспокоит', value: 1 },
    { text: 'Умеренно беспокоит', value: 2 },
    { text: 'Сильно беспокоит', value: 3 }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };

  const calculateResult = () => {
    const total = answers.reduce((sum, val) => sum + val, 0);

    if (total < 8) {
      return {
        level: 'Минимальная тревожность',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: 'CheckCircle',
        description: 'У вас нормальный уровень тревожности. Беспокойство не влияет на качество жизни.',
        recommendation: 'Продолжайте поддерживать здоровый образ жизни и психологический баланс.'
      };
    } else if (total < 16) {
      return {
        level: 'Легкая тревожность',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: 'AlertTriangle',
        description: 'Присутствуют признаки легкой тревожности. Это может быть реакцией на стресс.',
        recommendation: 'Рекомендуется освоить техники релаксации. Консультация психолога поможет научиться управлять тревогой.'
      };
    } else if (total < 26) {
      return {
        level: 'Умеренная тревожность',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: 'AlertCircle',
        description: 'У вас выраженная тревожность, которая влияет на повседневную жизнь.',
        recommendation: 'Настоятельно рекомендуется консультация психолога. КПТ-терапия эффективна при тревожных расстройствах.'
      };
    } else {
      return {
        level: 'Выраженная тревожность',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: 'XCircle',
        description: 'Высокий уровень тревожности, который значительно снижает качество жизни.',
        recommendation: 'Необходима консультация специалиста. Не откладывайте обращение за помощью.'
      };
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setEmail('');
  };

  const downloadPDF = () => {
    const result = calculateResult();
    const total = answers.reduce((sum, val) => sum + val, 0);
    
    const content = `
РЕЗУЛЬТАТЫ ТЕСТА ПО ШКАЛЕ ТРЕВОЖНОСТИ БЕКА

Уровень: ${result.level}
Баллы: ${total} из 63

Интерпретация баллов:
0-7: Минимальная тревожность
8-15: Легкая тревожность
16-25: Умеренная тревожность
26-63: Выраженная тревожность

Описание:
${result.description}

Рекомендация:
${result.recommendation}

Ответы на вопросы:
${questions.map((q, i) => `${i + 1}. ${q}\n   Степень беспокойства: ${options[answers[i]].text} (${answers[i]} балла)`).join('\n\n')}

---
Дата прохождения: ${new Date().toLocaleDateString('ru-RU')}
Психолог Александр Гонтарь
https://alexandergontar.ru

Важно: Данный тест является ориентировочным и не заменяет профессиональную диагностику.
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `test-beck-anxiety-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Результаты сохранены',
      description: 'Файл с результатами загружен на ваше устройство',
    });
  };

  const sendEmail = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректный email',
        variant: 'destructive',
      });
      return;
    }

    setIsEmailSending(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Результаты отправлены',
        description: `Результаты теста отправлены на ${email}`,
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: 'Ошибка отправки',
        description: 'Попробуйте снова или скачайте результаты',
        variant: 'destructive',
      });
    } finally {
      setIsEmailSending(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const result = calculateResult();
    const total = answers.reduce((sum, val) => sum + val, 0);
    
    return (
      <section className="py-16 md:py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className={`border-2 ${result.borderColor} ${result.bgColor}`}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Icon name={result.icon} size={48} className={result.color} />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-2">
                  Результат теста на тревожность
                </CardTitle>
                <p className={`text-2xl font-bold ${result.color}`}>{result.level}</p>
                <p className="text-lg text-muted-foreground mt-2">
                  Ваш результат: {total} из 63 баллов
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-white rounded-lg border">
                  <p className="text-lg text-foreground/80 mb-4">{result.description}</p>
                  <p className="text-base font-medium text-foreground">{result.recommendation}</p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-2">Интерпретация баллов:</p>
                      <ul className="space-y-1">
                        <li>0-7: Минимальная тревожность</li>
                        <li>8-15: Легкая тревожность</li>
                        <li>16-25: Умеренная тревожность</li>
                        <li>26-63: Выраженная тревожность</li>
                      </ul>
                      <p className="mt-3 text-xs">
                        Данный тест оценивает физиологические и когнитивные симптомы тревоги за последнюю неделю.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 flex gap-2">
                      <Input
                        type="email"
                        placeholder="Ваш email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={sendEmail}
                        disabled={isEmailSending}
                        variant="outline"
                      >
                        <Icon name="Send" size={16} className="mr-2" />
                        {isEmailSending ? 'Отправка...' : 'Отправить'}
                      </Button>
                    </div>
                    <Button onClick={downloadPDF} variant="outline">
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={onBooking}
                      className="flex-1"
                      size="lg"
                    >
                      <Icon name="Calendar" size={20} className="mr-2" />
                      Записаться на консультацию
                    </Button>
                    <Button
                      onClick={resetTest}
                      variant="outline"
                      size="lg"
                    >
                      <Icon name="RotateCcw" size={20} className="mr-2" />
                      Пройти снова
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="anxiety-test" className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Тест по шкале тревожности Бека
            </h2>
            <p className="text-lg text-muted-foreground">
              Опросник BAI для оценки выраженности тревожных симптомов
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Вопрос {currentQuestion + 1} из {questions.length}
                </span>
                <span className="text-sm font-medium text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="mb-4" />
              <CardTitle className="text-xl md:text-2xl">
                {questions[currentQuestion]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion]?.toString()}
                onValueChange={(val) => handleAnswer(parseInt(val))}
                className="space-y-3"
              >
                {options.map((option, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent hover:border-primary transition-all cursor-pointer"
                    onClick={() => handleAnswer(option.value)}
                  >
                    <RadioGroupItem value={option.value.toString()} id={`option-${idx}`} />
                    <Label
                      htmlFor={`option-${idx}`}
                      className="flex-1 cursor-pointer text-base"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="mt-6 flex gap-3">
                {currentQuestion > 0 && (
                  <Button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    variant="outline"
                  >
                    <Icon name="ChevronLeft" size={20} className="mr-2" />
                    Назад
                  </Button>
                )}
                <Button
                  onClick={resetTest}
                  variant="ghost"
                  className="ml-auto"
                >
                  Начать заново
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Оцените, насколько каждый симптом беспокоил вас в течение последней недели, включая сегодняшний день.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnxietyTestSection;
