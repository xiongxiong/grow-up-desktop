import { nanoid } from "nanoid";
import { KeyboardEvent, useReducer } from "react";
import { IoAddOutline } from "react-icons/io5";
import { CycleUnit, CycleUnits, NewTask } from "renderer/store/data";
import styled from "styled-components";
import Button from "../Button";
import CyclePeriodView from "../CyclePeriodView";
import Separator from "../Separator";
import TaskPeriodView from "../TaskPeriodView";
import ToolBtnGroup from "../ToolBtnGroup";

const initialState: NewTask = {
    title: "",
    period: undefined,
    cycleUnit: undefined,
    cyclePeriods: undefined,
};

export interface NewTaskProps {
    onSubmit: (task: NewTask) => void;
    onCancel: () => void;
}

export default (props: NewTaskProps) => {
    const { onSubmit, onCancel } = props;

    const [state, dispatch] = useReducer(
        (state: NewTask, action: { type: string; payload?: any }) => {
            switch (action.type) {
                case "updateTitle":
                    // action as {type: string, payload: string};
                    return { ...state, title: action.payload as string };
                case "updatePeriod":
                    // action as {type: string, payload: Peroid}
                    return { ...state, period: action.payload };
                case "updateCycleUnit":
                    // action as {type: string, payload?: CycleUnit};
                    return {
                        ...state,
                        cycleUnit: action.payload,
                        cyclePeriods: undefined,
                    };
                case "updateCyclePeriod":
                    // action as {type: string, payload: {index: number, cyclePeriod: CyclePeriod}}
                    state.cyclePeriods?.splice(
                        action.payload.index,
                        1,
                        action.payload.cyclePeriod
                    );
                    return {
                        ...state,
                    };
                case "appendCyclePeriod":
                    // action as {type: string}
                    return {
                        ...state,
                        cyclePeriods: [...(state.cyclePeriods || []), {}],
                    };
                case "removeCyclePeriod":
                    // action as {type: string, payload: {index: number}}
                    state.cyclePeriods?.splice(action.payload.index, 1);
                    return {
                        ...state,
                    };
                default:
                    return state;
            }
        },
        initialState
    );

    const taskCycleTypes = ["Single", "Cycle"];

    const runBtns = taskCycleTypes.map((name) => ({
        name,
        onClick: () =>
            dispatch({
                type: "updateCycleUnit",
                payload: name === "Cycle" ? CycleUnit.Day : undefined,
            }),
    }));

    const cycleBtns = CycleUnits.map((name) => ({
        name,
        onClick: () => dispatch({ type: "updateCycleUnit", payload: name }),
    }));

    const onTitleInputKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter" && state.title.trim().length > 0) {
            onSubmit(state);
        }
    };

    return (
        <Container>
            <ContentArea>
                <NewTaskDialogGroup>
                    <Input
                        placeholder="Title"
                        onChange={(e) =>
                            dispatch({
                                type: "updateTitle",
                                payload: e.currentTarget.value,
                            })
                        }
                        onKeyPress={onTitleInputKeyPress}
                    />
                </NewTaskDialogGroup>
                <NewTaskDialogGroup>
                    <TaskPeriodView
                        period={state.period}
                        updatePeroid={(period) =>
                            dispatch({ type: "updatePeriod", payload: period })
                        }
                    />
                </NewTaskDialogGroup>
                <NewTaskDialogGroup>
                    <SwitchBtnGroup>
                        <ToolBtnGroup
                            curIndex={state.cycleUnit === undefined ? 0 : 1}
                            buttons={runBtns}
                        />
                        {state.cycleUnit && (
                            <ToolBtnGroup
                                curIndex={CycleUnits.indexOf(state.cycleUnit)}
                                buttons={cycleBtns}
                            />
                        )}
                    </SwitchBtnGroup>
                    {state.cycleUnit && (
                        <RunCycleGroup>
                            {state.cyclePeriods?.map(
                                (cyclePeriod, index) =>
                                    state.cycleUnit && (
                                        <CyclePeriodView
                                            key={nanoid()}
                                            cycleUnit={state.cycleUnit}
                                            cyclePeriod={cyclePeriod}
                                            updateCyclePeriod={(cyclePeriod) =>
                                                dispatch({
                                                    type: "updateCyclePeriod",
                                                    payload: {
                                                        index,
                                                        cyclePeriod,
                                                    },
                                                })
                                            }
                                            removeCyclePeriod={() =>
                                                dispatch({
                                                    type: "removeCyclePeriod",
                                                    payload: { index },
                                                })
                                            }
                                        />
                                    )
                            )}
                            <Button
                                onClick={() =>
                                    dispatch({ type: "appendCyclePeriod" })
                                }
                            >
                                <IoAddOutline />
                            </Button>
                        </RunCycleGroup>
                    )}
                </NewTaskDialogGroup>
            </ContentArea>
            <Separator horizontal margin={8} padding={8} />
            <NewTaskDialogActionGroup>
                <NewTaskDialogAction onClick={onCancel}>
                    取消
                </NewTaskDialogAction>
                <Separator margin={4} color="white" />
                <NewTaskDialogAction
                    disabled={state.title.trim().length === 0}
                    onClick={() => onSubmit(state)}
                >
                    提交
                </NewTaskDialogAction>
            </NewTaskDialogActionGroup>
        </Container>
    );
};

const Container = styled.div`
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

const ContentArea = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow-y: auto;
`;

const NewTaskDialogGroup = styled.div`
    margin: 8px;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    height: 40px;
    padding: 0px 8px;
`;

const SwitchBtnGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
`;

const RunCycleGroup = styled.div``;

const NewTaskDialogActionGroup = styled.div`
    margin: 8px;
    display: flex;
`;

const NewTaskDialogAction = styled(Button)`
    flex: 1;
    border: 1px solid lightgray;
`;
