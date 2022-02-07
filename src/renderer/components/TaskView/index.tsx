import moment, { Moment } from "moment";
import { useSelector } from "react-redux";
import { RootState } from "renderer/store";
import { DayTask, Task } from "renderer/store/data";
import { TaskViewUnit } from "renderer/store/settings";
import styled, { css } from "styled-components";
import TaskDay from "../TaskDay";
import TaskList from "../TaskList";

export interface TaskViewProps {}

export default (props: TaskViewProps) => {
    const taskViewUnit = useSelector(
        (state: RootState) => state.settings.taskViewUnit
    );

    const taskViewAnchor = useSelector(
      (state: RootState) => state.settings.taskViewAnchor || Date.now()
  );

    const taskViewFinished = useSelector(
        (state: RootState) => state.settings.taskViewFinished
    );

    const [todayTodoTasks, todayDoneTasks] = useSelector((state: RootState) =>
        oneDayTasks(state.data.tasks, moment(taskViewAnchor))
    );

    const weekDayTasks: DayTask[] = useSelector((state: RootState) =>
        mulDayTasks(
            state.data.tasks,
            moment(taskViewAnchor).startOf("week"),
            moment(taskViewAnchor).endOf("week")
        )
    );

    const monthDayTasks = useSelector((state: RootState) =>
        mulDayTasks(
            state.data.tasks,
            moment(taskViewAnchor).startOf("month"),
            moment(taskViewAnchor).endOf("month")
        )
    );

    const viewRender = () => {
        switch (taskViewUnit) {
            case TaskViewUnit.Month:
                return monthDayTasks.map((dayTask) => (
                    <TaskDay
                        key={dayTask.day}
                        taskViewFinished={taskViewFinished}
                        dayTask={dayTask}
                    />
                ));
            case TaskViewUnit.Week:
                return weekDayTasks.map((dayTask) => (
                    <TaskDay
                        key={dayTask.day}
                        taskViewFinished={taskViewFinished}
                        dayTask={dayTask}
                    />
                ));
            case TaskViewUnit.Day:
                return (
                    <TaskList
                        tasks={
                            taskViewFinished ? todayDoneTasks : todayTodoTasks
                        }
                    />
                );
        }
    };

    return <Container taskViewUnit={taskViewUnit}>{viewRender()}</Container>;
};

const oneDayTasks = (tasks: Task[], mo: Moment) => {
    const todoTasks: Task[] = [];
    const doneTasks: Task[] = [];
    tasks.forEach((task) => {
        const { period, finishAt, removeAt } = task;
        if (!removeAt) {
            let valid = false;
            if (period) {
                const { timeHead, timeTail } = period;
                const head = mo.startOf("day").valueOf();
                const tail = mo.endOf("day").valueOf();
                if (
                    timeHead &&
                    timeHead < tail &&
                    timeTail &&
                    timeTail > head
                ) {
                    valid = true;
                }
            } else {
                valid = true;
            }
            if (valid) {
                if (finishAt) {
                    doneTasks.push(task);
                } else {
                    todoTasks.push(task);
                }
            }
        }
    });
    return [todoTasks, doneTasks];
};

const mulDayTasks = (tasks: Task[], moHead: Moment, moTail: Moment) => {
    const dayTasks: DayTask[] = [];
    const moTemp = moHead;
    while (moTemp.isBefore(moTail)) {
        const [todoTasks, doneTasks] = oneDayTasks(tasks, moTemp);
        dayTasks.push({
            day: moTemp.format("YYYY-MM-DD"),
            todoTasks,
            doneTasks,
        });
        moTemp.add(1, "days");
    }
    return dayTasks;
};

const Container = styled.div.attrs({} as { taskViewUnit: TaskViewUnit })`
    flex: 1;
    display: flex;
    align-items: stretch;

    ${(props) => {
        switch (props.taskViewUnit) {
            case TaskViewUnit.Month:
            case TaskViewUnit.Week:
                return css`
                    overflow-x: auto;
                    flex-wrap: nowrap;
                `;
            case TaskViewUnit.Day:
                return css`
                    flex-direction: column;
                `;
        }
    }}
`;
