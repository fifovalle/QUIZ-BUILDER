import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useDirect() {
  const router = useRouter();

  useEffect(() => {
    // Check if user data (UID) exists in sessionStorage
    const userData = sessionStorage.getItem("uid");

    // If UID is found, redirect to the home page
    if (userData) {
      router.push("/home");
    }
  }, [router]); // The effect runs whenever the router changes
}
