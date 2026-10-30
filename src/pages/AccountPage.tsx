import Heading from "@/components/ui/atoms/heading/Heading";
import { useAuth } from "@/contexts/AuthContext";

export function AccountPage() {
  const { user } = useAuth();

  return (
    <>
      <Heading level={2}>
        Account
      </Heading>

      <p>
        Username: {user?.user_metadata.username}
      </p>

      <p>
        Email: {user?.email}
      </p>
    </>
  );
}

export default AccountPage;
