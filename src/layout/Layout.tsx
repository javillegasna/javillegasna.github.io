import React from "react";
import SideBar from "./SideBar";
interface Props {
  render: React.ReactNode;
}
const layout = (props: Props) => {
  const { render } = props;
  return (
    <main className="view">
      <SideBar />
      {render}
    </main>
  );
};

export default layout;
