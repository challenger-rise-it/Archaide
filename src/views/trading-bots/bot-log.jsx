import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import Avatar from '@components/avatar'
import Spinner from '@components/spinner/Loading-spinner'
import { useAppDataCtx } from '@context/app/appDataContext'

const BotLogPage = () => {
  const { id } = useParams()
  const { bots } = useAppDataCtx()
  const [loading, setLoading] = useState(!!id)
  const [selectedTrade, setSelectedTrade] = useState(null)
  const [selectedPage, setSelectedPage] = useState(0)
  const selectedBot = id && bots.selected
  const { trades } = bots

  useEffect(() => {
    if (id) {
      setLoading(true)
      bots.get(id)
    }
  }, [id])

  useEffect(() => {
    const fetchTrades = async (id, page) => {
      await bots.fetchLog(id, page)
      setLoading(false)
    }

    if (selectedBot) {
      setLoading(true)
      fetchTrades(selectedBot._id, selectedPage)
      // setSelectedTrade(null)
    }
  }, [selectedBot, selectedPage])

  const handlePageChange = (e) => {
    setSelectedPage(e.selected)
  }

  return (
    <Fragment>
      <Row>
        <Col md="6" xl="4">
          {loading ? (
            <div className="table-loader-container">
              <Spinner />
            </div>
          ) : (
            trades.docs &&
            trades.docs.map((doc) => (
              <Card
                key={doc._id}
                className="cursor-pointer"
                onClick={() => setSelectedTrade(doc)}
              >
                <CardBody>
                  <Avatar
                    className="rounded"
                    color={
                      doc.actionType === 'sell'
                        ? 'light-danger'
                        : 'light-success'
                    }
                    content={doc.actionType === 'sell' ? 'Sell' : 'Buy'}
                    contentStyles={{ width: 50, height: 20 }}
                  />
                  <Row className="my-1">
                    <Col>
                      <div className="d-flex flex-column">
                        <span className="font-weight-bolder">Ticker</span>
                        <span>{doc.ticker}</span>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex flex-column">
                        <span className="font-weight-bolder">SL</span>
                        <span>{doc.sl}</span>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex flex-column">
                        <span className="font-weight-bolder">TP</span>
                        <span>{doc.tp}</span>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex flex-column">
                        <span className="font-weight-bolder">Volume</span>
                        <span>{doc.volume}</span>
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-between">
                    <span>
                      {moment(doc.createdAt).format('YYYY-MM-DD hh:mm:ss A')}
                    </span>
                    <span
                      className={`font-weight-bolder ${
                        doc.details.numericCode === 0
                          ? 'text-success'
                          : 'text-danger'
                      }`}
                    >
                      {doc.details.numericCode === 0 ? 'Success' : 'Fail'}
                    </span>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
          {trades && (
            <ReactPaginate
              pageCount={trades.totalPages || 1}
              breakLabel="..."
              nextLabel=""
              previousLabel=""
              forcePage={selectedPage}
              onPageChange={handlePageChange}
              activeClassName="active"
              pageClassName={'page-item'}
              nextLinkClassName={'page-link'}
              nextClassName={'page-item next'}
              previousClassName={'page-item prev'}
              previousLinkClassName={'page-link'}
              pageLinkClassName={'page-link'}
              containerClassName={
                'pagination react-paginate justify-content-center my-2 pr-1'
              }
            />
          )}
        </Col>
        <Col md="6" xl="8">
          {selectedTrade && (
            <Card>
              <CardHeader>
                <CardTitle className="font-weight-bolder">Details</CardTitle>
              </CardHeader>
              <CardBody className="border-top pb-0">
                <div className="d-flex justify-content-between my-1">
                  <span className="font-weight-bolder">Created At</span>
                  <span>
                    {moment(selectedTrade.createdAt).format(
                      'YYYY-MM-DD hh:mm:ss A',
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-between my-1">
                  <span className="font-weight-bolder">Bot ID</span>
                  <span>{selectedTrade.botId}</span>
                </div>
                <div className="d-flex justify-content-between my-1">
                  <span className="font-weight-bolder">Broker ID</span>
                  <span>{selectedTrade.brokerId}</span>
                </div>
                <div className="d-flex justify-content-between my-1">
                  <span className="font-weight-bolder">Ticker</span>
                  <span>{selectedTrade.ticker}</span>
                </div>
                <div className="d-flex justify-content-between my-1">
                  <span className="font-weight-bolder">Action</span>
                  <Avatar
                    className="rounded"
                    color={
                      selectedTrade.actionType === 'sell'
                        ? 'light-danger'
                        : 'light-success'
                    }
                    content={
                      selectedTrade.actionType === 'sell' ? 'Sell' : 'Buy'
                    }
                    contentStyles={{ width: 50, height: 20 }}
                  />
                </div>
                <div className="d-flex justify-content-between my-1">
                  <span className="font-weight-bolder">SL</span>
                  <span>{selectedTrade.sl}</span>
                </div>
                <div className="d-flex justify-content-between my-1">
                  <span className="font-weight-bolder">TP</span>
                  <span>{selectedTrade.tp}</span>
                </div>
                <div className="d-flex justify-content-between my-1">
                  <span className="font-weight-bolder">Volume</span>
                  <span>{selectedTrade.volume}</span>
                </div>
                <div className="d-flex justify-content-between my-1">
                  <span className="font-weight-bolder">Order ID</span>
                  <span>{selectedTrade.details.orderId}</span>
                </div>
                <div className="d-flex justify-content-between my-1">
                  <span className="font-weight-bolder">Status</span>
                  {selectedTrade.details.numericCode === 0 ? (
                    <span className="font-weight-bolder text-success">
                      Success
                    </span>
                  ) : (
                    <span className="text-danger">
                      {selectedTrade.details.message}
                    </span>
                  )}
                </div>
                <div className="d-flex justify-content-between my-1">
                  <span className="font-weight-bolder">Trade Start Time</span>
                  <span>
                    {moment(selectedTrade.details.tradeStartTime).format(
                      'YYYY-MM-DD hh:mm:ss A',
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-between my-1">
                  <span className="font-weight-bolder">
                    Trade Execution Time
                  </span>
                  <span>
                    {moment(selectedTrade.details.tradeExecutionTime).format(
                      'YYYY-MM-DD hh:mm:ss A',
                    )}
                  </span>
                </div>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Fragment>
  )
}

export default BotLogPage
