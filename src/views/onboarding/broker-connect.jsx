import { Button } from 'reactstrap'
import { useEffect, useState } from 'react'

const giphy = process.env.REACT_APP_GIPHY_KEY

const BrokerConnect = ({ onNext, onSkip }) => {
  const [gif, setGif] = useState()
  useEffect(async () => {
    const random_offset = Math.floor(Math.random() * 100)
    await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${giphy}&q=heck yeah&limit=1&offset=${random_offset}&rating=G`,
    )
      .then((response) => response.json())
      .then((data) => setGif(data.data[0].id))
  }, [])
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h2 className="text-center mt-3 mb-2">
        🎆 HELL YEAH!!! YOUR BROKER IS CONNECTED!!! 🎆
      </h2>
      <div style={{ maxWidth: '900px' }}>
        <img
          src={`https://i.giphy.com/${gif}.gif?width=900&height=660`}
          alt=""
          className="img-fluid"
          width="900px"
          height="660px"
        />
      </div>
      <Button.Ripple
        color="primary"
        type="button"
        className="mt-1"
        onClick={onNext}
      >
        <span className="font-weight-bold" style={{ fontSize: '2rem' }}>
          Go To The Next Step
        </span>
      </Button.Ripple>
      <div>
        <span className="cursor-pointer" onClick={onSkip}>
          or skip for now
        </span>
      </div>
    </div>
  )
}

export default BrokerConnect
