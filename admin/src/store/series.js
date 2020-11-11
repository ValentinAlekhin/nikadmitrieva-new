import axios from '../axios/index'

export default {
  state: {
    title: '',
    url: '',
    description: '',
    images: [],
  },

  mutations: {
    setSeriesTitle(state, payload) {
      state.title = payload
    },

    setSeriesUrl(state, payload) {
      state.url = payload
    },

    setSeriesDescription(state, payload) {
      state.description = payload
    },

    setSeriesImages(state, payload) {
      state.images = payload.map(file => ({
        file,
        show: false,
        valid: true,
        src: URL.createObjectURL(file),
      }))
    },

    setSeriesImageDescription(state, { index, description }) {
      const images = [...state.images]
      images[index].description = description
      state.images = images
    },

    setSeriesImageShow(state, { index, show }) {
      const images = [...state.images]
      images[index].show = show
      state.images = images
    },

    setSeriesImageValid(state, { index, valid }) {
      const images = [...state.images]
      images[index].valid = valid
      state.images = images
    },

    setSeriesImageProgress(state, { index, progress }) {
      const images = [...state.images]
      images[index].progress = progress
      state.images = images
    },

    removeSeriesImage(state, payload) {
      state.images.splice(payload, 1)
    },

    changeSeriesImageOrder(state, { index, order }) {
      const file = state.images.splice(index, 1)
      state.images.splice(order - 1, 0, ...file)
    },

    clearSeriesForm(state) {
      state.title = ''
      state.url = ''
      state.description = ''
      state.images = []
    },
  },

  actions: {
    async seriesPost({ commit, state, getters }) {
      commit('clearError')
      commit('setLoading', true)

      const seriesObj = { title: state.title }
      if (state.url) seriesObj.url = state.url
      if (state.description) seriesObj.description = state.description

      try {
        const response = await axios.post('admin/new/series', seriesObj)
        const seriesId = response.data.seriesId

        let order = 1

        for (const img of getters.images) {
          const { file, description } = img
          const params = { seriesId, order }
          if (description) params.description = description

          console.log(file)
          const imgFd = new FormData()
          imgFd.append('image', file)

          const config = {
            params,

            headers: {
              'Content-Type': `multipart/form-data; boundary=${imgFd._boundary}`,
            },

            onUploadProgress: progressEvent => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
              commit('setSeriesImageProgress', { progress, index: order - 1 })
              console.log(progress)
            },
          }

          await axios.post('admin/new/image', imgFd, config)

          commit('setSeriesImageProgress', { progress: true, index: order - 1 })

          order++
        }

        commit('clearSeriesForm')
      } catch (e) {
        const message = e.response.data.message || e
        commit('setError', message)
        throw new Error(message)
      } finally {
        commit('setLoading', false)
      }
    },
  },

  getters: {
    images: state => state.images,

    seriesSelectItems: state => state.images.map((el, i) => i + 1),

    seriesImageDescription: state => index =>
      state.images[index].description || '',

    seriesInputFiles: state => state.images.map(image => image.file),

    seriesImagesSrc: state => index => state.images[index].src,

    seriesImageDescription: state => index => state.images[index].description,

    seriesImageShow: state => index => state.images[index].show,

    seriesImageProgress: state => index => state.images[index].progress,

    isImagesInvalid: state => {
      const images = state.images
      if (images.length) {
        for (const image of images) {
          if (!image.valid) {
            return true
          }
        }
        return false
      } else return true
    },
  },
}
