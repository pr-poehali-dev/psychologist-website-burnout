import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { jsPDF } from 'jspdf';
import { registerCyrillicFonts, addPdfBranding } from '@/lib/pdf-fonts';
import { TestResult as TestResultType, getResult } from './testData';
import EmailCaptureForm from '@/components/ui/EmailCaptureForm';

interface TestResultProps {
  score: number;
  testHistory: TestResultType[];
  onReset: () => void;
  onBooking: () => void;
}

const TestResult = ({ score, testHistory, onReset, onBooking }: TestResultProps) => {
  const result = getResult(score);
  const maxScore = 63;

  const downloadPDF = async () => {
    const doc = new jsPDF();
    await registerCyrillicFonts(doc);
    const date = new Date().toLocaleDateString('ru-RU');

    let yPos = 20;

    doc.setFont('Roboto', 'bold');
    doc.setFontSize(20);
    doc.text('Результаты теста BDI-II', 105, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(12);
    doc.setFont('Roboto', 'normal');
    doc.text(`Дата прохождения: ${date}`, 105, yPos, { align: 'center' });
    
    yPos += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPos, 190, yPos);
    
    yPos += 15;
    doc.setFontSize(16);
    doc.setFont('Roboto', 'bold');
    doc.text('Ваш результат:', 20, yPos);
    
    yPos += 20;
    doc.setFontSize(32);
    const scoreColor = score <= 13 ? [22, 163, 74] : score <= 19 ? [202, 138, 4] : score <= 28 ? [234, 88, 12] : [220, 38, 38];
    doc.setTextColor(...scoreColor);
    doc.text(`${score} / ${maxScore}`, 105, yPos, { align: 'center' });
    
    yPos += 15;
    doc.setFontSize(16);
    doc.text(result.level, 105, yPos, { align: 'center' });
    
    yPos += 20;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Roboto', 'bold');
    doc.text('Интерпретация:', 20, yPos);
    
    yPos += 10;
    doc.setFont('Roboto', 'normal');
    const descLines = doc.splitTextToSize(result.description, 170);
    doc.text(descLines, 20, yPos);
    yPos += descLines.length * 7;
    
    yPos += 10;
    doc.setFont('Roboto', 'bold');
    doc.text('Рекомендации:', 20, yPos);
    
    yPos += 10;
    doc.setFont('Roboto', 'normal');
    const recLines = doc.splitTextToSize(result.recommendation, 170);
    doc.text(recLines, 20, yPos);
    yPos += recLines.length * 7;
    
    yPos += 15;
    doc.setFontSize(10);
    doc.setFont('Roboto', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text('Важно:', 20, yPos);
    yPos += 7;
    doc.setFont('Roboto', 'normal');
    doc.text('- Этот тест является скрининговым инструментом, а не диагнозом', 20, yPos);
    yPos += 7;
    doc.text('- Только специалист может поставить точный диагноз', 20, yPos);
    yPos += 7;
    doc.text('- Депрессия — это излечимое состояние при правильном подходе', 20, yPos);
    
    yPos += 14;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPos, 190, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('Roboto', 'normal');
    doc.text('Шкала депрессии Бека (BDI-II)', 105, yPos, { align: 'center' });
    yPos += 7;
    doc.text('Beck Depression Inventory - Second Edition', 105, yPos, { align: 'center' });

    await addPdfBranding(doc);
    doc.save(`BDI-II_результаты_${date.replace(/\./g, '-')}.pdf`);
  };

  const downloadHistoryPDF = async () => {
    if (testHistory.length === 0) return;

    const doc = new jsPDF();
    await registerCyrillicFonts(doc);
    const date = new Date().toLocaleDateString('ru-RU');

    doc.setFont('Roboto', 'bold');
    doc.setFontSize(20);
    doc.text('История результатов BDI-II', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('Roboto', 'normal');
    doc.text(`Дата отчёта: ${date}`, 105, 30, { align: 'center' });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(14);
    doc.setFont('Roboto', 'bold');
    doc.text('Динамика результатов:', 20, 50);

    let yPos = 65;
    testHistory.forEach((result, index) => {
      const level = result.score <= 13 ? 'Минимальная' : result.score <= 19 ? 'Лёгкая' : result.score <= 28 ? 'Умеренная' : 'Тяжёлая';
      const color = result.score <= 13 ? [22, 163, 74] : result.score <= 19 ? [202, 138, 4] : result.score <= 28 ? [234, 88, 12] : [220, 38, 38];
      
      doc.setFontSize(11);
      doc.setFont('Roboto', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${index + 1}. ${result.date}`, 25, yPos);
      
      doc.setFont('Roboto', 'normal');
      doc.setTextColor(...color);
      doc.text(`${result.score} / 63`, 70, yPos);
      
      doc.setTextColor(80, 80, 80);
      doc.text(`(${level})`, 100, yPos);
      
      yPos += 10;
      
      if (yPos > 260 && index < testHistory.length - 1) {
        doc.addPage();
        yPos = 20;
      }
    });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('Roboto', 'bold');
    
    const lastYPos = yPos + 15;
    if (lastYPos > 240) {
      doc.addPage();
      doc.text('Легенда:', 20, 20);
      doc.setFont('Roboto', 'normal');
      doc.text('0-13: Минимальная депрессия', 25, 30);
      doc.text('14-19: Лёгкая депрессия', 25, 37);
      doc.text('20-28: Умеренная депрессия', 25, 44);
      doc.text('29-63: Тяжёлая депрессия', 25, 51);
    } else {
      doc.text('Легенда:', 20, lastYPos);
      doc.setFont('Roboto', 'normal');
      doc.text('0-13: Минимальная депрессия', 25, lastYPos + 10);
      doc.text('14-19: Лёгкая депрессия', 25, lastYPos + 17);
      doc.text('20-28: Умеренная депрессия', 25, lastYPos + 24);
      doc.text('29-63: Тяжёлая депрессия', 25, lastYPos + 31);
    }

    const pages = doc.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.setFont('Roboto', 'normal');
      doc.text(`Страница ${i} из ${pages}`, 105, 285, { align: 'center' });
    }

    await addPdfBranding(doc);
    doc.save(`BDI-II_история_${date.replace(/\./g, '-')}.pdf`);
  };

  return (
    <section id="depression-test" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <Card className={`${result.borderColor} border-2 shadow-2xl`}>
          <CardHeader className={result.bgColor}>
            <div className="flex items-center justify-center mb-4">
              <Icon name={result.icon} size={64} className={result.color} />
            </div>
            <CardTitle className="text-center text-3xl">
              Результаты теста BDI-II
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
                    <ReferenceLine y={13} stroke="#16a34a" strokeDasharray="3 3" label="Минимальная" />
                    <ReferenceLine y={19} stroke="#ca8a04" strokeDasharray="3 3" label="Лёгкая" />
                    <ReferenceLine y={28} stroke="#ea580c" strokeDasharray="3 3" label="Умеренная" />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-600">
                    {testHistory.length} {testHistory.length === 1 ? 'результат' : testHistory.length < 5 ? 'результата' : 'результатов'} сохранено
                  </p>
                  <Button
                    onClick={downloadHistoryPDF}
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
                <span>13</span>
                <span>19</span>
                <span>28</span>
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
                  <span>Только специалист может поставить точный диагноз</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                  <span>Депрессия — это излечимое состояние при правильном подходе</span>
                </li>
              </ul>
            </div>

            <div className="my-6">
              <EmailCaptureForm 
                testName="Тест на депрессию (BDI-II)" 
                onSubmit={(email) => console.log('Email captured:', email)}
              />
            </div>

            <div className="space-y-3">
              <div className="flex gap-4 flex-col sm:flex-row">
                <Button
                  onClick={onBooking}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
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
                onClick={onReset}
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
};

export default TestResult;