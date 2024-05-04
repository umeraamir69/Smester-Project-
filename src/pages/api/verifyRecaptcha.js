import axios from 'axios';

export default async function handler(req, res) {
  const { token } = req.body;

  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`);
    return response.data.score >=0.5 && response.data.success? res.status(200).json({data : true}) : res.status(400).json({data : false}) ;
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}