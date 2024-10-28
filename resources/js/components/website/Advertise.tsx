import React from 'react'
import { usePage } from '@inertiajs/inertia-react';

const Advertise = () => {
    const { advertiseSections } = usePage().props;
    const { lang: locale, app_url } = usePage().props;

    return (
        <>
            <style>
                {`
                    .advertise-content {
                        display: flex;
                        flex-direction: row;
                    }

                    .advertise-text {
                        flex: 1;
                        padding: 20px;
                        direction: ltr;
                        overflow: auto;
                        height: 285px;
                    }

                    .advertise-image {
                        flex: 1;
                        padding: 2px;
                        padding-left: 20px;
                    }

                    @media (max-width: 768px) {
                        .advertise-content {
                            flex-direction: column;
                        }
                    }
                `}
            </style>
            <section style={{ boxShadow: '0px 5px 10px #be9e88' }} className='w-full container-dark pt-5'>
                <h1 style={{ textAlign: 'center', fontSize: '4em', marginBottom: '20px' }} className='text-gold'>
                    <span className="mark-zigzag">{advertiseSections.title[locale]}</span>
                </h1>
                <div className='advertise-content w-full'>
                    <div className='advertise-image'>
                        <img
                            src={`${app_url}/storage/${advertiseSections.image}`}
                            alt="Owner"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxWidth: '400px',
                                objectFit: 'cover'
                            }}
                            className='pb-3'
                        />
                    </div>
                    <div className='advertise-text'>
                        <p className='text-black' dangerouslySetInnerHTML={{ __html: advertiseSections.description[locale] }}>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Advertise;
