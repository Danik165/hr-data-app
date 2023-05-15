const AddSkillForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const registerUser = () => {
      console.log("Register User called")
    }
    return (
      <div class="skill-form-container">
      <CDBContainer>
        <CDBCard style={{ width: '30rem' }}>
          <CDBCardBody className="mx-4">
            <div className="text-center mt-4 mb-2">
              <p className="h4 font-weight-bold"> Add Skill </p>
            </div>
            <CDBInput label="Name" type="text" icon="user" iconClass="text-muted" />
            <CDBInput label="Email" type="email" icon="envelope" iconClass="text-muted" />
            <CDBInput label="Confirm email" type="email" icon="exclamation-triangle" iconClass="text-muted" />
            <CDBInput label="Department" type="select" icon="lock" iconClass="text-muted" />
            <CDBBtn color="primary" style={{ width: '40%' }} className="btn-block mt-5 mx-auto" onClick={registerUser}>
              Register
            </CDBBtn>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
      </div>
    );
  };
  export default AddSkillForm;