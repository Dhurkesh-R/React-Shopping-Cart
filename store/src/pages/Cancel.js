import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cancel() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-90">
            <h1 className="mt-5 mb-5">Sorry to see you cancelled your Stripe payment! :(</h1>
            <Link to="/">
                <button className="btn btn-lg btn-primary" type="button">
                    Back to Home
                </button>
            </Link>
        </div>
    );
}

export default Cancel;