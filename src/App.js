import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      < BrowserRouter>
        <Routes>
          <Route path="/" exact element={<SearchBar />} />
          <Route path="/results" element={<SearchResults />} />
        </Routes>
      </ BrowserRouter>
    </div>
  );
}

export default App;
