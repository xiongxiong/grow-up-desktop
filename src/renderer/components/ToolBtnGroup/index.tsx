import { memo } from "react";
import { IconType } from "react-icons";
import styled, { css } from "styled-components";

export interface ToolBtnGroupBtnProps {
    icon?: IconType;
    name?: string;
    tooltip?: string;
    onClick: () => void;
}

export interface ToolBtnGroupProps {
    curIndex?: number;
    buttons: ToolBtnGroupBtnProps[];
}

export default memo((props: ToolBtnGroupProps) => {
    const { curIndex = 0, buttons = [] } = props;

    return (
        <Container>
            {buttons.map((btnProps, index, arr) => {
                const { icon: Icon, name, onClick } = btnProps;
                const clickHandler = () => {
                    if (index !== curIndex) {
                        onClick && onClick();
                    }
                };
                return (
                    <ToolBtn
                        key={index}
                        selected={index === curIndex}
                        isNotLast={index !== arr.length - 1}
                        onClick={clickHandler}
                    >
                        {Icon && <Icon />}
                        {name}
                    </ToolBtn>
                );
            })}
        </Container>
    );
});

const Container = styled.div`
    height: 32px;
    border: 1px dashed lightgray;
    border-radius: 4px;
    display: flex;
    font-size: smaller;
`;

const ToolBtn = styled.div.attrs(
    {} as { disabled: boolean; selected: boolean, isNotLast: boolean }
)`
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

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
              ${props => props.isNotLast && css`
                  border-right: 1px solid lightgray;
              `}
`;
