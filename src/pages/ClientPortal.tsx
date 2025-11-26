import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const ClientPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const correctPassword = 'client2024';

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

      <main className="container mx-auto px-4 py-12 space-y-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">ABCD таблица (КПТ)</CardTitle>
            <CardDescription>
              Таблица для работы с автоматическими мыслями и убеждениями
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">A - Activating Event<br/>(Активирующее событие)</TableHead>
                    <TableHead className="font-bold">B - Beliefs<br/>(Убеждения)</TableHead>
                    <TableHead className="font-bold">C - Consequences<br/>(Последствия)</TableHead>
                    <TableHead className="font-bold">D - Disputation<br/>(Оспаривание)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="align-top">
                      <p className="text-sm text-muted-foreground mb-2">Что произошло?</p>
                      <p className="font-medium">Пример:</p>
                      <p>Руководитель не ответил на моё письмо в течение дня</p>
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm text-muted-foreground mb-2">Что я подумал?</p>
                      <p className="font-medium">Пример:</p>
                      <p>"Он игнорирует меня, значит я плохо работаю. Меня могут уволить."</p>
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm text-muted-foreground mb-2">Что я почувствовал?</p>
                      <p className="font-medium">Пример:</p>
                      <p className="mb-2">Эмоции: Тревога (8/10), страх (7/10)</p>
                      <p>Поведение: Перечитывал письмо 10 раз, проверял почту каждые 5 минут</p>
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm text-muted-foreground mb-2">Какие есть альтернативы?</p>
                      <p className="font-medium">Пример:</p>
                      <p className="mb-2">• У него мог быть загруженный день</p>
                      <p className="mb-2">• Письмо могло попасть в спам</p>
                      <p>• Он мог не увидеть письмо среди других</p>
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-muted/30">
                    <TableCell className="align-top">
                      <p className="text-sm italic text-muted-foreground">Опишите ситуацию объективно, без оценок</p>
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm italic text-muted-foreground">Запишите автоматические мысли, которые возникли</p>
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm italic text-muted-foreground">Отметьте эмоции и их интенсивность (0-10), действия</p>
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm italic text-muted-foreground">Найдите альтернативные объяснения и проверьте их</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold mb-2">Как работать с таблицей:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Заполняйте таблицу сразу после события или в конце дня</li>
                <li>Будьте максимально честны с собой при описании мыслей</li>
                <li>Оценивайте интенсивность эмоций по шкале от 0 до 10</li>
                <li>В колонке D ищите доказательства "за" и "против" ваших убеждений</li>
                <li>Формулируйте альтернативные, более рациональные мысли</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Энергетический аудит</CardTitle>
            <CardDescription>
              Инструмент для анализа расхода энергии и выявления источников выгорания
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Сфера жизни</TableHead>
                    <TableHead className="font-bold">Что забирает энергию (-)</TableHead>
                    <TableHead className="font-bold">Что даёт энергию (+)</TableHead>
                    <TableHead className="font-bold">Баланс</TableHead>
                    <TableHead className="font-bold">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Работа</TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm mb-1">• Постоянные созвоны</p>
                      <p className="text-sm mb-1">• Переработки</p>
                      <p className="text-sm">• Отсутствие обратной связи</p>
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm mb-1">• Интересные проекты</p>
                      <p className="text-sm">• Признание результатов</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">-3</span>
                    </TableCell>
                    <TableCell className="align-top text-sm">
                      <p className="mb-1">• Поговорить с руководителем о графике</p>
                      <p>• Ограничить созвоны до 3 в день</p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Отношения</TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm mb-1">• Конфликты с партнёром</p>
                      <p className="text-sm">• Мало совместного времени</p>
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm mb-1">• Поддержка близких</p>
                      <p className="text-sm">• Общение с друзьями</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">0</span>
                    </TableCell>
                    <TableCell className="align-top text-sm">
                      <p className="mb-1">• Запланировать свидание</p>
                      <p>• Обсудить потребности</p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Здоровье</TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm mb-1">• Мало сна (5-6 часов)</p>
                      <p className="text-sm">• Нерегулярное питание</p>
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm">• Утренние пробежки 2 раза в неделю</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">-2</span>
                    </TableCell>
                    <TableCell className="align-top text-sm">
                      <p className="mb-1">• Ложиться до 23:00</p>
                      <p>• Готовить еду на 2 дня вперёд</p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Хобби/Отдых</TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm">• Нет времени на увлечения</p>
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="text-sm mb-1">• Чтение книг</p>
                      <p className="text-sm">• Прогулки в парке</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">+1</span>
                    </TableCell>
                    <TableCell className="align-top text-sm">
                      <p>• Выделить 1 час в день на хобби</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Как проводить энергетический аудит:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Выделите основные сферы вашей жизни (работа, отношения, здоровье, хобби, финансы и т.д.)</li>
                  <li>Честно запишите, что отнимает у вас энергию в каждой сфере</li>
                  <li>Отметьте, что наполняет вас энергией</li>
                  <li>Оцените баланс: от -5 (сильный дефицит) до +5 (энергия в избытке)</li>
                  <li>Разработайте конкретные действия для улучшения баланса</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Интерпретация баланса:</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium text-red-700">-5 до -3:</span> Критическая зона, требуются срочные изменения</p>
                  <p><span className="font-medium text-orange-700">-2 до -1:</span> Дефицит энергии, нужны корректировки</p>
                  <p><span className="font-medium text-yellow-700">0:</span> Нейтральный баланс, возможны улучшения</p>
                  <p><span className="font-medium text-green-700">+1 до +3:</span> Хороший баланс, сфера наполняет</p>
                  <p><span className="font-medium text-blue-700">+4 до +5:</span> Отличный баланс, источник силы</p>
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
