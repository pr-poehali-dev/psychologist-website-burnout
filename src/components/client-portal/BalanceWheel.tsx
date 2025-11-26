import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface LifeArea {
  name: string;
  score: number;
  negative: string;
  positive: string;
  actions: string;
}

const BalanceWheel = () => {
  const { toast } = useToast();
  const [lifeAreas, setLifeAreas] = useState<LifeArea[]>([
    { name: 'Работа', score: 5, negative: '', positive: '', actions: '' },
    { name: 'Здоровье', score: 5, negative: '', positive: '', actions: '' },
    { name: 'Отношения', score: 5, negative: '', positive: '', actions: '' },
    { name: 'Финансы', score: 5, negative: '', positive: '', actions: '' },
    { name: 'Личностный рост', score: 5, negative: '', positive: '', actions: '' },
    { name: 'Хобби и отдых', score: 5, negative: '', positive: '', actions: '' },
    { name: 'Друзья и социум', score: 5, negative: '', positive: '', actions: '' },
    { name: 'Окружение', score: 5, negative: '', positive: '', actions: '' },
  ]);

  const updateLifeArea = (index: number, field: keyof LifeArea, value: string | number) => {
    const newAreas = [...lifeAreas];
    newAreas[index] = { ...newAreas[index], [field]: value };
    setLifeAreas(newAreas);
  };

  const drawWheel = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 60;
    const segments = lifeAreas.length;
    const angleStep = (2 * Math.PI) / segments;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 10; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius / 10) * i, 0, 2 * Math.PI);
      ctx.stroke();
    }

    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.cos(angle),
        centerY + radius * Math.sin(angle)
      );
      ctx.strokeStyle = '#e5e7eb';
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(
      centerX + ((radius / 10) * lifeAreas[0].score) * Math.cos(-Math.PI / 2),
      centerY + ((radius / 10) * lifeAreas[0].score) * Math.sin(-Math.PI / 2)
    );

    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const scoreRadius = (radius / 10) * lifeAreas[i].score;
      ctx.lineTo(
        centerX + scoreRadius * Math.cos(angle),
        centerY + scoreRadius * Math.sin(angle)
      );
    }

    ctx.closePath();
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#374151';
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'center';

    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const labelRadius = radius + 30;
      const x = centerX + labelRadius * Math.cos(angle);
      const y = centerY + labelRadius * Math.sin(angle);

      ctx.fillText(lifeAreas[i].name, x, y);
      
      ctx.font = 'normal 12px Arial';
      ctx.fillText(`${lifeAreas[i].score}`, x, y + 15);
      ctx.font = 'bold 13px Arial';
    }
  };

  const downloadBalancePdf = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    drawWheel(canvas);

    const doc = new jsPDF('p', 'mm', 'a4');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Колесо баланса жизни', 14, 15);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Дата: ${new Date().toLocaleDateString('ru-RU')}`, 14, 22);

    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 30, 30, 150, 150);

    const tableData = lifeAreas.map((area) => [
      area.name,
      area.score.toString(),
      area.negative || '-',
      area.positive || '-',
      area.actions || '-'
    ]);

    (doc as any).autoTable({
      startY: 190,
      head: [['Сфера', 'Оценка', 'Что забирает энергию', 'Что даёт энергию', 'Действия']],
      body: tableData,
      styles: { 
        font: 'helvetica',
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [139, 92, 246],
        textColor: 255,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 15 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 },
        4: { cellWidth: 40 },
      },
      margin: { left: 14, right: 14 },
    });

    doc.save('Колесо-баланса.pdf');
    
    toast({
      title: 'PDF создан',
      description: 'Колесо баланса успешно сохранено',
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">Колесо баланса жизни</CardTitle>
            <CardDescription>
              Инструмент для анализа удовлетворённости разными сферами жизни
            </CardDescription>
          </div>
          <Button onClick={downloadBalancePdf}>
            <Icon name="Download" size={18} className="mr-2" />
            Скачать PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white p-8 rounded-lg border">
          <canvas
            ref={(canvas) => {
              if (canvas) {
                canvas.width = 600;
                canvas.height = 600;
                drawWheel(canvas);
              }
            }}
            className="w-full max-w-[600px] mx-auto"
          />
        </div>

        <div className="space-y-6">
          {lifeAreas.map((area, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4 bg-white">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg">{area.name}</h4>
                <span className="text-2xl font-bold text-primary">{area.score}</span>
              </div>
              
              <div className="space-y-2">
                <Label>Уровень удовлетворённости (0-10)</Label>
                <Slider
                  value={[area.score]}
                  onValueChange={(value) => updateLifeArea(index, 'score', value[0])}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`negative-${index}`}>Что забирает энергию (-)</Label>
                  <Textarea
                    id={`negative-${index}`}
                    value={area.negative}
                    onChange={(e) => updateLifeArea(index, 'negative', e.target.value)}
                    placeholder="Что в этой сфере вас истощает?"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`positive-${index}`}>Что даёт энергию (+)</Label>
                  <Textarea
                    id={`positive-${index}`}
                    value={area.positive}
                    onChange={(e) => updateLifeArea(index, 'positive', e.target.value)}
                    placeholder="Что в этой сфере вас наполняет?"
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`actions-${index}`}>Действия для улучшения</Label>
                <Textarea
                  id={`actions-${index}`}
                  value={area.actions}
                  onChange={(e) => updateLifeArea(index, 'actions', e.target.value)}
                  placeholder="Что можно сделать для повышения баланса?"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-lg space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Как работать с колесом баланса:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Оцените свою удовлетворённость каждой сферой от 0 (совсем не доволен) до 10 (полностью доволен)</li>
              <li>Визуально оцените получившийся результат - это ваше текущее колесо жизни</li>
              <li>Честно запишите, что отнимает у вас энергию в каждой сфере</li>
              <li>Отметьте, что наполняет вас энергией</li>
              <li>Разработайте конкретные действия для улучшения баланса</li>
              <li>Возвращайтесь к упражнению раз в месяц и отслеживайте динамику</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Интерпретация оценок:</h4>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium text-red-700">0-3:</span> Критическая зона, требуются срочные изменения</p>
              <p><span className="font-medium text-orange-700">4-5:</span> Низкая удовлетворённость, нужны корректировки</p>
              <p><span className="font-medium text-yellow-700">6-7:</span> Средний уровень, есть потенциал для роста</p>
              <p><span className="font-medium text-green-700">8-9:</span> Хороший уровень, сфера наполняет</p>
              <p><span className="font-medium text-blue-700">10:</span> Отличный баланс, источник силы и энергии</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceWheel;
