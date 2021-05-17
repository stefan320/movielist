import React from "react";
import styled from "styled-components";
import uniqid from "uniqid";

const SelectMenuContainer = styled.div`
  margin-top: 1rem;

  & select {
    margin-left: 0.5rem;
    padding: 0.2rem 2rem;
    background-color: transparent;
    border-radius: 20px;
    border-color: ${({ theme }) => theme.colors.tertiary};
    color: ${({ theme }) => theme.colors.tertiary};
  }

  & option {
    padding: 0.2rem 2rem;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 20px;
    border-color: ${({ theme }) => theme.colors.tertiary};
    color: ${({ theme }) => theme.colors.tertiary};
  }
`;

const SelectMenu = (props) => {
  const options = props.options.map((option) => (
    <option key={uniqid()} value={option.value}>
      {option.text}
    </option>
  ));
  return (
    <SelectMenuContainer>
      <label htmlFor={props.menuName}>{props.label}</label>
      <select
        name={props.menuName}
        id={props.menuName}
        onChange={props.selectMenuHandler}
        value={props.value}
      >
        {options}
      </select>
    </SelectMenuContainer>
  );
};

export default SelectMenu;
