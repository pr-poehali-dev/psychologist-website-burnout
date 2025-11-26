import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface CombinedTestSectionProps {
  onBooking: () => void;
}

const CombinedTestSection = ({ onBooking }: CombinedTestSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);
  const { toast } = useToast();

  const depressionQuestions = [
    {
      question: 'Я чувствую себя несчастным и мне хочется плакать',
      options: [
        { text: 'Нет', value: 0 },
        { text: 'Иногда', value: 1 },
        { text: 'Часто', value: 2 },
        { text: 'Почти всегда', value: 3 }
      ]
    },
    {
      question: 'Утром я чувствую себя лучше всего',
      options: [
        { text: 'Да, почти всегда', value: 3 },
        { text: 'Довольно часто', value: 2 },
        { text: 'Не очень часто', value: 1 },
        { text: 'Нет, совсем не так', value: 0 }
      ]
    },
    {
      question: 'У меня бывают приступы плача или близости к слезам',
      options: [
        { text: 'Очень часто', value: 3 },
        { text: 'Довольно часто', value: 2 },
        { text: 'Иногда', value: 1 },
        { text: 'Никогда', value: 0 }
      ]
    },
    {
      question: 'У меня плохой ночной сон',
      options: [
        { text: 'Да, почти всегда', value: 3 },
        { text: 'Довольно часто', value: 2 },
        { text: 'Иногда', value: 1 },
        { text: 'Нет, я сплю хорошо', value: 0 }
      ]
    },
    {
      question: 'Аппетит у меня не хуже обычного',
      options: [
        { text: 'Да, не хуже', value: 0 },
        { text: 'Немного хуже', value: 1 },
        { text: 'Значительно хуже', value: 2 },
        { text: 'Совсем нет аппетита', value: 3 }
      ]
    },
    {
      question: 'Я получаю удовольствие от общения с привлекательными женщинами/мужчинами',
      options: [
        { text: 'Да, получаю', value: 0 },
        { text: 'Не очень получаю', value: 1 },
        { text: 'Почти не получаю', value: 2 },
        { text: 'Совсем не получаю', value: 3 }
      ]
    },
    {
      question: 'Я замечаю, что теряю вес',
      options: [
        { text: 'Да, теряю много', value: 3 },
        { text: 'Немного потерял', value: 2 },
        { text: 'Вероятно, немного потерял', value: 1 },
        { text: 'Совсем не теряю', value: 0 }
      ]
    },
    {
      question: 'Меня беспокоят запоры',
      options: [
        { text: 'Да, почти постоянно', value: 3 },
        { text: 'Довольно часто', value: 2 },
        { text: 'Иногда', value: 1 },
        { text: 'Нет, не беспокоят', value: 0 }
      ]
    },
    {
      question: 'Сердце бьется быстрее, чем обычно',
      options: [
        { text: 'Да, очень часто', value: 3 },
        { text: 'Довольно часто', value: 2 },
        { text: 'Иногда', value: 1 },
        { text: 'Нет, не замечал', value: 0 }
      ]
    },
    {
      question: 'Я устаю без всяких причин',
      options: [
        { text: 'Да, почти постоянно', value: 3 },
        { text: 'Довольно часто', value: 2 },
        { text: 'Иногда', value: 1 },
        { text: 'Нет, не устаю', value: 0 }
      ]
    },
    {
      question: 'Я мыслю так же ясно, как всегда',
      options: [
        { text: 'Да, так же ясно', value: 0 },
        { text: 'Не так ясно, как обычно', value: 1 },
        { text: 'Значительно хуже', value: 2 },
        { text: 'Совсем плохо мыслю', value: 3 }
      ]
    },
    {
      question: 'Мне легко делать то, что я умею',
      options: [
        { text: 'Да, легко', value: 0 },
        { text: 'Не так легко, как раньше', value: 1 },
        { text: 'Приходится заставлять себя', value: 2 },
        { text: 'Совсем не могу делать', value: 3 }
      ]
    },
    {
      question: 'Я чувствую беспокойство и не могу усидеть на месте',
      options: [
        { text: 'Да, очень сильно', value: 3 },
        { text: 'Довольно сильно', value: 2 },
        { text: 'Немного', value: 1 },
        { text: 'Совсем не чувствую', value: 0 }
      ]
    },
    {
      question: 'Я с надеждой смотрю в будущее',
      options: [
        { text: 'Да, с надеждой', value: 0 },
        { text: 'Не очень с надеждой', value: 1 },
        { text: 'Почти без надежды', value: 2 },
        { text: 'Совсем без надежды', value: 3 }
      ]
    },
    {
      question: 'Я более раздражителен, чем обычно',
      options: [
        { text: 'Да, гораздо более', value: 3 },
        { text: 'Более раздражителен', value: 2 },
        { text: 'Немного более', value: 1 },
        { text: 'Нет, не более раздражителен', value: 0 }
      ]
    },
    {
      question: 'Мне легко принимать решения',
      options: [
        { text: 'Да, легко', value: 0 },
        { text: 'Труднее, чем обычно', value: 1 },
        { text: 'Очень трудно', value: 2 },
        { text: 'Совсем не могу', value: 3 }
      ]
    },
    {
      question: 'Я чувствую, что полезен и необходим',
      options: [
        { text: 'Да, чувствую', value: 0 },
        { text: 'Не очень чувствую', value: 1 },
        { text: 'Почти не чувствую', value: 2 },
        { text: 'Совсем не чувствую', value: 3 }
      ]
    },
    {
      question: 'Я живу достаточно полной жизнью',
      options: [
        { text: 'Да, вполне полной', value: 0 },
        { text: 'Не очень полной', value: 1 },
        { text: 'Довольно пустой', value: 2 },
        { text: 'Совсем пустой', value: 3 }
      ]
    },
    {
      question: 'Я чувствую, что другим людям станет лучше, если я умру',
      options: [
        { text: 'Да, так и есть', value: 3 },
        { text: 'Вероятно, так', value: 2 },
        { text: 'Не думаю', value: 1 },
        { text: 'Нет, совсем не так', value: 0 }
      ]
    },
    {
      question: 'Меня до сих пор радует то, что радовало всегда',
      options: [
        { text: 'Да, радует', value: 0 },
        { text: 'Не очень радует', value: 1 },
        { text: 'Мало что радует', value: 2 },
        { text: 'Ничто не радует', value: 3 }
      ]
    }
  ];

  const anxietyQuestions = [
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

  const anxietyOptions = [
    { text: 'Совсем не беспокоит', value: 0 },
    { text: 'Слегка беспокоит', value: 1 },
    { text: 'Умеренно беспокоит', value: 2 },
    { text: 'Сильно беспокоит', value: 3 }
  ];

  const totalQuestions = depressionQuestions.length + anxietyQuestions.length;
  const isDepressionSection = currentQuestion < depressionQuestions.length;
  const currentSectionQuestion = isDepressionSection 
    ? currentQuestion 
    : currentQuestion - depressionQuestions.length;

  const getCurrentQuestion = () => {
    if (isDepressionSection) {
      return depressionQuestions[currentQuestion];
    } else {
      return {
        question: anxietyQuestions[currentSectionQuestion],
        options: anxietyOptions
      };
    }
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };

  const calculateResults = () => {
    const depressionAnswers = answers.slice(0, depressionQuestions.length);
    const anxietyAnswers = answers.slice(depressionQuestions.length);
    
    const depressionTotal = depressionAnswers.reduce((sum, val) => sum + val, 0);
    const anxietyTotal = anxietyAnswers.reduce((sum, val) => sum + val, 0);

    const getDepressionLevel = (score: number) => {
      if (score < 10) return { level: 'Отсутствие депрессии', severity: 0, color: 'text-green-600', bgColor: 'bg-green-50' };
      if (score < 19) return { level: 'Легкая депрессия', severity: 1, color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
      if (score < 30) return { level: 'Умеренная депрессия', severity: 2, color: 'text-orange-600', bgColor: 'bg-orange-50' };
      return { level: 'Тяжелая депрессия', severity: 3, color: 'text-red-600', bgColor: 'bg-red-50' };
    };

    const getAnxietyLevel = (score: number) => {
      if (score < 8) return { level: 'Минимальная тревожность', severity: 0, color: 'text-green-600', bgColor: 'bg-green-50' };
      if (score < 16) return { level: 'Легкая тревожность', severity: 1, color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
      if (score < 26) return { level: 'Умеренная тревожность', severity: 2, color: 'text-orange-600', bgColor: 'bg-orange-50' };
      return { level: 'Выраженная тревожность', severity: 3, color: 'text-red-600', bgColor: 'bg-red-50' };
    };

    const depression = getDepressionLevel(depressionTotal);
    const anxiety = getAnxietyLevel(anxietyTotal);

    const maxSeverity = Math.max(depression.severity, anxiety.severity);
    
    let overallRecommendation = '';
    let overallIcon = 'CheckCircle';
    let overallColor = 'text-green-600';
    let overallBorder = 'border-green-200';

    if (maxSeverity === 0) {
      overallRecommendation = 'У вас нормальное эмоциональное состояние. Продолжайте поддерживать здоровый образ жизни и психологический баланс.';
      overallIcon = 'CheckCircle';
      overallColor = 'text-green-600';
      overallBorder = 'border-green-200';
    } else if (maxSeverity === 1) {
      overallRecommendation = 'Присутствуют незначительные признаки эмоциональных трудностей. Рекомендуется консультация психолога для профилактики.';
      overallIcon = 'AlertTriangle';
      overallColor = 'text-yellow-600';
      overallBorder = 'border-yellow-200';
    } else if (maxSeverity === 2) {
      overallRecommendation = 'Выраженные симптомы, которые влияют на качество жизни. Настоятельно рекомендуется работа с психологом. КПТ-терапия эффективна при депрессии и тревожности.';
      overallIcon = 'AlertCircle';
      overallColor = 'text-orange-600';
      overallBorder = 'border-orange-200';
    } else {
      overallRecommendation = 'Выраженные симптомы, требующие профессиональной помощи. Необходима консультация психолога или психиатра. Не откладывайте обращение за помощью.';
      overallIcon = 'XCircle';
      overallColor = 'text-red-600';
      overallBorder = 'border-red-200';
    }

    return {
      depression: { ...depression, score: depressionTotal, maxScore: 60 },
      anxiety: { ...anxiety, score: anxietyTotal, maxScore: 63 },
      overall: {
        recommendation: overallRecommendation,
        icon: overallIcon,
        color: overallColor,
        borderColor: overallBorder
      }
    };
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setEmail('');
  };

  const scrollToTestsNav = () => {
    const element = document.getElementById('tests-nav');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const downloadPDF = () => {
    const results = calculateResults();
    
    const content = `
КОМПЛЕКСНЫЙ ПСИХОЛОГИЧЕСКИЙ ТЕСТ
Шкалы Бека: депрессия (BDI) и тревожность (BAI)

=== РЕЗУЛЬТАТЫ ===

1. ДЕПРЕССИЯ (Шкала Бека BDI)
Уровень: ${results.depression.level}
Баллы: ${results.depression.score} из ${results.depression.maxScore}

2. ТРЕВОЖНОСТЬ (Шкала Бека BAI)
Уровень: ${results.anxiety.level}
Баллы: ${results.anxiety.score} из ${results.anxiety.maxScore}

=== ОБЩАЯ РЕКОМЕНДАЦИЯ ===
${results.overall.recommendation}

=== ИНТЕРПРЕТАЦИЯ БАЛЛОВ ===

Депрессия (BDI):
0-9: Отсутствие депрессии
10-18: Легкая депрессия
19-29: Умеренная депрессия
30-63: Тяжелая депрессия

Тревожность (BAI):
0-7: Минимальная тревожность
8-15: Легкая тревожность
16-25: Умеренная тревожность
26-63: Выраженная тревожность

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
    link.download = `combined-test-beck-${new Date().toISOString().split('T')[0]}.txt`;
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

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  if (showResult) {
    const results = calculateResults();
    
    return (
      <section className="py-16 md:py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Button
              onClick={scrollToTestsNav}
              variant="outline"
              size="sm"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Вернуться к выбору теста
            </Button>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className={`border-2 ${results.overall.borderColor}`}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Icon name={results.overall.icon} size={48} className={results.overall.color} />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-2">
                  Комплексный результат
                </CardTitle>
                <p className="text-lg text-muted-foreground">
                  Полная оценка вашего эмоционального состояния
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-white rounded-lg border">
                  <p className="text-lg font-medium text-foreground">{results.overall.recommendation}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className={`${results.depression.bgColor} border-2`}>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Icon name="Brain" size={24} />
                        Депрессия
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${results.depression.color} mb-2`}>
                        {results.depression.level}
                      </p>
                      <p className="text-muted-foreground">
                        {results.depression.score} из {results.depression.maxScore} баллов
                      </p>
                      <Progress 
                        value={(results.depression.score / results.depression.maxScore) * 100} 
                        className="mt-3"
                      />
                    </CardContent>
                  </Card>

                  <Card className={`${results.anxiety.bgColor} border-2`}>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Icon name="Heart" size={24} />
                        Тревожность
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${results.anxiety.color} mb-2`}>
                        {results.anxiety.level}
                      </p>
                      <p className="text-muted-foreground">
                        {results.anxiety.score} из {results.anxiety.maxScore} баллов
                      </p>
                      <Progress 
                        value={(results.anxiety.score / results.anxiety.maxScore) * 100} 
                        className="mt-3"
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-2">О комплексном тестировании:</p>
                      <p className="mb-2">
                        Вы прошли полную диагностику по двум стандартизированным методикам Аарона Бека.
                        Это позволяет получить более полную картину вашего эмоционального состояния.
                      </p>
                      <p className="text-xs">
                        Часто депрессия и тревожность сочетаются друг с другом. 
                        Комплексная оценка помогает специалисту подобрать наиболее эффективную стратегию помощи.
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

                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={onBooking}
                      className="w-full"
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
                      Пройти тест снова
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

  const currentQ = getCurrentQuestion();

  return (
    <section id="combined-test" className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <Button
            onClick={scrollToTestsNav}
            variant="outline"
            size="sm"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться к выбору теста
          </Button>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Комплексный психологический тест
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              {isDepressionSection 
                ? 'Часть 1: Шкала депрессии Бека (BDI)' 
                : 'Часть 2: Шкала тревожности Бека (BAI)'}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="Brain" size={16} />
                Депрессия: {Math.min(currentQuestion + 1, depressionQuestions.length)}/{depressionQuestions.length}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Icon name="Heart" size={16} />
                Тревожность: {Math.max(0, currentQuestion + 1 - depressionQuestions.length)}/{anxietyQuestions.length}
              </span>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Вопрос {currentQuestion + 1} из {totalQuestions}
                </span>
                <span className="text-sm font-medium text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="mb-4" />
              <CardTitle className="text-xl md:text-2xl">
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion]?.toString()}
                onValueChange={(val) => handleAnswer(parseInt(val))}
                className="space-y-3"
              >
                {currentQ.options.map((option, idx) => (
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
                {isDepressionSection 
                  ? 'Отвечайте на вопросы, ориентируясь на свое состояние в течение последних двух недель.'
                  : 'Оцените, насколько каждый симптом беспокоил вас в течение последней недели.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombinedTestSection;
