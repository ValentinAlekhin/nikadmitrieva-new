import { Router } from 'express'

import root from './root'
import imageRoute from './image'
import viewSeries from './viewSeries'
import viewImage from './viewImage'

const router = Router()

router.get('/', root)

router.get('/image/:name', imageRoute)

router.put('/view/series/:id', viewSeries)

router.put('/view/image/:id', viewImage)

export default router
