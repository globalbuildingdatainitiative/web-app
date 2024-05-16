import { Paper } from '@components'
import { Button, Group, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { CountryCodes, useCreateOrganizationsMutation } from '@queries'
import logo from 'assets/logo.png'

export const CreateOrganizationPaper = () => {
  const [createOrganization, { loading, error }] = useCreateOrganizationsMutation()
  const form = useForm({
    initialValues: {
      name: '',
      address: '',
      city: '',
      country: '',
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    await createOrganization({ variables: { organizations: [{ ...values, country: values.country as CountryCodes }] } })
    // Handle post-creation logic like navigation or showing a success message
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
            {error && <Text color='red'>{error.message}</Text>}
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
