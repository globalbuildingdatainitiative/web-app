import { useRef, useState } from 'react'
import { CloseButton, Combobox, Loader, TextInput, useCombobox } from '@mantine/core'

interface Option {
  label: string
  value: string
}

interface AsyncAutocompleteProps {
  placeholder?: string
  dropdownHeight?: number
  label: string
  dataQuery: (data: object) => Promise<{ data: object; error: { message: string }; loading: boolean }>
  processData: (data: object) => Option[]
  onSelect: (value: string) => void
}

export const AsyncAutocomplete = (props: AsyncAutocompleteProps) => {
  const { placeholder = '', label, dataQuery, processData, onSelect, dropdownHeight = 200 } = props

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Option[] | null>(null)
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [empty, setEmpty] = useState(false)
  const abortController = useRef<AbortController>()

  const fetchOptions = async (query: string) => {
    abortController.current?.abort()
    abortController.current = new AbortController()
    setLoading(true)
    setErrorMessage(null)

    const { data, error } = await dataQuery({ variables: { filterBy: { contains: { 'project.name': query } } } })
    if (error) {
      console.error(error)
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    const result = processData(data)
    setData(result)
    setLoading(false)
    setEmpty(result.length === 0)
  }

  const options = (data || []).map(({ value, label }) => (
    <Combobox.Option value={value} key={value}>
      {label}
    </Combobox.Option>
  ))

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        onSelect(optionValue)
        combobox.closeDropdown()
      }}
      withinPortal={true}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label={label}
          placeholder={placeholder}
          value={value}
          error={errorMessage}
          onChange={async (event) => {
            setValue(event.currentTarget.value)
            await fetchOptions(event.currentTarget.value)
            combobox.resetSelectedOption()
            combobox.openDropdown()
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={async () => {
            combobox.openDropdown()
            if (data === null) {
              await fetchOptions(value)
            }
          }}
          onBlur={() => combobox.closeDropdown()}
          rightSection={
            <RightSection loading={loading} value={value} setValue={setValue} setErrorMessage={setErrorMessage} />
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={data === null}>
        <Combobox.Options mah={dropdownHeight} style={{ overflowY: 'auto' }}>
          {options}
          {empty && <Combobox.Empty>No results found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

interface RightSectionProps {
  loading: boolean
  value: string
  setValue: (value: string) => void
  setErrorMessage: (value: string | null) => void
}

const RightSection = ({ loading, value, setValue, setErrorMessage }: RightSectionProps) => {
  if (loading) {
    return <Loader size={18} />
  }
  if (value !== '') {
    return (
      <CloseButton
        size='sm'
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          setValue('')
          setErrorMessage(null)
        }}
        aria-label='Clear value'
      />
    )
  }
  return null
}
