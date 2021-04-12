import fs from 'fs'

const fileExits = (path: string): Promise<boolean> =>
  new Promise(resolve =>
    fs.access(path, err => (err ? resolve(false) : resolve(true)))
  )

export default fileExits
