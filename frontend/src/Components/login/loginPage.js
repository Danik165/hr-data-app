
import Login from './Login'
import './loginPage.css';

import logo from "../../Images/logo.png";
import sideimg from '../../Images/LoginPageSideImg.jpg'


const LoginPage = () =>{
    return(
      <div class="card mb-2" id="login-card">
        <div class="row no-gutters">
          <div class="col-md-6">
            <img src={sideimg} class="card-img" alt="..." />
          </div>
          <div class="col-md-6 pt-0">
            <div class="card-body pt-4 d-flex flex-column align-items-center justify-content-center">
                <div className='Jeevan-logo'>
                    <img src={logo} alt="Jeevan Logo"></img>
                </div>
              <Login />
            </div>
          </div>
        </div>
      </div>
    )
}


export default LoginPage;