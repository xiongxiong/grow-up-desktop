import styled, { css } from "styled-components";

export default styled.div.attrs({} as { disabled: boolean; selected: boolean })`
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    ${(props) =>
        props.disabled
            ? css`
                  color: lightgray;
              `
            : props.selected &&
              css`
                  color: white;
                  background-color: #02c39a;
              `}
    &:hover {
        opacity: 0.7;
    }
    &:active {
        background-color: white;
    }
`;
