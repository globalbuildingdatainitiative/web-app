/*
import { ReactNode, useMemo } from 'react'
import { useGetCurrentUserQuery, useGetUsersQuery } from '@queries'
import { User, UserContext } from './UserContext.tsx'

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const currentUserId = localStorage.getItem('userId')
  //const allUsers = useGetUsersQuery()
  const { data, loading, error } = useGetCurrentUserQuery({
    variables: { id: currentUserId! },
    skip: !currentUserId,
  })

  const user = useMemo(() => {
    if (loading) return null
    if (error) return null
    if (!data || !data.users) return null
    return data.users[0] as User
  }, [loading, error, data])

  //console.log ("Current user from local storage = ", currentUserId)
  //console.log("All users: ", allUsers.data)
  return (
    <UserContext.Provider
      value={{
        user: user,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
*/


import { ReactNode, useMemo, useCallback } from 'react';
import { useGetCurrentUserQuery, useGetUsersQuery } from '@queries';
import { UserContext } from './UserContext';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const currentUserId = localStorage.getItem('userId');
  const allUsers = useGetUsersQuery()

  const { data, loading, error, refetch } = useGetCurrentUserQuery({
    variables: { id: currentUserId! },
    skip: !currentUserId,
    fetchPolicy: 'network-only',
  });



  const refetchUser = useCallback(async () => {
    if (currentUserId) {
      await refetch({ id: currentUserId });
    }
  }, [currentUserId, refetch]);

  const user = useMemo(() => {
    if (loading) {
      console.log("In loading statement ")
      return null;
    }

    if (error) {
      return null;
    }

    if (!data || !data.users || data.users.length === 0) {
      console.log("In if statement ")
      return null;
    }

    const currentUser = data.users.find(user => user.id === currentUserId);
    // Current organization is assigned Null when code reaches this point
    console.log ("Current user from local storage: ", currentUserId, "Current user from query: ", currentUser)
    console.log ("All users from backend: ", allUsers.data)
    if (!currentUser) {
      console.log("In not current user statement ")
      return null;
    }

    console.log("Current user: ", currentUser, "CurrentUserId: ", currentUserId,  "OrganizationId: " , currentUser.organization?.id);

    if (!currentUser.organization) {
      console.warn("User has no associated organization");
    }

    return currentUser;
  }, [loading, error, data, currentUserId]);

  return (
    <UserContext.Provider value={{ user, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
