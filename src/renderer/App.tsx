import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NewTask from "./components/NewTask";
import Main from "./panels/Main";

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
