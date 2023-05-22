

import { useRef } from 'react';
import useSound from "use-sound";
import play from '../sounds/play.mp3';
import './start.css'

const Start = ({ setusername }) => {
    const inputRef = useRef();
    const [playsound] = useSound(play, { volume: 1 });
    const handleusername = () => {

        inputRef.current.value && setusername(inputRef.current.value);
        playsound();
    }
    return (
        <div className='login'>
            <div className="loginwrapper">
                <div className="loginleft">
                    <h3 className="loginlogo animated">Kaun Banega Crorepati</h3>
                </div>
                <div className="loginright">
                    <div className="loginbox">
                        <input placeholder="UserName" className="logininput"
                            ref={inputRef}
                        />
                        <button className='loginregister' onClick={handleusername}>
                            Start
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Start
