import React from 'react';
import Header from '../Header/Header';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className='about'>
      <Header />
      <Header />
      <div >
      <div> 
<h1>Conect with me on GitHub!</h1><div> <img className='qr'  src='./images/github.png' /></div>
</div>
    <h1>About PromoDex</h1>
    

    <h2>Frontend Technologies</h2>
    <h3>React, Redux, Redux Sagas </h3>
  
    <h3>Material-UI (MUI)</h3>
  
    <h3>Google Maps API</h3>
    

    <h3>SweetAlert2</h3>
    

    <h2>Backend Technologies</h2>
    <h3>Express</h3>
   <h3>Multer</h3>

    <h2>Database</h2>
    <p><strong>PostgreSQL</strong></p>


  </div>
    </div>
  );
}

export default AboutPage;
