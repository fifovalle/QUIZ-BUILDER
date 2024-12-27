import { useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/utils/supabaseClient";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number | null;
}

interface QuizData {
  title: string;
  description: string;
  questions: Question[];
}

export function useCreateQuiz() {
  const [loading, setLoading] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: ["", "", "", ""], correctAnswer: null },
  ]);

  const isValid = () => {
    if (!quizTitle || !quizDescription) {
      toast.error("Title and description are required.");
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question || !questions[i].options.every((opt) => opt)) {
        toast.error(`Question ${i + 1} is incomplete.`);
        return false;
      }
    }
    return true;
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: null },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    optIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex: number, optIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = optIndex;
    setQuestions(updatedQuestions);
  };

  const handleSaveQuiz = async () => {
    if (!isValid()) return;

    setLoading(true);
    const quizData: QuizData = {
      title: quizTitle,
      description: quizDescription,
      questions,
    };

    try {
      const { error } = await supabase.from("quizzes").insert([quizData]);
      if (error) {
        throw error;
      }
      toast.success("Quiz saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save the quiz.");
    } finally {
      setLoading(false);
    }
  };

  return {
    quizTitle,
    setQuizTitle,
    quizDescription,
    setQuizDescription,
    questions,
    handleAddQuestion,
    handleRemoveQuestion,
    handleQuestionChange,
    handleOptionChange,
    handleCorrectAnswerChange,
    handleSaveQuiz,
    loading,
  };
}
