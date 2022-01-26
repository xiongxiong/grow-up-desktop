import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Top from "./panels/top";
import Bottom from "./panels/bottom";
import Left from "./panels/left";
import Right from "./panels/right";
import Center from "./panels/center";

const Main = () => {
    return (
        <Container>
            <Top />
            <ContainerMiddle>
                <Left />
                <Center />
                <Right />
            </ContainerMiddle>
            <Bottom />
        </Container>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </Router>
    );
};

export default App;

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const ContainerMiddle = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`;
