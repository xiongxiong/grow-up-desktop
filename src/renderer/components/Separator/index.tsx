import styled, { css } from "styled-components";

const Separator = styled.div.attrs(
    {} as { horizontal: boolean; padding: number; margin: number; color: string }
)`
    align-self: stretch;
    background-color: ${props => props.color || "lightgray"};

    ${(props) =>
        props.horizontal
            ? css`
                  height: 1px;
                  margin: ${props.margin || 0}px ${props.padding || 0}px;
              `
            : css`
                  width: 1px;
                  margin: ${props.padding || 0}px ${props.margin || 0}px;
              `}
`;

export { Separator as default };
