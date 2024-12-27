import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/utils/supabaseClient";

export function useCheckAnswerQuiz() {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const userID =
    typeof window !== "undefined" ? sessionStorage.getItem("uid") : null;

  useEffect(() => {
    if (userID) {
      // Fetch data from quiz_answers table where user_id matches userID
      const checkUserAnswer = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from("quiz_answers")
            .select("id")
            .eq("user_id", userID);

          if (error) {
            throw error;
          }

          // Check if data is an array and contains elements
          if (Array.isArray(data) && data.length > 0) {
            setHasAnswered(true); // If answers are found, set hasAnswered to true
          } else {
            setHasAnswered(false); // If no answers are found, set hasAnswered to false
          }
        } catch (error: unknown) {
          // Type guard for error
          if (error instanceof Error) {
            toast.error("Failed to check quiz answer: " + error.message);
          } else {
            toast.error("An unknown error occurred.");
          }
        } finally {
          setLoading(false);
        }
      };

      checkUserAnswer();
    }
  }, [userID]);

  return { loading, hasAnswered }; // Return the loading state and hasAnswered
}
