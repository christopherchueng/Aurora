import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session'

const DemoUser = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const demoClick = async (e) => {
        e.preventDefault();

        const credential = 'Demo-lition'
        const password = 'password'

        await dispatch(sessionActions.login({credential, password}))

        history.push('/discover')
    }

    return (
        <button className='demo-btn' onClick={demoClick}>Demo</button>

    )
}

export default DemoUser
