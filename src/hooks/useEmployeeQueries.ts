import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllEmployees } from '../http/get-all-employees'
import { deleteEmployeeById } from '../http/delete-employee-by-id'
import { activateEmployeeById } from '../http/activate-employee-by-id'
import { createEmployee } from '../http/create-employee'
import { updateEmployeeById } from '../http/update-employee-by-id'

export function useEmployeeQueries() {
  const queryClient = useQueryClient()

  const employeesQuery = useQuery({
    queryKey: ['employees'],
    queryFn: getAllEmployees,
  })

  const createEmployeeMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    },
  })

  const updateEmployeeMutation = useMutation({
    mutationFn: updateEmployeeById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    },
  })

  const deleteEmployeeMutation = useMutation({
    mutationFn: deleteEmployeeById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    },
  })

  const activateEmployeeMutation = useMutation({
    mutationFn: activateEmployeeById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    },
  })

  return {
    employees: employeesQuery.data ?? [],
    createEmployee: createEmployeeMutation.mutate,
    updateEmployeeById: updateEmployeeMutation.mutate,
    deleteEmployeeById: deleteEmployeeMutation.mutate,
    activateEmployeeById: activateEmployeeMutation.mutate,
  }
}
