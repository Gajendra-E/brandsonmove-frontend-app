import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Content from "./components/common/content/Content";
import Footer from "./components/common/footer/Footer";
import Header from "./components/common/header/Header";
import { ToastContainer } from "react-toastify";
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import AdminDashboard from "./pages/admincontents/components/admindashboard/AdminDashboard";


function App() {
 
  const location = useLocation();
  const accessToken: any = null;
  
  const [resetSlider, setResetSlider] = useState(false); // Manage slider reset state
  
  useEffect(() => {
    setResetSlider(false); // Reset slider state on location change
  }, [location]);

  const handleResetSlider = () => {
    setResetSlider(true); // Trigger slider reset
    setTimeout(() => setResetSlider(false), 100); // Reset back after a brief delay
  };

  const handleContextMenu = (e:any) => {
    e.preventDefault();
  };

  return (
    
    <div className="App" onContextMenu={handleContextMenu}>
      {location.pathname.includes("/admin") ? 
        <AdminDashboard resetSlider={resetSlider} />: 
        <div>
          <ToastContainer />
          <Header onTabChange={handleResetSlider} /> {/* Pass reset handler */}
          <Content resetSlider={resetSlider} /> {/* Pass reset state */}
          <Footer />
        </div>
      }      
    </div>
  
  );
}

export default App;
