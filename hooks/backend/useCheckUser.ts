import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/utils/supabaseClient";

export function useCheckUser() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      const uid = sessionStorage.getItem("uid");

      if (!uid) {
        toast.error("User ID not found in local storage.");
        return;
      }

      try {
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
      } finally {
      }
    };

    checkUserRole();
  }, []);

  return {
    role,
  };
}
