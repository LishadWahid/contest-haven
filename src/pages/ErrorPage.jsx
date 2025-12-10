import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div id="error-page" className='text-center mt-20 space-y-4'>
            <h1 className='text-5xl font-bold'>Oops!</h1>
            <p className='text-xl'>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/"><button className="btn btn-primary">Go Back Home</button></Link>
        </div>
    );
};

export default ErrorPage;
