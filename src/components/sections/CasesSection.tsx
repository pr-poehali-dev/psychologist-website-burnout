import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CaseItem {
  title: string;
  role: string;
  problem: string;
  solution: string;
  result: string;
  icon: string;
}

interface CasesSectionProps {
  cases: CaseItem[];
}

const CasesSection = ({ cases }: CasesSectionProps) => {
  return (
    <section id="cases" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Реальные истории изменений</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Кейсы клиентов, которые прошли путь от выгорания к балансу
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((caseItem, index) => (
              <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={caseItem.icon} className="text-primary" size={28} />
                  </div>
                  <CardTitle className="text-xl mb-2">{caseItem.title}</CardTitle>
                  <CardDescription className="font-medium text-foreground/80">{caseItem.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-start gap-2 mb-2">
                      <Icon name="AlertCircle" size={16} className="text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-semibold text-destructive">Проблема:</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{caseItem.problem}</p>
                  </div>
                  <div>
                    <div className="flex items-start gap-2 mb-2">
                      <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-semibold text-primary">Решение:</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{caseItem.solution}</p>
                  </div>
                  <div>
                    <div className="flex items-start gap-2 mb-2">
                      <Icon name="CheckCircle" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-semibold text-green-600">Результат:</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{caseItem.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
