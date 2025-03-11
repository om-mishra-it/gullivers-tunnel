import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

function App() {
  return (
    <BrowserRouter className="min-h-screen flex items-center justify-center bg-gray-100">
      <Router />
    </BrowserRouter>
  );
}

export default App;