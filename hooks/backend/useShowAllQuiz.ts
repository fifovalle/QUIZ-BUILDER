import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/utils/supabaseClient";

export function useShowAllQuiz() {
  const [quiz, setQuiz] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    totalQuestions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch quiz data from the database
    const fetchQuizData = async () => {
      try {
        // Fetch data from the "quiz_answers" table
        const { data, error } = await supabase.from("quiz_answers").select("*");

        // If there's an error, throw an exception
        if (error) throw new Error(error.message);

        // Ensure data exists before proceeding
        if (!data || data.length === 0) {
          toast.error("No quiz data found");
          setLoading(false);
          return;
        }

        // Calculate the quiz results
        const totalQuestions = data.length;
        const correctAnswers = data.filter(
          (answer) => answer.is_correct
        ).length; // Filter for correct answers
        const wrongAnswers = totalQuestions - correctAnswers;
        const score = correctAnswers; // Score is the number of correct answers

        // Update quiz state with calculated values
        setQuiz({
          score,
          correctAnswers,
          wrongAnswers,
          totalQuestions,
        });
      } catch (err) {
        // Ensure error is handled properly
        if (err instanceof Error) {
          toast.error("Failed to fetch quiz data: " + err.message);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        // Stop loading after the process completes
        setLoading(false);
      }
    };

    fetchQuizData(); // Call the function to fetch quiz data
  }, []); // Add an empty dependency array to run once when component mounts

  return { quiz, loading }; // Return quiz data and loading status
}
