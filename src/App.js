import { Link, Route, Routes} from 'react-router-dom';
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
      {/* <nav className="w-full bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">
              MatBook
            </h1>
          </div>
        </div>
      </nav> */}
      <nav className="w-full bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-center items-center gap-5">

            {/* LOGO */}
            <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-wide">
              MatBook
            </Link>

            {/* NAV LINKS */}
            <div className="flex gap-6 text-gray-700 font-medium mt-1">
              <Link to="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
              <Link to="/api/submissions" className="hover:text-indigo-600 transition">
                Submissions
              </Link>
            </div>

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
