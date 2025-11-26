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
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-2 border-primary bg-primary text-white p-3 text-sm font-semibold min-w-[180px]">
                  <div className="space-y-1">
                    <div>A</div>
                    <div className="text-xs font-normal">Активирующее событие</div>
                    <div className="text-xs font-normal opacity-80">(что произошло?)</div>
                  </div>
                </th>
                <th className="border-2 border-primary bg-primary text-white p-3 text-sm font-semibold min-w-[180px]">
                  <div className="space-y-1">
                    <div>B</div>
                    <div className="text-xs font-normal">Убеждения</div>
                    <div className="text-xs font-normal opacity-80">(что я подумал?)</div>
                  </div>
                </th>
                <th className="border-2 border-primary bg-primary text-white p-3 text-sm font-semibold min-w-[180px]">
                  <div className="space-y-1">
                    <div>C</div>
                    <div className="text-xs font-normal">Последствия</div>
                    <div className="text-xs font-normal opacity-80">(что я почувствовал?)</div>
                  </div>
                </th>
                <th className="border-2 border-primary bg-primary text-white p-3 text-sm font-semibold min-w-[180px]">
                  <div className="space-y-1">
                    <div>D</div>
                    <div className="text-xs font-normal">Оспаривание</div>
                    <div className="text-xs font-normal opacity-80">(альтернативы?)</div>
                  </div>
                </th>
                <th className="border-2 border-primary bg-primary text-white p-3 text-sm font-semibold min-w-[180px]">
                  <div className="space-y-1">
                    <div>E</div>
                    <div className="text-xs font-normal">Новая реакция</div>
                    <div className="text-xs font-normal opacity-80">(что изменилось?)</div>
                  </div>
                </th>
                <th className="border-2 border-primary bg-primary text-white p-3 w-[60px]"></th>
              </tr>
            </thead>
            <tbody>
              {abcdRows.map((row, index) => (
                <tr key={index}>
                  <td className="border-2 border-gray-300 p-2">
                    <Textarea
                      value={row.a}
                      onChange={(e) => updateAbcdRow(index, 'a', e.target.value)}
                      placeholder="Опишите ситуацию объективно"
                      className="min-h-[100px] border-0 focus-visible:ring-0 resize-none"
                    />
                  </td>
                  <td className="border-2 border-gray-300 p-2">
                    <Textarea
                      value={row.b}
                      onChange={(e) => updateAbcdRow(index, 'b', e.target.value)}
                      placeholder="Автоматические мысли"
                      className="min-h-[100px] border-0 focus-visible:ring-0 resize-none"
                    />
                  </td>
                  <td className="border-2 border-gray-300 p-2">
                    <Textarea
                      value={row.c}
                      onChange={(e) => updateAbcdRow(index, 'c', e.target.value)}
                      placeholder="Эмоции (0-10), ощущения"
                      className="min-h-[100px] border-0 focus-visible:ring-0 resize-none"
                    />
                  </td>
                  <td className="border-2 border-gray-300 p-2">
                    <Textarea
                      value={row.d}
                      onChange={(e) => updateAbcdRow(index, 'd', e.target.value)}
                      placeholder="Доказательства за/против"
                      className="min-h-[100px] border-0 focus-visible:ring-0 resize-none"
                    />
                  </td>
                  <td className="border-2 border-gray-300 p-2">
                    <Textarea
                      value={row.e}
                      onChange={(e) => updateAbcdRow(index, 'e', e.target.value)}
                      placeholder="Рациональные мысли"
                      className="min-h-[100px] border-0 focus-visible:ring-0 resize-none"
                    />
                  </td>
                  <td className="border-2 border-gray-300 p-2 text-center">
                    {abcdRows.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAbcdRow(index)}
                        className="hover:bg-red-100"
                      >
                        <Icon name="Trash2" size={16} className="text-red-600" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <Button onClick={addAbcdRow} variant="outline" className="w-full">
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить строку
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