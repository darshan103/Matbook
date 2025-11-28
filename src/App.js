import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Employeeform from './components/Employeeform';

function Home() {
  const navigate = useNavigate();
  function handleEmployeeForm() {
    navigate('/api/form-schema');
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <button
        onClick={handleEmployeeForm}
        className="rounded-none border border-black m-2 p-2 hover:bg-violet-800 hover:text-white"
      >
        Onboard Employee
      </button>
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/form-schema" element={<Employeeform />} />
      </Routes>
    </>
  );
}

export default App;
