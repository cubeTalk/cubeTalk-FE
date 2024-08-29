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
  justify-content: center;
`;
export const colflexCenter = css`
  ${colflex}
  justify-content: center;
`;
