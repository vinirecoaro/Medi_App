"use client"
import React, { useEffect, useState } from 'react'; // HOOK = gancho
import Link from 'next/link';

export default function PatientList() {
    const [patients, setPatients] = useState(new Array());
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/patients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json())
        .then(data => setPatients(data))
    }, [patients]);

    const deletePatient = async (id: any) => {
        const add = await fetch(`http://127.0.0.1:3001/patients/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        });
        const content = await add.json();
        
        if (content.login) {
            window.location.reload();
        } else {
            setError(content.error);
        }
    }

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/home">Voltar</Link>
            <table>
                <thead>
                    <tr>
                        <td className='border border-slate-300'>Nome</td>
                        <td className='border border-slate-300 text-center'>Nascimento</td>
                        <td className='border border-slate-300 text-center'>Email</td>
                        <td className='border border-slate-300 text-center'>Telefone</td>
                    </tr>
                </thead>

                <tbody className="patients" id="patients">
                    {!!patients && patients.map((patient: any) => (
                        <tr>
                            <td className='border border-slate-300'>{patient.name}</td>
                            <td className='border border-slate-300 text-center'>{patient.birthDate}</td>
                            <td className='border border-slate-300 text-center'>{patient.email}</td>
                            <td className='border border-slate-300 text-center'>{patient.phone}</td>
                            <td className='border border-slate-300 text-center'>
                                <button onClick={(e) => deletePatient(patient._id)} className='bg-red-500 p-2 inline-block text-white text-sm'>Delete</button></td>
                            <td className='border border-slate-300 text-center'>
                            <Link href={`/patient/edit/${patient._id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white text-sm'>Edit</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400" style={{ color: 'red' }}>{error}</div>}
            </div>
        </>
    )
}