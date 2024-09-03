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
`