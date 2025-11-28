import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { jsPDF } from 'jspdf';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { getTemperamentType, getTemperamentDescription, calculateScores, TestResult as TestResultType } from './testData';

interface TestResultProps {
  answers: (string | null)[];
  testHistory: TestResultType[];
  onReset: () => void;
  onBooking: () => void;
}

const TestResult = ({ answers, testHistory, onReset, onBooking }: TestResultProps) => {
  const { extraversion, neuroticism, lie } = calculateScores(answers);
  const temperamentType = getTemperamentType(extraversion, neuroticism);
  const description = getTemperamentDescription(temperamentType);

  const chartData = [{ x: extraversion, y: neuroticism, name: 'Вы' }];
  const historyData = testHistory.map(result => ({
    x: result.extraversion,
    y: result.neuroticism,
    name: result.date
  }));

  const downloadPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString('ru-RU');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Test na temperament', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Data: ${date}`, 105, 30, { align: 'center' });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 35, 190, 35);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Vash tip temperamenta:', 20, 50);
    
    doc.setFontSize(24);
    doc.setTextColor(147, 51, 234);
    doc.text(temperamentType, 105, 65, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text(description.subtitle, 105, 75, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Ekstroversiya: ${extraversion}/24`, 20, 90);
    doc.text(`Neirotizm: ${neuroticism}/24`, 20, 97);
    doc.text(`Shkala lzhi: ${lie}/9 ${lie > 5 ? '(rezultaty mogut byt nedostoverny)' : ''}`, 20, 104);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Harakteristiki:', 20, 120);
    
    doc.setFont('helvetica', 'normal');
    let yPos = 130;
    description.traits.forEach((trait: string) => {
      const lines = doc.splitTextToSize(`+ ${trait}`, 170);
      doc.text(lines, 25, yPos);
      yPos += lines.length * 7;
    });
    
    doc.setFont('helvetica', 'bold');
    doc.text('Oblasti razvitiya:', 20, yPos + 5);
    
    doc.setFont('helvetica', 'normal');
    yPos += 15;
    description.weaknesses.forEach((weakness: string) => {
      const lines = doc.splitTextToSize(`- ${weakness}`, 170);
      doc.text(lines, 25, yPos);
      yPos += lines.length * 7;
    });

    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text('Rekomendacii:', 20, yPos + 5);
    
    doc.setFont('helvetica', 'normal');
    const recLines = doc.splitTextToSize(description.recommendations, 170);
    doc.text(recLines, 20, yPos + 15);

    doc.save(`Temperament_${temperamentType}_${date.replace(/\./g, '-')}.pdf`);
  };

  const isUnreliable = lie > 5;

  return (
    <section id="temperament-test" className="py-20 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto max-w-4xl">
        <Card className={`${description.borderColor} border-2 shadow-2xl`}>
          <CardHeader className={description.bgColor}>
            <div className="flex items-center justify-center mb-4">
              <Icon name={description.icon} size={64} className={description.color} />
            </div>
            <CardTitle className="text-center text-3xl">
              Ваш тип темперамента
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {isUnreliable && (
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" size={24} className="text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-1">Внимание</h4>
                    <p className="text-sm text-orange-800">
                      Шкала лжи показывает высокие значения ({lie}/9). Возможно, вы отвечали социально желательно. 
                      Рекомендуется пройти тест повторно, отвечая максимально честно.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center space-y-4">
              <div className={`text-5xl font-bold ${description.color}`}>
                {description.title}
              </div>
              <p className="text-xl text-gray-600">{description.subtitle}</p>
              <div className="flex justify-center gap-8 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-gray-600">Экстраверсия</div>
                  <div className={`text-3xl font-bold ${description.color}`}>{extraversion}/24</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-600">Нейротизм</div>
                  <div className={`text-3xl font-bold ${description.color}`}>{neuroticism}/24</div>
                </div>
              </div>
            </div>

            <div className="my-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-4 text-center">Круг темпераментов Айзенка</h4>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    domain={[0, 24]} 
                    label={{ value: 'Экстраверсия →', position: 'bottom', offset: 20 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    domain={[0, 24]}
                    label={{ value: '← Нейротизм', angle: -90, position: 'left', offset: 20 }}
                  />
                  <ReferenceLine x={12} stroke="#9ca3af" strokeDasharray="3 3" />
                  <ReferenceLine y={12} stroke="#9ca3af" strokeDasharray="3 3" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ payload }) => {
                      if (payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border rounded shadow-lg">
                            <p className="font-semibold">{data.name}</p>
                            <p className="text-sm">Экстраверсия: {data.x}</p>
                            <p className="text-sm">Нейротизм: {data.y}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {historyData.length > 0 && (
                    <Scatter 
                      name="История" 
                      data={historyData} 
                      fill="#d1d5db" 
                      opacity={0.5}
                    />
                  )}
                  <Scatter 
                    name="Текущий результат" 
                    data={chartData} 
                    fill={description.chartColor}
                    shape="circle"
                  />
                  <text x="20%" y="20%" textAnchor="middle" fill="#9333ea" fontSize="14" fontWeight="bold">
                    Меланхолик
                  </text>
                  <text x="80%" y="20%" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="bold">
                    Холерик
                  </text>
                  <text x="20%" y="95%" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="bold">
                    Флегматик
                  </text>
                  <text x="80%" y="95%" textAnchor="middle" fill="#eab308" fontSize="14" fontWeight="bold">
                    Сангвиник
                  </text>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Star" size={20} />
                  Сильные стороны:
                </h4>
                <ul className="space-y-2">
                  {description.traits.map((trait: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-1 flex-shrink-0 text-green-600" />
                      <span className="text-gray-700">{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Target" size={20} />
                  Области для развития:
                </h4>
                <ul className="space-y-2">
                  {description.weaknesses.map((weakness: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icon name="AlertCircle" size={16} className="mt-1 flex-shrink-0 text-orange-600" />
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-purple-900">
                <Icon name="Lightbulb" size={20} />
                Рекомендации:
              </h4>
              <p className="text-purple-900">{description.recommendations}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-900">
                <Icon name="Info" size={20} />
                О тесте:
              </h4>
              <ul className="space-y-2 text-sm text-blue-900">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                  <span>Опросник разработан Гансом Айзенком — классика психологии личности</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                  <span>Темперамент — врождённая основа личности, определяет стиль реагирования</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="mt-1 flex-shrink-0" />
                  <span>Нет «плохих» темпераментов — у каждого свои сильные стороны</span>
                </li>
              </ul>
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
