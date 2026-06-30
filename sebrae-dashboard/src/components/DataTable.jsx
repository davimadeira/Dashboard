import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const DataTable = ({ data }) => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Filtra dados pela busca
  const filteredData = data.filter(item => 
    item.id?.toLowerCase().includes(search.toLowerCase()) ||
    item.cliente?.toLowerCase().includes(search.toLowerCase()) ||
    item.assunto?.toLowerCase().includes(search.toLowerCase()) ||
    item.atendente?.toLowerCase().includes(search.toLowerCase())
  );

  // Ordena dados
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField] || '';
    const bVal = b[sortField] || '';
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status) => {
    if (status === 'OK' || status === 'Concluído') return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (status === 'Pendente') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">📋 Dados Detalhados</h3>
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sebrae-orange"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300 font-medium cursor-pointer hover:text-sebrae-orange" onClick={() => handleSort('id')}>
                Protocolo {sortField === 'id' && (sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 inline" /> : <ChevronDown className="w-3 h-3 inline" />)}
              </th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300 font-medium cursor-pointer hover:text-sebrae-orange" onClick={() => handleSort('cliente')}>
                Cliente {sortField === 'cliente' && (sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 inline" /> : <ChevronDown className="w-3 h-3 inline" />)}
              </th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300 font-medium cursor-pointer hover:text-sebrae-orange" onClick={() => handleSort('assunto')}>
                Assunto {sortField === 'assunto' && (sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 inline" /> : <ChevronDown className="w-3 h-3 inline" />)}
              </th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300 font-medium cursor-pointer hover:text-sebrae-orange" onClick={() => handleSort('atendente')}>
                Atendente {sortField === 'atendente' && (sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 inline" /> : <ChevronDown className="w-3 h-3 inline" />)}
              </th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Nenhum dado encontrado
                </td>
              </tr>
            ) : (
              sortedData.map((item, index) => (
                <motion.tr 
                  key={item.id || index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.01 }}
                  className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300 font-mono text-xs">{item.id}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{item.cliente || '-'}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300 max-w-xs truncate">{item.assunto || '-'}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{item.atendente || '-'}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status || 'N/A'}
                    </span>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Mostrando {sortedData.length} de {data.length} registros
      </div>
    </motion.div>
  );
};

export default DataTable;