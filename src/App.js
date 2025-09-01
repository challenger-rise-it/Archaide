import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from '@context/authContext'
// ** Router Import
import Routes from './routes'

const App = () => (
  <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  </BrowserRouter>
)

export default App
