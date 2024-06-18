import db from "../db.js";

// LAB REQUESTS BACKEND CODE HERE
export const getRequests = (req, res) =>{
    const query =
                `SELECT  
                 clinic_management_system.patient.name AS patient_name,
                 clinic_management_system.patient.patient_id AS patient_id,
                 clinic_management_system.lab_request.request_id,
                 clinic_management_system.lab_request.date,
                 clinic_management_system.staff.name AS doctor_name,
                 clinic_management_system.lab_request.test_type,
                 clinic_management_system.lab_request.test_name,
                 clinic_management_system.invoice.status AS payment_status,
                 clinic_management_system.lab_request.status AS lab_status,
                 clinic_management_system.lab_report.test_report
                 FROM clinic_management_system.lab_request 
                 JOIN clinic_management_system.patient 
                 ON clinic_management_system.lab_request.patient_id=clinic_management_system.patient.patient_id
                 JOIN clinic_management_system.staff 
                 ON clinic_management_system.lab_request.doctor_id=clinic_management_system.staff.staff_id
                 LEFT JOIN clinic_management_system.invoice
                 ON clinic_management_system.lab_request.patient_id=clinic_management_system.invoice.patient_id
                 LEFT JOIN clinic_management_system.lab_report
                 ON clinic_management_system.lab_request.patient_id=clinic_management_system.lab_report.patient_id`;

    db.query(query, [req.query.test_type], (err, data) => {
        if (err) return res.status(500).json("Internal server error");

        return res.status(200).json(data);
    });
}

export const getRequest = (req, res) => {
    const query = 
        `SELECT  
             clinic_management_system.patient.name AS patient_name,
             clinic_management_system.patient.patient_id AS patient_id,
             clinic_management_system.lab_request.request_id,
             clinic_management_system.lab_request.date,
             clinic_management_system.staff.name AS doctor_name,
             clinic_management_system.lab_request.test_type,
             clinic_management_system.lab_request.test_name,
             clinic_management_system.invoice.status AS payment_status,
             clinic_management_system.lab_request.status AS lab_status
         FROM clinic_management_system.lab_request 
         JOIN clinic_management_system.patient 
             ON clinic_management_system.lab_request.patient_id=clinic_management_system.patient.patient_id
         JOIN clinic_management_system.staff 
             ON clinic_management_system.lab_request.doctor_id=clinic_management_system.staff.staff_id
         LEFT JOIN clinic_management_system.invoice
             ON clinic_management_system.lab_request.patient_id=clinic_management_system.invoice.patient_id
             WHERE clinic_management_system.lab_request.patient_id=?`

    db.query(query, [req.params.id], (err, data) => {
        if (err) return res.status(500).json("Internal server error");

        return res.status(200).json(data);
    });
}



export const addRequest = (req, res)=>{
    const values = [
        req.body.patient_id,
        req.body.doctor_id,
        req.body.test_name,
        req.body.test_type,
        req.body.date,  
    ]
    const query = "INSERT INTO lab_request(`patient_id`, `doctor_id`, `test_type`, `test_name`, `date`) VALUES(?)";

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json('Report added')
    })
}

export const updateRequest = (req, res)=>{
    const values = [ 
        req.body.patient_id,
        req.body.doctor_id,
        req.body.test_name,
        req.body.test_type,
        req.body.date
    ]
    const updateId = req.params.id;
    const query = "UPDATE lab_request SET patient_id =?, doctor_id =?, test_name =?, test_type =?, date =? WHERE request_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updateStatus = (req, res)=>{
    const values = [ 
        req.body.status
    ]
    const updateId = req.params.id;
    const query = "UPDATE lab_request SET status=? WHERE request_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removeRequest = (req, res)=>{

    const query = "DELETE FROM lab_request WHERE request_id = ?";
    const requestId = req.params.id;

    db.query(query, [requestId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

// LAB RESULT BACKEND CODE HERE
export const getLabResultList = (req, res) =>{
    const query =
                `SELECT  
                 clinic_management_system.patient.name AS patient_name,
                 clinic_management_system.lab_report.lab_report_id,
                 clinic_management_system.lab_report.date,
                 clinic_management_system.staff.name AS laboratorist_name,
                 clinic_management_system.lab_request.test_name,
                 clinic_management_system.lab_request.test_type,
                 clinic_management_system.lab_report.test_report,
                 clinic_management_system.lab_report.patient_id
                 FROM clinic_management_system.lab_report 
                 JOIN clinic_management_system.patient 
                 ON clinic_management_system.lab_report.patient_id=clinic_management_system.patient.patient_id
                 JOIN clinic_management_system.staff 
                 ON clinic_management_system.lab_report.laboratorist_id=clinic_management_system.staff.staff_id
                 JOIN clinic_management_system.lab_request
                 ON clinic_management_system.lab_request.patient_id = clinic_management_system.lab_report.patient_id`;

    db.query(query, (err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const getLabResult = (req, res) =>{
    const query =
                `SELECT  
                 clinic_management_system.patient.name AS patient_name,
                 clinic_management_system.lab_report.lab_report_id,
                 clinic_management_system.lab_report.date,
                 clinic_management_system.staff.name AS laboratorist_name,
                 clinic_management_system.lab_request.test_name,
                 clinic_management_system.lab_request.test_type,
                 clinic_management_system.lab_report.test_report
                 FROM clinic_management_system.lab_report 
                 JOIN clinic_management_system.patient 
                 ON clinic_management_system.lab_report.patient_id=clinic_management_system.patient.patient_id
                 JOIN clinic_management_system.staff 
                 ON clinic_management_system.lab_report.laboratorist_id=clinic_management_system.staff.staff_id
                 JOIN clinic_management_system.lab_request
                 ON clinic_management_system.lab_request.patient_id = clinic_management_system.lab_report.patient_id
                 WHERE clinic_management_system.lab_report.patient_id=?`;

    db.query(query,[req.params.id],(err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const addLabResult = (req, res)=>{
    const values = [
        req.body.patient_id,
        req.body.laboratorist_id,
        req.body.date,
        req.body.test_report,
    ]
    const query = "INSERT INTO lab_report(`patient_id`, `laboratorist_id`, `date`, `test_report`) VALUES(?)";

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json('Report added')
    })
}

export const updateLabResult = (req, res)=>{
    const values = [ 
        req.body.patient_id,
        req.body.laboratorist_id,
        req.body.date,
        req.body.test_report,
    ]
    const updateId = req.params.id;
    const query = "UPDATE lab_report SET patient_id =?, laboratorist_id =?, date =?, test_report =? WHERE lab_report_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removeLabResult = (req, res)=>{

    const query = "DELETE FROM lab_report WHERE lab_report_id = ?";
    const reporttId = req.params.id;

    db.query(query, [reporttId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}