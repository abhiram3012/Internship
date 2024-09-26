import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

const EnduserLayout = () => {
    return (
      <div className="flex">
        <Sidebar />
        <div className="ml-[20rem] p-4 w-full"> {/* Adjusts the margin-left to account for the sidebar width */}
          <Outlet /> {/* Renders the child routes */}
        </div>
      </div>
    );
  };

  export default EnduserLayout;