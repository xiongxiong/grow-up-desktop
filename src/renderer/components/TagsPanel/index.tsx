import styled from "styled-components";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "renderer/store";
import { getNewTags, tagCreate, tagRemove, TaskTag } from "renderer/store/data";
import ToolBtn from "../ToolBtn";
import TaskTagView from "../TaskTag";

export interface TagsPanelProps {}

export default (props: TagsPanelProps) => {
    const dispatch = useDispatch();

    const mostTags = useSelector((state: RootState) => state.data.tags);

    const [tagStr, setTagStr] = useState("");

    const removeTag = (tag: TaskTag) => {
        dispatch(tagRemove(tag.id));
    };

    const createNewTags = () => {
        const newTags = getNewTags(mostTags, tagStr);
        setTagStr("");
        dispatch(tagCreate(newTags));
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
        setTagStr(e.currentTarget.value);

    const onInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            createNewTags();
        }
    };

    return (
        <Container>
            <TagsBox>
                {mostTags.map((tag) => (
                    <TaskTagView
                        key={tag.id}
                        tag={tag}
                        showIcon
                        onClick={removeTag}
                    />
                ))}
            </TagsBox>
            <InputArea>
                <Input value={tagStr} onChange={onInputChange} onKeyPress={onInputKeyPress} />
                <Btn onClick={createNewTags}>
                    <AiOutlineAppstoreAdd />
                </Btn>
            </InputArea>
        </Container>
    );
};

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 8px;
`;

const TagsBox = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
`;

const InputArea = styled.div`
    display: flex;
    align-items: stretch;
    margin-top: 8px;
`;

const Input = styled.input`
    flex: 1;
    padding: 4px 8px;
    min-width: 30%;
`;

const Btn = styled(ToolBtn)`
    margin: 0px 4px;
    background-color: ${(props) => props.bgColorNormal};
`;
