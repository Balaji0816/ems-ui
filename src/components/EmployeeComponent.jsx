import React, { useState, useEffect } from 'react'
import { addEmployee, getEmployee, updateEmployee } from '../services/employeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const {id} = useParams();

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getEmployee(id).then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email)
            }).catch(errror => {
                console.log(error);
            })
        }
    }, [id])

    function saveOrUpdateEmployee(event) {
        event.preventDefault();

        if (validateFormData()) {

            const employee = { firstName, lastName, email };
            console.log(employee);
            if(id){
                updateEmployee(id, employee).then(response => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.log(error);
                })
            } else {
                addEmployee(employee).then(response => {
                    console.log(response.data);
    
                    navigator('/employees');
                }).catch(error => {
                    console.log(error);
                });
            }

        }
    }

    function validateFormData() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required!';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required!';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required!';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
       if(id){
        return <h2 className='text-center'>Update Employee</h2>
       } else{
        return <h2 className='text-center'>Add Employee</h2>
       }
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstname'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                >
                                </input>
                                { errors.firstName && <div className='in-valid-feedback'>{errors.firstName}</div>}
                                <label className='form-label'>Last Name:</label>
                                <input
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastname'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                >
                                </input>
                                { errors.lastName && <div className='in-valid-feedback'>{errors.lastName}</div>}
                                <label className='form-label'>Email:</label>
                                <input
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    type='text'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                                { errors.email && <div className='in-valid-feedback'>{errors.email}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent