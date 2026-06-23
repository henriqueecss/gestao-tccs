import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/tccs', label: 'TCCs' },
  { to: '/alunos', label: 'Alunos' },
  { to: '/professores', label: 'Professores' },
  { to: '/cursos', label: 'Cursos' },
  { to: '/departamentos', label: 'Departamentos' },
  { to: '/unidades', label: 'Unidades' },
];

export default function Layout() {
  return (
    <div className="flex h-screen">
      <aside className="w-56 shrink-0 bg-gray-900 text-gray-100 flex flex-col">
        <h1 className="text-lg font-bold px-4 py-5 border-b border-gray-700">
          Gestão TCCs
        </h1>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-sm ${
                  isActive
                    ? 'bg-gray-700 text-white font-medium'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
