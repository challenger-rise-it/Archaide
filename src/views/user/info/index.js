import React, { useState } from 'react'
import Overview from './partials/Overview'
import '@styles/react/pages/page-profile.scss'
import {
  useParams,
  Link,
  Routes,
  Route,
  useMatch,
  useLocation,
} from 'react-router-dom'
import { Card } from 'reactstrap'
import { Nav, NavLink, NavItem } from 'reactstrap'
import { PROFILE_TAB_ROUTES } from '@const/user'

const Profile = () => {
  const [block, setBlock] = useState(false)
  const { id } = useParams()
  const { path } = useMatch()
  const { pathname } = useLocation()
  const handleBlock = () => {
    setBlock(true)
    setTimeout(() => {
      setBlock(false)
    }, 2000)
  }
  const getEndpoint = (pathname) => {
    let toArr = pathname.split('/')
    return toArr[toArr.length - 1] == id ? '' : toArr[toArr.length - 1]
  }
  return (
    <div id="user-profile">
      <section id="profile-info">
        <Card className="profile-header mb-2 ">
          <Nav className="nav-left mb-0" pills>
            {PROFILE_TAB_ROUTES.map((item, index) => {
              return (
                <NavItem key={index}>
                  <NavLink
                    active={getEndpoint(pathname) == `${item.route}`}
                    tag={Link}
                    to={`/user/${id}/${item.route}`}
                  >
                    {item.title}
                  </NavLink>
                </NavItem>
              )
            })}
          </Nav>
        </Card>
        <Routes>
          <Route path={`${path}`} index exact component={Overview} />
        </Routes>
      </section>
    </div>
  )
}

export default Profile
