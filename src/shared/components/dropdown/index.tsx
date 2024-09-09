import styled from "styled-components";
import { rowflexCenter, scrollBar, shadow } from "../../style/commonStyle";
import { useEffect, useRef } from "react";
import { StoreApi, UseBoundStore } from "zustand";
import { DropdownState } from "./model";

interface DropdownProps {
  selected: string | number;
  setSelected: (item: string | number) => void;
  list: string[] | number[];
  label: string;
  useStore: UseBoundStore<StoreApi<DropdownState>>;
}

const Dropdown = ({ list, selected, setSelected, label, useStore }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, setIsOpen } = useStore((state) => state);
  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownButtonRef.current && dropdownButtonRef.current.contains(event.target as Node)) {
        setIsOpen(isOpen === label ? "" : label);
        return;
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsOpen, isOpen, label]);

  // 버튼으로 스크롤 이동
  useEffect(() => {
    if (isOpen === label && dropdownButtonRef.current) {
      dropdownButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isOpen, label]);

  return (
    <DropdownContainer>
      <DropdownButton ref={dropdownButtonRef}>
        <h4>{selected}</h4>
        <img alt="down" src="/Icon/down.svg" className={isOpen === label ? "open" : ""} />
      </DropdownButton>
      {isOpen === label && (
        <DropdownContent ref={dropdownRef}>
          {list.map((item) => (
            <StyledButton
              key={item}
              onClick={() => {
                setSelected(item);
                setIsOpen("");
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
  border-radius: 5px;
  margin: 5px 0px;
  z-index: 30;
  max-height: 96px;
  overflow-y: auto;
  scrollbar-width: 1px;
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
