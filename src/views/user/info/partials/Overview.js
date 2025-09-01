// ** React Imports
import { useContext } from 'react'
// ** Custom Components
import { Card, CardBody, CardText, Row, Col, Spinner, Badge } from 'reactstrap'
import 'flatpickr/dist/flatpickr.css'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import './style.scss'
import { useProfileInfoCtx } from '../../../../utility/context/user/profileInfoContext'
import Sidebar from '../../partials/Sidebar'
import { SidebarCtx } from '@context/user/sidebarContext'

const STATUS_COLOR = {
  active: 'success',
  rejected: 'danger',
  pending: 'primary',
}

const Overview = () => {
  const { overview, usersInfo } = useProfileInfoCtx()
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarCtx)
  const { id } = useParams()

  if (!overview.loading)
    return (
      <>
        <Card className="main-info-card">
          <CardBody>
            <div className="d-flex justify-content-end">
              <Badge color={STATUS_COLOR[usersInfo.status]}>
                {usersInfo.status}
              </Badge>
            </div>
            <Row>
              <Col
                xl="6"
                lg="12"
                className="d-flex flex-column justify-content-between border-container-lg"
              >
                <div className="d-flex justify-content-start">
                  <div className="d-flex flex-column ml-0">
                    <div className="user-info mb-1">
                      <h1 className="mb-0 text-capitalize">
                        {overview.profileInfo?._doc.name}
                      </h1>
                      <CardText tag="div">
                        {overview.profileInfo?._doc.email}
                      </CardText>
                      <CardText tag="div" className="mt-1">
                        {overview.profileInfo?._doc.role}
                      </CardText>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Sidebar
          open={sidebarOpen}
          toggleSidebar={() => {
            setSidebarOpen(!sidebarOpen)
          }}
          user={overview.profileInfo}
        />
      </>
    )
  return (
    <div className="table-loader-container">
      <Spinner className="spinner" />
    </div>
  )
}

export default Overview
