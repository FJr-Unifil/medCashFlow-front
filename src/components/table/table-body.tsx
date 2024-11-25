import { RotateCcw, Trash } from 'lucide-react'
import type { ClinicResponse } from '../../pages/allClinicsAdmin'
import { cnpjMask } from '../../utils/cnpjMask'
import { phoneMask } from '../../utils/phoneMask'
import { dateMask } from '../../utils/dateMask'
import { Badge } from '../badge'
import { useClinicQueries } from '../../hooks/useClinicQueries'

interface TableBodyProps {
  clinics: ClinicResponse[]
}

export function TableBody({ clinics }: TableBodyProps) {

  const { deleteClinicById, activateClinicById } = useClinicQueries()

  return (
    <tbody>
      {clinics.map(clinic => (
        <tr key={clinic.id} className="border-b border-gray-100">
          <td className="py-4">
            <div>
              <p className="text-base mb-1">{clinic.name}</p>
              <span className="text-[14px] italic">{clinic.id}</span>
            </div>
          </td>
          <td className="py-4">
            <p className="text-base">{cnpjMask(clinic.cnpj)}</p>
          </td>
          <td className="py-4">
            <p className="text-base">{phoneMask(clinic.phone)}</p>
          </td>
          <td className="py-4">
            <p className="text-base">{dateMask(clinic.createdAt)}</p>
          </td>
          <td className="py-4">
            <Badge state={clinic.isActive} />
          </td>
          <td>
            {clinic.isActive ? (
              <button type="button" onClick={() => deleteClinicById(clinic.id)}>
                <Trash className="text-red-700" />
              </button>
            ) : (
              <button type="button" onClick={() => activateClinicById(clinic.id)}>
                <RotateCcw className="text-blue-600" />
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  )
}
