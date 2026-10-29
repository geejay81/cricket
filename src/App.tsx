
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { SignupForm } from "@/components/auth/SignupForm";
import { LoginForm } from "@/components/auth/LoginForm";
import Button from "./components/ui/button/Button";
import WidthContainer from "./components/ui/layout/WidthContainer";
import MainContainer from "./components/ui/layout/MainContainer";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const pageContent = user ? (<>
    <h1 className="text-3xl font-bold">
      Cricket App
    </h1>

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
  </>
  ) : (
    <main className="container mx-auto max-w-md p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Cricket App
      </h1>

      <div className="space-y-8">
        <SignupForm />
        <LoginForm />
      </div>
    </main>
  );

  return (
    <WidthContainer>
      <MainContainer>
        {pageContent}
      </MainContainer>
    </WidthContainer>
  );
}

export default App;