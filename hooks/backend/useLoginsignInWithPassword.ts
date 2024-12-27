import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export function useLoginsignInWithPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Login handler
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state

    try {
      // Attempt login with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error; // Handle error

      // Store user ID on successful login
      if (data?.user?.id) {
        sessionStorage.setItem("uid", data.user.id);
      }

      toast.success("Login successful. Redirecting..."); // Success toast
      router.push("/home"); // Redirect to home
    } catch (error: any) {
      toast.error(`Login failed: ${error.message}`); // Error toast
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  };
}
