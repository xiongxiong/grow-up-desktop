import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NewTask from "./components/NewTask";
import Main from "./panels/main";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<NewTask />} />
            </Routes>
        </Router>
    );
};

export default App;
