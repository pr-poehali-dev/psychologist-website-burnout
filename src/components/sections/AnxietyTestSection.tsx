import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { jsPDF } from 'jspdf';

interface AnxietyTestSectionProps {
  onBooking: () => void;
}

const AnxietyTestSection = ({ onBooking }: AnxietyTestSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const baiQuestions = [
    'Ощущение онемения или покалывания',
    'Ощущение жара',
    'Дрожь в ногах',
    'Неспособность расслабиться',
    'Страх, что произойдёт самое плохое',
    'Головокружение или ощущение лёгкости в голове',
    'Учащённое сердцебиение',
    'Ощущение неустойчивости',
    'Чувство ужаса или испуга',
    'Нервозность',
    'Ощущение удушья',
    'Дрожь в руках',
    'Неустойчивость, шаткость',
    'Страх потери контроля',
    'Затруднённое дыхание',
    'Страх умереть',
    'Испуг',
    'Расстройство желудка или дискомфорт в животе',
    'Обморочное состояние',
    'Покраснение лица',
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
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) return;
    
    if (currentQuestion < baiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const calculateScore = () => {
    return answers.reduce((sum, val) => sum + val, 0);
  };

  const getResult = () => {
    const score = calculateScore();
    
    if (score <= 7) {
      return {
        level: 'Минимальная тревожность',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        description: 'Ваши результаты указывают на минимальный уровень тревожности. Это нормальное состояние.',
        recommendation: 'Продолжайте поддерживать своё психическое здоровье через здоровый образ жизни, физическую активность и практики релаксации.',
        icon: 'CheckCircle2',
        chartColor: '#16a34a'
      };
    } else if (score <= 15) {
      return {
        level: 'Лёгкая тревожность',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        description: 'Результаты указывают на лёгкий уровень тревожности, который может периодически влиять на вашу повседневную жизнь.',
        recommendation: 'Рекомендуется обратить внимание на техники управления стрессом: дыхательные практики, медитация, регулярная физическая активность.',
        icon: 'AlertCircle',
        chartColor: '#ca8a04'
      };
    } else if (score <= 25) {
      return {
        level: 'Умеренная тревожность',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        description: 'Результаты указывают на умеренный уровень тревожности, который существенно влияет на качество вашей жизни.',
        recommendation: 'Рекомендуется консультация с психологом или психотерапевтом для работы над тревожными состояниями и обучения техникам управления тревогой.',
        icon: 'AlertTriangle',
        chartColor: '#ea580c'
      };
    } else {
      return {
        level: 'Тяжёлая тревожность',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        description: 'Результаты указывают на тяжёлый уровень тревожности. Это серьёзное состояние, требующее профессионального внимания.',
        recommendation: 'Настоятельно рекомендуется обратиться к психологу или психиатру. Тревожные расстройства хорошо поддаются лечению при правильном подходе.',
        icon: 'XCircle',
        chartColor: '#dc2626'
      };
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const result = getResult();
    const score = calculateScore();
    const maxScore = 63;
    const date = new Date().toLocaleDateString('ru-RU');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Rezultaty testa BAI', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Data prohojdeniya: ${date}`, 105, 30, { align: 'center' });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 35, 190, 35);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Vash rezultat:', 20, 50);
    
    doc.setFontSize(32);
    const scoreColor = score <= 7 ? [22, 163, 74] : score <= 15 ? [202, 138, 4] : score <= 25 ? [234, 88, 12] : [220, 38, 38];
    doc.setTextColor(...scoreColor);
    doc.text(`${score} / ${maxScore}`, 105, 70, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text(result.level, 105, 85, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Interpretaciya:', 20, 105);
    
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(result.description, 170);
    doc.text(descLines, 20, 115);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Rekomendacii:', 20, 135);
    
    doc.setFont('helvetica', 'normal');
    const recLines = doc.splitTextToSize(result.recommendation, 170);
    doc.text(recLines, 20, 145);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('Vajno:', 20, 175);
    doc.setFont('helvetica', 'normal');
    doc.text('- Etot test yavlyaetsya skriningovym instrumentom, a ne diagnozom', 20, 182);
    doc.text('- Tolko specialist mojet postavit tochnyi diagnoz', 20, 189);
    doc.text('- Trevojnye rasstroystva horoso poddayutsya lecheniyu', 20, 196);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 210, 190, 210);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Shkala trevozhnosti Beka (BAI)', 105, 220, { align: 'center' });
    doc.text('Beck Anxiety Inventory', 105, 227, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Dlya zapisyi na konsultaciyu posetite: calink.ru/Algon', 105, 280, { align: 'center' });

    doc.save(`BAI_rezultaty_${date.replace(/\./g, '-')}.pdf`);
  };

  const progress = ((currentQuestion + 1) / baiQuestions.length) * 100;

  if (showResult) {
    const result = getResult();
    const score = calculateScore();
    const maxScore = 63;

    return (
      <section id="anxiety-test" className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto max-w-4xl">
          <Card className={`${result.borderColor} border-2 shadow-2xl`}>
            <CardHeader className={result.bgColor}>
              <div className="flex items-center justify-center mb-4">
                <Icon name={result.icon} size={64} className={result.color} />
              </div>
              <CardTitle className="text-center text-3xl">
                Результаты теста BAI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <div className={`text-6xl font-bold ${result.color}`}>
                  {score} / {maxScore}
                </div>
                <h3 className={`text-2xl font-semibold ${result.color}`}>
                  {result.level}
                </h3>
              </div>

              <div className="my-8">
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${(score / maxScore) * 100}%`,
                      backgroundColor: result.chartColor
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>0</span>
                  <span>7</span>
                  <span>15</span>
                  <span>25</span>
                  <span>63</span>
                </div>
                <div className="flex justify-between mt-1 text-xs font-medium">
                  <span className="text-green-600">Минимальная</span>
                  <span className="text-yellow-600">Лёгкая</span>
                  <span className="text-orange-600">Умеренная</span>
                  <span className="text-red-600">Тяжёлая</span>
                </div>
              </div>

              <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Info" size={20} />
                    Что это означает:
                  </h4>
                  <p className="text-gray-700">{result.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Lightbulb" size={20} />
                    Рекомендации:
                  </h4>
                  <p className="text-gray-700">{result.recommendation}</p>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-orange-900">
                  <Icon name="Heart" size={20} />
                  Важно помнить:
                </h4>
                <ul className="space-y-2 text-sm text-orange-900">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                    <span>Этот тест является скрининговым инструментом, а не диагнозом</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                    <span>Только специалист может поставить точный диагноз</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                    <span>Тревожные расстройства хорошо поддаются лечению</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4 flex-col sm:flex-row">
                  <Button
                    onClick={onBooking}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700"
                  >
                    <Icon name="Calendar" size={20} className="mr-2" />
                    Записаться на консультацию
                  </Button>
                  <Button
                    onClick={downloadPDF}
                    size="lg"
                    variant="default"
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Icon name="Download" size={20} className="mr-2" />
                    Скачать результаты PDF
                  </Button>
                </div>
                <Button
                  onClick={handleReset}
                  size="lg"
                  variant="outline"
                  className="w-full"
                >
                  <Icon name="RotateCcw" size={20} className="mr-2" />
                  Пройти заново
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const currentQ = baiQuestions[currentQuestion];

  return (
    <section id="anxiety-test" className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Тест на тревожность (BAI)
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Шкала тревожности Бека (Beck Anxiety Inventory) — клинически валидизированный инструмент для оценки тревожных симптомов
          </p>
        </div>

        <Card className="shadow-2xl border-2 border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-white">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">
                  Вопрос {currentQuestion + 1} из {baiQuestions.length}
                </CardTitle>
                <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {currentQ}
                </h3>
                <p className="text-sm text-gray-600">
                  Насколько вас беспокоил этот симптом в течение последней недели, включая сегодня
                </p>
              </div>

              <RadioGroup
                value={answers[currentQuestion]?.toString()}
                onValueChange={(value) => handleAnswer(parseInt(value))}
              >
                <div className="space-y-3">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                        answers[currentQuestion] === option.value
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => handleAnswer(option.value)}
                    >
                      <RadioGroupItem value={option.value.toString()} id={`q${currentQuestion}-${index}`} />
                      <Label
                        htmlFor={`q${currentQuestion}-${index}`}
                        className="flex-1 cursor-pointer text-base leading-relaxed"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <div className="flex gap-4 pt-6">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  size="lg"
                  disabled={currentQuestion === 0}
                  className="flex-1"
                >
                  <Icon name="ChevronLeft" size={20} className="mr-2" />
                  Назад
                </Button>
                <Button
                  onClick={handleNext}
                  size="lg"
                  disabled={answers[currentQuestion] === undefined}
                  className="flex-1 bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-700"
                >
                  {currentQuestion === baiQuestions.length - 1 ? 'Показать результат' : 'Далее'}
                  <Icon name="ChevronRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AnxietyTestSection;
