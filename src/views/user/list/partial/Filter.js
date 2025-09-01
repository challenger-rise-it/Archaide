import Select from 'react-select'
import { selectThemeColors } from '@utils'

import { Card, CardHeader, CardTitle, CardBody, Row, Col } from 'reactstrap'
import { useSearchParams } from '@src/navigation'
const roleOptions = [
  { value: null, label: 'All' },
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
]

const statusOptions = [
  { value: null, label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Search Filter</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="6">
            <Select
              isClearable={false}
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              options={roleOptions}
              value={roleOptions.find(
                (it) => it.value === searchParams.get('role'),
              )}
              placeholder="Select Role"
              onChange={(opt) => {
                setSearchParams({
                  role: opt.value,
                  page: 1,
                })
              }}
            />
          </Col>
          <Col md="6">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={statusOptions}
              value={statusOptions.find(
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
        </Row>
      </CardBody>
    </Card>
  )
}
export default Filter
