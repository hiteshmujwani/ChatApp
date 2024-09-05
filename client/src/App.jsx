import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth'
import Chat from './Pages/Chat'
import NotFound from './Pages/404'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} Component={Auth}/>
        <Route path={'/chats'} Component={Chat}/>
        <Route path={'*'} Component={NotFound}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
