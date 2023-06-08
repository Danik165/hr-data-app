import './skilltable/SkillTable';
import './certificatetable/CertificateTable'
import CertificateTable from './certificatetable/CertificateTable';

export default function skillPage(){

    return(
        <div className="skill-page-container">
            <SkillTable />
            <CertificateTable />
        </div>
    )
}