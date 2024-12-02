import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { HomePage } from './components/HomePage.jsx'
import { SearchPage } from './components/SearchPage.jsx'
import './App.css'
import { Detail } from './components/Detail.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<HomePage />} />
      <Route path='/items' element={<SearchPage />} />
      <Route path='/items/:id' element={<Detail />} />
      <Route path='*' element={<h1>Not Found</h1>} />
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
