import logo from './logo.svg';
import './App.css';
import ListAddress from './Address/listAddress';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditAddress from './Address/editAddress';
import AddAddress from './Address/addAddress';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/appdiachi' element={<ListAddress/>} />
      <Route path='/appdiachi/chinhsuadiachi/' element={<EditAddress/>} />
      <Route path='/appdiachi/themmoidiachi/' element={<AddAddress/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
