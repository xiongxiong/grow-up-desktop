import { useDispatch, useSelector } from "react-redux";
import { RootState } from "renderer/store";
import { Task } from "renderer/store/data";
import { setSelectedTask } from "renderer/store/settings";
import styled, { css } from "styled-components";

export interface TaskItemProps {
    task: Task;
}

export default (props: TaskItemProps) => {
    const { task } = props;

    const dispatch = useDispatch();

    const selectedTaskId = useSelector(
        (state: RootState) => state.settings.selectedTaskId
    );

    const onClick = () => {
        dispatch(setSelectedTask(task.id));
    };

    return (
        <Container selected={selectedTaskId === task.id}  onClick={onClick}>
            <UpPanel></UpPanel>
            <DownPanel>{task.title}</DownPanel>
        </Container>
    );
};

const Container = styled.div.attrs({} as { selected: boolean })`
    padding: 8px;
    margin: 8px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-radius: 4px;

    ${(props) =>
        props.selected
            ? css`
                  border: 1px dashed orange;
              `
            : css`
                  border: 1px dashed lightgray;
              `}
`;

const UpPanel = styled.div`
    padding: 0px 8px;
`;

const DownPanel = styled.div`
    padding: 8px;
    font-size: smaller;
`;
