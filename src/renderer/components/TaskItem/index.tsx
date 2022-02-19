import { useDispatch, useSelector } from "react-redux";
import { RootState } from "renderer/store";
import { Task } from "renderer/store/data";
import { setSelectedTask } from "renderer/store/settings";
import styled, { css } from "styled-components";
import { BiLogInCircle } from "react-icons/bi";

export interface TaskItemProps {
    task: Task;
    isLast: boolean;
}

export default (props: TaskItemProps) => {
    const { task, isLast } = props;

    const dispatch = useDispatch();

    const selectedTask = useSelector(
        (state: RootState) => state.settings.selectedItem
    );

    const onClick = () => {
        dispatch(setSelectedTask(task));
    };

    return (
        <Container
            isLast={isLast}
            selected={selectedTask?.id === task.id}
            focus={task.focus}
            finished={!!task.finishAt}
            removed={!!task.removeAt}
            onClick={onClick}
        >
            <UpPanel></UpPanel>
            <DownPanel>
                {task.cycleId && (
                    <SignBox>
                        <BiLogInCircle />
                    </SignBox>
                )}
                <TaskTitle>{task.title}</TaskTitle>
            </DownPanel>
        </Container>
    );
};

const Container = styled.div.attrs(
    {} as {
        focus: boolean;
        selected: boolean;
        finished: boolean;
        removed: boolean;
        isLast: boolean;
    }
)`
    padding: 4px 4px;
    margin: 0px 16px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    ${(props) =>
        props.selected
            ? css`
                  border-radius: 4px;
                  color: white;
                  background-color: orange;
              `
            : props.focus &&
              css`
                  color: orange;
              `}

    ${(props) =>
        !props.isLast &&
        css`
            border-bottom: 1px dashed lightgray;
        `}

    ${(props) =>
        props.finished &&
        css`
            color: #02c39a;
            text-decoration: line-through;
        `}

    ${(props) =>
        props.removed &&
        css`
            color: #e71d36;
            text-decoration: line-through;
        `}
`;

const UpPanel = styled.div`
    padding: 0px 8px;
`;

const DownPanel = styled.div`
    font-size: smaller;
    display: flex;
    align-items: center;
`;

const SignBox = styled.div`
    margin: 0px 4px;
    color: #ff9f1c;
    display: flex;
    align-items: center;
`;

const TaskTitle = styled.div`
    margin: 8px 4px;
`;
