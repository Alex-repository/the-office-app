
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import withUserContext from '../components/HOC/withDataContext';
import Home from "./Home";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
    </Router>
  )
}

export default withUserContext(App);