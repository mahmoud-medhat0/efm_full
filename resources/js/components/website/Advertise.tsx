import React from 'react'
import { usePage } from '@inertiajs/inertia-react';

const Advertise = () => {
    const { advertiseSections } = usePage().props;
    const { lang: locale, app_url } = usePage().props;
    return (
        <section style={{ padding: '40px', backgroundColor: '#f9f9f9' }}>
          <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2em', marginBottom: '20px'}} className='text-black'>{advertiseSections.title[locale]}</h1>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: '20px', border: '1px solid #ccc', direction: 'ltr', overflow: 'auto', height: '285px' }}>
              <p className='text-black' dangerouslySetInnerHTML={{ __html: advertiseSections.description[locale] }}>
              </p>
            </div>
            <div style={{ flex: 1, padding: '2px', paddingLeft: '20px' }}>
              <img 
                src={`${app_url}/storage/${advertiseSections.image}`} 
                alt="Owner" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxWidth: '400px', // Set a maximum width
                  objectFit: 'cover' // Ensures the image covers the container proportionally
                }} 
              />
            </div>
          </div>
        </section>
      );
}
export default Advertise;
