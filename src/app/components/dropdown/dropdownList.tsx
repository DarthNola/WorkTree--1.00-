import React, { useEffect, useState } from 'react';
import { fetchData } from "@/app/APIs/api";

// Fetch data from the API and create an array of objects
interface Employee {
    name: string;
    surname: string;
    employeeNumber: number;
    // Add other properties if needed
}

interface EmployeeDropdownProps {
    onSelectEmployee: (selectedEmployee: string) => void;

}

const EmployeeDropdown: React.FC<EmployeeDropdownProps> = ({ onSelectEmployee }) => {
    const [employeeArray, setEmployeeArray] = useState<Employee[]>([]);

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            const endpoint: string = 'employees'; // Update with your API endpoint
            const method: string = 'GET';

            try {
                const employeesData: Employee[] = await fetchData(endpoint, method);

                // Set the state with the fetched data
                setEmployeeArray(employeesData);
            } catch (error) {
                console.error('Error fetching employee data:', (error as Error).message);
            }
        };

        fetchDataAndSetState();
    }, []);

    return (
        <div>
            <h1 >Select an Employee:</h1>
            <select id="employeeDropdown" onChange={(e) => onSelectEmployee(e.target.value)}>
                <option value="">Select an manger</option>
                {employeeArray.map((employee) => (
                    <option key={employee.employeeNumber} value={employee.employeeNumber}>
                        {employee.name} {employee.surname}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default EmployeeDropdown;
