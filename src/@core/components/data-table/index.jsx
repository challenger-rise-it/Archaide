import Proptypes from 'prop-types'
import ReactDataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { Spinner } from 'reactstrap'

import '@styles/react/libs/tables/react-dataTable-component.scss'

const NoDataComponent = () => {
  return (
    <div className="py-3 w-100 text-center no-data-component border-top font-large-1">
      No data to display
    </div>
  )
}

const DataTable = ({ data, columns, isLoading, ...props }) => {
  return (
    <ReactDataTable
      noHeader
      pagination
      responsive
      paginationServer
      columns={columns}
      progressPending={isLoading}
      progressComponent={
        <div className="table-loader-container">
          <Spinner className="spinner" />
        </div>
      }
      sortIcon={<ChevronDown />}
      className="react-dataTable"
      noDataComponent={<NoDataComponent />}
      data={data}
      {...props}
    />
  )
}

export default DataTable

DataTable.propTypes = {
  data: Proptypes.array.isRequired,
  columns: Proptypes.array.isRequired,
  isLoading: Proptypes.bool.isRequired,
}
