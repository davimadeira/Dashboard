import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, Clock, Percent } from 'lucide-react';

const KPICards = ({ stats }) => {
  const cards = [
    { 
      title: 'Total de Chamados', 
      value: stats.total, 
      icon: TrendingUp, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Concluídos', 
      value: stats.concluidos, 
      icon: CheckCircle, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Pendentes', 
      value: stats.pendentes, 
      icon: Clock, 
      color: 'bg-yellow-500' 
    },
    { 
      title: '% Resolução', 
      value: `${stats.resolucao}%`, 
      icon: Percent, 
      color: 'bg-purple-500' 
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {card.value}
              </p>
            </div>
            <div className={`${card.color} p-3 rounded-full`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;