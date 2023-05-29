import { CDBInput } from "cdbreact";
import { useEffect, useState } from "react";
import DashboardTable from "./dashboardTable";

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
            console.log(response.status)
            if(response.redirected){
            window.location.replace(response.url)}
            else if (response.status == 200){
                response.json()
                .then(data =>{
                    //console.log(data);
                    setErrorMessage('')
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

    useEffect(getSearchResults,[])
    return(
        <div class='dashboard-container w-100 h-100 d-flex'>
            <div class='search-bar d-flex flex-row-reverse p-2'>
               
                <form onSubmit={e => getSearchResults(e)}>
                <CDBInput placeholder="Search" type='text' icon="search" iconClass="text-muted" onChange={ e => setSearchValue(e.target.value)}/>
                </form>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <div className="search-table overflow-hidden  ">
                <DashboardTable profileList={profileList}/>
            </div>
        </div>
    )
}

export default DashboardPage;