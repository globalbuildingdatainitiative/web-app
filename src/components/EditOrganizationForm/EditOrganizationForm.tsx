import { Paper } from '@components'
import { Autocomplete, Button, Group, MultiSelect, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  CountryCodes,
  GetCurrentUserDocument,
  GetOrganizationsDocument,
  Permission,
  StakeholderEnum,
  useUpdateOrganizationsMutation,
} from '@queries'
import { useUserContext } from '@context'
import { useNavigate } from 'react-router-dom'
import { countryNameToAlpha3 } from './countryCodesMapping'
import { useApolloClient } from '@apollo/client'
import logo from 'assets/logo.png'
import { useHasPermission } from '@lib'

const formatEnumValue = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export const EditOrganizationForm = () => {
  const client = useApolloClient()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [updateOrganizations, { loading, error }] = useUpdateOrganizationsMutation({
    refetchQueries: [
      { query: GetOrganizationsDocument },
      { query: GetCurrentUserDocument, variables: { id: user?.id } },
    ],
  })
  const { hasPermission } = useHasPermission({ permission: Permission.ORGANIZATIONS_UPDATE })

  const countryNames = Object.keys(countryNameToAlpha3)
  const stakeholderOptions = Object.values(StakeholderEnum).map((value) => ({
    value,
    label: formatEnumValue(value),
  }))

  const form = useForm({
    initialValues: {
      name: user?.organization?.name || '',
      address: user?.organization?.address || '',
      city: user?.organization?.city || '',
      country: user?.organization?.country || '',
      metaData: {
        stakeholders: user?.organization?.metaData?.stakeholders || [],
      },
    },

    validate: {
      name: (value) => (value ? null : 'Organization name is required'),
      address: (value) => (value ? null : 'Address is required'),
      city: (value) => (value ? null : 'City is required'),
      country: (value) => (value ? null : 'Country is required'),
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    if (!hasPermission) {
      return
    }

    if (!user?.organization?.id) {
      console.error('No organization ID found')
      return
    }

    const alpha3Code = countryNameToAlpha3[values.country]
    if (!alpha3Code) {
      console.error('Invalid country name:', values.country)
      return
    }

    try {
      const result = await updateOrganizations({
        variables: {
          organizations: [
            {
              id: user.organization.id,
              name: values.name,
              address: values.address,
              city: values.city,
              country: alpha3Code as CountryCodes,
              metaData: {
                stakeholders: values.metaData.stakeholders,
              },
            },
          ],
        },
      })

      if (result.data) {
        await Promise.all([
          client.refetchQueries({
            include: ['getOrganizations', 'getCurrentUser'],
          }),
        ])
        navigate('/organization')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Paper data-testid='EditOrganizationForm'>
      <Group>
        <img src={logo} alt='Company Logo' style={{ maxWidth: '500px' }} />
        <form onSubmit={form.onSubmit(handleSubmit)} style={{ flex: 1 }}>
          <Stack align='center' gap='xl'>
            <Title order={2}>{hasPermission ? 'Edit Organization' : 'Organization Details'}</Title>
            {!hasPermission && (
              <Text c='dimmed' mb='md'>
                You are viewing this information in read-only mode as a member.
              </Text>
            )}
            <TextInput
              size='md'
              radius='md'
              label='Organization Name'
              placeholder='Enter Name'
              style={{ width: '500px' }}
              {...form.getInputProps('name')}
              disabled={!hasPermission}
              required
            />
            <TextInput
              size='md'
              radius='md'
              label='Organization Address'
              placeholder='Enter Address'
              style={{ width: '500px' }}
              {...form.getInputProps('address')}
              disabled={!hasPermission}
              required
            />
            <TextInput
              size='md'
              radius='md'
              label='City'
              placeholder='Enter City'
              style={{ width: '500px' }}
              {...form.getInputProps('city')}
              disabled={!hasPermission}
              required
            />
            <Autocomplete
              size='md'
              radius='md'
              label='Country'
              placeholder='Select Country'
              style={{ width: '500px' }}
              data={countryNames}
              {...form.getInputProps('country')}
              disabled={!hasPermission}
              required
              aria-label='Country'
            />
            <MultiSelect
              size='md'
              radius='md'
              label='Stakeholders'
              placeholder='Select Stakeholders'
              style={{ width: '500px' }}
              data={stakeholderOptions}
              {...form.getInputProps('metaData.stakeholders')}
              searchable
              nothingFoundMessage='No stakeholders found'
              clearable
              disabled={!hasPermission}
              required
              aria-label='Stakeholders'
            />
            {error && <Text c='red'>{error.message}</Text>}
            <Group>
              <Button variant='default' radius='lg' px={16} size='md' onClick={() => navigate('/organization')}>
                Go Back
              </Button>
              {hasPermission ? (
                <Button
                  color='green'
                  radius='lg'
                  px={16}
                  size='md'
                  type='submit'
                  loading={loading}
                  disabled={!hasPermission}
                >
                  Save Changes
                </Button>
              ) : null}
            </Group>
          </Stack>
        </form>
      </Group>
    </Paper>
  )
}
