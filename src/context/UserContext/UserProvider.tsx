/*
import { ReactNode, useMemo } from 'react'
import { useGetCurrentUserQuery } from '@queries'
import { User, UserContext } from './UserContext.tsx'

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const currentUserId = localStorage.getItem('userId')

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
import { useGetCurrentUserQuery } from '@queries';
import { UserContext } from './UserContext';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const currentUserId = localStorage.getItem('userId');

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
      console.log("Loading user data...");
      return null;
    }

    if (error) {
      console.error("Error fetching user data:", error);
      return null;
    }

    if (!data || !data.users || data.users.length === 0) {
      console.warn("No user data found for ID:", currentUserId);
      return null;
    }

    const currentUser = data.users.find(user => user.id === currentUserId);

    if (!currentUser) {
      console.warn("User not found in the returned data:", currentUserId);
      return null;
    }

    console.log("Current user and user's organization: ", currentUser, currentUser.organization);

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