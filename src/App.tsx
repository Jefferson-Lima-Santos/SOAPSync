import React from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import MonacoEditor from './components/MonacoEditor';
import MethodsComponent from './components/MethodsComponent';

function App() {
  return (
    <div className="App">
      <MethodsComponent />
      <MonacoEditor />
      <ResultComponent/>
    </div>
  );
}

export default App;
