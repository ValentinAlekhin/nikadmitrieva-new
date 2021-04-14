import { Router } from 'express'

import root from './root'
import viewSeries from './viewSeries'
import viewImage from './viewImage'
import imageRoute from './image'

const router = Router()

router.get('/', root)

router.put('/view/series/:id', viewSeries)

router.put('/view/image/:id', viewImage)

router.get('/image/:name', imageRoute)

export default router
