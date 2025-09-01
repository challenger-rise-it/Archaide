import Proptypes from 'prop-types'
import { Nav, NavItem, NavLink } from 'reactstrap'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav className="nav-left" pills>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <span className="font-weight-bold">Bots</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <span className="font-weight-bold">Brokers</span>
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
