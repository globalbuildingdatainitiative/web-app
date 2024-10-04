import { Paper } from '@components'
import { Button, Group, Stack, Text, TextInput, Title, Autocomplete, MultiSelect } from '@mantine/core'
import { useForm } from '@mantine/form'
import { GetCurrentUserDocument, useCreateOrganizationsMutation, CountryCodes } from '@queries'
import logo from 'assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@context'
import { countryNameToAlpha3 } from './countryCodesMapping'
import { stakeholderList } from './StakeholderList'

export const CreateOrganizationPaper = () => {
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
      stakeholders: [] as string[],
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    const alpha3Code = countryNameToAlpha3[values.country]
    if (!alpha3Code) {
      console.error('Invalid country name:', values.country)
      return
    }
    //console.log('Selected Stakeholders:', values.stakeholders)

    await createOrganization({ variables: { organizations: [{ ...values, country: alpha3Code as CountryCodes }] } })
    navigate('/organization')
  }

  const countryNames = Object.keys(countryNameToAlpha3)

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
              aria-label='Country' // Add this line for better accessibility in tests
            />
            <MultiSelect
              size='md'
              radius='md'
              label='Stakeholders'
              placeholder='Select Stakeholders'
              style={{ width: '500px' }}
              data={stakeholderList}
              {...form.getInputProps('stakeholders')}
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
