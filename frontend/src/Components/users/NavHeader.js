import { func } from 'prop-types';
import logo from '../../Images/logo.png'


const NavHeader = () =>{
    return(
        <div> 
            <div className="Jeevan-logo">
                <img src={logo} alt="Jeevan Logo"></img>
            </div>
            <div className='ul-div'>
                <ul>
                    <li>
                        Account
                    </li>
                    <li>
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default NavHeader;


