import { useContext, useEffect, useState } from 'react'
// ** React Imports
import { Link } from 'react-router-dom'
import { SidebarCtx } from '@context/user/sidebarContext'
import { useLocation } from 'react-router-dom'
// ** Third Party Components
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import {
  Edit2,
  MoreVertical,
  Archive,
  UserCheck,
  UserX,
  User,
} from 'react-feather'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'
import _ from 'lodash'

const statusObj = {
  active: {
    class: 'text-info',
    icon: UserCheck,
  },
  rejected: {
    class: 'text-danger',
    icon: UserX,
  },
  pending: {
    class: 'text-warning',
    icon: User,
  },
}
const renderStatus = (row) => {
  const Icon = statusObj[row.status] ? statusObj[row.status].icon : User
  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${
          statusObj[row.status] ? statusObj[row.status].class : ''
        } mr-50`}
      />
    </span>
  )
}
const BADGE_COLOR = {
  active: 'light-info',
  pending: 'light-warning',
  rejected: 'light-danger',
}

export const columnsUser = [
  {
    name: 'Name',
    width: '10%',
    selector: 'name',
    sortable: true,
    cell: (row) => <Link to={`/user/${row._id}`}>{row['name']}</Link>,
  },
  {
    name: 'Email',
    width: '18%',
    selector: 'email',
    sortable: true,
    cell: (row) => row.email,
  },
  {
    name: 'Phone',
    width: '17%',
    selector: 'phone',
    sortable: false,
    cell: (row) => row.phone,
  },
  {
    name: 'Role',
    width: '15%',
    selector: 'role',
    sortable: true,
    cell: (row) => row.role,
  },
  {
    name: 'Number of Bots',
    width: '15%',
    selector: 'bots',
    cell: (row) => {
      const { usersInfo } = useProfileInfoCtx()
      const [count, setCount] = useState(0)

      useEffect(() => {
        usersInfo
          .getBotNum(row._id)
          .then((res) => {
            setCount(res.count)
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      }, [row._id, usersInfo])

      return count
    },
  },
  {
    name: 'Status',
    width: '15%',
    sortable: true,
    selector: 'stat',
    cell: (row) => (
      <Badge
        className="text-capitalize "
        color={BADGE_COLOR[row.status] ? BADGE_COLOR[row.status] : ''}
        pill
      >
        {row.status}
      </Badge>
    ),
  },
  {
    name: 'Actions',
    width: '6%',
    cell: (row) => {
      const { setSidebarOpen, setToCreateMode } = useContext(SidebarCtx)
      const { usersInfo } = useProfileInfoCtx()
      return (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              className="w-100"
              onClick={() => {
                setSidebarOpen(true)
                setToCreateMode(false)
                usersInfo.setUser(row, row._id)
              }}
            >
              <Archive size={14} className="mr-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() => {
                usersInfo.deleteUser(row._id)
              }}
            >
              <Archive size={14} className="mr-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    },
  },
]

export const columnsAdmin = [
  {
    name: 'Name',
    width: '20%',
    selector: 'name',
    sortable: true,
    cell: (row) => row.name,
  },
  {
    name: 'Email',
    width: '20%',
    selector: 'email',
    sortable: true,
    cell: (row) => row.email,
  },
  {
    name: 'Status',
    width: '20%',
    sortable: true,
    selector: 'stat',
    cell: (row) => (
      <Badge
        className="text-capitalize "
        color={BADGE_COLOR[row.status] ? BADGE_COLOR[row.status] : ''}
        pill
      >
        {row.status}
      </Badge>
    ),
  },
  {
    name: 'phone',
    width: '20%',
    sortable: true,
    selector: 'phone',
    cell: (row) => row.phone,
  },
  {
    name: 'Actions',
    width: '20%',
    cell: (row) => {
      const { setSidebarOpen, setToCreateMode } = useContext(SidebarCtx)
      return (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            {/* <DropdownItem
              tag={Link}
              to={`/admin/${row._id}`}
              className="w-100"
            >
              <FileText size={14} className="mr-50" />
              <span className="align-middle">Details</span>
            </DropdownItem> */}
            <DropdownItem
              className="w-100"
              onClick={() => {
                setSidebarOpen(true)
                setToCreateMode(false)
              }}
            >
              <Archive size={14} className="mr-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            {/* <DropdownItem
              className="w-100"
              onClick={() => {
                store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className="mr-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    },
  },
]
