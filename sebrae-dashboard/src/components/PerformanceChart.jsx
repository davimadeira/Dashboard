import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const PerformanceChart = ({ data }) => {
  // Calcula performance por atendente
  const performance = data.reduce((acc, item) => {
    const nome = item.atendente || 'Sem atendente';
    if (!acc[nome]) {
      acc[nome] = { nome, tratativas: 0, encerramentos: 0 };
    }
    acc[nome].tratativas += 1;
    if (item.status === 'OK') {
      acc[nome].encerramentos += 1;
    }
    return acc;
  }, {});

  const performanceData = Object.values(performance)
    .sort((a, b) => b.tratativas - a.tratativas)
    .slice(0, 10);

  if (performanceData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">👥 Performance da Equipe</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
    >
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">👥 Performance da Equipe</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={performanceData} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
          <XAxis type="number" stroke="#6b7280" />
          <YAxis type="category" dataKey="nome" stroke="#6b7280" tick={{ fontSize: 10 }} width={120} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: 'none', 
              borderRadius: '8px',
              color: '#f9fafb'
            }}
          />
          <Legend />
          <Bar dataKey="tratativas" fill="#3b82f6" name="Tratativas" radius={[4, 0, 0, 4]} />
          <Bar dataKey="encerramentos" fill="#22c55e" name="Encerramentos" radius={[4, 0, 0, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default PerformanceChart;