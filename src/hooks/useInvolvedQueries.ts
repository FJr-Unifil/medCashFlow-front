import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllInvolved } from '../http/get-all-involved'
import { deleteInvolvedById } from '../http/delete-involved-by-id'
import { activateInvolvedById } from '../http/activate-involved-by-id'
import { createInvolved } from '../http/create-involved'
import { updateInvolvedById } from '../http/update-involved-by-id'

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
