"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import  {fetchData, deleteEmployee} from "@/app/APIs/api";
import Navbar from "@/app/components/navbar/navbar";
import  './style.css'




function Page() {

    const [data, setData] = useState<any>(null);

    const fetchDataFromApi = async () => {
        try {
            const result = await fetchData('employees');
            console.log('API Response Status:', result.status);
            console.log('API Result:', result);

            setData(result);
        } catch (error) {
            console.error('Error fetching data:', (error as Error).message);
        }
    };

    useEffect(() => {
        fetchDataFromApi();
    }, []);

    const handleDelete = async (employeeNumber: string) => {
        try {
            console.log('Deleting employee with number:', employeeNumber);

            const result = await deleteEmployee(employeeNumber);
            console.log('Delete employee response:', result);

            // Update the state or refetch data after successful deletion
            fetchDataFromApi();
        } catch (error) {
            console.error('Error deleting employee:', (error as Error).message);
        }
    };

    const AgeCalculator = (dob: string) => {

        const dobDate = new Date(dob);
        const currentDate = new Date();
        const calculatedAge = currentDate.getFullYear() - dobDate.getFullYear() -
            ((currentDate.getMonth() < dobDate.getMonth() ||
                (currentDate.getMonth() === dobDate.getMonth() &&
                    currentDate.getDate() < dobDate.getDate())) ? 1 : 0);
                return calculatedAge;
    }



    const handleUpdate = (value: string) => {


        // Store employeeNumber in local storage
        localStorage.setItem('employeeNumber', value);


    };
    const handleCreate = (value: string) => {
        localStorage.setItem('employeeNumber', value);
        const lastEmployeeNumber = data[data.length - 1].employeeNumber;
        const lastNumber = parseInt(lastEmployeeNumber.replace('EMP', ''), 10);
        const newNumber = lastNumber + 1;

        const paddedNumber = newNumber < 10 ? `000${newNumber}` : newNumber < 100 ? `00${newNumber}` : newNumber < 1000 ? `0${newNumber}` : newNumber;

        const newEmployeeNumber = `EMP${paddedNumber}`;


        localStorage.setItem('NewemployeeNumber', newEmployeeNumber);

        console.log('New Employee Number:', newEmployeeNumber);



    };
    const revealMangername = (code: string) => {
        const employee = data.find((employee: any) => code === employee.employeeNumber);

        if (employee) {
            return `${employee.name} ${employee.surname}`;
        } else {
            return ""; // or return a default value if the employee is not found
        }
    };


    return (
        <div>
            <Navbar/>
            <section> <h1> List view of employees</h1></section>
            <section>
                <button className="updatebtn" onClick={() => handleCreate("")}>
                    <Link href="/employeepage">
                        Create Employee
                    </Link>
                </button>
            </section>
            <section className="table-header">
                <section> Employee ID</section>
                <section> Employee Name</section>
                <section> Employee Surname</section>
                <section> Age</section>
                <section>Role</section>
                <section> Salary</section>
                <section> Reporting Line Manger</section>
                <section>
                    Action
                </section>
            </section>
            {data &&
                data.map((employee: any) => (
                    <div key={employee.employeeNumber} className="table-rows">
                        <section>{employee.employeeNumber}</section>
                        <section>{employee.name}</section>
                        <section>{employee.surname}</section>
                        <section>{AgeCalculator (employee.birthDate)}</section>
                        <section>{employee.role}</section>
                        <section>{employee.salary}</section>
                        <section>{revealMangername(employee.reportingLineManager)}</section>
                        <section>

                                <button className="updatebtn" onClick={()=> handleUpdate(employee.employeeNumber)}>
                                    <Link href="/employeepage">
                                    Update
                                    </Link>
                                </button>




                            <button className="deletebtn" onClick={() => handleDelete(employee.employeeNumber)}>Delete</button>
                        </section>
                    </div>
                ))}
        </div>
    );
}

export default Page;