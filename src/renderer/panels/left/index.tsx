import styled from "styled-components";
import { AiOutlineSetting, AiFillSetting } from "react-icons/ai";
import { BiPaperPlane } from "react-icons/bi";
import { BsRecycle } from "react-icons/bs";
import { IconType } from "react-icons";
import { MouseEventHandler } from "react";

const Panel = () => {
    const iconsUp = [
      {
        name: "Todos",
        icon: BiPaperPlane,
        onClick: () => {},
      },
      {
        name: "Plans",
        icon: BsRecycle,
        onClick: () => {},
      },
    ];

    const iconsDown = [
      {
        name: "Settings",
        icon: AiOutlineSetting,
        onClick: () => {},
      },
    ];

    const iconRenderer = (props: {name: string, icon: IconType, onClick: MouseEventHandler}) => (
      <IconContainer key={props.name} onClick={props.onClick}>
        <props.icon size={24} />
      </IconContainer>
    );

    return (
      <Container>
        <DigestContainer>
          {iconsUp.map(iconRenderer)}
          <Spacer />
          {iconsDown.map(iconRenderer)}
        </DigestContainer>
        <DetailContainer>

        </DetailContainer>
      </Container>
    );
};

export { Panel as default };

const Container = styled.div`
    background-color: #f7f5f1;
    border-right: 1px solid lightgray;
    display: flex;
    align-items: stretch;
`;

const DigestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #DDD6C1;
`;

const DetailContainer = styled.div`
  width: 120px;
`;

const IconContainer = styled.div`
  padding: 8px;
  color: lightslategray;
`;

const Spacer = styled.div`
  flex: 1;
`;
