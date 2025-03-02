import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  userId: number | null;
  firstname: string | null;
  isAdmin: boolean;
}

function useUser(): User {
  const [user, setUser] = useState<User>({
    userId: null,
    firstname: null,
    isAdmin: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<{
          userID: number;
          firstname: string;
          isAdmin: boolean;
        }>(token);
        setUser({
          userId: decoded.userID,
          firstname: decoded.firstname,
          isAdmin: decoded.isAdmin,
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return user;
}

export default useUser;
