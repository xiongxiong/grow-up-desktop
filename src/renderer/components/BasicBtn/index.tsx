import styled, { css } from "styled-components";

export default styled.div.attrs({} as { disabled: boolean, selected: boolean, bgColorDisabled: string, bgColorSelected: string, bgColorActive: string, bgColorNormal: string, colorDisabled: string, colorSelected: string, colorActive: string, colorNormal: string })`
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    color: ${props => props.colorNormal};
    background-color: ${props => props.bgColorNormal};

    ${(props) =>
        props.disabled
            ? css`
                  color: ${props.colorDisabled || "lightgray"};
                  background-color: ${props.bgColorDisabled};
              `
            : props.selected &&
              css`
                  color: ${props.colorSelected || "white"};
                  background-color: ${props.bgColorSelected || "#FF9F1C"};
              `}
    &:hover {
        color: ${props => props.selected ? "white" : "#FF9F1C"};
        opacity: 0.7;
    }
    &:active {
        background-color: ${props => props.colorActive};
        background-color: ${props => props.bgColorNormal || "white"};
    }
`;
