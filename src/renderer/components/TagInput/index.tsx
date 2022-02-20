import styled from "styled-components";
import {BsChevronBarExpand, BsChevronBarContract} from "react-icons/bs";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import BasicBtn from "../BasicBtn";
import { getNewTags, tagCreate, tagUpdate, TaskTag } from "renderer/store/data";
import TaskTagView from "../TaskTag";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "renderer/store";
import { ChangeEvent, useState } from "react";

export interface TagInputProps {
    tags?: TaskTag[];
    updateTags: (tags: TaskTag[]) => void;
}

export default (props: TagInputProps) => {
    const dispatch = useDispatch();

    const { tags = [], updateTags } = props;

    const [tagStr, setTagStr] = useState("");

    const [showAll, setShowAll] = useState(false);

    const appendTag = (tag: TaskTag) => {
        if (tags.findIndex((t) => t.id === tag.id) === -1) {
            updateTags([...tags, tag]);
            dispatch(tagUpdate(tag.id));
        }
    };

    const removeTag = (tag: TaskTag) =>
        updateTags(tags.filter(({ id }) => id !== tag.id));

    const lastTags = useSelector((state: RootState) =>
        state.data.tagsLast.slice(0, 6)
    );

    const mostTags = useSelector((state: RootState) => state.data.tags);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
        setTagStr(e.currentTarget.value);

    const createNewTags = () => {
        const newTags = getNewTags(mostTags, tagStr);
        setTagStr("");
        updateTags([...tags, ...newTags]);
        dispatch(tagCreate(newTags));
    };

    return (
        <Container>
            {tags.length > 0 && (
                <EditTagBox>
                    {tags.map((tag) => (
                        <TaskTagView
                            key={tag.id}
                            tag={tag}
                            showIcon
                            onClick={removeTag}
                        />
                    ))}
                </EditTagBox>
            )}
            <InputArea>
                <Input onChange={onInputChange} />
                <Btn onClick={createNewTags}>
                    <AiOutlineAppstoreAdd size={16} />
                </Btn>
                <LastTagBox>
                    {lastTags.map((tag) => (
                        <TaskTagView
                            key={tag.id}
                            tag={tag}
                            onClick={appendTag}
                        />
                    ))}
                </LastTagBox>
                <Btn onClick={() => setShowAll(!showAll)}>
                    {showAll ? <BsChevronBarContract size={16} /> : <BsChevronBarExpand size={16} />}
                </Btn>
            </InputArea>
            {showAll && (
                <MostTagBox>
                    {mostTags.map((tag) => (
                        <TaskTagView
                            key={tag.id}
                            tag={tag}
                            onClick={appendTag}
                        />
                    ))}
                </MostTagBox>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 4px 0px;
`;

const InputArea = styled.div`
    display: flex;
    align-items: center;
    margin-top: 4px;
`;

const Input = styled.input`
    flex: 1;
    padding: 4px 8px;
    min-width: 30%;
`;

const EditTagBox = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const LastTagBox = styled.div`
    display: flex;
    overflow: hidden;
    padding: 0px 8px;
    margin-left: 8px;
`;

const MostTagBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    height: 120px;
    overflow-y: auto;
    margin-top: 4px;
    padding: 4px;
    border: 1px solid;
    border-radius: 2px;
`;

const Btn = styled(BasicBtn)`
    padding: 8px;
`;
