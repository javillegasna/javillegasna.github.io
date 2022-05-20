import "./App.css";
import Layout from "../layout";
import Home from "../views/home/Home";
import { HashRouter, Routes ,Route } from "react-router-dom";
import PAnimation from "../views/3DAnimation/PAnimation";
function App() {
  return (
    <HashRouter>
    <Routes>
       <Route path="/" element ={ <Layout><Home/></Layout>} />
       <Route path="/project_1" element={<Layout><PAnimation/></Layout>}/>
    </Routes>
    </HashRouter>
  );
}

export default App;
