import SkillTable from "../skilltable/SkillTable";
//import './certificatetable/CertificateTable'
import CertificateTable from "../certificateTable/CertificateTable";

export default function SkillPage() {
  return (
    <div className="skill-page-container">
      <SkillTable />
      <CertificateTable />
    </div>
  );
}
