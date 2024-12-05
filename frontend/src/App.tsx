import './App.css';
import AppToolbar from './Components/UI/AppToolbar/AppToolbar.tsx';
import CipherForm from './containers/CipherForm/CipherForm.tsx';
import { Container, CssBaseline } from '@mui/material';

const App = () => {
  return <>
    <CssBaseline/>
    <header>
      <AppToolbar/>
    </header>

    <main>
      <Container maxWidth="xl">
        <CipherForm/>
      </Container>
    </main>
  </>;
};

export default App;