import logooo from '../../photo/logo2.svg';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/inertia-react';
const NavbarAuth = () => {
    return (
        <>
            <nav className="navbar">
                <img src={logooo} alt="EFM Logo" className="logo-login" />
                <ul className="navbar-links">
                    <li>
                        <Link href={route('client.home')}>Home</Link>
                    </li>
                    <li>
                        <Link href={route('client.home')+'#about'}>AboutUs</Link>
                    </li>
                    <li>
                        <Link href={route('client.home')+'#pricing'}>Pricing</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default NavbarAuth;
