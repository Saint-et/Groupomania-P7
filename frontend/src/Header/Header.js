import '../css/Header/header.css';
import logo_groupomania from '../image/icon-left-font-monochrome-white.svg';

const Header = () => {
    return(
        <div className='header_home'>
        <div className='container_header_home'>
        <img className='logo_groupomania' src={logo_groupomania} />
        </div>
        </div>
    )
}

export default Header