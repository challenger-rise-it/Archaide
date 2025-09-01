import { useState, useEffect } from 'react'
import Proptypes from 'prop-types'
import { Button, Label } from 'reactstrap'
import defaultImg from '../../assets/imgs/default.png'
import './style.scss'

const FileUpload = ({ defaultSrc, label, alt, onChange, ...props }) => {
  const [preview, setPreview] = useState(defaultSrc || defaultImg)

  const onFileChange = (e) => {
    const reader = new FileReader()
    const files = e.target.files
    reader.onload = function () {
      setPreview(reader.result)
    }
    reader.readAsDataURL(new Blob([files[0]]))
    onChange(files[0])
  }
  useEffect(() => {
    setPreview(defaultSrc || defaultImg)
  }, [defaultSrc])
  return (
    <div className="file-upload">
      <div>{label && <Label>{label}</Label>}</div>
      <div className="d-flex align-items-center">
        <div>
          <img
            src={preview}
            alt={alt && 'preview'}
            width="80"
            height="80"
            className="rounded d-block file-upload-preview border"
          />
        </div>
        <div className="ml-1">
          <Button.Ripple
            color="primary"
            size="sm"
            className="mr-1 my-0"
            tag={Label}
          >
            <input
              type="file"
              hidden
              onChange={onFileChange}
              accept="image/*"
              {...props}
            />
            Upload
          </Button.Ripple>
          <Button.Ripple
            size="sm"
            outline
            color="secondary"
            onClick={() => {
              setPreview(defaultSrc || defaultImg)
              onChange(null)
            }}
          >
            Reset
          </Button.Ripple>
        </div>
      </div>
    </div>
  )
}

export default FileUpload

FileUpload.propTypes = {
  defaultSrc: Proptypes.string,
  label: Proptypes.string,
  alt: Proptypes.string,
  onChange: Proptypes.func,
}
