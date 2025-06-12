
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Award,
  RotateCcw,
  TrendingUp,
  Book
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizResult {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "How often should you wash your hands to maintain good hygiene?",
      options: [
        "Only when they look dirty",
        "Before meals only",
        "Before eating, after using the toilet, and when coming from outside",
        "Once a day is enough"
      ],
      correctAnswer: 2,
      explanation: "Regular hand washing before eating, after using the toilet, and when coming from outside is crucial for preventing the spread of germs and diseases.",
      category: "Hygiene",
      difficulty: "easy"
    },
    {
      id: 2,
      question: "What is the recommended daily water intake for an average adult?",
      options: [
        "1-2 glasses",
        "4-5 glasses",
        "8-10 glasses",
        "15-20 glasses"
      ],
      correctAnswer: 2,
      explanation: "Adults should drink 8-10 glasses (about 2-3 liters) of water daily to maintain proper hydration and support bodily functions.",
      category: "Nutrition",
      difficulty: "medium"
    },
    {
      id: 3,
      question: "If someone is choking, what should you do first?",
      options: [
        "Give them water to drink",
        "Hit them on the back forcefully",
        "Call for help and perform the Heimlich maneuver",
        "Tell them to lie down"
      ],
      correctAnswer: 2,
      explanation: "When someone is choking, immediately call for help and perform the Heimlich maneuver (abdominal thrusts) to help dislodge the object.",
      category: "First Aid",
      difficulty: "medium"
    },
    {
      id: 4,
      question: "Which of these foods is rich in Vitamin C?",
      options: [
        "Rice",
        "Amla (Indian gooseberry)",
        "Wheat",
        "Milk"
      ],
      correctAnswer: 1,
      explanation: "Amla (Indian gooseberry) is extremely rich in Vitamin C, which helps boost immunity and is essential for healthy skin and wound healing.",
      category: "Nutrition",
      difficulty: "easy"
    },
    {
      id: 5,
      question: "What is the normal range for human body temperature?",
      options: [
        "95-96°F (35-35.5°C)",
        "97-99°F (36.1-37.2°C)",
        "100-102°F (37.8-38.9°C)",
        "103-105°F (39.4-40.6°C)"
      ],
      correctAnswer: 1,
      explanation: "Normal human body temperature ranges from 97-99°F (36.1-37.2°C). Temperatures above 100.4°F (38°C) are generally considered fever.",
      category: "General Health",
      difficulty: "medium"
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const result: QuizResult = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect
    };

    setQuizResults(prev => [...prev, result]);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizResults([]);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    const correctAnswers = quizResults.filter(result => result.isCorrect).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return { message: "Excellent! You have great health knowledge!", color: "text-green-600" };
    if (score >= 70) return { message: "Good job! You know quite a bit about health.", color: "text-blue-600" };
    if (score >= 50) return { message: "Not bad! Consider learning more about health topics.", color: "text-yellow-600" };
    return { message: "Keep learning! Health knowledge is very important.", color: "text-red-600" };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (quizCompleted) {
    const score = calculateScore();
    const scoreMessage = getScoreMessage(score);

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="mb-6">
                <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
                <p className="text-gray-600">Great job on completing the health quiz</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">{score}%</div>
                <div className={`text-lg font-medium ${scoreMessage.color} mb-4`}>
                  {scoreMessage.message}
                </div>
                <div className="text-gray-600">
                  You answered {quizResults.filter(r => r.isCorrect).length} out of {questions.length} questions correctly
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-green-900">
                    {quizResults.filter(r => r.isCorrect).length}
                  </div>
                  <div className="text-green-700">Correct Answers</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-red-900">
                    {quizResults.filter(r => !r.isCorrect).length}
                  </div>
                  <div className="text-red-700">Incorrect Answers</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Button onClick={resetQuiz} className="bg-green-600 hover:bg-green-700 mr-4">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Take Quiz Again
                </Button>
                <Button variant="outline">
                  <Book className="h-4 w-4 mr-2" />
                  Learn More Health Tips
                </Button>
              </div>

              <div className="text-sm text-gray-500">
                Keep learning about health to improve your score next time!
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Health Knowledge Quiz
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Test your understanding of basic health concepts
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                {currentQuestion.difficulty}
              </Badge>
              <Badge variant="outline">
                {currentQuestion.category}
              </Badge>
            </div>
            <CardTitle className="text-xl">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-blue-100 border-blue-500 text-blue-800'
                      : showResult && index === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'
                  } ${showResult ? 'cursor-default' : 'cursor-pointer hover:border-gray-300'}`}
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center mr-3 text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                    {showResult && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-5 w-5 ml-auto text-green-600" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 ml-auto text-red-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {!showResult && (
              <div className="mt-6">
                <Button 
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
                </Button>
              </div>
            )}

            {showResult && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">
                      {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                    </h4>
                    <p className="text-blue-800 text-sm">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quiz Info */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">
                💡 <strong>Tip:</strong> Take your time to read each question carefully
              </p>
              <p>
                This quiz covers basic health knowledge that's important for everyone to know
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
