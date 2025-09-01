import { useEffect, useContext } from 'react'
import { Card, CardBody, Button, Row, Col } from 'reactstrap'
import Description from '@components/description'
import { Spinner } from 'reactstrap'
import _ from 'lodash'

import Sidebar from './partials/Sidebar'
import { SidebarCtx } from '@context/user/sidebarContext'
import { Inbox, Key, UserCheck } from 'react-feather'
import { useAuthCtx } from '@context/authContext'

const About = () => {
  const { userData, getAuth } = useAuthCtx()
  useEffect(() => {
    getAuth()
  }, [])
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarCtx)
  const onEditUserClick = () => {
    setSidebarOpen(true)
  }
  const disp = [
    { label: 'Full Name', value: userData.name, icon: <UserCheck size={15} /> },
    { label: 'Email', value: userData.email, icon: <Inbox size={15} /> },
    { label: 'Phone', value: userData.phone, icon: <UserCheck size={15} /> },
  ]

  return (
    <>
      <Card>
        <CardBody>
          {userData.isLoading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner />
            </div>
          ) : (
            <>
              <Row>
                {disp.map((it, i) => (
                  <Col sm={12} md={6} key={i}>
                    <Description label={it.label} value={it.value} />
                  </Col>
                ))}
              </Row>

              {userData.role == 'user' && (
                <>
                  <Button.Ripple
                    color="primary"
                    outline
                    onClick={onEditUserClick}
                  >
                    <div className="d-flex align-items-center">
                      <span>Edit</span>
                    </div>
                  </Button.Ripple>
                </>
              )}
            </>
          )}
        </CardBody>
      </Card>
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={() => {
          setSidebarOpen(!sidebarOpen)
        }}
        onSave={() => {}}
        user={userData}
      />
    </>
  )
}

export default About
