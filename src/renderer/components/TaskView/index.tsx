import moment, { Moment } from "moment";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { RootState } from "renderer/store";
import { Task, DayTask } from "renderer/store/data";
import { ViewUnit } from "renderer/store/settings";
import styled, { css } from "styled-components";
import TaskDay from "../TaskDay";
import TaskList from "../TaskList";

export interface TaskViewProps {}

export default (props: TaskViewProps) => {
    const viewUnit = useSelector((state: RootState) => state.settings.viewUnit);

    const timeAnchor = useSelector(
        (state: RootState) => state.settings.timeAnchor || Date.now()
    );

    const showFinish = useSelector(
        (state: RootState) => state.settings.showFinish
    );

    const showRemove = useSelector(
        (state: RootState) => state.settings.showRemove
    );

    const showCycle = useSelector(
        (state: RootState) => state.settings.showCycle
    );

    const cycles = useSelector((state: RootState) => state.data.cycles);

    const [todayTodoTasks, todayDoneTasks] = useSelector((state: RootState) =>
        theDayTasks(state.data.tasks, state.data.cycles, moment(timeAnchor))
    );

    const weekDayTasks: DayTask[] = useSelector((state: RootState) =>
        mulDayTasks(
            state.data.tasks,
            state.data.cycles,
            moment(timeAnchor).startOf("week"),
            moment(timeAnchor).endOf("week").add(1, "seconds")
        )
    );

    const monthDayTasks = useSelector((state: RootState) =>
        mulDayTasks(
            state.data.tasks,
            state.data.cycles,
            moment(timeAnchor).startOf("month"),
            moment(timeAnchor).endOf("month").add(1, "seconds")
        )
    );

    const dropTasks = useSelector((state: RootState) =>
        state.data.tasks.filter((task) => task.removeAt)
    );

    const dropCycles = useSelector((state: RootState) =>
        state.data.cycles.filter((cycle) => cycle.removeAt)
    );

    const viewRender = () => {
        if (showCycle) {
            if (showRemove) {
                return <TaskList tasks={dropCycles} />;
            } else {
                return <TaskList tasks={cycles} />;
            }
        } else {
            if (showRemove) {
                return <TaskList tasks={dropTasks} />;
            } else {
                switch (viewUnit) {
                    case ViewUnit.Month:
                        return monthDayTasks.map((dayTask) => (
                            <TaskDay
                                key={dayTask.day}
                                showFinish={showFinish}
                                dayTask={dayTask}
                            />
                        ));
                    case ViewUnit.Week:
                        return weekDayTasks.map((dayTask) => (
                            <TaskDay
                                key={dayTask.day}
                                showFinish={showFinish}
                                dayTask={dayTask}
                            />
                        ));
                    case ViewUnit.Day:
                        return (
                            <TaskList
                                tasks={
                                    showFinish ? todayDoneTasks : todayTodoTasks
                                }
                            />
                        );
                }
            }
        }
    };

    return <Container viewUnit={viewUnit}>{viewRender()}</Container>;
};

const theDayTasks = (tasks: Task[], cycles: Task[], mo: Moment) => {
    const todoTasks: Task[] = [];
    const doneTasks: Task[] = [];
    const theDayHead = mo.startOf("day").valueOf();
    const theDayTail = mo.endOf("day").valueOf();
    const todayHead = moment().startOf("day");
    cycles.forEach((cycle) => {
        const { id: cycleId, title, period, cyclePeriods, removeAt } = cycle;
        if (!removeAt) {
            const { timeHead, timeTail } = period || {};
            const valid =
                (timeHead ? timeHead <= theDayTail : !mo.isBefore(todayHead)) &&
                (timeTail ? timeTail >= theDayHead : true);
            if (valid) {
                cyclePeriods?.map((cyclePeriod) => {
                    // const {cycleHead, cycleTail} = cyclePeriod;
                    return {};
                });
                // todoTasks.push({
                //     id: nanoid(),
                //     cycleId,
                //     virtual: true,
                //     title,
                //     createAt: Date.now(),
                // });
            }
        }
    });
    tasks.forEach((task) => {
        const { period, finishAt, removeAt } = task;
        if (!removeAt) {
            if (finishAt) {
                if (finishAt >= theDayHead && finishAt <= theDayTail) {
                    doneTasks.push(task);
                }
            } else {
                const { timeHead, timeTail } = period || {};
                const valid =
                    (timeHead
                        ? timeHead <= theDayTail
                        : !mo.isBefore(todayHead)) &&
                    (timeTail ? timeTail >= theDayHead : true);
                if (valid) {
                    todoTasks.push(task);
                }
            }
        }
    });
    todoTasks.sort(({ focus: a }, { focus: b }) => {
        return a ? (b ? 0 : -1) : b ? 1 : 0;
    });
    return [todoTasks, doneTasks];
};

const mulDayTasks = (
    tasks: Task[],
    cycles: Task[],
    moHead: Moment,
    moTail: Moment
) => {
    const dayTasks: DayTask[] = [];
    const moTemp = moHead;
    while (moTemp.isBefore(moTail)) {
        const [todoTasks, doneTasks] = theDayTasks(tasks, cycles, moTemp);
        dayTasks.push({
            day: moTemp.format("YYYY-MM-DD"),
            todoTasks,
            doneTasks,
        });
        moTemp.add(1, "days");
    }
    return dayTasks;
};

const Container = styled.div.attrs({} as { viewUnit: ViewUnit })`
    flex: 1;
    display: flex;
    align-items: stretch;

    ${(props) => {
        switch (props.viewUnit) {
            case ViewUnit.Month:
            case ViewUnit.Week:
                return css`
                    overflow-x: auto;
                    flex-wrap: nowrap;
                `;
            case ViewUnit.Day:
                return css`
                    flex-direction: column;
                    overflow-y: auto;
                `;
        }
    }}
`;
