import {updateEmployee, validateLinemanger} from "@/app/APIs/api";
import './form.css'
import React, { useState } from "react";



import Popup from "@/app/components/popup/popup";
import EmployeeDropdown from "@/app/components/dropdown/dropdownList";
import UserImage from "@/app/components/userImage/userImage";

interface UpdateFormProps {
    employeeData: any;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ employeeData }) => {
    const [formData, setFormData] = useState({

        name: employeeData.name,
        surname: employeeData.surname,
        email: employeeData.email,
        birthDate: employeeData.birthDate.slice(0, 10) ,
        salary: employeeData.salary,
        role: employeeData.role,
        reportingLineManager: employeeData.reportingLineManager,
        defaultImage: employeeData.defaultImage
    });

    const [isUpdateSuccessful, setUpdateSuccessful] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handlereportmangerSelect = (selectedEmployee: string) => {
        console.log(selectedEmployee);
        const  employeeNumber  = selectedEmployee;
        formData.reportingLineManager = String(employeeNumber);
    };
    const handleDefaultImageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        setFormData((prevData) => ({ ...prevData, defaultImage: String(event.target.value) }));

    };
    const handleUpdateClick = async () => {
        try {
               await  validateLinemanger(employeeData.employeeNumber,formData.reportingLineManager,formData.role);
            await updateEmployee(employeeData.employeeNumber, formData);

            setUpdateSuccessful(true);
            setUpdateError(null); // Reset any previous error
            setModalOpen(true);
        } catch (error) {
            console.error('Error updating employee:', (error as Error).message);
            setUpdateError('Error updating employee. Please try again.');
            setUpdateSuccessful(false);
            setModalOpen(true);
        }
    };


    const handleCloseModal = () => {
        setModalOpen(false);
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
                    <select id="defaultImage" value={formData.defaultImage} onChange={handleDefaultImageChange}>
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
                    <input type="text" value={employeeData.employeeNumber} disabled/>
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
                <button type="button" onClick={handleUpdateClick}>
                    Update Employee
                </button>
            </section>


            {isModalOpen && (
                <Popup
                    isSuccess={isUpdateSuccessful}
                    error={updateError}
                    onClose={handleCloseModal}
                    text1='Update Successful'
                />
            )}
        </>
    );
};

export default UpdateForm;
