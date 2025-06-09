import "./App.css";
import Layout from "../layout";
import Home from "../views/home/Home";
import { Routes ,Route, HashRouter } from "react-router-dom";
import PAnimation from "../views/3DAnimation/PAnimation";
import Error404 from "../views/Error_404/Error404";
import Construction from "../views/On_Construction/Construction";
import ScrollToTop from "../components/ScrollToTop";
function App() {
  return (
    <HashRouter >
      <ScrollToTop/>
      <Routes>
        <Route path="/" element ={ <Layout><Home/></Layout>}/>
        <Route path="/project_1" element={<Layout><PAnimation/></Layout>}/>
        <Route path="/construction" element={<Layout><Construction/></Layout>}/>
        <Route path='*' element={<Layout><Error404/></Layout>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
