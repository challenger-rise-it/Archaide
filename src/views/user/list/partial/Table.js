import { useState, useEffect, useContext } from 'react'

import Proptypes from 'prop-types'

import { columnsUser, columnsAdmin } from './columns'

import { useAuthCtx } from '@context/authContext'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Cpu } from 'react-feather'
import DataTable from 'react-data-table-component'

import {
  Card,
  Input,
  Row,
  Col,
  Label,
  CustomInput,
  Button,
  Spinner,
  CardHeader,
} from 'reactstrap'
import { store } from '@store/storeConfig/store'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import Sidebar from '../../partials/Sidebar'

import { useSearchParams } from '@src/navigation'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import { SidebarCtx } from '@context/user/sidebarContext'
import { useLocation } from 'react-router-dom'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'

import DebouceInput from 'react-debounce-input'

const STATUS_OPTIONS = [
  { value: null, label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const CustomHeader = ({ sidebarOpen, setSidebarOpen, setToCreateMode }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isAdminPath, setIsAdminPath] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname == '/user/list') setIsAdminPath(false)
    else if (pathname == '/admin/list') setIsAdminPath(true)
  }, [])

  const onPageSizeChange = (e) => {
    setSearchParams(
      {
        limit: e.target.value,
        page: 1,
      },
      true,
    )
  }

  return (
    <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-1 ">
      <Row>
        <Col
          sm="4"
          className="d-flex align-items-center p-0 justify-content-between  mb-1"
        >
          <Col sm="8" className="d-flex align-items-center w-100">
            <Label for="rows-per-page">Show</Label>
            <CustomInput
              className="form-control mx-50"
              type="select"
              id="rows-per-page"
              style={{
                width: '5rem',
                padding: '0 0.8rem',
                backgroundPosition:
                  'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0',
              }}
              onChange={onPageSizeChange}
              value={searchParams.get('limit')}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </CustomInput>
            <Label for="rows-per-page">Entries</Label>
          </Col>
        </Col>
        <Col
          sm="8"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mb-1"
        >
          <Col sm="8" lg="6">
            <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
              <Label className="mb-0" for="search-invoice">
                Search:
              </Label>
              <DebouceInput
                minLength={2}
                debounceTimeout={500}
                id="search-invoice"
                className="ml-50 w-100 debounce-input"
                type="text"
                value={searchParams.get('search') || ''}
                onChange={(e) => {
                  setSearchParams({ search: e.target.value, page: 1 })
                }}
              />
            </div>
          </Col>
          {!isAdminPath && (
            <Col sm="4" lg="4">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={STATUS_OPTIONS}
                value={STATUS_OPTIONS.find(
                  (it) => it.value === searchParams.get('status'),
                )}
                onChange={(opt) => {
                  setSearchParams({
                    status: opt.value,
                    page: 1,
                  })
                }}
                placeholder="Select Status"
              />
            </Col>
          )}
          <Col sm="2" lg="2">
            <Button
              color="primary"
              onClick={() => {
                setSidebarOpen(true)
                setToCreateMode(true)
              }}
            >
              Create User
            </Button>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

CustomHeader.propTypes = {
  sidebarOpen: Proptypes.bool.isRequired,
  setSidebarOpen: Proptypes.func.isRequired,
  setToCreateMode: Proptypes.func.isRequired,
}

const UsersTable = ({ users, role }) => {
  const { sidebarOpen, setSidebarOpen, setToCreateMode, isCreate } =
    useContext(SidebarCtx)
  const [searchParams, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()
  const [columns, setColumns] = useState(columnsAdmin)
  const { usersInfo } = useProfileInfoCtx()
  const { userData } = useAuthCtx()

  useEffect(() => {
    if (pathname == '/user/list') setColumns(columnsUser)
    else if (pathname == '/admin/list') setColumns(columnsAdmin)
  }, [pathname])

  const CustomPagination = () => {
    const count = Number(
      Math.ceil(users.total / parseInt(searchParams.get('limit'))),
    )
    return (
      <ReactPaginate
        forcePage={parseInt(searchParams.get('page')) - 1}
        onPageChange={(page) => {
          setSearchParams({ page: page.selected + 1 })
        }}
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName="active"
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={
          'pagination react-paginate justify-content-end my-2 pr-1'
        }
      />
    )
  }
  const handleSort = async (column, sortDirection) => {
    setSearchParams(
      {
        page: searchParams.get('page'),
        limit: searchParams.get('limit'),
        search: searchParams.get('search'),
        [column.selector]: sortDirection,
        page: 1,
      },
      true,
    )
  }
  return (
    <div className="users-list-page">
      <Card>
        <CardHeader
          style={{
            borderBottom: '1px solid #b4b7bd40',
            textTransform: 'capitalize',
          }}
        >{`${role}s`}</CardHeader>
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          paginationServer
          columns={columns}
          progressPending={usersInfo?.isUsersLoading}
          progressComponent={
            <div className="table-loader-container">
              <Spinner className="spinner" />
            </div>
          }
          sortServer={true}
          onSort={handleSort}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={users.data}
          subHeaderComponent={
            <CustomHeader
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              setToCreateMode={setToCreateMode}
            />
          }
        />
      </Card>
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={() => {
          // store.dispatch(setUser(null))
          setSidebarOpen(!sidebarOpen)
        }}
        user={isCreate ? null : role == 'user' ? users.selectedUser : userData}
        isCreate={isCreate}
      />
    </div>
  )
}

export default UsersTable
