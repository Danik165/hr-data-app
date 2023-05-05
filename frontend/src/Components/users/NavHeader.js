import { func } from 'prop-types';
import logo from '../../Images/logo.png'
import './navheader.css';

const NavHeader = () =>{
    return(
        <div className='nav-header'> 
            <div className="Jeevan-logo">
                <img src={logo} alt="Jeevan Logo"></img>
            </div>
            <p>Account</p>

            <p>Logout</p>
            {/* <div className='ul-div'>
                <ul>
                    <li>
                        Account
                    </li>
                    <li>
                        Logout
                    </li>
                </ul>
            </div> */}
        </div>
    )
};

export default NavHeader;


