// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ElectronicHealthRecords {
    struct Patient {
        uint256 id;
        string name;
        string medicalHistory;
    }

    mapping(uint256 => Patient) public patients;
    uint256 public patientCount;

    event PatientAdded(uint256 id, string name);

    function addPatient(string memory _name, string memory _medicalHistory) public {
        patientCount++;
        patients[patientCount] = Patient(patientCount, _name, _medicalHistory);
        emit PatientAdded(patientCount, _name);
    }

    function getPatient(uint256 _id) public view returns (uint256, string memory, string memory) {
        require(_id > 0 && _id <= patientCount, "Invalid patient ID");
        Patient memory patient = patients[_id];
        return (patient.id, patient.name, patient.medicalHistory);
    }
}
