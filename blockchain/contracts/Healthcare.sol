// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract HealthCare {
    event DoctorApproved(address indexed _doctor);

    using Counters for Counters.Counter;
    Counters.Counter private reportCount;
    Counters.Counter private patientCount;

    struct Report {
        string name;
        string prescription;
        uint256 time;
        address doctor;
        address patient;
    }

    struct Patient {
        string info;
        address patientAddress;
    }

    Report[] private reports;
    Patient[] private patients;

    // Hospital address
    address public Hospital;

    // approveDoctorAddress[_doctorAddress] = true / fasle
    mapping(address => bool) private approveDoctorAddress;
    // approvePatient[_patientAddress] = true / false
    mapping(address => bool) private approvePatient;
    // allDoctors[Hospital] = [doctorAddress]
    mapping(address => address[]) private allDoctors;
    //reportByAddressAndName[_patitentAddress][_name] = Report
    mapping(address => mapping(string => Report)) private reportByAddressAndName;
    // reportsByAddress[_patientAddress] = [Report]
    mapping(address => Report[]) private reportsByAddress;
    // allPatients[_doctoraddress] = [_patientAddress]
    mapping(address => address[]) private allPatients;
    


    constructor() {
        Hospital = msg.sender;
    }

    modifier onlyHospital {
        require(msg.sender == Hospital);
        _;
    }

    function allowDoctor(address _doctor) public onlyHospital {
        approveDoctorAddress[_doctor] = true;
        allDoctors[Hospital].push(_doctor);
        emit DoctorApproved(_doctor);
    }

    function showAllDoctors() public view returns(address[] memory) {
        return allDoctors[Hospital];
    }

    function 
    addPatient(
        string memory _info,
        address _address
    ) public {
        require(approveDoctorAddress[msg.sender] == true, "Doctor not approved");
        patientCount.increment();
        
        Patient memory tempPatient;
        tempPatient.info = _info;
        tempPatient.patientAddress = _address;

        approvePatient[_address] = true;
        patients.push(tempPatient);
    }

    function sendReport(address _to, string memory _reportName, string memory _prescription) public {
        require(msg.sender == tx.origin, "Access denide");
        createReport(_to, _reportName, _prescription);
    }

    function createReport(address _patient, string memory _name, string memory _prescription) private {
        require(approveDoctorAddress[msg.sender] == true, "Doctor not approved");
        require(approvePatient[_patient] == true, "Patient not approved");
        reportCount.increment();
        
        Report memory tempReport;
        tempReport.name = _name;
        tempReport.prescription = _prescription;
        tempReport.time = block.timestamp;
        tempReport.doctor = msg.sender;
        tempReport.patient = _patient;

        reportByAddressAndName[_patient][_name] = tempReport;
        
        allPatients[msg.sender].push(_patient);
        reportsByAddress[_patient].push(tempReport);
        reports.push(tempReport);
    }

    function showMyReports() public view returns(Report[] memory) {
        return reportsByAddress[msg.sender];
    }

    function getMyReportByName(string memory _name) public view returns(Report memory) {
        return reportByAddressAndName[msg.sender][_name];
    }

    function getPatientReportByName(string memory _name, address _patient) public view returns(Report memory) {
        require(approveDoctorAddress[msg.sender] == true, "Doctor not approved");
        return reportByAddressAndName[_patient][_name];
    }

    function getAllMyPatients() public view returns(address[] memory) {
        return allPatients[msg.sender];
    }

    function updateReport(string memory _prescription, address _patient, string memory _name) public {
        require(approveDoctorAddress[msg.sender] == true, "Doctor not approved");
        reportByAddressAndName[_patient][_name].prescription = _prescription;
    }

}