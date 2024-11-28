import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllInvolved } from '../http/involved/get-all-involved'
import { deleteInvolvedById } from '../http/involved/delete-involved-by-id'
import { activateInvolvedById } from '../http/involved/activate-involved-by-id'
import { createInvolved } from '../http/involved/create-involved'
import { updateInvolvedById } from '../http/involved/update-involved-by-id'

export function useInvolvedQueries() {
  const queryClient = useQueryClient()

  const involvedsQuery = useQuery({
    queryKey: ['involveds'],
    queryFn: getAllInvolved,
  })

  const createInvolvedMutation = useMutation({
    mutationFn: createInvolved,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['involveds'] })
    },
  })

  const updateInvolvedMutation = useMutation({
    mutationFn: updateInvolvedById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['involveds'] })
    },
  })

  const deleteInvolvedMutation = useMutation({
    mutationFn: deleteInvolvedById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['involveds'] })
    },
  })

  const activateInvolvedMutation = useMutation({
    mutationFn: activateInvolvedById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['involveds'] })
    },
  })

  return {
    involveds: involvedsQuery.data ?? [],
    createInvolved: createInvolvedMutation.mutate,
    updateInvolvedById: updateInvolvedMutation.mutate,
    deleteInvolvedById: deleteInvolvedMutation.mutate,
    activateInvolvedById: activateInvolvedMutation.mutate,
  }
}
