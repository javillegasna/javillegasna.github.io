import "./App.css";
import Layout from "../layout";
import Home from "../views/home/Home";
import { BrowserRouter, Routes ,Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path="/" element ={ <Layout><Home/></Layout>} >

       </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
