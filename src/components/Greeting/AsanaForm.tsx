import { Modal } from '@mantine/core'

export const AsanaHelpModal = ({ opened = false, onClose = () => {}, formUrl = '' }) => {
  return (
    <Modal opened={opened} onClose={onClose} title='Need Help?' size='lg' centered>
      <div className='asana-embed-container'>
        <link rel='stylesheet' href='https://form.asana.com/static/asana-form-embed-style.css' />
        <iframe className='asana-embed-iframe' height='533' width='1200' src={formUrl}></iframe>
        <div className='asana-embed-footer'>
          <a
            rel='nofollow noopener'
            target='_blank'
            className='asana-embed-footer-link'
            href='https://asana.com/fr?utm_source=embedded_form'
          >
            <span className='asana-embed-footer-text'>Formulaire créé sur</span>
            <div className='asana-embed-footer-logo' role='img' aria-label='Logo d’Asana'></div>
          </a>
        </div>
      </div>
    </Modal>
  )
}
