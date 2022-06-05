import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'

const DemoUser = () => {
    const dispatch = useDispatch();

    const demoClick = async (e) => {
        e.preventDefault();

        const credential = 'Demo-lition';
        const password = 'password';
        const demo = await dispatch(sessionActions.login({ credential, password }))
        return demo;
    }

    return (
        <button className='demo-btn' onClick={demoClick}>Demo</button>

    )
}

export default DemoUser
