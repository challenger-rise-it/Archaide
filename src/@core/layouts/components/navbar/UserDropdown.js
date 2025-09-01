// ** React Imports
import { useAuthCtx } from '@context/authContext'
import { Link } from 'react-router-dom'
import _ from 'lodash'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap'
import { Power, Settings } from 'react-feather'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/avatars/default.jpg'

const UserDropdown = () => {
  const { userData, handleLogout } = useAuthCtx()

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name font-weight-bold">
            {_.get(userData, 'name', '')}
          </span>
          <span className="user-status">{_.get(userData, 'email', '')}</span>
        </div>
        <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to="/account-settings">
          <Settings size={14} className="mr-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
        {/* <DropdownItem tag={Link} to="#" onClick={(e) => e.preventDefault()}>
          <Mail size={14} className="mr-75" />
          <span className="align-middle">Inbox</span>
        </DropdownItem> */}
        {/* <DropdownItem tag={Link} to="#" onClick={(e) => e.preventDefault()}>
          <CheckSquare size={14} className="mr-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem> */}
        {/* <DropdownItem tag={Link} to="#" onClick={(e) => e.preventDefault()}>
          <MessageSquare size={14} className="mr-75" />
          <span className="align-middle">Chats</span>
        </DropdownItem> */}
        <DropdownItem tag={Link} to="/login" onClick={() => handleLogout()}>
          <Power size={14} className="mr-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
