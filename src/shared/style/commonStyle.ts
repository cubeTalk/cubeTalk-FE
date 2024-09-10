import { css } from "styled-components";

export const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const colCenter = css`
  display: flex;
  align-items: center;
`;

export const rowCenter = css`
  display: flex;
  justify-content: center;
`;
export const rowflex = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const rowflexCenter = css`
  ${rowflex}
  justify-content: center;
`;
export const colflex = css`
  display: flex;
  flex-direction: column;
`;
export const colflexCenter = css`
  ${colflex}
  justify-content: center;
  align-items: center;
`;

export const commonButton = css`
  ${rowflexCenter}
  border-radius: 8px;
  padding: 0px 10px;
  gap: 10px;
`;

export const scrollBar = css`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-primary);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-mid);
  }
`;

export const mediaQuery = {
  mobile: "(max-width: 768px)",
  tablet: "(min-width: 769px) and (max-width: 1120px)",
  desktop: "(min-width: 1121px)",
};

export const shadow = css`
  box-shadow: 1px 1px 5px var(--color-mid);
`;

export const spinner = css`
  box-sizing: border-box;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--white);
  border-radius: 100%;
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    100%
    {
      transform: rotate(360deg);
    }
  }
`;