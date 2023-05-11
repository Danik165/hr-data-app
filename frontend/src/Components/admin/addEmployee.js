import React from 'react';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer } from 'cdbreact';

const AddEmployeeForm = () => {
  return (
    <CDBContainer>
      <CDBCard style={{ width: '30rem' }}>
        <CDBCardBody className="mx-4">
          <div className="text-center mt-4 mb-2">
            <p className="h4 font-weight-bold"> AddEmployee </p>
          </div>
          <CDBInput label="Name" type="text" icon="user" iconClass="text-muted" />
          <CDBInput label="Email" type="email" icon="envelope" iconClass="text-muted" />
          <CDBInput label="Confirm email" type="email" icon="exclamation-triangle" iconClass="text-muted" />
          <CDBInput label="Department" type="select" icon="lock" iconClass="text-muted" />
          <CDBBtn color="primary" style={{ width: '40%' }} className="btn-block mt-5 mx-auto">
            Register
          </CDBBtn>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};
export default AddEmployeeForm;