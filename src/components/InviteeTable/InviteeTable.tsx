import React, { useMemo, useEffect } from 'react'
import { useGetUsersQuery } from '@queries'
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table'

interface InviteesTableProps {
  organizationId: string
}

interface Invitee {
  email: string
  timeJoined: string
  inviterName: string
  inviteStatus: string
}

export const InviteesTable: React.FC<InviteesTableProps> = ({ organizationId }) => {
  const {
    loading: loadingInvitees,
    error: errorInvitees,
    data: inviteesData,
  } = useGetUsersQuery({
    variables: {
      filters: {
        organizationId: {
          equal: organizationId,
        },
      },
    },
  })

  useEffect(() => {
    if (inviteesData) {
      console.log("All users data:", inviteesData.users);
    }
  }, [inviteesData]);

  const columns = useMemo<MRT_ColumnDef<Invitee>[]>(
    () => [
      {
        accessorKey: 'email',
        header: 'Email Address',
        size: 200,
      },
      {
        accessorKey: 'timeJoined',
        header: 'Invitation Date',
        Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
        size: 150,
      },
      {
        accessorKey: 'inviterName',
        header: "Inviter's Name",
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return value && value.trim() !== "" ? value : 'N/A';
        },
        size: 150,
      },
      {
        accessorKey: 'inviteStatus',
        header: 'Invite Status',
        size: 150,
      },
    ],
    []
  )

  const rowData = useMemo(() => {
    if (!inviteesData) return []

    console.log("Starting to filter users...");
    const filteredData = inviteesData.users
      .filter(user => {
        console.log(`User ${user.email}: invited=${user.invited}, inviteStatus=${user.inviteStatus}`);
        const status = user.inviteStatus?.toLowerCase();
        return user.invited && (status === 'pending' || status === 'rejected');
      })
      .map(user => ({
        email: user.email,
        timeJoined: user.timeJoined,
        inviterName: user.inviterName || 'N/A',
        inviteStatus: user.inviteStatus,
      }));

    console.log("Filtered row data:", filteredData);
    return filteredData as Invitee[];
  }, [inviteesData])

  const table = useMantineReactTable({
    columns,
    data: rowData,
    rowCount: rowData.length,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineToolbarAlertBannerProps: errorInvitees
      ? {
          color: 'red',
          children: errorInvitees?.message,
        }
      : undefined,
    state: {
      isLoading: loadingInvitees,
      showAlertBanner: !!errorInvitees,
      showSkeletons: false,
    },
  })

  return (
    <div data-testid='InviteesTable'>
      <MantineReactTable table={table} />
    </div>
  )
}