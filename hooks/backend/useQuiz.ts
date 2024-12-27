import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export function useQuiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadQuizzes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("quizzes")
        .select("id, title, description, questions");

      if (error) {
        throw error;
      }

      const formattedData = data.map((quiz: any) => ({
        ...quiz,
        questions: quiz.questions.map((q: any) => ({
          ...q,
          id: q.id || Math.random(),
        })),
      }));

      setQuizzes(formattedData);
    } catch (error: any) {
      toast.error(`Failed to load quizzes: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  return {
    quizzes,
    loading,
  };
}
