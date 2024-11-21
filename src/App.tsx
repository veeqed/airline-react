import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import HomeLayout from './pages/HomeLayout'
import BookSearchLayout from './pages/BookSearchLayout';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The default props to change
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        
          <Route path="/" element={<HomeLayout/>} />
          <Route path="/flights/search/" element={<BookSearchLayout/>} />
        
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
