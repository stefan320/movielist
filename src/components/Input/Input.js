import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: ${(props) => (props.searchInput ? "flex" : "initial")};
  flex-direction: ${(props) => (props.searchInput ? "row-reverse" : "initial")};
  justify-content: ${(props) => (props.searchInput ? "flex-end" : "initial")};

  & label {
    margin-right: ${(props) => (props.searchInput ? ".6rem" : "initial")};
  }
`;

const Input = (props) => {
  return (
    <InputContainer searchInput={props.searchStyles}>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        onChange={props.inputChanged}
        value={props.value}
        checked={props.type === "checkbox" ? props.isChecked : null}
      ></input>
      <label htmlFor={props.name}>{props.name}</label>
    </InputContainer>
  );
};

export default Input;
