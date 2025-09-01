import { CardText } from 'reactstrap'
import Proptypes from 'prop-types'
const Description = ({ label, value, icon }) => {
  return (
    <div className="py-1">
      <div className="">
        {icon}
        <span className="font-weight-bold">{label}:</span>
      </div>
      <h3 className="text-capitalize mb-0">{value}</h3>
    </div>
  )
}

Description.propTypes = {
  label: Proptypes.string,
  value: Proptypes.string,
  icon: Proptypes.node,
}

export default Description
