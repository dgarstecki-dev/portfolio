import { Link, useLocation } from 'react-router-dom';

interface NavProps {
    buttonTitle: string,
    to: string,
}

export default function Navigation({ buttonTitle, to }: NavProps) {
    const { pathname } = useLocation();
    const isActive = pathname === to;

    return (
        <Link to={to} className={`nav-link${isActive ? " active" : ""}`}>
            {buttonTitle}
        </Link>
    );
}