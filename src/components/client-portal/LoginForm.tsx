import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const correctPassword = 'algon';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      onLogin();
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
};

export default LoginForm;