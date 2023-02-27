// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { pincode } = req.query

  console.log('pincode =', pincode)

  const { data, status } = await axios.get(`https://ymrc-service.ru/players/${pincode}/current_state`)

  res.status(status).json(data)
}
