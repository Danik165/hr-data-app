import React, { useEffect, useState } from 'react';

const UserStats = () => {
    const [data, setData] = useState(null);

 
    useEffect(() => {
        fetch('http://localhost:5000/api/getallskills')
            .then(response => response.json())
            .then(data=>{
              console.log(data);
              setData(data)
            });
    }, []);

 

    if (data) {
        
        return (
<div>
<h2>Your Skills Statistics</h2>
<pre>{JSON.stringify(data,null,2)}</pre>
</div>
        );
    } else {
        return <div>Loading...</div>;
    }
};

 

export default UserStats;