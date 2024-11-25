import { useEffect, useState } from 'react';
import { getAllClinics } from '../http/get-all-clinics'

interface ClinicResponse {
  id: string,
  name: string,
  cnpj: string,
  phone: string,
  createdAt: string,
  isActive: boolean
}

export function AllClinicsAdmin() {
  const [clinics, setClinics] = useState<ClinicResponse[]>([]);

  useEffect(() => {
    const getClinics = async () => {
      try {
        const response = await getAllClinics();
        setClinics(response);
        console.log(response)
      } catch (err) {
        console.log(err);
      }
    };

    getClinics();
  }, []);

  return (
    <>
      <h1>Clínicas</h1>
      <span>{clinics.length}</span>
    </>
  )
}
