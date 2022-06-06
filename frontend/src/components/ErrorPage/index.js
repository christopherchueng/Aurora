import { NavLink, Redirect } from 'react-router-dom'
import './index.css'

const ErrorPage = () => {
    return (
        <div className='error-page'>
            <div className='error-container'>
                <div className='error-img-ctn'>
                    <img src={process.env.PUBLIC_URL + '/images/error-img.png'}></img>
                </div>
                <p>
                    Sorry we couldn't find what you were looking for. Please try another page.
                </p>
                <div className='back-home'>
                    <NavLink className='back-home-link' to='/'>Back to home</NavLink>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;
