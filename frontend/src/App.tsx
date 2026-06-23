import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Alunos from './pages/Alunos';
import AlunoForm from './pages/AlunoForm';
import Professores from './pages/Professores';
import ProfessorForm from './pages/ProfessorForm';
import Cursos from './pages/Cursos';
import CursoForm from './pages/CursoForm';
import Departamentos from './pages/Departamentos';
import DepartamentoForm from './pages/DepartamentoForm';
import Unidades from './pages/Unidades';
import UnidadeForm from './pages/UnidadeForm';
import TccList from './pages/TccList';
import TccForm from './pages/TccForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tccs" element={<TccList />} />
          <Route path="/tccs/novo" element={<TccForm />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/alunos/novo" element={<AlunoForm />} />
          <Route path="/professores" element={<Professores />} />
          <Route path="/professores/novo" element={<ProfessorForm />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/cursos/novo" element={<CursoForm />} />
          <Route path="/departamentos" element={<Departamentos />} />
          <Route path="/departamentos/novo" element={<DepartamentoForm />} />
          <Route path="/unidades" element={<Unidades />} />
          <Route path="/unidades/novo" element={<UnidadeForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
