import { Fragment, useEffect, useState } from 'react'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { Row, Col, Card, CardBody, Spinner } from 'reactstrap'

import { User } from 'react-feather'
import Avatar from '@components/avatar'
import UsersTable from './partial/Table'
import { useSearchParams } from '@src/navigation'
import { USER_SORT_KEY } from '@const/user'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'

const UserList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [role, setRole] = useState('')
  const { usersInfo } = useProfileInfoCtx()

  useEffect(() => {
    if (location.search) fetchData()
  }, [location.search])
  const fetchData = () => {
    const limit = parseInt(searchParams.get('limit'))
    const page = parseInt(searchParams.get('page'))
    const query = {
      limit,
      page,
      filter: {},
    }
    if (searchParams.get('stat')) {
      query.filter['stat'] = searchParams.get('stat')
    }
    if (searchParams.get('role')) {
      query.filter['role'] = searchParams.get('role')
    }
    if (searchParams.get('search')) {
      query.filter['search'] = searchParams.get('search')
    }
    USER_SORT_KEY.forEach((key) => {
      if (searchParams.get(key)) {
        query.filter[key] = searchParams.get(key)
      }
    })
    try {
      if (location.pathname == '/admin/list') {
        setRole('admin')
        usersInfo.getUsers({
          ...query,
          filter: { ...query.filter, role: 'admin' },
        })
      } else if (location.pathname == '/user/list') {
        setRole('user')
        usersInfo.getUsers({
          ...query,
          filter: { ...query.filter },
        })
      }
    } catch (error) {
      navigate('/not-authorized')
    }
  }
  if (searchParams.get('limit') === null || searchParams.get('page') === null) {
    searchParams.set('limit', 10)
    searchParams.set('page', 1)
    return <Navigate to={`${location.pathname}?${searchParams.toString()}`} />
  }

  if (searchParams.get('limit') === null || searchParams.get('page') === null) {
    return null
  } else {
    return (
      <Fragment>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <Card className="card-congratulations-medal">
              <CardBody>
                <div className="d-flex align-items-end justify-content-between">
                  <h3 className="fw-bolder mb-75">
                    {usersInfo?.isUsersLoading ? (
                      <Spinner
                        className="spinner "
                        variant="primary"
                        style={{ color: '#7367F0' }}
                      />
                    ) : (
                      <div className="text-primary">
                        {usersInfo?.users.total}
                      </div>
                    )}
                  </h3>
                  <Avatar color="light-primary" size="lg" icon={<User />} />
                </div>
                <p className="card-text mb-75">Total {role}s</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row></Row>
        <UsersTable users={usersInfo?.users} role={role} />
      </Fragment>
    )
  }
}

export default UserList
