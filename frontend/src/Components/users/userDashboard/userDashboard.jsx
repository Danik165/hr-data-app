import SkillTable from "../skillTable/skillTable";
//import './certificatetable/CertificateTable'
import CertificateTable from "../certificateTable/certificateTable";

export default function SkillPage() {
  return (
    <div className="skill-page-container">
      <SkillTable />
      <CertificateTable />
    </div>
  );
}
