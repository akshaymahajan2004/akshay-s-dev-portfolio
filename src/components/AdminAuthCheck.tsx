import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminAuthCheck({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("No user found, redirecting to login...");
        navigate("/admin/login"); // Redirects to login if not authenticated
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 text-black">
        <div className="text-xl font-semibold">Checking access...</div>
      </div>
    );
  }

  // Only render the Admin Dashboard (children) if the user is confirmed
  return user ? <>{children}</> : null;
}