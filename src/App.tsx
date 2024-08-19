import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Content from "./components/common/content/Content";
import Footer from "./components/common/footer/Footer";
import Header from "./components/common/header/Header";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminDashboard from "./pages/admincontents/components/admindashboard/AdminDashboard";


function App() {
 
  const location = useLocation();
  const accessToken: any = null;
  
  useEffect(() => {
  }, [location]);

  const handleContextMenu = (e:any) => {
    e.preventDefault();
  };

  return (
    
    <div className="App" onContextMenu={handleContextMenu}>
      {location.pathname.includes("/admin") ? 
        <AdminDashboard />: 
        <div>
          <ToastContainer />
          <Header />
          <Content />
          <Footer />
        </div>
      }      
    </div>
  
  );
}

export default App;
