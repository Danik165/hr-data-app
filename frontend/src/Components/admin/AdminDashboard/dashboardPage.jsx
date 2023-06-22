import { CDBBtn, CDBInput } from "cdbreact";
import { useEffect, useState } from "react";
import EmployeeSearchResults from "./EmployeeSearchResults/EmployeeList";
import { MDBIcon } from "mdb-react-ui-kit";



import { apiurl } from "../../../utils/HostData";
const DashboardPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [profileList, setProfileList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getEmployeeList = (e) => {
    if (e) {
      e.preventDefault();
    }
    fetch(
      apiurl +
        "/getdetails?" +
        new URLSearchParams({ searchValue: searchValue })
    )
      .then((response) => {
        if (response.redirected) {
          window.location.replace(response.url);
        } else if (response.status == 200) {
          response.json().then((data) => {
            setErrorMessage("Total Records Found(" + data.data.length + ")");
            setProfileList(data.data);
          });
        } else if (response.status == 400) {
          setProfileList([]);
          setErrorMessage("No Records Found");
        }
      })
      .catch((err) => {
        console.log("Error Message");
      });
  };

  useEffect(getSearchResults, []);

  const showFilterDropDown = () => {
    console.log("Filter Called");
  };
  return (
    <div class="dashboard-container w-100 h-100 d-flex pt-2">
      <div class="search-bar d-flex  justify-content-end p-2 pe-3 ">
        <button
          class="btn btn-light ps-2 pe-2 pt-0 pb-0 me-2"
          onClick={showFilterDropDown}
        >
          <MDBIcon fas icon="filter" size="xs" />{" "}
        </button>
        <form onSubmit={(e) => getEmployeeList(e)}>
          <CDBInput
            placeholder="Search"
            type="text"
            icon="search"
            iconClass="text-muted"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </div>
      <div class="msg-box align-self-end me-5">
        {errorMessage && <p>{errorMessage}</p>}
      </div>

      <div className="search-table overflow-hidden  ">
        <EmployeeSearchResults profileList={profileList} />
      </div>
    </div>
  );
};

export default DashboardPage;
