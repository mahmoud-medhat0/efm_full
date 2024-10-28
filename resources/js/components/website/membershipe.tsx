import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

const Membershipe = () => {
  const { membershipSections } = usePage().props;
  const app_url = usePage().props.app_url;
  const locale = usePage().props.lang;
    return (
        <section style={{ boxShadow: ' 0px 5px 10px #be9e88' }} className='w-full mb-5 container-light pt-5'>
          <h1 className='text-black' style={{ textAlign: 'center', fontSize: '3em', marginBottom: '20px' }}>
            <span className="mark-zigzag-black">{membershipSections.title[locale]}</span>
          </h1>
          <div className='w-full flex-container'>
            <div className='image-container'>
              <img 
                src={`${app_url}/storage/${membershipSections.image}`} 
                alt="membershipImage" 
                style={{ width: '100%', height: 'auto' }} 
                className='pb-5'
              />
            </div>
            <div className='text-container'>
              <p className='text-black pb-4' dangerouslySetInnerHTML={{ __html: membershipSections.description[locale] }}></p>
            </div>
          </div>
          <style>
            {`
              .flex-container {
                display: flex;
                flex-direction: row;
              }

              .text-container, .image-container {
                flex: 1;
              }

              .text-container {
                padding-left: 15px;
              }

              @media (max-width: 768px) {
                .flex-container {
                  flex-direction: column;
                }

                .text-container {
                  padding-left: 0;
                  margin-top: 15px;
                }
              }
            `}
          </style>
        </section>
      );
}

export default Membershipe;
