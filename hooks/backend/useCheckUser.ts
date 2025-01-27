import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

// Custom hook to check and fetch user role
export function useCheckUser() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      const uid = sessionStorage.getItem("uid");

      // Show error if UID is not found
      if (!uid) {
        toast.error("User ID not found in local storage.");
        return;
      }

      try {
        // Fetch user role from the database
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", uid)
          .single();

        if (error) {
          toast.error(`Failed to fetch user role: ${error.message}`);
          throw error;
        }

        if (data) {
          setRole(data.role);
          toast.success("User role fetched successfully.");
        }
      } catch (err: any) {
        toast.error(`Failed to fetch user role: ${err.message}`);
      }
    };

    checkUserRole();
  }, []);

  return {
    role, // Return the user role
  };
}
