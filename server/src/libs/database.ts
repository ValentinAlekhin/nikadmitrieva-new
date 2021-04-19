import dotenv from 'dotenv'

import mongoose from 'mongoose'

dotenv.config()

const { MONGO_URL } = process.env

class DB {
  private readonly url: string
  constructor(url: string) {
    this.url = url
  }

  async connect() {
    if (!this.url) {
      throw new Error('Mongo url is not defended')
    }

    await mongoose.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
  }
}

const database = new DB(MONGO_URL)

export default database
