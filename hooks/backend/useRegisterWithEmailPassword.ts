import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export function useRegisterWithEmailPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const user = data?.user;

      if (user) {
        const { error: roleError } = await supabase.from("users").upsert([
          {
            id: user.id,
            email: user.email,
            role: "student",
            created_at: new Date().toISOString(),
          },
        ]);

        if (roleError) throw roleError;
      }

      toast.success(
        "Registration successful. Please check your email for confirmation."
      );
      router.push("/");
    } catch (error: any) {
      toast.error(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handleRegister,
  };
}
