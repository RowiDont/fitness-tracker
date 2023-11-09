import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function App() {
    return (
        <PageWrapper>
            <Link to="/workout">Start Workout</Link>
        </PageWrapper>
    );
}

export default App;
