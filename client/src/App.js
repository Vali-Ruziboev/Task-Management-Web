import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layouts/Layout";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/Dashboard";
import AuthMiddleware from "./components/AuthMiddleware";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/signup" element={<Auth key="signup" login={false} />} />
        <Route path="/login" element={<Auth key="login" />} />

        <Route element={<AuthMiddleware />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
