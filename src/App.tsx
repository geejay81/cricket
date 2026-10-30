
import WidthContainer from "./components/ui/layout/WidthContainer";
import { Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import HomePage from "@/pages/HomePage";
import Header from "@/components/ui/organisms/header/Header";
import { AuthGuard } from "@/guards/AuthGuard";
import AccountPage from "@/pages/AccountPage";
import NavigationBar from "@/components/ui/organisms/nav/NavigationBar";

function App() {

  return (
    <WidthContainer>
      <Header pageTitle="Cricket app" />
      <NavigationBar />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/signup"
            element={<SignupPage />}
          />

          <Route
            path="/account"
            element={
              <AuthGuard>
                <AccountPage />
              </AuthGuard>
            }
          />
        </Routes>
      </main>

      {/* <Footer /> */}
    </WidthContainer>
  );
}

export default App;