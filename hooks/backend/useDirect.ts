import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useDirect() {
  const router = useRouter();

  useEffect(() => {
    const userData = sessionStorage.getItem("uid");
    if (userData) {
      router.push("/home");
    }
  }, [router]);
}
