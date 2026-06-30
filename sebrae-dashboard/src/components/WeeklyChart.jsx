import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { motion } from 'framer-motion';

const WeeklyChart = ({ data }) => {
  // Agrupa dados por semana
  const weeklyData = data.reduce((acc, item) => {
    const semana = item.semana || 'Semana sem dados';
    if (!acc[semana]) {
      acc[semana] = { semana, volumetria: 0, concluidos: 0 };
    }
    acc[semana].volumetria += 1;
    if (item.status === 'OK') {
      acc[semana].concluidos += 1;
    }
    return acc;
  }, {});

  // Ordena as semanas
  const sortedWeeks = Object.values(weeklyData).sort((a, b) => {
    const numA = parseInt(a.semana.split(' ')[1]) || 0;
    const numB = parseInt(b.semana.split(' ')[1]) || 0;
    return numA - numB;
  });

  if (sortedWeeks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">📈 Evolução Semanal</h3>
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
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">📈 Evolução Semanal</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={sortedWeeks}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="semana" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: 'none', 
              borderRadius: '8px',
              color: '#f9fafb'
            }}
          />
          <Legend />
          <Bar dataKey="volumetria" fill="#FF6B00" name="Volumetria" radius={[4, 4, 0, 0]} />
          <Line type="monotone" dataKey="concluidos" stroke="#22c55e" name="Concluídos" strokeWidth={3} dot={{ fill: '#22c55e', r: 6 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default WeeklyChart;