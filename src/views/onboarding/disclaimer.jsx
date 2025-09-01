import { Button } from 'reactstrap'

const OnboardingDisclaimer = ({ onAgree, onDisagree }) => {
  return (
    <div>
      <h2 className="mt-3 mb-2">Declaimer</h2>
      <p>
        Archaide offers the powerful ability to fully automate the execution of
        trades through webhooks connecting your broker and exchange accounts.
        It's important to keep in mind that doing so may come with certain
        risks. While experienced traders are likely to possess the requisite
        knowledge and expertise to use Archaide safely, it's important to note
        that not all users may be able to do so effectively. Regardless of your
        level of expertise, it's essential to exercise caution when automating
        trades through Archaide and be aware of any potential risks that may
        arise.
        <br />
        BY USING ARCHAIDE, YOU HEREBY ACKNOWLEDGE AND CONFIRM THAT YOU ARE AWARE
        OF THE INHERENT RISKS INVOLVED IN USING ARCHAIDE AND WILLINGLY ACCEPT
        THESE RISKS.
        <br />
        By using Archaide, you agree to absolve the company, its parent company,
        affiliated businesses, and employees from any and all claims, demands,
        suits, causes of action, liabilities, costs, losses, expenses, and
        damages that may arise from or be related to your use of Archaide,
        including but not limited to any issues arising from errors,
        malfunctions, or downtime in the Archaide system or those of its
        vendors. It is your responsibility to monitor your positions and ensure
        that your signals are being executed effectively at all times. Your use
        of Archaide confirms your acceptance of this waiver and confirms that
        you have read, comprehended, and agree to the Archaide's Terms of
        Service and Privacy Policy, which includes additional disclaimers and
        restrictions.
      </p>
      <div className="d-flex align-items-center justify-content-center mt-2">
        <Button.Ripple
          color="secondary"
          type="button"
          style={{ width: '236px' }}
          onClick={onDisagree}
        >
          <span className="font-weight-bold" style={{ fontSize: '2rem' }}>
            I Do Not Agree
          </span>
        </Button.Ripple>
        <Button.Ripple
          color="primary"
          type="button"
          style={{ width: '236px' }}
          className="ml-4"
          onClick={onAgree}
        >
          <span className="font-weight-bold" style={{ fontSize: '2rem' }}>
            I Agree
          </span>
        </Button.Ripple>
      </div>
    </div>
  )
}

export default OnboardingDisclaimer
