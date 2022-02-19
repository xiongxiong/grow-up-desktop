import styled from "styled-components";
import {FiMoreHorizontal} from "react-icons/fi";
import {IoCheckmarkOutline} from "react-icons/io5";
import BasicBtn from "../BasicBtn";
import { getNewTags, tagCreate, tagUpdate, TaskTag } from "renderer/store/data";
import TaskTagView from "../TaskTag";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "renderer/store";
import { ChangeEvent, useState } from "react";

export interface TagInputProps {
    tags?: TaskTag[],
    updateTags: (tags: TaskTag[]) => void,
}

export default (props: TagInputProps) => {
  const dispatch = useDispatch();

  const {tags = [], updateTags} = props;

  const [tagStr, setTagStr] = useState("");

  const appendTag = (tag: TaskTag) => {
    if (tags.findIndex(t => t.id === tag.id) === -1) {
      updateTags([...tags, tag]);
      dispatch(tagUpdate(tag.id));
    }
  };

  const removeTag = (tag: TaskTag) => updateTags(tags.filter(({id}) => id !== tag.id));

  const lastTags = useSelector((state: RootState) => state.data.tagsLast.slice(0, 6));

  const mostTags = useSelector((state: RootState) => state.data.tags);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setTagStr(e.currentTarget.value);

  const createNewTags = () => {
      const newTags = getNewTags(mostTags, tagStr);
      setTagStr("");
      updateTags([...tags, ...newTags]);
      dispatch(tagCreate(newTags));
  };

  return (
    <Container>
      {tags.length > 0 && <EditBox>
          {tags.map(tag => <TaskTagView key={tag.id} tag={tag} showIcon={true} onClick={removeTag}/>)}
        </EditBox>}
      <InputArea>
      <TheInput onChange={onInputChange} />
      <Btn onClick={createNewTags}>
        <IoCheckmarkOutline size={16} />
      </Btn>
      <ShowBox>
        {lastTags.map(tag => <TaskTagView key={tag.id} tag={tag} onClick={appendTag} />)}
      </ShowBox>
      <Btn>
        <FiMoreHorizontal size={16} />
      </Btn>
      </InputArea>
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

const TheInput = styled.input`
  flex: 1;
  padding: 4px 8px;
  min-width: 30%;
`;

const EditBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ShowBox = styled.div`
  display: flex;
  overflow: hidden;
  padding: 0px 8px;
  margin-left: 8px;
`;

const Btn = styled(BasicBtn)`
  padding: 8px;
`;
