import React, { useMemo, useState } from 'react'
import { useGetUsersQuery, useResendInvitationMutation } from '@queries'
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table'
import { Button, Stack, Title, Text } from '@mantine/core'
import { theme } from '@components'

interface InviteesTableProps {
  organizationId: string
}

interface Invitee {
  id: string
  email: string
  timeJoined: string
  inviterName: string
  inviteStatus: string
}

interface InviteResult {
  email: string
  status: string
  message: string
}

export const InviteesTable: React.FC<InviteesTableProps> = ({ organizationId }) => {
  const [inviteResults, setInviteResults] = useState<InviteResult[]>([])
  const {
    loading: loadingInvitees,
    error: errorInvitees,
    data: inviteesData,
    refetch,
  } = useGetUsersQuery({
    variables: {
      filters: {
        organizationId: {
          equal: organizationId,
        },
      },
    },
  })

  const [resendInvitation, { loading: resendLoading }] = useResendInvitationMutation()

  const handleResendInvitation = async (userId: string, email: string) => {
    try {
      const { data } = await resendInvitation({ variables: { userId } })
      if (data?.resendInvitation) {
        setInviteResults([data.resendInvitation])
        refetch()
      }
    } catch (error) {
      setInviteResults([
        {
          email,
          status: 'error',
          message: error instanceof Error ? error.message : 'An error occurred while resending the invitation',
        },
      ])
    }
  }

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
          const value = cell.getValue<string>()
          return value && value.trim() !== '' ? value : 'N/A'
        },
        size: 150,
      },
      {
        accessorKey: 'inviteStatus',
        header: 'Invite Status',
        size: 150,
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }) => {
          const inviteStatus = row.original.inviteStatus?.toLowerCase() ?? ''
          const isRejected = inviteStatus === 'rejected'
          const isPending = inviteStatus === 'pending'

          return isPending || isRejected ? (
            <Button
              onClick={() => handleResendInvitation(row.original.id, row.original.email)}
              disabled={resendLoading || isRejected}
              size='xs'
              style={{
                backgroundColor: isRejected ? theme?.colors?.gray?.[9] : theme?.colors?.green?.[9],
              }}
            >
              Resend Invitation
            </Button>
          ) : null
        },
        size: 150,
      },
    ],
    [handleResendInvitation, resendLoading],
  )

  const rowData = useMemo(() => {
    if (!inviteesData) return []

    const filteredData = inviteesData.users
      .filter((user) => {
        const status = user.inviteStatus?.toLowerCase() ?? ''
        return user.invited && (status === 'pending' || status === 'rejected')
      })
      .map((user) => ({
        id: user.id,
        email: user.email,
        timeJoined: user.timeJoined,
        inviterName: user.inviterName || 'N/A',
        inviteStatus: user.inviteStatus,
      }))

    return filteredData as Invitee[]
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
          color: theme?.colors?.red?.[6],
          children: errorInvitees?.message,
        }
      : undefined,
    state: {
      isLoading: loadingInvitees,
      showAlertBanner: !!errorInvitees,
      showSkeletons: false,
    },
    mantineTableProps: {
      style: {
        '& thead': {
          backgroundColor: theme?.colors?.green?.[1],
        },
      },
    },
    mantineTableBodyCellProps: {
      style: {
        fontSize: theme?.fontSizes?.sm,
      },
    },
  })

  return (
    <div data-testid='InviteesTable'>
      <MantineReactTable table={table} />
      {inviteResults.length > 0 && (
        <Stack mt='md'>
          <Title order={3}>Invitation Results:</Title>
          {inviteResults.map((result, index) => (
            <Text key={index} c={result.status === 'resent' ? theme?.colors?.green?.[9] : theme?.colors?.red?.[9]}>
              {result.email}: {result.status === 'resent' ? 'Invitation resent successfully' : result.message}
            </Text>
          ))}
        </Stack>
      )}
    </div>
  )
}
