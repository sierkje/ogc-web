import React from 'react'

import site from '../../constants/site'
import Page from './shared/Page'

const AboutUs: React.FC = () => {
  return (
    <Page title={`About ${site.name}`} seoTitle="About">
      Could not find what you are browsing for.
    </Page>
  )
}

export default AboutUs
