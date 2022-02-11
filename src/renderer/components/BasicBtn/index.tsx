import styled, { css } from "styled-components";

export default styled.div.attrs(
    {} as { disabled: boolean; selected: boolean }
)`
    display: flex;
    justify-content: center;
    align-items: center;

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
