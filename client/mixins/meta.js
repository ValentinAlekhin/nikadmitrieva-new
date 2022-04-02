import { mapState } from 'vuex'

export default {
  head() {
    const title = `${this.metaInfo.title} ${
      this.pageTitle ? ` | ${this.pageTitle}` : ''
    }`

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageDescription || this.metaInfo?.description || '',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.pageKeywords || this.metaInfo?.keywords || '',
        },
        { hid: 'og:title', name: 'og:title', content: title },
        {
          hid: 'og:image',
          name: 'og:image',
          content:
            this.pageImage ||
            this.metaInfo?.image?.data?.attributes?.formats?.medium?.url || '',
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: this.metaInfo?.siteName || '',
        },
      ],
    }
  },
  computed: {
    ...mapState('meta', { metaInfo: 'data' }),
  },
}
