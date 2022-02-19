import { useDispatch, useSelector } from "react-redux";
import { RootState } from "renderer/store";
import { Task } from "renderer/store/data";
import { setSelectedTask } from "renderer/store/settings";
import styled, { css } from "styled-components";
import { BiLogInCircle } from "react-icons/bi";
import { MdTimerOff } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";

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

    const timingText = (total: number = 0) => {
        const totalSeconds = Math.floor(total / 1000);
        const day = Math.floor(totalSeconds / 86400);
        const hour = Math.floor((totalSeconds % 86400) / 3600);
        const minute = Math.floor((totalSeconds % 3600) / 60);
        const second = Math.floor(totalSeconds % 60);
        return (
            (day ? day + "天" : "") +
            (hour ? hour + "小时" : "") +
            (minute ? minute + "分" : "") +
            (second ? second + "秒" : "")
        );
    };

    return (
        <Container
            isLast={isLast}
            selected={selectedTask?.id === task.id}
            focus={task.focus}
            onClick={onClick}
        >
            <UpPanel></UpPanel>
            <DownPanel>
                {task.cycleId && (
                    <SignBox selected={selectedTask?.id === task.id}>
                        <BiLogInCircle />
                    </SignBox>
                )}
                {task.timing &&
                    (task.timing.isTiming ? (
                        <SignBox selected={selectedTask?.id === task.id}>
                            <AiOutlineFieldTime />
                        </SignBox>
                    ) : (
                        <SignBox selected={selectedTask?.id === task.id}>
                            <MdTimerOff />
                        </SignBox>
                    ))}
                {task.tags && (
                    <TagBox selected={selectedTask?.id === task.id}>
                        {task.tags.map(({ name }) => name).join(" ✧ ")}
                    </TagBox>
                )}
                <TaskTitle finished={!!task.finishAt} removed={!!task.removeAt}>
                    {task.title}
                </TaskTitle>
                {task.finishAt && task.timing && (
                    <TimingBox>{timingText(task.timing.total)}</TimingBox>
                )}
            </DownPanel>
        </Container>
    );
};

const Container = styled.div.attrs(
    {} as {
        focus: boolean;
        selected: boolean;
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
                  background-color: #ff9f1c;
              `
            : props.focus &&
              css`
                  color: #ff9f1c;
              `}

    ${(props) =>
        !props.isLast &&
        css`
            border-bottom: 1px dashed lightgray;
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

const SignBox = styled.div.attrs({} as { selected: boolean })`
    margin: 0px 4px;
    color: ${(props) => (props.selected ? "white" : "#ff9f1c")};
    display: flex;
    align-items: center;
`;

const TagBox = styled.div.attrs({} as { selected: boolean })`
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 4px;
    border-radius: 4px;
    font-size: x-small;
    color: ${(props) => (props.selected ? "#ff9f1c" : "white")};
    background-color: ${(props) => (props.selected ? "white" : "#ff9f1c")};
`;

const TaskTitle = styled.div.attrs(
    {} as {
        finished: boolean;
        removed: boolean;
    }
)`
    margin: 8px 4px;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

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

const TimingBox = styled.div`
    font-size: smaller;
`;
