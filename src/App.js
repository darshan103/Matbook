import { Route, Routes} from 'react-router-dom';
import './App.css';
import EmployeePage from './pages/EmployeePage';
import EmployeeData from './pages/EmployeeData';

// function Home() {
//   const navigate = useNavigate();
//   function handleEmployeeForm() {
//     navigate('/api/form-schema');
//   }

//   return (
//     <div className='flex items-center justify-center h-screen'>
//       <button
//         onClick={handleEmployeeForm}
//         className="rounded-none border border-black m-2 p-2 hover:bg-violet-800 hover:text-white"
//       >
//         Onboard Employee
//       </button>
//     </div>
//   );
// }

function App() {
  return (
    <>
      <nav className="w-full bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">
              MatBook
            </h1>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<EmployeePage />} />
        <Route path="/api/submissions" element={<EmployeeData />} />
      </Routes>
    </>
  );
}

export default App;
