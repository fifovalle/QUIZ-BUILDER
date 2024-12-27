import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

// Define types for quiz structure
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

interface Answer {
  quiz_id: number;
  question_index: number;
  answer: string;
  is_correct?: boolean;
  score?: number;
  user_id?: string;
}

export function useQuiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [answers, setAnswers] = useState<
    Record<number, Record<number, string>>
  >({});

  // Load quizzes from the database
  const loadQuizzes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("quizzes")
        .select("id, title, description, questions");

      if (error) {
        throw error; // Handle errors
      }

      // Format the data received from the database
      const formattedData: Quiz[] = data.map((quiz: any) => ({
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        questions: quiz.questions.map((q: any) => ({
          id: q.id,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
        })),
      }));

      setQuizzes(formattedData); // Update the state with formatted quiz data
    } catch (error: any) {
      toast.error(`Failed to load quizzes: ${error.message}`); // Show error toast
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Run loadQuizzes when the component mounts
  useEffect(() => {
    loadQuizzes();
  }, []);

  // Update answers when user selects an answer
  const handleAnswerChange = (
    quizId: number,
    questionId: number,
    answer: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [quizId]: {
        ...(prev[quizId] || {}),
        [questionId]: answer,
      },
    }));
  };

  // Submit the answers for grading and save them to the database
  const handleSubmit = async () => {
    setLoadingSubmit(true); // Start loading
    try {
      // Check if all questions are answered
      const allAnswered = quizzes.every((quiz) =>
        quiz.questions.every(
          (question) => answers[quiz.id]?.[question.id] !== undefined
        )
      );

      if (!allAnswered) {
        toast.error("Please answer all questions before submitting."); // Show error if not all questions are answered
        return;
      }

      // Format answers for submission
      const formattedAnswers: Answer[] = quizzes.flatMap((quiz) =>
        quiz.questions.map((question) => ({
          quiz_id: quiz.id,
          question_index: question.id,
          answer: answers[quiz.id]?.[question.id] || "",
          user_id: sessionStorage.getItem("uid") || "",
        }))
      );

      // Evaluate each answer (check if correct and assign score)
      const evaluatedAnswers = formattedAnswers.map((ans) => {
        const quiz = quizzes.find((q) => q.id === ans.quiz_id);
        const question = quiz?.questions.find(
          (q) => q.id === ans.question_index
        );
        const isCorrect =
          question?.options[question.correctAnswer] === ans.answer;

        return {
          ...ans,
          is_correct: !!isCorrect, // Set is_correct flag
          score: isCorrect ? 1 : 0, // Set score based on correctness
        };
      });

      // Save evaluated answers to the database
      const { error: saveError } = await supabase
        .from("quiz_answers")
        .insert(evaluatedAnswers);

      if (saveError) {
        throw saveError; // Handle errors during save
      }

      // Calculate the total score
      const totalScore = evaluatedAnswers.reduce(
        (sum, ans) => sum + (ans.score || 0),
        0
      );

      toast.success(`Answers saved successfully! Your score: ${totalScore}`); // Success toast
    } catch (error: any) {
      toast.error(`Failed to save answers: ${error.message}`); // Error toast
    } finally {
      setLoadingSubmit(false); // Stop loading
    }
  };

  return {
    quizzes,
    loading,
    loadingSubmit,
    answers,
    handleAnswerChange,
    handleSubmit,
  };
}
