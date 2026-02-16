import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { jsPDF } from 'jspdf';
import { registerCyrillicFonts, addPdfBranding } from '@/lib/pdf-fonts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getEmpathyLevel, calculateScore, TestResult as TestResultType } from './testData';
import EmailCaptureForm from '@/components/ui/EmailCaptureForm';

interface TestResultProps {
  answers: number[];
  testHistory: TestResultType[];
  onReset: () => void;
  onBooking: () => void;
}

const TestResult = ({ answers, testHistory, onReset, onBooking }: TestResultProps) => {
  const score = calculateScore(answers);
  const result = getEmpathyLevel(score);
  const maxScore = 180;

  const downloadPDF = async () => {
    const doc = new jsPDF();
    await registerCyrillicFonts(doc);
    const date = new Date().toLocaleDateString('ru-RU');

    let yPos = 20;

    doc.setFont('Roboto', 'bold');
    doc.setFontSize(20);
    doc.text('Тест на эмпатию', 105, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(12);
    doc.setFont('Roboto', 'normal');
    doc.text(`Дата: ${date}`, 105, yPos, { align: 'center' });
    
    yPos += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPos, 190, yPos);
    
    yPos += 15;
    doc.setFontSize(16);
    doc.setFont('Roboto', 'bold');
    doc.text('Ваш результат:', 20, yPos);
    
    yPos += 20;
    doc.setFontSize(32);
    doc.setTextColor(20, 184, 166);
    doc.text(`${score} / ${maxScore}`, 105, yPos, { align: 'center' });
    
    yPos += 15;
    doc.setFontSize(16);
    doc.text(result.level, 105, yPos, { align: 'center' });
    
    yPos += 20;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Roboto', 'bold');
    doc.text('Описание:', 20, yPos);
    
    yPos += 10;
    doc.setFont('Roboto', 'normal');
    const descLines = doc.splitTextToSize(result.description, 170);
    doc.text(descLines, 20, yPos);
    yPos += descLines.length * 7;
    
    yPos += 10;
    doc.setFont('Roboto', 'bold');
    doc.text('Характеристики:', 20, yPos);
    
    doc.setFont('Roboto', 'normal');
    yPos += 10;
    result.traits.forEach((trait: string) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }
      const lines = doc.splitTextToSize(`+ ${trait}`, 165);
      doc.text(lines, 25, yPos);
      yPos += lines.length * 7;
    });
    
    yPos += 5;
    doc.setFont('Roboto', 'bold');
    doc.text('Риски:', 20, yPos);
    
    doc.setFont('Roboto', 'normal');
    yPos += 10;
    result.risks.forEach((risk: string) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }
      const lines = doc.splitTextToSize(`- ${risk}`, 165);
      doc.text(lines, 25, yPos);
      yPos += lines.length * 7;
    });

    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    
    yPos += 5;
    doc.setFont('Roboto', 'bold');
    doc.text('Рекомендации:', 20, yPos);
    
    yPos += 10;
    doc.setFont('Roboto', 'normal');
    const recLines = doc.splitTextToSize(result.recommendations, 170);
    doc.text(recLines, 20, yPos);

    await addPdfBranding(doc);
    doc.save(`Эмпатия_${score}_${date.replace(/\./g, '-')}.pdf`);
  };

  return (
    <section id="empathy-test" className="py-20 px-4 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto max-w-4xl">
        <Card className={`${result.borderColor} border-2 shadow-2xl`}>
          <CardHeader className={result.bgColor}>
            <div className="flex items-center justify-center mb-4">
              <Icon name={result.icon} size={64} className={result.color} />
            </div>
            <CardTitle className="text-center text-3xl">
              Результаты теста на эмпатию
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
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                {result.description}
              </p>
            </div>

            {testHistory.length > 1 && (
              <div className="my-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} />
                  Динамика результатов
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
                      domain={[0, 180]}
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <ReferenceLine y={82} stroke="#16a34a" strokeDasharray="3 3" label="Очень высокий" />
                    <ReferenceLine y={63} stroke="#2563eb" strokeDasharray="3 3" label="Высокий" />
                    <ReferenceLine y={37} stroke="#ca8a04" strokeDasharray="3 3" label="Средний" />
                    <ReferenceLine y={12} stroke="#ea580c" strokeDasharray="3 3" label="Низкий" />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#14b8a6" 
                      strokeWidth={3}
                      dot={{ fill: '#14b8a6', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
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
                <span>12</span>
                <span>37</span>
                <span>63</span>
                <span>82</span>
                <span>180</span>
              </div>
              <div className="flex justify-between mt-1 text-xs font-medium">
                <span className="text-red-600">Очень низкий</span>
                <span className="text-orange-600">Низкий</span>
                <span className="text-yellow-600">Средний</span>
                <span className="text-blue-600">Высокий</span>
                <span className="text-green-600">Очень высокий</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3 bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-semibold flex items-center gap-2 text-green-900">
                  <Icon name="Star" size={20} />
                  Сильные стороны:
                </h4>
                <ul className="space-y-2">
                  {result.traits.map((trait: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0 text-green-600" />
                      <span className="text-green-900">{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h4 className="font-semibold flex items-center gap-2 text-orange-900">
                  <Icon name="AlertTriangle" size={20} />
                  Риски и сложности:
                </h4>
                <ul className="space-y-2">
                  {result.risks.map((risk: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Icon name="AlertCircle" size={16} className="mt-0.5 flex-shrink-0 text-orange-600" />
                      <span className="text-orange-900">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-teal-900">
                <Icon name="Lightbulb" size={20} />
                Рекомендации:
              </h4>
              <p className="text-teal-900">{result.recommendations}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-900">
                <Icon name="Info" size={20} />
                О тесте:
              </h4>
              <ul className="space-y-2 text-sm text-blue-900">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                  <span>Методика разработана В.В. Бойко для диагностики эмпатических способностей</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                  <span>Эмпатия — способность понимать и разделять эмоции других людей</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                  <span>Эмпатию можно развивать через практику осознанности и активного слушания</span>
                </li>
              </ul>
            </div>

            <div className="my-6">
              <EmailCaptureForm 
                testName="Тест на эмпатию (Бойко)" 
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
                Скачать PDF
              </Button>
              <Button
                onClick={onBooking}
                className="flex-1"
              >
                <Icon name="Calendar" size={20} className="mr-2" />
                Консультация
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