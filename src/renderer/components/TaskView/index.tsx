import moment, { Moment } from "moment";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { RootState } from "renderer/store";
import { Task, DayTask } from "renderer/store/data";
import { TaskViewMode, TaskViewUnit } from "renderer/store/settings";
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

    const taskViewFinish = useSelector(
        (state: RootState) => state.settings.taskViewFinish
    );

    const taskViewMode = useSelector((state: RootState) => state.settings.taskViewMode);

    const cycles = useSelector((state: RootState) => state.data.cycles);

    const [todayTodoTasks, todayDoneTasks] = useSelector((state: RootState) =>
        theDayTasks(state.data.tasks, state.data.cycles, moment(taskViewAnchor))
    );

    const weekDayTasks: DayTask[] = useSelector((state: RootState) =>
        mulDayTasks(
            state.data.tasks,
            state.data.cycles,
            moment(taskViewAnchor).startOf("week"),
            moment(taskViewAnchor).endOf("week").add(1, "seconds")
        )
    );

    const monthDayTasks = useSelector((state: RootState) =>
        mulDayTasks(
            state.data.tasks,
            state.data.cycles,
            moment(taskViewAnchor).startOf("month"),
            moment(taskViewAnchor).endOf("month").add(1, "seconds")
        )
    );

    const dropTasks = useSelector((state: RootState) => state.data.tasks.filter(task => task.removeAt));

    const viewRender = () => {
        switch (taskViewMode) {
          case TaskViewMode.Common:
            switch (taskViewUnit) {
              case TaskViewUnit.Month:
                  return monthDayTasks.map((dayTask) => (
                      <TaskDay
                          key={dayTask.day}
                          taskViewFinished={taskViewFinish}
                          dayTask={dayTask}
                      />
                  ));
              case TaskViewUnit.Week:
                  return weekDayTasks.map((dayTask) => (
                      <TaskDay
                          key={dayTask.day}
                          taskViewFinished={taskViewFinish}
                          dayTask={dayTask}
                      />
                  ));
              case TaskViewUnit.Day:
                  return (
                      <TaskList
                          tasks={
                              taskViewFinish ? todayDoneTasks : todayTodoTasks
                          }
                      />
                  );
            }
            case TaskViewMode.Circle:
              return (
                <TaskList
                      tasks={cycles}
                  />
              );
              case TaskViewMode.Giveup:
                return (
                  <TaskList
                      tasks={dropTasks}
                  />
                );
        }
    };

    return <Container taskViewUnit={taskViewUnit}>{viewRender()}</Container>;
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
              cyclePeriods?.map(cyclePeriod => {
                // const {cycleHead, cycleTail} = cyclePeriod;
                return ({

                });
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
    todoTasks.sort(({focus: a}, {focus: b}) => {
      return a ? (b ? 0 : -1) : (b ? 1 : 0);
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
                    overflow-y: auto;
                `;
        }
    }}
`;
