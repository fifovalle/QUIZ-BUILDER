import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      sessionStorage.removeItem("uid");

      await supabase.auth.signOut();

      toast.success("You have successfully logged out!");

      router.push("/");
    } catch (error) {
      toast.error("An error occurred while logging out.");
      console.error(error);
    }
  };

  return logout;
}
