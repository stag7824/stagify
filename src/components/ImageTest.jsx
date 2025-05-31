import React from 'react';
import portfolio1Mobile from '../assets/images/mobile/1.png';
import portfolio1Desktop from '../assets/images/1.png';

const ImageTest = () => {
  return (
    <div style={{ padding: '20px', background: '#f0f0f0' }}>
      <h2>Image Loading Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Mobile Image 1:</h3>
        <img 
          src={portfolio1Mobile} 
          alt="Mobile 1" 
          style={{ 
            width: '200px', 
            height: '150px', 
            objectFit: 'cover',
            border: '2px solid red'
          }}
          onLoad={() => console.log('Mobile image loaded')}
          onError={() => console.log('Mobile image failed')}
        />
        <p>Source: {portfolio1Mobile}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Desktop Image 1:</h3>
        <img 
          src={portfolio1Desktop} 
          alt="Desktop 1" 
          style={{ 
            width: '200px', 
            height: '150px', 
            objectFit: 'cover',
            border: '2px solid blue'
          }}
          onLoad={() => console.log('Desktop image loaded')}
          onError={() => console.log('Desktop image failed')}
        />
        <p>Source: {portfolio1Desktop}</p>
      </div>
    </div>
  );
};

export default ImageTest;
