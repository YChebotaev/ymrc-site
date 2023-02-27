// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const { pincode } = req.query

  await axios.post(`https://ymrc-service.ru/players/${pincode}/send_command`, req.body)

  res.status(200).json(true)
}
