import { useAuthCtx } from '@context/authContext'
import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'

import _ from 'lodash'

const AdminHome = () => {
  const { userData } = useAuthCtx()
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-capitalize">
              Hi {_.get(userData, 'name', '').split(' ')[0]}
            </h2>
          </CardTitle>
        </CardHeader>
        <CardBody className="py-5">
          <CardText className="text-center font-large-2">
            Welcome to Archaide 🚀
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default AdminHome
