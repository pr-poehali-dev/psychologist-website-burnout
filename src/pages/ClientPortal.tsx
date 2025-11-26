import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ABCDRow {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
}

interface LifeArea {
  name: string;
  score: number;
  negative: string;
  positive: string;
  actions: string;
}

const ClientPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const [abcdRows, setAbcdRows] = useState<ABCDRow[]>([
    { a: '', b: '', c: '', d: '', e: '' }
  ]);

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

  const correctPassword = 'client';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      toast({
        title: 'Добро пожаловать!',
        description: 'Вы успешно вошли в систему',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Неверный пароль',
      });
    }
  };

  const addAbcdRow = () => {
    setAbcdRows([...abcdRows, { a: '', b: '', c: '', d: '', e: '' }]);
  };

  const updateAbcdRow = (index: number, field: keyof ABCDRow, value: string) => {
    const newRows = [...abcdRows];
    newRows[index][field] = value;
    setAbcdRows(newRows);
  };

  const removeAbcdRow = (index: number) => {
    if (abcdRows.length > 1) {
      setAbcdRows(abcdRows.filter((_, i) => i !== index));
    }
  };

  const downloadAbcdPdf = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('ABCDE таблица (КПТ)', 14, 15);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Дата: ${new Date().toLocaleDateString('ru-RU')}`, 14, 22);

    const tableData = abcdRows.map((row) => [
      row.a || '-',
      row.b || '-',
      row.c || '-',
      row.d || '-',
      row.e || '-'
    ]);

    (doc as any).autoTable({
      startY: 28,
      head: [['Активирующее\nсобытие', 'Убеждения', 'Последствия', 'Оспаривание', 'Новая реакция']],
      body: tableData,
      styles: { 
        font: 'helvetica',
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [139, 92, 246],
        textColor: 255,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 50 },
        2: { cellWidth: 50 },
        3: { cellWidth: 50 },
        4: { cellWidth: 50 },
      },
      margin: { left: 14, right: 14 },
    });

    doc.save('ABCDE-таблица.pdf');
    
    toast({
      title: 'PDF создан',
      description: 'Таблица ABCDE успешно сохранена',
    });
  };

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Вход для клиентов</CardTitle>
            <CardDescription>Введите пароль для доступа к материалам</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                />
              </div>
              <Button type="submit" className="w-full">
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => window.location.href = '/'}
              >
                <Icon name="Home" size={18} className="mr-2" />
                На главную
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Личный кабинет клиента</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Icon name="Home" size={18} className="mr-2" />
              На главную
            </Button>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-12 max-w-7xl">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">ABCDE таблица (КПТ)</CardTitle>
                <CardDescription>
                  Таблица для работы с автоматическими мыслями и убеждениями
                </CardDescription>
              </div>
              <Button onClick={downloadAbcdPdf}>
                <Icon name="Download" size={18} className="mr-2" />
                Скачать PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {abcdRows.map((row, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4 relative bg-white">
                {abcdRows.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeAbcdRow(index)}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                )}
                <h4 className="font-semibold text-lg">Запись #{index + 1}</h4>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`a-${index}`}>А - Активирующее событие (что произошло?)</Label>
                    <Textarea
                      id={`a-${index}`}
                      value={row.a}
                      onChange={(e) => updateAbcdRow(index, 'a', e.target.value)}
                      placeholder="Опишите ситуацию объективно, без оценок"
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`b-${index}`}>Б - Убеждения (что я подумал?)</Label>
                    <Textarea
                      id={`b-${index}`}
                      value={row.b}
                      onChange={(e) => updateAbcdRow(index, 'b', e.target.value)}
                      placeholder="Запишите автоматические мысли, которые возникли"
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`c-${index}`}>В - Последствия (что я почувствовал?)</Label>
                    <Textarea
                      id={`c-${index}`}
                      value={row.c}
                      onChange={(e) => updateAbcdRow(index, 'c', e.target.value)}
                      placeholder="Отметьте эмоции и их интенсивность (0-10), физические ощущения, действия"
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`d-${index}`}>Г - Оспаривание (какие есть альтернативы?)</Label>
                    <Textarea
                      id={`d-${index}`}
                      value={row.d}
                      onChange={(e) => updateAbcdRow(index, 'd', e.target.value)}
                      placeholder="Найдите альтернативные объяснения и доказательства за/против ваших убеждений"
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`e-${index}`}>Д - Новая реакция (что изменилось?)</Label>
                    <Textarea
                      id={`e-${index}`}
                      value={row.e}
                      onChange={(e) => updateAbcdRow(index, 'e', e.target.value)}
                      placeholder="Опишите новые, более рациональные мысли и как они влияют на ваши эмоции"
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button onClick={addAbcdRow} variant="outline" className="w-full">
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить запись
            </Button>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold mb-2">Как работать с таблицей:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Заполняйте таблицу сразу после события или в конце дня</li>
                <li>Будьте максимально честны с собой при описании мыслей</li>
                <li>Оценивайте интенсивность эмоций по шкале от 0 до 10</li>
                <li>В столбце Г ищите доказательства "за" и "против" ваших убеждений</li>
                <li>Формулируйте альтернативные, более рациональные мысли в столбце Д</li>
              </ol>
            </div>
          </CardContent>
        </Card>

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
      </main>
    </div>
  );
};

export default ClientPortal;