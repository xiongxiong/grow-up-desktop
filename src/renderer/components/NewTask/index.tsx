import { nanoid } from "nanoid";
import { KeyboardEvent, useReducer } from "react";
import { IoAddOutline } from "react-icons/io5";
import { NewTask } from "renderer/store/data";
import styled from "styled-components";
import Button from "../Button";
import CyclePeriodView from "../CyclePeriod";
import Separator from "../Separator";
import TagInput from "../TagInput";
import TaskPeriodView from "../TaskPeriod";

const initialState: NewTask = {
    title: "",
    period: undefined,
    cyclePeriods: undefined,
    tags: undefined,
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
                        cyclePeriods: state.cyclePeriods?.length ? state.cyclePeriods : undefined,
                    };
                case "updateTags":
                    // action as {type: string, payload: TaskTag[]}
                    return {
                      ...state,
                      tags: action.payload
                    };
                default:
                    return state;
            }
        },
        initialState
    );

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
                        autoFocus
                    />
                </NewTaskDialogGroup>
                <NewTaskDialogGroup>
                <TagInput tags={state.tags} updateTags={(tags) => dispatch({type: "updateTags", payload: tags})}/>
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
                        <RunCycleGroup>
                            {state.cyclePeriods?.map(
                                (cyclePeriod, index) =>
                                        <CyclePeriodView
                                            key={nanoid()}
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
                            }
                            <Button
                                onClick={() =>
                                    dispatch({ type: "appendCyclePeriod" })
                                }
                            >
                                <IoAddOutline />
                            </Button>
                        </RunCycleGroup>
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
    min-width: 500px;
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

const RunCycleGroup = styled.div``;

const NewTaskDialogActionGroup = styled.div`
    margin: 8px;
    display: flex;
`;

const NewTaskDialogAction = styled(Button)`
    flex: 1;
    border: 1px solid lightgray;
`;
