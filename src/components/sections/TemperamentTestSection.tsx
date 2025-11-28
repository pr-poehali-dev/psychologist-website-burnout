import { useState, useEffect } from 'react';
import TestQuestion from '@/components/temperament-test/TestQuestion';
import TestResult from '@/components/temperament-test/TestResult';
import { TestResult as TestResultType, eysenckQuestions, calculateScores, getTemperamentType } from '@/components/temperament-test/testData';

interface TemperamentTestSectionProps {
  onBooking: () => void;
}

const TemperamentTestSection = ({ onBooking }: TemperamentTestSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(eysenckQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [testHistory, setTestHistory] = useState<TestResultType[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('temperament-test-history');
    if (saved) {
      setTestHistory(JSON.parse(saved));
    }
  }, []);

  const saveResult = (extraversion: number, neuroticism: number) => {
    const temperament = getTemperamentType(extraversion, neuroticism);
    const newResult: TestResultType = {
      date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
      extraversion,
      neuroticism,
      temperament,
      timestamp: Date.now()
    };
    const updated = [...testHistory, newResult].slice(-10);
    setTestHistory(updated);
    localStorage.setItem('temperament-test-history', JSON.stringify(updated));
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) return;
    
    if (currentQuestion < eysenckQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const { extraversion, neuroticism } = calculateScores(answers);
      saveResult(extraversion, neuroticism);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers(Array(eysenckQuestions.length).fill(null));
    setShowResult(false);
  };

  if (showResult) {
    return (
      <TestResult
        answers={answers}
        testHistory={testHistory}
        onReset={handleReset}
        onBooking={onBooking}
      />
    );
  }

  return (
    <TestQuestion
      currentQuestion={currentQuestion}
      answers={answers}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default TemperamentTestSection;
