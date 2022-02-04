import { memo, useState } from "react";
import { IconType } from "react-icons";
import styled, { css } from "styled-components";
import Separator from "../Separator";

export interface ToolBtnGroupBtnProps {
    icon?: IconType;
    name?: string;
    tooltip?: string;
    onClick: () => void;
}

export interface ToolBtnGroupProps {
    idxInit?: number;
    buttons: ToolBtnGroupBtnProps[];
}

export default memo((props: ToolBtnGroupProps) => {
    const { idxInit = 0, buttons = [] } = props;
    const [idxCur, setIdxCur] = useState(idxInit);
    return (
        <Container>
            {buttons.map((btnProps, index, arr) => {
                const { icon: Icon, name, onClick } = btnProps;
                const clickHandler = () => {
                    if (index !== idxCur) {
                        setIdxCur(index);
                        onClick && onClick();
                    }
                };
                return (
                    <>
                        <ToolBtn
                            key={index}
                            selected={index === idxCur}
                            onClick={clickHandler}
                        >
                            {Icon && <Icon />}
                            {name}
                        </ToolBtn>
                        {index < arr.length - 1 && (
                            <Separator key={`sep_${index}`} padding={4} />
                        )}
                    </>
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
    {} as { disabled: boolean; selected: boolean }
)`
    width: 32px;
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
`;
