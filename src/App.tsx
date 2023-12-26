import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Content from "./components/common/content/Content";
import Footer from "./components/common/footer/Footer";
import Header from "./components/common/header/Header";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import AdminDashboard from "./pages/admincontents/components/admindashboard/AdminDashboard";
// import { ApolloClient, InMemoryCache, split, HttpLink, ApolloProvider } from "@apollo/client";
// import { WebSocketLink } from "@apollo/client/link/ws";
// import { getMainDefinition } from "@apollo/client/utilities";
import { APP_CONFIG } from "./config/config";
import AdminDashboard from "./pages/admincontents/components/admindashboard/AdminDashboard";

// export const useApolloClient = (accessToken: string) => {

//   let headers: any = {
//     "Content-Type": "application/json",
//     "x-hasura-admin-secret": APP_CONFIG.HUSURA_ADMIN_SECRET
//   };

//   if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: split(
//       ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//           definition.kind === "OperationDefinition" &&
//           definition.operation === "subscription"
//         );
//       },
//       new WebSocketLink({
//           uri: APP_CONFIG.REACT_APP_HASURA_URL_WS,
//           options: {
//               lazy: true,
//               reconnect: true,
//               connectionParams: async () => {
//                 return { headers };
//               },
//           },
//       }),
//       new HttpLink({
//           uri: APP_CONFIG.REACT_APP_HASURA_URL,
//           headers: headers
//       }),
//     ),
//   });
// };

function App() {

  const location = useLocation();
  const accessToken: any = null;
  
  useEffect(() => {
  }, [location]);

  return (
    
        // <AdminDashboard />
    
        <div className="App">
          <ToastContainer />
          <Header />
          <Content />
          <Footer />
        </div>
  
  );
}

export default App;
