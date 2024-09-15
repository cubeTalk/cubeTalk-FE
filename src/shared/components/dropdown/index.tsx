import styled from "styled-components";
import { rowflexCenter, scrollBar, shadow } from "../../style/commonStyle";
import { useCallback, useEffect, useRef } from "react";
import { StoreApi, UseBoundStore } from "zustand";
import { DropdownState } from "./model";

interface DropdownProps<T extends string | number> {
  selected: T;
  setSelected: (item: T) => void;
  list: T[];
  label: string;
  useStore: UseBoundStore<StoreApi<DropdownState>>;
}

const Dropdown = <T extends string | number>({
  list,
  selected,
  setSelected,
  label,
  useStore,
}: DropdownProps<T>) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, actions } = useStore((state) => state);

  // Handle click outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownButtonRef.current && dropdownButtonRef.current.contains(event.target as Node)) {
        return;
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        actions.reset();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [actions]);

  // Scroll into view when dropdown is open
  useEffect(() => {
    if (isOpen === label && dropdownButtonRef.current) {
      dropdownButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isOpen, label]);

  // Handle button click to toggle dropdown
  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      actions.onClickDropdown(label);
    },
    [actions, label]
  );

  return (
    <DropdownContainer>
      <DropdownButton ref={dropdownButtonRef} onClick={handleButtonClick}>
        <h4>{selected}</h4>
        <img alt="down" src="/Icon/down.svg" className={isOpen === label ? "open" : ""} />
      </DropdownButton>
      {isOpen === label && (
        <DropdownContent ref={dropdownRef}>
          {list.map((item) => (
            <StyledButton
              key={item as string | number}
              onClick={() => {
                setSelected(item);
                actions.reset();
              }}
              $selected={selected === item}
            >
              {item}
            </StyledButton>
          ))}
        </DropdownContent>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  position: relative;
  width: fit-content;
  min-width: 100px;
`;

const DropdownButton = styled.button`
  ${rowflexCenter}
  ${shadow}
  border-radius: 5px;
  padding: 4px 16px;
  width: 100%;
  h4 {
    font-size: 16px;
  }
  img {
    position: relative;
    left: 10px;
    width: 15px;
    margin-left: 5px;
    color: var(--color-mid);
    transition: transform 0.3s ease-in-out;
  }
  img.open {
    transform: rotate(180deg);
  }
`;

const DropdownContent = styled.div`
  ${shadow}
  ${scrollBar}
  position: absolute;
  width: 100%;
  background-color: var(--white);
  margin: 5px 0px;
  z-index: 1;
  max-height: 96px;
  overflow-y: auto;
`;

const StyledButton = styled.button<{ $selected: boolean }>`
  font-weight: ${({ $selected }) => ($selected ? "700" : "400")};
  color: ${({ $selected }) => ($selected ? "var(--color-green)" : "var(--black)")};
  padding: 0px 10px;
  width: 100%;
  padding: 4px 0px;
  &:hover {
    background-color: var(--color-light);
  }
`;
