import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.tertiary};
`;

const Nav = styled.nav`
  border-bottom: 1px solid ${(props) => props.theme.colors.quaternary};
  margin: 0;
  padding: 1rem;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, max-content);
  grid-gap: 1rem;
  justify-content: flex-end;
  list-style: none;
  padding: 0;
  margin: 0;
  width: auto;
`;

const NavBar = () => (
  <Container>
    <Nav>
      <List>
        <li>
          <Link href="/">Movies</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/faqs">FAQs</Link>
        </li>
        <li>
          <Link href="/terms">Terms Of Use</Link>
        </li>
      </List>
    </Nav>
  </Container>
);

export default NavBar;
