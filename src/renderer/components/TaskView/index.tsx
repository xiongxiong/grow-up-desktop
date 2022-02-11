import moment, { Moment } from "moment";
import { useSelector } from "react-redux";
import { RootState } from "renderer/store";
import { Cycle, DayTask, Task } from "renderer/store/data";
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
        theDayTasks(state.data.tasks, moment(taskViewAnchor))
    );

    const weekDayTasks: DayTask[] = useSelector((state: RootState) =>
        mulDayTasks(
            state.data.tasks,
            moment(taskViewAnchor).startOf("week"),
            moment(taskViewAnchor).endOf("week").add(1, "seconds")
        )
    );

    const monthDayTasks = useSelector((state: RootState) =>
        mulDayTasks(
            state.data.tasks,
            moment(taskViewAnchor).startOf("month"),
            moment(taskViewAnchor).endOf("month").add(1, "seconds")
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

const theDayTasks = (tasks: Task[], mo: Moment) => {
    const todoTasks: Task[] = [];
    const doneTasks: Task[] = [];
    const theDayHead = mo.startOf("day").valueOf();
    const theDayTail = mo.endOf("day").valueOf();
    const todayHead = moment().startOf("day");
    tasks.forEach((task) => {
        const { period, finishAt, removeAt } = task;
        if (!removeAt) {
            let valid = false;
            if (period) {
                const { timeHead, timeTail } = period;
                valid = (timeHead ? timeHead <= theDayTail : true) && (timeTail ? timeTail >= theDayHead : true);
            } else {
                valid = !mo.isBefore(todayHead);
            }
            if (valid) {
                if (finishAt) {
                    if (finishAt >= theDayHead && finishAt <= theDayTail) {
                      doneTasks.push(task);
                    }
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
        const [todoTasks, doneTasks] = theDayTasks(tasks, moTemp);
        dayTasks.push({
            day: moTemp.format("YYYY-MM-DD"),
            todoTasks,
            doneTasks,
        });
        moTemp.add(1, "days");
    }
    return dayTasks;
};

const futureTasks = (cycleTasks: Cycle[], moHead: Moment, moTail: Moment) => {

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
