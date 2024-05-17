import React from 'react';
import { Container } from '@mui/material';
import ResultComponent from './components/ResultComponent';
import MonacoEditor from './components/MonacoEditor';
import MethodsComponent from './components/MethodsComponent';

function App() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#111927',
        color: '#fff',
        maxWidth: 'unset !important',
      }}
    >
      <MethodsComponent />
      <MonacoEditor />
      <ResultComponent/>
    </Container>
  );
}

export default App;
