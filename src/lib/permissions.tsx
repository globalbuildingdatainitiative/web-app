import { User, useUserContext } from '@context'
import { Permission, Role, RolePermission, useGetRolesAndPermissionsQuery } from '@queries'
import { useMemo } from 'react'

export const hasRole = (user: User, role: Role) => {
  return user.roles?.includes(role) || false
}

interface UseHasPermissionProps {
  permission: Permission
}

export const useHasPermission = ({ permission }: UseHasPermissionProps) => {
  const { data, loading, error } = useGetRolesAndPermissionsQuery()
  const { user } = useUserContext()

  const _hasPermission = useMemo(
    () => (data?.roles && user ? hasPermission(data.roles, user, permission) : false),
    [data, user, permission],
  )

  return { hasPermission: _hasPermission, loading, error, user }
}

const hasPermission = (rolesAndPermissions: RolePermission[], user: User, permission: Permission) => {
  const userPermissions = new Set()
  rolesAndPermissions.forEach((role) => {
    if (user.roles?.includes(role.name)) {
      role.permissions.forEach((permission) => userPermissions.add(permission))
    }
  })

  return userPermissions.has(permission)
}
