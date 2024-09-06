import { useMediaQuery } from "react-responsive";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Mobile = ({ children }: Props) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  return <>{isMobile && children}</>;
};

export const Pad = ({ children }: Props) => {
  const isPad = useMediaQuery({
    query: "(min-width: 769px)",
  });
  return <>{isPad && children}</>;
};

export const mediaQuery = {
  mobile: "(max-  width: 768px)",
  tablet: "(min-width: 769px) and (max-width: 1120px)",
  desktop: "(min-width: 1121px)",
};
