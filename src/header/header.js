import { useState } from 'react';
import './header.css';

function Header({ selectedNat, handleSelectChange, updateErrors }) {
  const [errorsNumber, setErrorsNumber] = useState(0); 
  const [seed, setSeed] = useState(0);

  const handleErrorsChange = (event) => {
    const errors = parseInt(event.target.value);
    setErrorsNumber(errors); 
    updateErrors(errors); 
    generateSeed();
  };

  const generateSeed = () => {
    const newSeed = Math.floor(Math.random() * 10000);
    setSeed(newSeed); 
  };

  return (
    <div className="mt-4">
      <div className='row'>
        <div className='col mt-3'>
          <label className='form-label d-inline'><strong> Region : </strong></label>
          <select value={selectedNat} onChange={handleSelectChange} className='form-select d-inline w-25 mx-3 mt-3'>
            <option value="us">United States</option>
            <option value="in">India</option>
            <option value="tr">Turkey</option>
          </select>
          <label className='form-label d-inline'><strong>Errors :</strong> </label>
          <input type='range' max={10000} onChange={handleErrorsChange} className='form-range d-inline w-25 mx-3 pt-3' />
          <input id='errors-value' type='number' name='errors-number' value={errorsNumber} className='form-control d-inline' />
          <label className='form- d-inline mx-3'><strong>Seed :</strong></label>
          <input id='seed-number' type='number' name='seed' value={seed} className='form-control d-inline mx-3' />
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Header;
