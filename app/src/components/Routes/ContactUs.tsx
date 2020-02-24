import React from 'react'

import site from '../../constants/site'
import Page from './shared/Page'

const ContactUs: React.FC = () => {
  return (
    <Page title={`Contact ${site.nameSuffix}`} seoTitle="Contact Us">
      Contact form, phone number, discussion list info, etc.
    </Page>
  )
}

export default ContactUs
