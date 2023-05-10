import './skilltable.css'

const SkillTable = () =>{
    return(
        <div className="main-content">
        <table>
          <thead>
            <tr>
              <th>Skill</th>
              <th>Years</th>
              <th>Level</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {/* Rows will go here */}
          </tbody>
        </table>
      </div>
    )
}

export default SkillTable;