import { useEffect } from 'react'

const brokerWaitlist = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/embed/v2.js'
    document.body.appendChild(script)
    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: 'na1',
          portalId: '23509418',
          formId: 'e52940a8-5b0a-441b-9bb9-ba9926a47b53',
          target: '#hubspotForm',
        })
      }
    })
  }, [])

  return <div id="hubspotForm" className="px-2 py-4"></div>
}

export default brokerWaitlist
