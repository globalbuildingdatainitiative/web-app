import { Paper } from '@components'
import { Button, Group, Stack, Text, TextInput, Title, Autocomplete, MultiSelect } from '@mantine/core'
import { useForm } from '@mantine/form'
import { GetCurrentUserDocument, useCreateOrganizationsMutation, CountryCodes, StakeholderEnum } from '@queries'
import logo from 'assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@context'
import { countryNameToAlpha3 } from './countryCodesMapping'
import { useApolloClient } from '@apollo/client'

const formatEnumValue = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export const CreateOrganizationPaper = () => {
  const client = useApolloClient()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [createOrganization, { loading, error }] = useCreateOrganizationsMutation({
    refetchQueries: [{ query: GetCurrentUserDocument, variables: { id: user?.id } }],
  })
  const form = useForm({
    initialValues: {
      name: '',
      address: '',
      city: '',
      country: '' as keyof typeof countryNameToAlpha3,
      metaData: {
        stakeholders: [] as StakeholderEnum[],
      },
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    const alpha3Code = countryNameToAlpha3[values.country]
    if (!alpha3Code) {
      console.error('Invalid country name:', values.country)
      return
    }

    const result = await createOrganization({
      variables: {
        organizations: [
          {
            ...values,
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
    }

    navigate('/organization')
  }

  const countryNames = Object.keys(countryNameToAlpha3)
  const stakeholderOptions = Object.values(StakeholderEnum).map((value) => ({
    value,
    label: formatEnumValue(value),
  }))
  return (
    <Paper data-testid='CreateOrganizationPaper'>
      <Group>
        <img src={logo} alt='Company Logo' style={{ maxWidth: '400px' }} />
        <form onSubmit={form.onSubmit(handleSubmit)} style={{ flex: 1 }}>
          <Stack align='center' gap='xl'>
            <Title order={2}>Create An Organization</Title>
            <TextInput
              size='md'
              radius='md'
              label='Organization Name'
              placeholder='Enter Name'
              style={{ width: '500px' }}
              {...form.getInputProps('name')}
              required
            />
            <TextInput
              size='md'
              radius='md'
              label='Organization Address'
              placeholder='Enter Address'
              style={{ width: '500px' }}
              {...form.getInputProps('address')}
              required
            />
            <TextInput
              size='md'
              radius='md'
              label='City'
              placeholder='Enter City'
              style={{ width: '500px' }}
              {...form.getInputProps('city')}
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
              required
              aria-label='Stakeholders'
            />
            {error && <Text c='red'>{error.message}</Text>}
            <Button
              color='green'
              radius='lg'
              px={16}
              size='md'
              style={{ width: '500px' }}
              type='submit'
              loading={loading}
            >
              Create Organization
            </Button>
          </Stack>
        </form>
      </Group>
    </Paper>
  )
}
