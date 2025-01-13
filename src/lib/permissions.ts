import { User, Role } from '@context'

export const hasRole = (user: User, role: Role) => {
  return user.roles.includes(role)
}

// export const hasPermission = (user: User, permission: Permission) => {
//   return (ROLES[user.roles] as readonly Permissions[]).includes(permission)
// }
