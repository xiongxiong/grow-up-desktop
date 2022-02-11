import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./panels/main";

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
