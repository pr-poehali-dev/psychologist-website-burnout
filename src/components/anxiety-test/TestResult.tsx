import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { jsPDF } from 'jspdf';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getResult, calculateScore, TestResult as TestResultType } from './testData';
import EmailCaptureForm from '@/components/ui/EmailCaptureForm';

interface TestResultProps {
  answers: number[];
  testHistory: TestResultType[];
  onReset: () => void;
  onBooking: () => void;
  onDownloadHistory: () => void;
}

const TestResult = ({ answers, testHistory, onReset, onBooking, onDownloadHistory }: TestResultProps) => {
  const score = calculateScore(answers);
  const result = getResult(score);
  const maxScore = 63;

  const downloadPDF = () => {
    const doc = new jsPDF();
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

  return (
    <section id="anxiety-test" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
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

            {testHistory.length > 1 && (
              <div className="my-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} />
                  Динамика ваших результатов
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={testHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      domain={[0, 63]}
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                    />
                    <ReferenceLine y={7} stroke="#16a34a" strokeDasharray="3 3" label="Минимальная" />
                    <ReferenceLine y={15} stroke="#ca8a04" strokeDasharray="3 3" label="Лёгкая" />
                    <ReferenceLine y={25} stroke="#ea580c" strokeDasharray="3 3" label="Умеренная" />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#f97316" 
                      strokeWidth={3}
                      dot={{ fill: '#f97316', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-600">
                    {testHistory.length} {testHistory.length === 1 ? 'результат' : testHistory.length < 5 ? 'результата' : 'результатов'} сохранено
                  </p>
                  <Button
                    onClick={onDownloadHistory}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    <Icon name="FileDown" size={16} className="mr-1" />
                    Экспорт истории
                  </Button>
                </div>
              </div>
            )}

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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-900">
                <Icon name="Heart" size={20} />
                Важно помнить:
              </h4>
              <ul className="space-y-2 text-sm text-blue-900">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                  <span>Этот тест является скрининговым инструментом, а не диагнозом</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                  <span>Только квалифицированный специалист может поставить точный диагноз</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                  <span>Тревожные расстройства хорошо поддаются лечению при правильном подходе</span>
                </li>
              </ul>
            </div>

            <div className="my-6">
              <EmailCaptureForm 
                testName="Тест на тревожность (BAI)" 
                onSubmit={(email) => console.log('Email captured:', email)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={downloadPDF}
                variant="outline"
                className="flex-1"
              >
                <Icon name="FileDown" size={20} className="mr-2" />
                Скачать результаты PDF
              </Button>
              <Button
                onClick={onBooking}
                className="flex-1"
              >
                <Icon name="Calendar" size={20} className="mr-2" />
                Записаться на консультацию
              </Button>
              <Button
                onClick={onReset}
                variant="outline"
                className="flex-1"
              >
                <Icon name="RotateCcw" size={20} className="mr-2" />
                Пройти снова
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TestResult;