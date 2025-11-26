import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ABCDRow {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
}

const ABCDTable = () => {
  const { toast } = useToast();
  const [abcdRows, setAbcdRows] = useState<ABCDRow[]>([
    { a: '', b: '', c: '', d: '', e: '' }
  ]);

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

    autoTable(doc, {
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

  return (
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
  );
};

export default ABCDTable;