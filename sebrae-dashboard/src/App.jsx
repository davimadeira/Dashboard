import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockData, generateStats } from './data/mockData';
import KPICards from './components/KPICards';
import WeeklyChart from './components/WeeklyChart';
import TopSubjects from './components/TopSubjects';
import PerformanceChart from './components/PerformanceChart';
import Filters from './components/Filters';
import ThemeToggle from './components/ThemeToggle';
import DataTable from './components/DataTable';

function App() {
  const [data, setData] = useState(mockData);
  const [filters, setFilters] = useState({
    semana: 'all',
    assunto: 'all',
    atendente: 'all'
  });

  // Filtra os dados
  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (filters.semana !== 'all' && item.semana !== filters.semana) return false;
      if (filters.assunto !== 'all' && item.assunto !== filters.assunto) return false;
      if (filters.atendente !== 'all' && item.atendente !== filters.atendente) return false;
      return true;
    });
  }, [data, filters]);

  const stats = generateStats(filteredData);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <span className="text-3xl">📊</span>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              SEBRAE Monitor
            </h1>
            <span className="text-xs bg-sebrae-orange text-white px-2 py-1 rounded-full">
              N2
            </span>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => {}} 
              className="bg-sebrae-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              🔄 Atualizar
            </button>
          </div>
        </header>

        {/* Filtros */}
        <Filters filters={filters} setFilters={setFilters} data={data} />

        {/* KPIs */}
        <KPICards stats={stats} />

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <WeeklyChart data={filteredData} />
          </div>
          <div>
            <TopSubjects data={filteredData} />
          </div>
        </div>

        {/* Performance */}
        <div className="mt-6">
          <PerformanceChart data={filteredData} />
        </div>

        {/* Tabela de Dados */}
        <div className="mt-6">
          <DataTable data={filteredData} />
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
          Dados atualizados manualmente | Última atualização: {new Date().toLocaleString('pt-BR')}
        </footer>
      </div>
    </div>
  );
}

export default App;