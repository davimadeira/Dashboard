const Filters = ({ filters, setFilters, data }) => {
  // Extrai opções únicas para os filtros
  const semanas = ['all', ...new Set(data.map(d => d.semana))];
  const assuntos = ['all', ...new Set(data.map(d => d.assunto))];
  const atendentes = ['all', ...new Set(data.map(d => d.atendente))];

  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6 flex flex-wrap gap-4 items-center">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Filtros:</span>
      
      <select
        value={filters.semana}
        onChange={(e) => handleChange('semana', e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm"
      >
        <option value="all">Todas as Semanas</option>
        {semanas.filter(s => s !== 'all').map(semana => (
          <option key={semana} value={semana}>{semana}</option>
        ))}
      </select>

      <select
        value={filters.assunto}
        onChange={(e) => handleChange('assunto', e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm"
      >
        <option value="all">Todos os Assuntos</option>
        {assuntos.filter(a => a !== 'all').map(assunto => (
          <option key={assunto} value={assunto}>{assunto}</option>
        ))}
      </select>

      <select
        value={filters.atendente}
        onChange={(e) => handleChange('atendente', e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm"
      >
        <option value="all">Todos os Atendentes</option>
        {atendentes.filter(a => a !== 'all').map(atendente => (
          <option key={atendente} value={atendente}>{atendente}</option>
        ))}
      </select>

      <button
        onClick={() => setFilters({ semana: 'all', assunto: 'all', atendente: 'all' })}
        className="text-sm text-sebrae-orange hover:text-orange-600 font-medium"
      >
        Limpar Filtros
      </button>
    </div>
  );
};

export default Filters;