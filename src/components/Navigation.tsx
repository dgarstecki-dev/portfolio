import { Link } from 'react-router-dom';

interface NavProps {
    buttonTitle: string,
    to: string,
}

export default function Navigation({ buttonTitle, to }: NavProps) {
    return (
        <div className="box">
            <Link to={to} className="nav-link">
                {buttonTitle}
            </Link>
        </div>
    );
}