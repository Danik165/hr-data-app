import { confirmAlert } from "react-confirm-alert";
import { useEffect, useState } from "react";
import "./certificatetable.css";
import { MDBIcon } from "mdb-react-ui-kit";
import { apiurl } from "../../../utils/HostData";
import AddUserCertificate from "./addUserCertificate/addUserCertificate";
import { Modal, ModalBody } from "reactstrap";

export default function CertificateTable({ id }) {
  const [userCertificates, setUserCertificates] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");
  const [showAddCertificateForm, setShowAddCertificateForm] = useState(false);

  const delCertificateConfirmation = (index) => {
    confirmAlert({
      title: "Confirm Remove",
      message: "Are you sure you want to remove this Certificate?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeCertificate(index),
        },
        {
          label: "No",
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  const removeCertificate = (index) => {
    fetch(
      apiurl +
        "/certificate?" +
        new URLSearchParams({ userCertificateID: index }),
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.status == 200) {
          setUserCertificates(
            userCertificates.filter(
              (obj, i) => obj.User_CertificatesID !== index
            )
          );
          confirmAlert({
            title: "Delete Successfull",
            message: "Certificate Sucessfully Removed",
            buttons: [
              {
                label: "Ok",
              },
            ],
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error in Removing User Skill Try Again");
      });
  };
  const fetchCertificate = ({ url }) => {
    fetch(url)
      .then((response) => {
        if (response.redirected) {
          window.location.replace(res.url);
        } else if (response.status == 200) {
          response.json().then((data) => {
            setUserCertificates(data.data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.message);
      });
  };

  useEffect(() => {
    if (id) {
      const adminUrl =
        apiurl + "/certificatesofuser?" + new URLSearchParams({ userId: id });
      fetchCertificate({ url: adminUrl });
    } else {
      const userUrl = apiurl + "/certificates";
      fetchCertificate({ url: userUrl });
    }
  }, []);

  const toggleAddCertificateForm = () => {
    setShowAddCertificateForm(!showAddCertificateForm);
  };

  return (
    <div className="certificate-container">
      <div className="certificate-header">
        <h2>Certificates</h2>
        <button onClick={toggleAddCertificateForm}>Add new Certificate</button>
        <Modal
          isOpen={showAddCertificateForm}
          toggle={toggleAddCertificateForm}
        >
          <ModalBody>
            <AddUserCertificate id={id} toggleForm={toggleAddCertificateForm} />
          </ModalBody>
        </Modal>
      </div>
      <div class="certificate-table-container">
        <table>
          <thead>
            <tr>
              <th>Certificate Provider</th>
              <th>Certificate Name</th>
              <th>Issue Date</th>
              <th>Valid Till Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userCertificates.map((obj, i) => (
              <tr key={obj.User_CertificatesID}>
                <td>{obj.CertificateProvider}</td>
                <td>{obj.CertificateName}</td>
                <td>
                  {new Date(obj.Certificate_issue_date).toDateString().slice(3)}
                </td>
                <td>
                  {new Date(obj.Certificate_validity_date)
                    .toDateString()
                    .slice(3)}
                </td>
                <td>
                  <button
                    onClick={() =>
                      delCertificateConfirmation(obj.User_CertificatesID)
                    }
                  >
                    <MDBIcon fas icon="trash-alt" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
