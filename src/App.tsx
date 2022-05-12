import Layout from "./layout/Layout";
function App(): JSX.Element {
  return (
    <Layout render={<h1 className="content">Hello World</h1>}/>
  );
}

export default App;
