import { uniq } from 'lodash'

export default {
  seriesOrder: (state) => uniq(state.data?.seriesOrder || []),
}
