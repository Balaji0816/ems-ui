import React, {useEffect, useState} from 'react'
import { deleteEmployee, listOfEmployees } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const dummyData = [
        {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@gmail.com"
        },
        {
            "id": 2,
            "firstName": "John1",
            "lastName": "Doe1",
            "email": "john1.doe1@gmail.com"
        },
        {
            "id": 3,
            "firstName": "John2",
            "lastName": "Doe2",
            "email": "john2.doe2@gmail.com"
        }
    ];
    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect( () =>{
        getAllEmployees();
    }, [])

    function getAllEmployees(){
        listOfEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then(response => {
            getAllEmployees();
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <button className='btn btn-primary' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-striped table-boarded'>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button> 
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                      style={{marginLeft: '10px'}}
                                    >Delete</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent