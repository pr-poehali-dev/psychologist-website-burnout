import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EmailCaptureFormProps {
  testName: string;
  onSubmit?: (email: string) => void;
}

const EmailCaptureForm = ({ testName, onSubmit }: EmailCaptureFormProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && email.includes('@')) {
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(105077878, 'reachGoal', 'submit_email_after_test', {
          test: testName,
          email: email
        });
      }
      
      // Send to backend
      try {
        await fetch('https://functions.poehali.dev/559666a4-a8c3-4ba8-b182-ee45f07594f2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            testName: testName
          }),
        });
      } catch (error) {
        console.error('Failed to send lead:', error);
      }
      
      if (onSubmit) {
        onSubmit(email);
      }
      
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-green-700">
            <Icon name="CheckCircle" size={24} />
            <div>
              <p className="font-bold">Спасибо!</p>
              <p className="text-sm">Результаты отправлены на {email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Mail" size={24} className="text-primary" />
          Получите подробный разбор результатов
        </CardTitle>
        <CardDescription>
          Отправим ваши результаты на email + бесплатный чек-лист "Что делать дальше"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" className="whitespace-nowrap">
            <Icon name="Send" size={18} className="mr-2" />
            Отправить
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </CardContent>
    </Card>
  );
};

export default EmailCaptureForm;