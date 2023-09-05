import React from 'react';
import html2canvas from 'html2canvas';
import './card.css';
import Navbar from './navbar';

const HealthInsuranceCard = () => {
  const name = sessionStorage.getItem('name');
  const policyNumber = sessionStorage.getItem('policyNumber');
  const enrollId = sessionStorage.getItem('enrollId');
  const createdOn = sessionStorage.getItem('createdOn');
  const selectedNamesJSON = sessionStorage.getItem('selectedNames');
  const selectedNames = selectedNamesJSON ? JSON.parse(selectedNamesJSON) : [];


  // Calculate expiry date by adding year to createdOn
  const createdDate = new Date(createdOn);
  const expiryDate = new Date(createdOn);
  expiryDate.setFullYear(createdDate.getFullYear() + parseInt(sessionStorage.getItem('year')));

  const formattedCreatedOn = createdDate.toISOString().split('T')[0];
  const formattedExpiryDate = expiryDate.toISOString().split('T')[0];

  const downloadAsImage = () => {
    const cardElement = document.getElementById('health-card');

    html2canvas(cardElement).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'health-insurance-card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <React.Fragment>
      <Navbar />
      <div>
        <div id="health-card" className="card" style={{width:'500px'}}>
          <div className="header">
            <img src="mdhealth.png" alt="Company Logo" />
            <h2>MD Health Insurance Pvt. Ltd.</h2>
          </div>
          <div className="content" style={{ padding: '10px' }}>
            <hr />
            <div style={{float:'left',textAlign:'left',width:'240px',height:'150px'}}>
            <h3>Enrollee Name</h3>
            <p>{name}</p>
            <p>Enroll ID: {enrollId}</p>
            <p><b>Policy Number: </b>{policyNumber}</p>
            </div>
            <div style={{float:'right',textAlign:'right',width:'240px',height:'150px'}}>
            <p>Created On: {formattedCreatedOn}</p>
            <p>Expiry Date: {formattedExpiryDate}</p>
            </div>
            <hr/>
            <div style={{float:'left',textAlign:'left',width:'500px'}}>
  <h4>Associate Members</h4>
  {selectedNames.map((item, index) => (
    // Check if the relation is "self", if yes, skip this iteration
     item.relation === 'self' ? null : (
      <p key={index}>{`${item.relation.charAt(0).toUpperCase() + item.relation.slice(1)}: ${item.name}`}</p>
    )
  ))}
</div>

          </div>
          <div className="footer" style={{margin:'10px'}}>
            <hr />
            <p>CV Raman Road, Bengaluru, Karnataka 560012</p>
          </div>
        </div>
        <button onClick={downloadAsImage}>Download e-card</button>
      </div>
    </React.Fragment>
  );
};

export default HealthInsuranceCard;
