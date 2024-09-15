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
    query: "(min-width: 769px) and (max-width: 1120px)",
  });
  return <>{isPad && children}</>;
};

export const NonDesktop = ({ children }: Props) => {
  const isNonDesktop = useMediaQuery({
    query: "(max-width: 1120px)",
  });
  return <>{isNonDesktop && children}</>;
};

export const NonMobile = ({ children }: Props) => {
  const isNonMobile = useMediaQuery({
    query: "(min-width: 769px)",
  });
  return <>{isNonMobile && children}</>;
};


export const Desktop = ({ children }: Props) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1121px)",
  });
  return <>{isDesktop && children}</>;
};
