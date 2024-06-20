import { Paper } from '@components'
import { Button, Group, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { CountryCodes, GetCurrentUserDocument, useCreateOrganizationsMutation } from '@queries'
import logo from 'assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@context'

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
      country: '',
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    const country = CountryCodes[values.country as keyof typeof CountryCodes]

    if (!country) {
      //Test
      console.error('Invalid country code:', values.country) //Test
      return //Test
    } //Test

    await createOrganization({ variables: { organizations: [{ ...values, country }] } })
    navigate('/organization')
  }

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
            <TextInput
              size='md'
              radius='md'
              label='Country'
              placeholder='Enter Country'
              style={{ width: '500px' }}
              {...form.getInputProps('country')}
              required
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
