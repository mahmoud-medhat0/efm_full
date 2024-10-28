import React from 'react'
import { usePage } from '@inertiajs/inertia-react';

const Referal = () => {
    const { referralSections } = usePage().props;
    const { lang: locale, app_url } = usePage().props;
    return (
      <section style={{ boxShadow: '0px 5px 10px #be9e88' }} className='w-full container-light pt-5' id='referral' dir={locale === 'ar' ? 'ltr' : ''}>
          <h1 style={{ textAlign: 'center', fontSize: '4em', marginBottom: '20px' }} className='text-black'>
              <span className="mark-zigzag-black">{referralSections.title[locale]}</span>
          </h1>
          <div className='flex-container' dir={locale === 'ar' ? 'ltr' : 'rtl'}>
              <div className='image-container'>
                  <img 
                      src={`${app_url}/storage/${referralSections.image}`} 
                      alt="membershipImage" 
                      style={{ 
                          width: '100%', 
                          height: 'auto', 
                          maxWidth: '400px', 
                          objectFit: 'cover' 
                      }} 
                      className='pb-3'
                  />
              </div>
              <div className='text-container'>
                  <p className='text-black pb-3' dir={locale === 'ar' ? 'rtl' : 'ltr'} dangerouslySetInnerHTML={{ __html: referralSections.description[locale] }}>
                  </p>
              </div>
          </div>
      </section>
    );
}
export default Referal;

<style jsx>{`
    .flex-container {
        display: flex;
        flex-direction: row;
    }
    .image-container, .text-container {
        flex: 1;
        padding: 20px;
    }
    @media (max-width: 768px) {
        .flex-container {
            flex-direction: column;
        }
    }
`}</style>
