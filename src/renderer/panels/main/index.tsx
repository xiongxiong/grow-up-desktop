import styled, { css } from "styled-components";
import { IoAddOutline, IoSearchOutline } from "react-icons/io5";
import { BiTargetLock, BiRecycle } from "react-icons/bi";
import ToolBtn from "renderer/components/ToolBtn";
import ToolBtnGroup from "renderer/components/ToolBtnGroup";
import DateWheel from "renderer/components/DateWheel";

const viewBtns = ["年", "月", "周", "日"].map((item) => ({
    name: item,
    onClick: () => {},
}));

export default () => {
    return (
        <Container>
            <ToolPanel>
                <ToolGroup>
                    <ToolBtn>
                        <IoAddOutline />
                    </ToolBtn>
                </ToolGroup>
                <ToolGroup>
                    <ToolBtnGroup idxInit={3} buttons={viewBtns} />
                    <ToolBtn>
                        <BiTargetLock />
                    </ToolBtn>
                    <DateWheel />
                </ToolGroup>
                <ToolGroup>
                <ToolBtn>
                        <IoSearchOutline />
                    </ToolBtn>
                    <ToolBtn>
                        <BiRecycle />
                    </ToolBtn>
                </ToolGroup>
            </ToolPanel>
            <ContentPanel></ContentPanel>
            <StatusPanel></StatusPanel>
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const ToolPanel = styled.div`
    padding: 4px;
    background-color: #f7f5f1;
    border-bottom: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ToolGroup = styled.div`
    display: flex;
    align-items: center;
`;

const ContentPanel = styled.div`
    flex: 1;
`;

const StatusPanel = styled.div`
    height: 24px;
    background-color: #f7f5f1;
    border-bottom: 1px solid lightgray;
`;
