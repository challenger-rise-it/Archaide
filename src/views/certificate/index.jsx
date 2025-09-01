import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'

import _ from 'lodash'

const Home = () => {
  const data = `
    <div style="width:100%; min-height:220px;">
      <groovesell-promo-tools permalink="cc584405086c2ff9fa3e083f969c442d">
      </groovesell-promo-tools>
    </div>
  `

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            {' '}
            <h2 className="text-capitalize">Certificate</h2>
          </CardTitle>
        </CardHeader>
        <CardBody>
          {/* <CardText className="text-center font-large-2">
            Welcome to Trading Bots Page 🚀
          </CardText> */}
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
