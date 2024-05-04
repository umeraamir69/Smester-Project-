import React  from 'react'
import ReCAPTCHA from "react-google-recaptcha";


const Recaptchav2 = ({onChange}) => {
  return (
    <ReCAPTCHA
      sitekey="6LemD_EnAAAAAJsI3Hb-6QxhdOhqEhgA5hCkb8ah"
      onChange={onChange}
    />
  )
}


export default Recaptchav2