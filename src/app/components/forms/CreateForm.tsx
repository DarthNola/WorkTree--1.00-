import React, { useState, useEffect } from 'react';
import {createEmployee, validateLinemanger} from "@/app/APIs/api";
import Popup from "@/app/components/popup/popup";
import EmployeeDropdown from "@/app/components/dropdown/dropdownList";
import UserImage from "@/app/components/userImage/userImage";
import './form.css'

interface CreateFormProps {
    employeeNumber: string;
}

const CreateForm: React.FC<CreateFormProps> = ({ employeeNumber }) => {
    console.log(employeeNumber +" employeeNumber createpage")
    const [formData, setFormData] = useState({
        employeeNumber: employeeNumber,
        name: '',
        surname: '',
        email:'',
        birthDate: '',
        salary: '',
        role: '',
        reportingLineManager:"",
        defaultImage:''
    });
    const [CreateEmpSuccessful, setCreateEmpSuccessful] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handlereportmangerSelect = (selectedEmployee: string) => {
        console.log(selectedEmployee);
        const  employeeNumber  = selectedEmployee;
        setFormData((prevData) => ({ ...prevData, reportingLineManager: String(employeeNumber) }));
    };
    const handleDefaultImageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        setFormData((prevData) => ({ ...prevData, defaultImage: String(event.target.value) }));

    };

    const handleCreateClick = async () => {
        try {

            formData.employeeNumber=employeeNumber;
            console.log(formData)

           await validateLinemanger(formData.employeeNumber,formData.reportingLineManager,formData.role);
            if(formData.birthDate==""){
                throw new Error('Birth date should no be null');
            }
            await createEmployee(formData);

            // Update the state after successful creation
            setCreateEmpSuccessful(true);
            setCreateError(null);
            setModalOpen(true);

        } catch (error) {
            console.error('Error creating employee:', (error as Error).message);

            // Set the error message and update the state
            setCreateError('Error creating employee: '+ (error as Error).message);
            setCreateEmpSuccessful(false);
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        // Close the modal and reset the state
        setModalOpen(false);
        setCreateEmpSuccessful(false);
        setCreateError(null);
    };

    return (
        <>
            <section className="image">
                {
                    formData.email && formData.defaultImage ?
                        <UserImage emailAddress={formData.email} defaultImage={formData.defaultImage}/> :
                        <UserImage emailAddress="worktree@gmail.com" defaultImage="retro"/>
                }
                <section>
                    <h1>Select Default Image:</h1>
                    <select id="defaultImage" value="selected a DefaultImage" onChange={handleDefaultImageChange}>
                        <option value="404">404 (Default Image)</option>
                        <option value="mm">Mystery Man</option>
                        <option value="identicon">Identicon</option>
                        <option value="monsterid">MonsterID</option>
                        <option value="wavatar">Wavatar</option>
                        <option value="retro">Retro</option>
                    </select>
                </section>

            </section>
            <section className="inputs">
                <section>
                    <h1>Employee Id:</h1>

                    <input type="text" name="employeeNumber" value={employeeNumber} disabled/>
                </section>
                <section>
                    <h1>Email:</h1>

                    <input type="text" name="email" value={formData.email} onChange={handleInputChange}/>
                </section>
                <section>
                    <h1>Name:</h1>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange}/>
                </section>
                <section>
                    <h1>Surname:</h1>
                    <input type="text" name="surname" value={formData.surname} onChange={handleInputChange}/>
                </section>
                <section>
                    <h1>Birth Date:</h1>
                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange}/>
                </section>
                <section>
                    <h1>Salary:</h1>
                    <input type="number" name="salary" value={formData.salary} onChange={handleInputChange}/>
                </section>
                <section>
                    <h1>Role:</h1>
                    <input type="text" name="role" value={formData.role} onChange={handleInputChange}/>
                </section>
                <section>
                    <EmployeeDropdown onSelectEmployee={handlereportmangerSelect}/>
                </section>

            </section>
            <section className="buttons">
                <button type="button" onClick={handleCreateClick}>
                    Create Employee
                </button>
            </section>


            {isModalOpen && (
                <Popup
                    isSuccess={CreateEmpSuccessful}
                    error={createError}
                    onClose={handleCloseModal}
                    text1='Creating Employee Successful'
                />
            )}
        </>
    );
};

export default CreateForm;
