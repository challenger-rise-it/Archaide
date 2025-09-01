import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import {} from 'reactstrap'
import notAuthImg from '@src/assets/images/pages/not-authorized.svg'

import logo from '@src/assets/images/logo/archaide_logo.jpeg'
import '@styles/base/pages/page-misc.scss'

const NotAuthorized = () => {
  return (
    <div className="misc-wrapper">
      <Link className="brand-logo" to="/">
        <img width="200" src={logo} />
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">You are not authorized! 🔐</h2>
          <Button.Ripple
            tag={Link}
            to="/login"
            color="primary"
            className="btn-sm-block mb-1"
          >
            Back to login
          </Button.Ripple>
          <img
            className="img-fluid"
            src={notAuthImg}
            alt="Not authorized page"
          />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
