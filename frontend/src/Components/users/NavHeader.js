import { func } from 'prop-types';
import logo from '../../Images/logo.png'
import './navheader.css';

const NavHeader = () =>{
    return(
        <div className='nav-header'> 
            <div className="Jeevan-logo">
                <img src={logo} alt="Jeevan Logo"></img>
            </div>
            <button>Account</button>

            <button>Logout</button>
            
        </div>
    )
};

export default NavHeader;


