import { Request, Response } from 'express'

import Image from '../../models/Image'

const viewImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await Image.findByIdAndUpdate(id, { $inc: { clicks: 1 } })

    res.status(200).send()
  } catch (e) {
    res.status(500).json({ message: e })
    throw new Error(e)
  }
}

export default viewImage
