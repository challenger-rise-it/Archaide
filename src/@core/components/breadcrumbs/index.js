// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import Proptypes from 'prop-types'
import { Grid, CheckSquare, MessageSquare, Mail, Calendar } from 'react-feather'
import {
  Breadcrumb,
  BreadcrumbItem,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'

const BreadCrumbs = (props) => {
  // ** Props
  const { breadCrumbTitle, items } = props

  return (
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            {breadCrumbTitle ? (
              <h2
                className={
                  items.length
                    ? `content-header-title float-left mb-0`
                    : 'content-header-title-only float-left mb-0'
                }
              >
                {breadCrumbTitle}
              </h2>
            ) : (
              ''
            )}
            <div className="breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12">
              <Breadcrumb>
                {items.map((it, i) => (
                  <BreadcrumbItem
                    tag="li"
                    key={i}
                    active={i === items.length - 1}
                  >
                    <Link to={it.link}>{it.label}</Link>
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BreadCrumbs

// ** PropTypes
BreadCrumbs.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  items: Proptypes.array.isRequired,
}
