import './App.css'
import { Library } from './components/Library'
import { ReadingList } from './components/ReadingList'
import { useNumberBookStore } from './store/numberOfBooks'

function App() {

  const booksListCount = useNumberBookStore((state) => state.booksListCount)

  return (
    <>
      <Library />
      {
        booksListCount > 0 && <ReadingList />
      }
    </> 
  )
}

export default App