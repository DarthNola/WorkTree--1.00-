import {webpack} from "next/dist/compiled/webpack/webpack";


const BASE_URL = 'https://worktreeapi.onrender.com'; // Change this to your API URL

export async function fetchData(endpoint: string, method: string = 'GET', body?: any) {
    const url = `${BASE_URL}/${endpoint}`;

    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {

        console.error('Error in fetchData:', (error as Error).message);
        throw error;
    }
}

export async function deleteEmployee(employeeId: string) {
    const endpoint = `employees/${employeeId}`; // Adjust the endpoint based on your API
    const method = 'DELETE';

    try {

        const result = await fetchData(endpoint, method);
        return result;
    } catch (error) {

        console.error('Error deleting employee:', (error as Error).message);
        throw error;
    }
}

// fix the function below
export async function updateEmployee(employeeId: string, updateData: any) {
    const endpoint = `employees/${employeeId}`;
    const method = 'PATCH';

    try {
        const result = await fetchData(endpoint, method, updateData);
        return result;
    } catch (error) {

        console.error('Error updating employee:', (error as Error).message);
        throw error;
    }
}


// APIs/api.js

export async function createEmployee(newEmployeeData: any) {
    const endpoint = 'employees';
    const method = 'POST';

    try {


        const result = await fetchData(endpoint, method, newEmployeeData);
        return result;
    } catch (error) {
        console.error('Error creating employee:', (error as Error).message);

        throw error;
    }
}

export async function validateLinemanger(employeeNumber:string ,reportingLineManager:string, role:string ) {
    // Client-side validation to ensure the manager is not the same as the employee
    if (employeeNumber == reportingLineManager) {
        throw new Error('Manager cannot be the same as the employee.');
    }

    // Client-side validation to ensure managers or CEO do not have line managers
    if (!role.toLowerCase().includes('manager') && reportingLineManager === "") {
        throw new Error('Only Managers or CEO cannot have line managers.');
    }

    if (!role.toLowerCase().includes('ceo') && reportingLineManager === "") {
        throw new Error('Only Managers or CEO cannot have line managers.');
    }

    return true
}


