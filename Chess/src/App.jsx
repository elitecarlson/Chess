import { Route, Routes } from "react-router-dom";
import Index from "./Pages/Index";

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<Index/>}></Route>
    </Routes>
  );
}