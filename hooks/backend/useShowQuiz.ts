import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/utils/supabaseClient";
import "react-toastify/dist/ReactToastify.css";

export function useShowQuiz() {
  const [quiz, setQuiz] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    totalQuestions: 0,
  });
  const [loading, setLoading] = useState(true);
  const userID = sessionStorage.getItem("uid");

  useEffect(() => {
    // If user ID is not found, show error and stop loading
    if (!userID) {
      toast.error("User ID not found");
      setLoading(false);
      return;
    }

    // Function to fetch quiz data from the database
    const fetchQuizData = async () => {
      try {
        // Fetch data from the "quiz_answers" table based on the user ID
        const { data, error } = await supabase
          .from("quiz_answers")
          .select("*")
          .eq("user_id", userID);

        // If there's an error, throw an exception
        if (error) throw new Error(error.message);

        // Calculate the quiz results
        const totalQuestions = data.length;

        // Ensure data exists before proceeding
        if (totalQuestions === 0) {
          toast.error("No quiz data found");
          setLoading(false);
          return;
        }

        // Calculate score, correct answers, and wrong answers
        const correctAnswers = data.filter(
          (answer) => answer.is_correct === true
        ).length; // Changed to boolean true
        const wrongAnswers = totalQuestions - correctAnswers;
        const score = correctAnswers; // Score is just the correct answers count

        // Update the quiz state with calculated values
        setQuiz({ score, correctAnswers, wrongAnswers, totalQuestions });
      } catch {
        // Show error message if fetching data fails
        toast.error("Failed to fetch quiz data");
      } finally {
        // Stop loading after the process completes
        setLoading(false);
      }
    };

    fetchQuizData(); // Call the function to fetch quiz data
  }, [userID]);

  return { quiz, loading }; // Return quiz data and loading status
}
