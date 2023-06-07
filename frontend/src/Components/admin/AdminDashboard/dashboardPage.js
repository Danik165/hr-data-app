import { CDBBtn, CDBInput } from "cdbreact";
import { useEffect, useState } from "react";
import SearchCards from "./SearchCards";
import { MDBIcon } from "mdb-react-ui-kit";
const DashboardPage = () =>{
    
    const [searchValue,setSearchValue] = useState('')
    const [profileList,setProfileList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    
    const getSearchResults = (e) =>{
        if(e){

            e.preventDefault();
        }
        fetch("http://localhost:5000/api/getdetails?" + new URLSearchParams({searchValue:searchValue}))
        .then(response =>{
            //console.log(response.status)
            if(response.redirected){
            window.location.replace(response.url)}
            else if (response.status == 200){
                response.json()
                .then(data =>{
                    //console.log(data);
                    setErrorMessage('Total Records Found(' + data.data.length + ')')
                    setProfileList(data.data);
                }
                    )
            }
            else if(response.status == 400){
                    setProfileList([])
                    setErrorMessage("No Records Found")
            }
        })
        .catch(err => {
            console.log("Error Message")
        })
        console.log("Search Called")
    }

    useEffect(getSearchResults,[]);

    const showFilterDropDown = () => {
        console.log("Filter Called")
    }
    return(
        <div class='dashboard-container w-100 h-100 d-flex pt-2'>
            <div class='search-bar d-flex  justify-content-end p-2 pe-3 '>

                    <button class='btn btn-light ps-2 pe-2 pt-0 pb-0 me-2' onClick={showFilterDropDown} ><MDBIcon fas icon="filter" size="xs"/>  </button> 
                <form onSubmit={e => getSearchResults(e)}>
                <CDBInput placeholder="Search" type='text' icon="search" iconClass="text-muted" onChange={ e => setSearchValue(e.target.value)}/>
                </form>
            </div>
            <div class='msg-box align-self-end me-5'>

            {errorMessage && <p>{errorMessage}</p>}
            </div>


            <div className="search-table overflow-hidden  ">
                <SearchCards profileList={profileList}/>
            </div>
        </div>
    )
}

export default DashboardPage;