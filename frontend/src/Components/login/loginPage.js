
import Login from './Login'
import './loginPage.css';

import logo from "../../Images/logo.png";
import sideimg from '../../Images/LoginPageSideImageEdited.png'


const LoginPage = ({setIsAuthenticated}) =>{
    return(
      <div class="login-container h-100 d-flex align-items-center justify-content-center">
      <div class="card mb-2" id="login-card">
        <div class="row no-gutters">
          <div class="col-md-6">
            <img src={sideimg} class="card-img img-fluid" alt="..."  />
          </div>
          <div class="col-md-6 pt-0">
            <div class="card-body pt-4 d-flex flex-column align-items-center justify-content-center">
                <div className='Jeevan-logo'>
                    <img src={logo} alt="Jeevan Logo" class='img-fluid' id="Jeevan-logo-img"></img>
                </div>
              <Login setIsAuthenticated={setIsAuthenticated} />
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}


export default LoginPage;