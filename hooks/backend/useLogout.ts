import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export function useLogout() {
  const router = useRouter();

  // Logout function
  const logout = async () => {
    try {
      // Remove user ID from sessionStorage
      sessionStorage.removeItem("uid");

      // Sign out from Supabase
      await supabase.auth.signOut();

      toast.success("You have successfully logged out!"); // Success message
      router.push("/"); // Redirect to the homepage
    } catch (error) {
      toast.error("An error occurred while logging out."); // Error message
      console.error(error); // Log the error to the console
    }
  };

  return logout; // Return the logout function
}
