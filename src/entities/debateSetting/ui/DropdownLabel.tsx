import { HTMLAttributes } from "react";
import { SettingEntry } from "..";
import Dropdown from "../../../shared/components/dropdown";
import { useModalDropdownStore } from "../model/store";
import styled from "styled-components";

type DropdownLabelProps<T extends string | number> = {
  settingEntries: SettingEntry<T>[];
} & HTMLAttributes<HTMLDivElement>;

const DropdownLabel = <T extends string | number>({ settingEntries, ...rest }: DropdownLabelProps<T>) => {
  return (
    <>
      {settingEntries.map(({ label, state, setState, key, list }) => (
        <div key={key} {...rest}>
          <Label>{label}</Label>
          <Dropdown
            list={list}
            selected={state}
            setSelected={(item: T) => setState(item)}
            label={key}
            useStore={useModalDropdownStore}
          />
        </div>
      ))}
    </>
  );
};

export default DropdownLabel;

export const Label = styled.label`
  font-size: 1rem;
  margin: 0 0 0 0.5rem;
`;
