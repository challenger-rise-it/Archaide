import { Card, CardBody, Row } from 'reactstrap'
import { Line } from 'react-chartjs-2'
import { useAppDataCtx } from '@context/app/appDataContext'
import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { Calendar } from 'primereact/calendar'
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import moment from 'moment'
import { date } from 'yup'

const BotChart = () => {
  const [dates, setDates] = useState([moment().subtract(1, 'hour')._d, moment().subtract(0, 'day')._d]);
  const [legend, setLegend] = useState([])
  const lineRef = useRef(null)
  const { bots } = useAppDataCtx()
  const [state, setState] = useState({})
  useEffect(() => {
    if (bots.data != null && bots.balance) {
      const result = bots.balance?.reduce((acc, cur) => {
        const { botId, equity, createdAt } = cur;
        if (!acc[botId]) {
          acc[botId] = [];
        }
        acc[botId].push({ botId, equity, createdAt });
        return acc;
      }, []);
      if (result) setState({
        datasets: Object.keys(result).map((id, key) => {
          const color = ['red', 'blue', 'green']
          const bot_name = bots.data.find(item => item._id === id)

          return {
            label: bot_name?.name ? bot_name.name : "null",
            lineTension: 0,
            fill: false,
            borderColor: color[key],
            borderWidth: 2,
            spanGaps: true,
            data: generateData(result)[id][0]
          }
        })
      })
    }
  }, [bots.balance, bots.data])
  useEffect(() => {
    const chartInstance = lineRef.current.chartInstance
    setLegend(chartInstance.legend.legendItems)
    bots.getBalance(dates)
    bots.load()
  }, [])

  useEffect(() => {
    if (dates[0] && dates[1]) {
      bots.getBalance(dates)
    }
  }, [dates])
  const generateData = (result) => {
    const datasets = [];

    for (const bot in result) {
      const botData = result[bot];
      const botBalances = [];
      botData.sort((a, b) => { return new Date(a.createdAt) - new Date(b.createdAt); })
      for (const item of botData) {
        botBalances.push({ x: item.createdAt, y: item.equity });
      }
      if (!datasets[bot]) {
        datasets[bot] = [];
      }
      datasets[bot].push(botBalances);
    }
    return datasets
  }

  const handleLegendItemClick = (event, datasetIndex) => {
    const chart = lineRef.current.chartInstance
    const meta = chart.getDatasetMeta(datasetIndex)
    meta.hidden =
      meta.hidden === null ? !chart.data.datasets[datasetIndex].hidden : null
    chart.update()
    setLegend(chart.legend.legendItems)
  }
  useEffect(() => {
    const chartInstance = lineRef.current.chartInstance
    setLegend(chartInstance.legend.legendItems)
  }, [state])
  return (
    <div>
      <Card className="overflow-hidden">
        <CardBody className="p-0">
          <Row style={{ justifyContent: "space-between" }} className="px-2">
            <Row xl="6" lg="5" sm="3" xs="2" className="mt-8 d-flex mb-2">
              {legend.length &&
                legend.map((item, index) => {
                  return (
                    <div
                      key={item.text}
                      className="px-4 py-2"
                      style={{
                        maxWidth: "200px",
                        background: item.hidden ? '#fff' : item.fillStyle,
                        textAlign: 'center',
                        color: item.hidden ? item.fillStyle : '#fff',
                        cursor: 'pointer',
                      }}
                      onClick={(event) => handleLegendItemClick(event, index)}
                    >
                      <div style={{ fontSize: '13px', lineHeight: '17px' }}>
                        {item.text}
                      </div>
                      <div style={{ fontSize: '36px', lineHeight: '47px' }}>
                        +11%
                      </div>
                    </div>
                  )
                })}
            </Row>
            <div className="card flex justify-content-center px-2 py-2" >
              <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput />
            </div>
          </Row>
          {
            state &&
            <div>
              <Line
                height={400}
                ref={lineRef}
                data={state}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  offset: true,
                  legend: {
                    display: false,
                  },
                  elements: {
                    point: {
                      radius: 0,
                    },
                  },
                  scales: {
                    xAxes: [
                      {
                        type: 'time',
                        time: {
                          parser: 'YYYY-MM-DD HH:mm',
                          unit: 'minute',
                          displayFormats: {
                            minute: 'YYYY-MM-DD HH:mm'
                          }
                        },
                        ticks: {
                          autoSkip: false,
                          callback: function (value, index, values) {
                            if (index === 0 || index === values.length - 1) {
                              return value
                            }
                            return ''
                          },
                        },
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        ticks: {
                          maxTicksLimit: 3,
                          display: false,
                        },
                        gridLines: {
                          display: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          }
        </CardBody>
      </Card>
    </div>
  )
}

export default BotChart
