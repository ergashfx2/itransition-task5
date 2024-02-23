import './App.css';
import { useState } from 'react';
import Header from '../header/header';
import Table from '../table/table';

function App() {
  const [selectedNat, setSelectedNat] = useState("us");
  const [errorsNumber, setErrorsNumber] = useState(0);

  const handleSelectChange = (event) => {
    setSelectedNat(event.target.value);
  };

  const updateErrors = (errors) => {
    setErrorsNumber(errors);
  };

  return (
    <div className="container">
      <Header selectedNat={selectedNat} handleSelectChange={handleSelectChange} updateErrors={updateErrors} />
      <hr />
      <Table selectedNat={selectedNat} errorsNumber={errorsNumber} />
    </div>
  );
}

export default App;
