<template>
  <section class="container mt-2">

    <b-button type="is-primary" outlined v-on:click="newAlias">Uusi</b-button>

    <b-button type="is-danger" outlined class="is-pulled-right" v-on:click="logOut">Kirjaudu ulos</b-button>

    <hr>

    <b-notification
      type="is-warning"
      aria-close-label="Close notification"
      v-for="alert in alerts" :key="alert.message">
      {{ alert.message }}
    </b-notification>

     <b-table :data="aliases" :columns="columns"></b-table>

    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
  </section>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isLoading: true,
      alerts: [],
      token: '',
      aliases: [],
      columns: [
        {
          field: 'alias',
          label: 'Alias'
        },
        {
          field: 'email',
          label: 'Ohjattu sähköposti'
        },
        {
          field: 'created',
          label: 'Luontipäivä'
        }
      ]
    }
  },
  methods: {
    logOut () {
      localStorage.removeItem('token')
      this.$router.push('/')
    },
    list () {
      this.axios.post(process.env.ROOT_API + '/alias/list', {
        token: this.token
      }).then((response) => {
        this.isLoading = false
        if (!response.data.success) {
          localStorage.removeItem('token')
          this.$router.push('/')
        }

        this.aliases = response.data.aliases.map((alias) => {
          alias.alias = alias.alias + '@polttaja.fi'
          alias.created = new Date(alias.created * 1000).toLocaleDateString('fi-FI')
          return alias
        })
      })
    },
    newAlias () {
      this.isLoading = true
      this.axios.post(process.env.ROOT_API + '/alias/new', {
        token: this.token,
        random: true
      }).then((response) => {
        this.isLoading = false
        if (!response.data.success) {
          this.alerts.length = 0
          this.alerts.push({ message: response.data.message })
        }

        this.list()
      })
    }
  },
  mounted () {
    if (localStorage.token) {
      this.token = localStorage.token
      this.list()
    } else {
      this.$router.push('/')
    }
  }
}
</script>
