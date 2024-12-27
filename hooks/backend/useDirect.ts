import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useDirect() {
  const router = useRouter();

  useEffect(() => {
    // Get the user data (UID) from sessionStorage
    const userData = sessionStorage.getItem("uid");

    // If UID exists, redirect to allowed pages
    if (userData) {
      // Check if the user is on an allowed page
      const allowedPaths = ["/home", "/create", "/quiz"];
      const currentPath = window.location.pathname;

      if (allowedPaths.includes(currentPath)) {
        router.push(currentPath); // Redirect to the current page if allowed
      } else {
        router.push("/home"); // Redirect to the default page if the current page is not allowed
      }
    } else {
      // If UID doesn't exist, redirect to the login or home page
      router.push("/");
    }
  }, [router]); // This effect runs every time the router changes
}
