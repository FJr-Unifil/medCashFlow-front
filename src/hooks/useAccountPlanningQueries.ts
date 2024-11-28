import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllAccountPlannings } from '../http/account-plannings/get-all-account-plannings'
import { createAccountPlanning } from '../http/account-plannings/create-account-planning'
import { updateAccountPlanningById } from '../http/account-plannings/update-account-planning-by-id'
import { deleteAccountPlanningById } from '../http/account-plannings/delete-account-planning-by-id'

export function useAccountPlanningQueries() {
  const queryClient = useQueryClient()

  const accountPlanningQuery = useQuery({
    queryKey: ['account-plannings'],
    queryFn: getAllAccountPlannings,
  })

  const createAccountPlanningMutation = useMutation({
    mutationFn: createAccountPlanning,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-plannings'] })
    },
  })

  const updateAccountPlanningMutation = useMutation({
    mutationFn: updateAccountPlanningById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-plannings'] })
    },
  })

  const deleteAccountPlanningMutation = useMutation({
    mutationFn: deleteAccountPlanningById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-plannings'] })
    },
  })
  return {
    accountPlannings: accountPlanningQuery.data ?? [],
    createAccountPlanning: createAccountPlanningMutation.mutate,
    updateAccountPlanningById: updateAccountPlanningMutation.mutate,
    deleteAccountPlanningById: deleteAccountPlanningMutation.mutate,
  }
}
