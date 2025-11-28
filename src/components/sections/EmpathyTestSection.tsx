import { useState, useEffect } from 'react';
import TestQuestion from '@/components/empathy-test/TestQuestion';
import TestResult from '@/components/empathy-test/TestResult';
import { TestResult as TestResultType, empathyQuestions, calculateScore } from '@/components/empathy-test/testData';

interface EmpathyTestSectionProps {
  onBooking: () => void;
}

const EmpathyTestSection = ({ onBooking }: EmpathyTestSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [testHistory, setTestHistory] = useState<TestResultType[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('empathy-test-history');
    if (saved) {
      setTestHistory(JSON.parse(saved));
    }
  }, []);

  const saveResult = (score: number) => {
    const newResult: TestResultType = {
      date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
      score,
      timestamp: Date.now()
    };
    const updated = [...testHistory, newResult].slice(-10);
    setTestHistory(updated);
    localStorage.setItem('empathy-test-history', JSON.stringify(updated));
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) return;
    
    if (currentQuestion < empathyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore(answers);
      saveResult(score);
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
    setAnswers([]);
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

export default EmpathyTestSection;
