import { useState } from 'react';
import tailwindLogo from '../assets/tailwind-css.svg';
const TechStack = () => {
  // Technology stack data with logos and names
  const technologies = [
    {
      id: 1,
      name: 'React',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: '#61DAFB'
    },
     {
      id: 2,
      name: 'Tailwind CSS',
      logo: tailwindLogo,
      color: '#38B2AC',
      customStyle: { filter: 'invert(63%) sepia(54%) saturate(434%) hue-rotate(127deg) brightness(91%) contrast(88%)' }
    },
    {
      id: 3,
      name: 'Node.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: '#339933'
    },
    {
      id: 4,
      name: 'Express',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      color: '#000000'
    },
    {
      id: 5,
      name: 'JavaScript',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      color: '#F7DF1E'
    },
    {
      id: 6,
      name: 'Vite',
      logo: 'https://vitejs.dev/logo.svg',
      color: '#646CFF'
    }
  ];

  // State to track which technology is being hovered
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Powered by <span className="text-gradient">Modern Technologies</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We leverage cutting-edge frameworks and tools to deliver exceptional digital experiences
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
          {technologies.map((tech) => (
            <div 
              key={tech.id} 
              className="relative flex flex-col items-center justify-center"
              onMouseEnter={() => setHoveredTech(tech.id)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 group">
              <img 
                  src={tech.logo} 
                  alt={`${tech.name} logo`} 
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" 
                  style={tech.customStyle}
                />
              </div>
              
              {/* Technology name tooltip on hover */}
              <div 
                className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 px-3 py-1 rounded-md shadow-lg text-sm font-medium transition-all duration-300 ${hoveredTech === tech.id ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                style={{ color: tech.color }}
              >
                {tech.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;