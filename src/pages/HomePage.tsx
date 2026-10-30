import Button from "@/components/ui/atoms/button/Button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import {  } from "react-router-dom";
const HomePage = () => {

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
  <div className="mt-6 space-y-2">
       <p>Logged in as:</p>

       <p className="font-semibold">
         {user.email}
       </p>

       <Button
         onClick={() => supabase.auth.signOut()}
         mode="warning"
       >
         Sign Out
       </Button>
     </div>
  );
};

export default HomePage;