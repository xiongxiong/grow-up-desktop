import { TaskTag } from "renderer/store/data";
import styled, { css } from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import { CSSProperties } from "react";

export interface TaskTagProps {
    tag: TaskTag;
    showIcon?: boolean;
    onClick?: (tag: TaskTag) => void;
    style?: CSSProperties | undefined;
}

export default (props: TaskTagProps) => {
    const { tag, showIcon, onClick, style } = props;

    return (
        <Container
            showIcon={showIcon}
            onClick={() => onClick && onClick(tag)}
            style={style}
        >
            <NameBox>{tag.name}</NameBox>
            {showIcon && (
                <IoCloseOutline size={12} style={{ marginLeft: "4px" }} />
            )}
        </Container>
    );
};

const Container = styled.div.attrs({} as { showIcon: boolean })`
    height: 14px;
    font-size: x-small;
    user-select: none;
    display: flex;
    align-items: center;
    color: white;
    background-color: #70c1b3;
    margin: 2px 2px;
    border-radius: 2px;

    ${(props) =>
        props.showIcon
            ? css`
                  padding: 6px 4px 6px 8px;
              `
            : css`
                  padding: 6px 6px;
              `}
`;

const NameBox = styled.div`
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
