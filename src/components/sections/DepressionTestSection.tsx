import { useState, useEffect } from 'react';
import { TestResult } from '@/components/depression-test/testData';
import { bdiQuestions } from '@/components/depression-test/testData';
import TestQuestion from '@/components/depression-test/TestQuestion';
import TestResult from '@/components/depression-test/TestResult';

interface DepressionTestSectionProps {
  onBooking: () => void;
}

const DepressionTestSection = ({ onBooking }: DepressionTestSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bdi-test-history');
    if (saved) {
      setTestHistory(JSON.parse(saved));
    }
  }, []);

  const saveResult = (score: number) => {
    const newResult: TestResult = {
      date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
      score,
      timestamp: Date.now()
    };
    const updated = [...testHistory, newResult].slice(-10);
    setTestHistory(updated);
    localStorage.setItem('bdi-test-history', JSON.stringify(updated));
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) return;
    
    if (currentQuestion < bdiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = calculateScore();
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

  const calculateScore = () => {
    return answers.reduce((sum, val) => sum + val, 0);
  };

  if (showResult) {
    return (
      <TestResult
        score={calculateScore()}
        testHistory={testHistory}
        onReset={handleReset}
        onBooking={onBooking}
      />
    );
  }

  return (
    <TestQuestion
      currentQuestion={currentQuestion}
      answer={answers[currentQuestion]}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
};

export default DepressionTestSection;
