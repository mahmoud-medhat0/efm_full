import OwnerLogo from '../../assets/owner.jpg';
import { usePage } from '@inertiajs/inertia-react';
export default function About() {
  const { aboutSections } = usePage().props;
  const { lang: locale, app_url } = usePage().props;
  return (
    <section style={{ padding: '40px', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2em', marginBottom: '20px'}}>{aboutSections.title[locale]}</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px', border: '1px solid #ccc', direction: 'ltr', overflow: 'auto', height: '675px' }}>
          <p className='text-black' dangerouslySetInnerHTML={{ __html: aboutSections.description[locale] }}>

          </p>
        </div>
        <div style={{ flex: 1, padding: '2px', marginLeft: '15px', }}>
          <img src={`${app_url}/storage/${aboutSections.image}`} alt="Owner" style={{ width: '100%', height: 'auto' }} />
        </div>
      </div>
    </section>
  );
}
