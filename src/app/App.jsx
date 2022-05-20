import "./App.css";
import Layout from "../layout";
import Home from "../views/home/Home";
import { Routes ,Route, BrowserRouter } from "react-router-dom";
import PAnimation from "../views/3DAnimation/PAnimation";
function App() {
  return (
    <BrowserRouter forceRefresh={true}>
    <Routes>
       <Route path="/" element ={ <Layout><Home/></Layout>} />
       <Route path="/project_1" element={<Layout><PAnimation/></Layout>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
