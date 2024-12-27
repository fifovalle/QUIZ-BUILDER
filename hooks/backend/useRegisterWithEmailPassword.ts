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

  // Handle registration logic
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      // Register user using Supabase authentication
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError; // Throw error if registration fails

      const user = data?.user;

      if (user) {
        // Create or update the user role in the database
        const { error: roleError } = await supabase.from("users").upsert([
          {
            id: user.id,
            email: user.email,
            role: "student", // Default role is 'student'
            created_at: new Date().toISOString(),
          },
        ]);

        if (roleError) throw roleError; // Throw error if there is an issue with role assignment
      }

      // Show success message and redirect to the homepage
      toast.success(
        "Registration successful. Please check your email for confirmation."
      );
      router.push("/"); // Navigate to home page after successful registration
    } catch (error: any) {
      // Show error message if registration fails
      toast.error(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false); // Set loading state to false after operation is complete
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
