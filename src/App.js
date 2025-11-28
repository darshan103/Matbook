import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Employeeform from './components/EmployeeForm';

function App() {
  return (
    <BrowserRouter>
      <div className='flex items-center justify-center'>
        <button className="rounded-none border border-black m-2 p-2 hover:bg-violet-800 hover:text-white">Onboard Employee</button>
      </div>

      <Routes>
        <Route path="" element={<Employeeform />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
