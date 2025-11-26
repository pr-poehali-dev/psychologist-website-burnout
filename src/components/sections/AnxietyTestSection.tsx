import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import TestQuestion from '@/components/anxiety-test/TestQuestion';
import TestResult from '@/components/anxiety-test/TestResult';
import { TestResult as TestResultType, baiQuestions, calculateScore } from '@/components/anxiety-test/testData';

interface AnxietyTestSectionProps {
  onBooking: () => void;
}

const AnxietyTestSection = ({ onBooking }: AnxietyTestSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [testHistory, setTestHistory] = useState<TestResultType[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bai-test-history');
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
    localStorage.setItem('bai-test-history', JSON.stringify(updated));
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined) return;
    
    if (currentQuestion < baiQuestions.length - 1) {
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

  const downloadHistoryPDF = () => {
    if (testHistory.length === 0) return;

    const doc = new jsPDF();
    const date = new Date().toLocaleDateString('ru-RU');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Istoriya rezultatov BAI', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Data otcheta: ${date}`, 105, 30, { align: 'center' });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Dinamika rezultatov:', 20, 50);

    let yPos = 65;
    testHistory.forEach((result, index) => {
      const level = result.score <= 7 ? 'Minimalnaya' : result.score <= 15 ? 'Lyogkaya' : result.score <= 25 ? 'Umerennaya' : 'Tyazhyolaya';
      const color = result.score <= 7 ? [22, 163, 74] : result.score <= 15 ? [202, 138, 4] : result.score <= 25 ? [234, 88, 12] : [220, 38, 38];
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${index + 1}. ${result.date}`, 25, yPos);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...color);
      doc.text(`${result.score} / 63`, 70, yPos);
      
      doc.setTextColor(80, 80, 80);
      doc.text(`(${level})`, 100, yPos);
      
      yPos += 10;
      
      if (yPos > 270 && index < testHistory.length - 1) {
        doc.addPage();
        yPos = 20;
      }
    });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    
    const lastYPos = yPos + 15;
    if (lastYPos > 250) {
      doc.addPage();
      doc.text('Legenda:', 20, 20);
      doc.setFont('helvetica', 'normal');
      doc.text('0-7: Minimalnaya trevozhnost', 25, 30);
      doc.text('8-15: Lyogkaya trevozhnost', 25, 37);
      doc.text('16-25: Umerennaya trevozhnost', 25, 44);
      doc.text('26-63: Tyazhyolaya trevozhnost', 25, 51);
    } else {
      doc.text('Legenda:', 20, lastYPos);
      doc.setFont('helvetica', 'normal');
      doc.text('0-7: Minimalnaya trevozhnost', 25, lastYPos + 10);
      doc.text('8-15: Lyogkaya trevozhnost', 25, lastYPos + 17);
      doc.text('16-25: Umerennaya trevozhnost', 25, lastYPos + 24);
      doc.text('26-63: Tyazhyolaya trevozhnost', 25, lastYPos + 31);
    }

    const pages = doc.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Stranica ${i} iz ${pages}`, 105, 285, { align: 'center' });
    }

    doc.save(`BAI_istoriya_${date.replace(/\./g, '-')}.pdf`);
  };

  if (showResult) {
    return (
      <TestResult
        answers={answers}
        testHistory={testHistory}
        onReset={handleReset}
        onBooking={onBooking}
        onDownloadHistory={downloadHistoryPDF}
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

export default AnxietyTestSection;
