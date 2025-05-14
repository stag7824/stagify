import { useContext } from 'react';
import { stats } from '../data/services';
import { ThemeContext } from '../context/ThemeContext';


const Stats = () => {
  const { currentTheme } = useContext(ThemeContext);
  
  const getHeadingAccentClass = () => {
    if (currentTheme === 'purple') {
      return 'text-pink-500'; // More contrasting pink for purple theme
    } else if (currentTheme === 'green') {
      return 'text-blue-500'; // Blue contrasts well with green theme
    }
    return 'text-primary'; // Default for light and dark themes
  };

  return (
    <section id="stats" className="py-16 bg-primary bg-opacity-10 dark:bg-opacity-5 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Our <span className={getHeadingAccentClass()}>Track Record</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Numbers that speak for themselves. Here's what we've accomplished so far.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="stat-item bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transform transition-transform hover:scale-105 duration-300"
            >
              <div className="mb-4">
                <span 
                  className="counter text-4xl md:text-5xl font-bold text-primary"
                  data-target={parseInt(stat.value.replace(/[^0-9]/g, ''))}
                  data-duration="2000"
                >
                  {stat.value.replace(/\+/g, '')}
                </span>
                {stat.value.includes('+') && <span className="text-4xl md:text-5xl font-bold text-primary">+</span>}
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;