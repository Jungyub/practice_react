import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SpinBox = () => {
  const [value, setValue] = useState(0);
  const [isPressedMinus, setIsPressedMinus] = useState(false);
  const [isPressedPlus, setIsPressedPlus] = useState(false);

  const handleClickButton = (el) => {
    setValue((prev) => prev + el);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPressedMinus) {
        setValue((prev) => prev - 1);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [isPressedMinus]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPressedPlus) {
        setValue((prev) => prev + 1);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [isPressedPlus]);

  return (
    <SpinBoxContainer>
      <ButtonMinus
        onClick={() => handleClickButton(-1)}
        onMouseDown={() => setIsPressedMinus(true)}
        onMouseUp={() => setIsPressedMinus(false)}
      >
        -
      </ButtonMinus>
      <Count>{value}</Count>
      <ButtonPlus
        onClick={() => handleClickButton(1)}
        onMouseDown={() => setIsPressedPlus(true)}
        onMouseUp={() => setIsPressedPlus(false)}
      >
        +
      </ButtonPlus>
    </SpinBoxContainer>
  );
};

export default SpinBox;

const SpinBoxContainer = styled.div`
  display: flex;
`;
const ButtonMinus = styled.button`
  width: 80px;
  height: 80px;
`;

const ButtonPlus = styled(ButtonMinus)``;

const Count = styled.div`
  width: 200px;
  height: 80px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
