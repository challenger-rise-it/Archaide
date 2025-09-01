import Proptypes from 'prop-types'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { User, Lock } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav className="nav-left" pills>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <User size={18} className="mr-1" />
          <span className="font-weight-bold">General</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Lock size={18} className="mr-1" />
          <span className="font-weight-bold">Change Password</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs

Tabs.propTypes = {
  activeTab: Proptypes.string.isRequired,
  toggleTab: Proptypes.func.isRequired,
}
