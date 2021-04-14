import { Request, Response } from 'express'

import Series from '../../models/Series'

const viewSeries = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Series.findByIdAndUpdate(id, { $inc: { clicks: 1 } })

    res.status(200).send()
  } catch (e) {
    res.status(500).json({ message: e })
    throw new Error(e)
  }
}

export default viewSeries
