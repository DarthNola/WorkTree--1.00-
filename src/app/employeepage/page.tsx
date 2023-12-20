'use client';
import { useEffect, useState } from 'react';
import { fetchData } from '@/app/APIs/api';
import Navbar from '@/app/components/navbar/navbar';
import UpdateForm from '@/app/components/forms/UpdateForm';
import CreateForm from '@/app/components/forms/CreateForm';
import UserImage from "@/app/components/userImage/userImage";

const Page = () => {
    const [employeeData, setEmployeeData] = useState(null);
    const [newEmployeeNumber, setNewEmployeeNumber] = useState<string>('');

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const storedEmployeeNumber = localStorage.getItem('employeeNumber');
                const storedNewEmployeeNumber = localStorage.getItem('NewemployeeNumber');

                if (storedEmployeeNumber) {
                    const result = await fetchData(`employees/${storedEmployeeNumber}`);
                    console.log('Employee Data:', result);
                    setEmployeeData(result);
                } else {
                    console.error('Employee number not found in local storage');
                }

                if (storedNewEmployeeNumber) {
                    setNewEmployeeNumber(storedNewEmployeeNumber);
                }
            } catch (error) {
                console.error('Error fetching employee data:', (error as Error).message);
            }
        };

        fetchEmployeeData();
    }, []);

    return (
        <div>
            <Navbar/>
            <h1>{employeeData ? 'Update Employee' : 'Create Employee'}</h1>



            <form>
                {employeeData ? (
                    <UpdateForm employeeData={employeeData}/>
                ) : (
                    <CreateForm employeeNumber={newEmployeeNumber}/>
                )}
            </form>
        </div>
    );
};

export default Page;
