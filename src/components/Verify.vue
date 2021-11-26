<template>
  <section class="container mt-2">
    <center>
      <p>
        {{ status }}
      </p>
    </center>

<b-loading :is-full-page="true" v-model="isLoading"></b-loading>
  </section>
</template>

<script>
export default {
  name: 'Verify',
  data () {
    return {
      isLoading: true,
      status: 'Varmistetaan tiliä...'
    }
  },
  methods: {
    verify () {
      this.axios.get(process.env.ROOT_API + '/user/verify', {
        params: {
          key: this.$route.params.key
        }
      }).then((response) => {
        if (response.data.success) {
          localStorage.token = response.data.token
          this.$router.push('/')
        }

        this.isLoading = false
        this.status = response.data.message
      })
    }
  },
  mounted () {
    if (localStorage.token) {
      this.$router.push('/')
    }

    this.verify()
  }
}
</script>
