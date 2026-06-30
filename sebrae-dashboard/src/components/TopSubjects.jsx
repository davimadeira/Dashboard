import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const TopSubjects = ({ data }) => {
  // Conta assuntos
  const subjectCount = data.reduce((acc, item) => {
    const assunto = item.assunto || 'Sem assunto';
    acc[assunto] = (acc[assunto] || 0) + 1;
    return acc;
  }, {});

  // Ordena e pega top 10
  const topSubjects = Object.entries(subjectCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  if (topSubjects.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">🏆 Top Assuntos</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full"
    >
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">🏆 Top Assuntos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topSubjects} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
          <XAxis type="number" stroke="#6b7280" />
          <YAxis type="category" dataKey="name" stroke="#6b7280" tick={{ fontSize: 10 }} width={100} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: 'none', 
              borderRadius: '8px',
              color: '#f9fafb'
            }}
          />
          <Bar dataKey="value" fill="#8b5cf6" radius={[4, 0, 0, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default TopSubjects;