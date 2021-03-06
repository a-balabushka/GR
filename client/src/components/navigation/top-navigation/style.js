import styled from "styled-components";

import { headerBackground, searchColor, sizes } from "../../../style-constants";

export const Header = styled.header`
  height: 50px;
  
  display: flex;
  padding: 0 5%;
  align-items: center;
  position: relative;
  
  background: ${headerBackground};
`;

export const Icon = styled.img`
  margin: 0 0.8em;
  cursor: pointer;
`;

export const Logo = styled.span`
  @media (max-width: ${sizes.screen600}) {
    flex-grow: 2;
  }
`;

export const Username = styled.span`
  color: ${searchColor};
  font-size: 1.1em;
  cursor: default;
`;
