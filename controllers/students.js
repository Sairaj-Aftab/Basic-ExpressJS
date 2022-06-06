const {readFileSync, writeFileSync} = require('fs');
const path = require('path');

// Data Modelling //
let students = JSON.parse(readFileSync(path.join(__dirname, '../data/students.json')).toString())

// Last id //
const studentLastId = () => {
    if (students.length > 0) {
        return students[students.length -1].id + 1;
    } else {
        return 1;
    }
}

// Controller route //

const getAllStudents = (req, res) => {
    if (students.length > 0) {
        return res.status(200).json(students)
    } else {
        return res.status(404).json({
            message : 'Students data not found'
        })
    }
    
}

const getSingleStudent = (req, res) => {
    let id = req.params.id;

    if (students.some(stu => stu.id == id)) {
        return res.status(200).json(students.find(stu => stu.id ==id))
    } else {
        return res.status(404).json({
            message : 'Student Data not found'
        })
    }
}

const postStudent = (req, res) => {
    
    let {name, skill, location} = req.body;
    if (name != '' || skill != '' || location != '') {

        students.push({
            id : studentLastId(),
            name : name,
            skill : skill,
            location : location
        })
    
        writeFileSync(path.join(__dirname, '../data/students.json'), JSON.stringify(students))
    
        res.status(201).json({
            message : 'Post Done'
        })

    } else {
        res.status(401).json({
            message : 'You have to create info'
        })
    }
    
}

const putStudent = (req, res) => {
   
    let id = req.params.id;

    if (students.some(data => data.id == id)) {
        if (req.body.name != '' || req.body.skill != '' || req.body.location != '') {

            students[students.findIndex(data => data.id == id)] = {
                id : id,
                name : req.body.name,
                skill : req.body.skill,
                location : req.body.location
            }
        
            writeFileSync(path.join(__dirname, '../data/students.json'), JSON.stringify(students))
        
            res.status(200).json({
                message : 'Data updated'
            })

        } else {
            res.status(404).json({
                message : 'Data not updated'
            })
        }
    }
   
}

const patchStudent = (req, res) => {
    
    let id = req.params.id;

    if (students.some(data => data.id == id)) {
        if (req.body.name != '' || req.body.skill != '' || req.body.location != '') {

            students[students.findIndex(data => data.id == id)] = {
                id : id,
                name : req.body.name,
                skill : req.body.skill,
                location : req.body.location
            }
        
            writeFileSync(path.join(__dirname, '../data/students.json'), JSON.stringify(students))
        
            res.status(200).json({
                message : 'Data updated'
            })

        } else {
            res.status(404).json({
                message : 'Data not updated'
            })
        }
    }
}

const deleteStudent = (req, res) => {
    let id = req.params.id;

    if (students.some(stu => stu.id == id)) {

        let updated_data = students.filter(stu => stu.id != id);
        writeFileSync(path.join(__dirname, '../data/students.json'), JSON.stringify(updated_data))

        res.status(202).json({
            message : 'Student data deleted'
        })

    } else {
        res.status(400).json({
            message : 'Student data not found'
        })
    }
}

module.exports = {
    getAllStudents,
    getSingleStudent,
    postStudent,
    putStudent,
    patchStudent,
    deleteStudent
}