import PublicHeader from "./PublicHeader";
import AuthHeader from "./AuthHeader";
import { HeaderVariant } from "../types/layout";

interface HeaderProps {
  variant: HeaderVariant;
}

export const Header = ({ variant }: HeaderProps) => {
  if (variant === "auth") return <AuthHeader />;
  return <PublicHeader />;
};
