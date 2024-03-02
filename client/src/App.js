import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="main_wrapper">
      <Outlet />
    </div>
  );
};

export default App;
