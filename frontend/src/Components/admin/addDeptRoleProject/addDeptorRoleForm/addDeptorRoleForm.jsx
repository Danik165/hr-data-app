import { useState, useEffect } from "react";
import {
  CDBInput,
  CDBCard,
  CDBCardBody,
  CDBBtn,
  CDBContainer,
  CDBDropDown,
  CDBDropDownMenu,
  CDBDropDownToggle,
  CDBDropDownItem,
} from "cdbreact";
import { apiurl } from "../../../../utils/HostData";
import { confirmAlert } from "react-confirm-alert";

const AddDeptRoleForm = () => {
  const [departments, setDeparments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    department_ID: 0,
    department_Name: "",
    roleName: "",
  });
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState("");

  const roleUrl = apiurl + "/role";
  const deptUrl = apiurl + "/departments";
  const AddDeptRole = () => {
    if (newDepartment.department_ID == 0) {
      fetch(deptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department_Name: newDepartment.department_Name,
          role_Name: newDepartment.roleName,
        }),
      })
        .then((response) => {
          if (response.status == 201) {
            confirmAlert({
              title: "Success",
              message: "New Department Added Successfully",
              buttons: [
                {
                  label: "Ok",
                  onClick: () => window.location.reload(),
                },
              ],
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
        });
    } else {
      fetch(roleUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department_ID: newDepartment.department_ID,
          role_Name: newDepartment.roleName,
        }),
      })
        .then((response) => {
          if (response.status == 201) {
            confirmAlert({
              title: "Success",
              message: "New Role Added Successfully",
              buttons: [
                {
                  label: "Ok",
                  onClick: () => window.location.reload(),
                },
              ],
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
        });
    }
  };

  const handleDeptSelection = (dept) => {
    if (dept == 0) {
      setEnabled(true);
    } else {
      // setNewDepartment({...newDepartment,department_Name:""});
      setEnabled(false);
    }
  };

  const fetchDepartmentList = () => {
    fetch(apiurl + "/departments")
      .then((response) => {
        if (response.redirected) {
          window.location.replace(response.url);
        } else {
          response.json().then((departmentlist) => {
            setDeparments(departmentlist.data);
            setDeparments((oldArray) => [
              ...oldArray,
              { DepartmentID: 0, DepartmentName: "Add a new Department" },
            ]);
            setNewDepartment({
              ...newDepartment,
              department_ID: departmentlist.data[0].DepartmentID,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchDepartmentList();
  }, []);

  return (
    <div class="skill-form-container">
      <CDBContainer>
        <CDBCard
          style={{ width: "30rem", "border-radius": "0px 0px 10px 10px" }}
        >
          <CDBCardBody className="mx-4">
            <div className="text-center mt-4 mb-2">
              <p className="h4 font-weight-bold"> Add Department </p>
            </div>

            <label htmlFor="department">Select a Department:</label>
            <br />
            <select
              id="department"
              name="department"
              className="department-dropdown"
              onChange={(e) => {
                handleDeptSelection(e.target.value);
                setNewDepartment({
                  ...newDepartment,
                  department_ID: e.target.value,
                });
              }}
            >
              {departments.map((department) => (
                <option id={department} value={department.DepartmentID}>
                  {department.DepartmentName}
                </option>
              ))}
            </select>

            {enabled && (
              <CDBInput
                label="New Department"
                type="text"
                icon="user-friends"
                iconClass="text-muted"
                onChange={(e) =>
                  setNewDepartment({
                    ...newDepartment,
                    department_Name: e.target.value,
                  })
                }
              />
            )}

            <CDBInput
              style={{ "border-radius": "0px" }}
              label="Role"
              type="text"
              icon="lock"
              iconClass="text-muted"
              onChange={(e) =>
                setNewDepartment({ ...newDepartment, roleName: e.target.value })
              }
            />
            <div class="row mb-2 ">
              <p id="error-msg">{error}</p>
            </div>
            <CDBBtn
              color="primary"
              style={{ width: "40%" }}
              className="btn-block mb-3 mt-3 mx-auto"
              onClick={AddDeptRole}
            >
              Register
            </CDBBtn>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
    </div>
  );
};
export default AddDeptRoleForm;
