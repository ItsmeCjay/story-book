import Book from './components/Book';
import { bookData } from './bookData';
import './App.css';

function App() {
  return (
    <div className="App">
      <Book bookData={bookData} />
    </div>
  );
}

export default App;
