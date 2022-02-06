import { memo, useReducer } from "react";
import { IoAddOutline } from "react-icons/io5";
import { NewTask } from "renderer/store/data";
import styled from "styled-components";
import Button from "../Button";
import Separator from "../Separator";
import ToolBtn from "../ToolBtn";
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

export default memo((props: NewTaskProps) => {
    const { onSubmit, onCancel } = props;

    const [state, dispatch] = useReducer((state: NewTask, action: {type: string, payload: any}) => {
      switch (action.type) {
        case "updateTitle":
          return {...state, title: action.payload};
          break;
        default: return state;
      }
    }, initialState);

    const runBtns = ["单次", "循环"].map((name) => ({
        name,
        onClick: () => {},
    }));

    const cycleBtns = ["年", "月", "周", "日"].map((name) => ({
        name,
        onClick: () => {},
    }));

    return (
        <>
            <NewTaskDialogGroup>
                <Input placeholder="Title" onChange={(e) => dispatch({type: "updateTitle", payload: e.currentTarget.value})} />
            </NewTaskDialogGroup>
            <NewTaskDialogGroup>
                <SwitchBtnGroup>
                    <ToolBtnGroup buttons={runBtns} />
                    <SwitchBtnGroupRightArea>
                        <ToolBtnGroup buttons={cycleBtns} />
                        <BtnAddTimeRange>
                            <IoAddOutline />
                        </BtnAddTimeRange>
                    </SwitchBtnGroupRightArea>
                </SwitchBtnGroup>
                <RunOnceGroup>
                    <Input type="datetime-local" />
                    <p>-</p>
                    <Input type="datetime-local" />
                </RunOnceGroup>
                <RunCycleGroup></RunCycleGroup>
            </NewTaskDialogGroup>
            <Separator horizontal margin={8} padding={8} />
            <NewTaskDialogActionGroup>
                <NewTaskDialogAction onClick={onCancel}>
                    取消
                </NewTaskDialogAction>
                <NewTaskDialogAction onClick={() => onSubmit(state)}>提交</NewTaskDialogAction>
            </NewTaskDialogActionGroup>
        </>
    );
});

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

const SwitchBtnGroupRightArea = styled.div`
    display: flex;
`;

const RunOnceGroup = styled.div`
    display: flex;
    justify-content: space-between;
`;

const RunCycleGroup = styled.div``;

const BtnAddTimeRange = styled(ToolBtn)`
    margin-right: 0px;
`;

const NewTaskDialogActionGroup = styled.div`
    margin: 8px;
    display: flex;
`;

const NewTaskDialogAction = styled(Button)`
    flex: 1;
    border: 1px solid lightgray;
`;
