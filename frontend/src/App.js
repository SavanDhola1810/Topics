import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './components/home'
import Display from './components/display'
import NoteState from './contex/notes/NoteState'
import Add from './components/add';
import Add1 from './components/add1';
import Add2 from './components/add2';
import Add3 from './components/add3';
import Add4 from './components/add4';


function App() {

  return (
    <NoteState>
      <Router>
        <div className="flex">
          <Routes>
          {/* <Home /> */}
            <Route path='/' element={<Home />} />
            <Route path='add/:id/:topic/:status' element={<Add />} />
            <Route path='add/:id/:topic/:status/:id1/:subTopic1' element={<Add1 />} />
            <Route path='add/:id/:topic/:status/:id1/:subTopic1/:id2/:subTopic2' element={<Add2 />} />
            <Route path='add/:id/:topic/:status/:id1/:subTopic1/:id2/:subTopic2/:id3/:subTopic3' element={<Add3 />} />
            <Route path='add/:id/:topic/:status/:id1/:subTopic1/:id2/:subTopic2/:id3/:subTopic3/:id4/:subTopic4' element={<Add4 />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}


export default App;
