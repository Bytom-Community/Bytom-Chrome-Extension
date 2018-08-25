<template>
  <div>test1</div>
</template>

<script>
import crun from '@/common/crun'
export default {
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
    params () {
      const { query, page, size } = this
      return { query, page, size }
    }
  },
  watch: {
    query: 'reset',
    params: {
      deep: true,
      handler: 'fetchExpression'
    }
  },
  methods: {
    reset () {
    },
    fetchExpression () {
      if (!this.query) return
      this.loading = true
      crun.$emit('fetch-expression', this.params)
        .then(this.receiveExpression)
    },
    receiveExpression ({ data = [], total = 0 }) {
      this.loading = false
      this.total = total
      this.data = this.data.concat(data)
    }
  }
}
</script>