import styled, { css } from 'styled-components';

export const ContextMenu = styled.div`
  border-radius: 4px;
  box-sizing: border-box;
  position: absolute;
  width: 180px;
  background-color: white;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    list-style-type: none;
    box-sizing: border-box;
    margin: 0;
    padding: 0px;
  }
  ul li {
    padding: 8px 4px;
    border-radius: 4px;
  }
  ul li:hover {
    cursor: pointer;
    background-color: white;
  }
`;
