import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

const EnduserLayout = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-4 md:ml-[20rem]"> {/* Use flex-1 to take remaining space */}
        <Outlet /> {/* Renders the child routes */}
      </div>
    </div>
  );
};

export default EnduserLayout;
