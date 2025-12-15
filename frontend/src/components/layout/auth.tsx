import { Header } from "../ui/Header";
import { HeaderVariant } from "../types/layout";
import { useAuth } from "./AuthContext";

export const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  const headerVariant: HeaderVariant = user ? "auth" : "public";

  return (
    <>
      <Header variant={headerVariant} />
      <main>{children}</main>
    </>
  );
};
