import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { supabase } from "@/utils/supabaseClient";

interface Question {
  id: string;
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
    {
      id: uuidv4(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: null,
    },
  ]);

  // Validate quiz data before saving
  const isValid = () => {
    if (!quizTitle || !quizDescription) {
      toast.error("Title and description are required.");
      return false;
    }

    // Check if all questions are complete
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question || !questions[i].options.every((opt) => opt)) {
        toast.error(`Question ${i + 1} is incomplete.`);
        return false;
      }
    }
    return true;
  };

  // Add a new question to the quiz
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        question: "",
        options: ["", "", "", ""],
        correctAnswer: null,
      },
    ]);
  };

  // Remove a question from the quiz by index
  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Update the question text for a specific question
  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  // Update an option for a specific question
  const handleOptionChange = (
    qIndex: number,
    optIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Set the correct answer for a specific question
  const handleCorrectAnswerChange = (qIndex: number, optIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = optIndex;
    setQuestions(updatedQuestions);
  };

  // Save the quiz to the database
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
