import logo from '../image/icon-above-font.svg';
import '../css/login_signup/login_signup.css';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
    return(
        <main className='main_login_signup'>

            <section className='section_login_signup'>
                    <img src={logo} alt="Logo"/>
    
                <form className='form_login_signup'>
            
                {props.isSignup && <div className="container_field">
                    <p className='P_log'>Firstname :</p>
                    <input className="field_log" onChange={props.handleChange("firstName")} type={"text"} value={props.user.firstName}></input>
                </div>}
    
                {props.isSignup && <div className="container_field">
                    <p className='P_log'>Lastname :</p>
                    <input className="field_log" onChange={props.handleChange("lastName")} type={"text"} value={props.user.lastName}></input>
                </div>}
        
                <div className="container_field">
                    <p className='P_log'>Email :</p>
                    <input className="field_log" onChange={props.handleChange("email")} type={"text"} value={props.user.email}></input>
                </div>
        
                <div className="container_field">
                    <p className='P_log'>Password :</p>
                    <input className="field_log" onChange={props.handleChange("password")} type={"password"} value={props.user.password}></input>
                </div>
        
                {props.isSignup && <div className="container_field">
                    <p className='P_log'>Password verification :</p>
                    <input className="field_log" onChange={props.handleChange("password_verification")} type={"password"} value={props.user.password_verification}></input>
                </div>}
        
                <div className="container_field">
                    <p className='P_log M_error'>{props.error}</p>
                </div>
        
                <div className="container_field"><button className="button_log" onClick={props.onSubmit}>connexion</button></div>
        
                </form>
    
                {!props.isSignup && <div className="container_field">
                    <Link to="/signup">
                        <button className="button_center button_connect">Signup</button>
                        </Link>
                </div>}
    
                {props.isSignup && <div className="container_field">
                    <Link to="/login">
                        <button className="button_center button_cancel">Cancel</button>
                    </Link>
                </div>}

            </section>
        </main>
    )
}

export default LoginForm