import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export function useLoginsignInWithPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user?.id) {
        sessionStorage.setItem("uid", data.user.id);
      }

      toast.success("Login successful. Redirecting...");
      router.push("/home");
    } catch (error: any) {
      toast.error(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
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
