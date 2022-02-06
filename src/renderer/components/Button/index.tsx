import styled, { css } from "styled-components";

const ToolBtn = styled.div.attrs(
    {} as { disabled: boolean; selected: boolean }
)`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed lightgray;
    border-radius: 4px;

    ${(props) =>
        props.disabled
            ? css`
                  color: lightgray;
              `
            : props.selected
            ? css`
                  color: white;
                  background-color: lightskyblue;
              `
            : css`
                  &:hover {
                      background-color: lightgray;
                  }
                  &:active {
                      background-color: white;
                  }
              `}
`;

export { ToolBtn as default };
