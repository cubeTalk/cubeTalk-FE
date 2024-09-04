import { useState } from "react";
import styled from "styled-components";
import { SubmitButton } from "../../common/Button";
import { center, colflex } from "../../../styles/shared";

type Team = "찬성" | "반대";

const VoteBubble = () => {
  const [selectedButton, setSelectedButton] = useState<Team | null>(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
  const handleCheckboxChange = (checkboxUser: string) => {
    setSelectedCheckbox(checkboxUser === selectedCheckbox ? null : checkboxUser);
  };
  const userNames = ["배고픈 하이에나 배고픈 하이에나", "먹먹한 강아지", "멍멍짖는 고양이"];
  const handleButtonClick = (votingTeam: Team) => {
    setSelectedButton(votingTeam === selectedButton ? null : votingTeam);
  };

  return (
    <>
      <ButtonContainer>
        <CircleButton
          isSelected={selectedButton === "찬성"}
          onClick={() => handleButtonClick("찬성")}
          className="bg-yellow"
        >
          <h2>찬성</h2>
        </CircleButton>
        <CircleButton
          isSelected={selectedButton === "반대"}
          onClick={() => handleButtonClick("반대")}
          className="bg-sky"
        >
          <h2>반대</h2>
        </CircleButton>
      </ButtonContainer>
      <UserContainer>
        {userNames.map((name) => {
          return (
            <div className="flex justify-between items-center" key={name}>
              <h3 className={true ? "text-yellow" : "text-sky"}>{name}</h3>
              <label>
                <input
                  className="hidden"
                  type="checkbox"
                  checked={selectedCheckbox === name}
                  onChange={() => handleCheckboxChange(name)}
                />
                <CustomCheckbox isSelected={selectedCheckbox === name} />
              </label>
            </div>
          );
        })}
      </UserContainer>
      <SubmitButton text="투표하기" onclickHandler={() => {}} />
    </>
  );
};

export default VoteBubble;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0px;
`;

const CircleButton = styled.button<{ isSelected: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: ${({ isSelected }) => (isSelected ? "2px solid green" : "2px solid transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border 0.3s ease;

  h2 {
    margin: 0;
  }
`;

const UserContainer = styled.div`
  ${colflex}
  margin: 10px 0px;
  padding: 10px 20px;
  background-color: var(--black);
  border-radius: 15px;
  gap: 5px;

  h3 {
    text-align: left;
  }
`;

const CustomCheckbox = styled.span<{ isSelected: boolean }>`
  ${center}
  width: 20px;
  height: 20px;
  border: ${({ isSelected }) =>
    isSelected ? `2px solid var(--white)` : "2px solid var(--color-mid)"};
  transition: all 0.3s ease;
  margin-left: 10px;
  &:after {
    content: "✓";
    color: var(--white);
    font-weight: 700;
    opacity: ${({ isSelected }) => (isSelected ? 1 : 0)};
  }
`;
