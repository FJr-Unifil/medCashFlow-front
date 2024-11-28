import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllClinics } from '../http/clinic/get-all-clinics'
import { deleteClinicById } from '../http/clinic/delete-clinic-by-id'
import { activateClinicById } from '../http/clinic/activate-clinic-by-id'

export function useClinicQueries() {
  const queryClient = useQueryClient()

  const clinicsQuery = useQuery({
    queryKey: ['clinics'],
    queryFn: getAllClinics
  })

  const deleteClinicMutation = useMutation({
    mutationFn: deleteClinicById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] })
    }
  })

  const activateClinicMutation = useMutation({
    mutationFn: activateClinicById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinics'] })
    }
  })

  return {
    clinics: clinicsQuery.data ?? [],
    deleteClinicById: deleteClinicMutation.mutate,
    activateClinicById: activateClinicMutation.mutate
  }
}