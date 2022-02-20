import styled from "styled-components";
import TagsPanel from "../TagsPanel";


export default () => {
  return (
    <Container>
      <TagsPanel />
    </Container>
  );
};

const Container = styled.div`
    width: 500px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;
