<template>
  <section class="container">

    <b-tabs v-model="activeTab">

      <b-notification
        type="is-warning"
        aria-close-label="Close notification"
        v-for="alert in alerts" :key="alert.message">
        {{ alert.message }}
      </b-notification>

      <b-tab-item label="Kirjaudu">
        <b-field label="Sähköposti">
          <b-input
            type="email"
            placeholder="etunimi.sukunimi@gmail.com"
            maxlength="256"
            checkHtml5Validity
            v-model="email"
          >
          </b-input>
        </b-field>

        <b-field label="Salasana">
          <b-input
            plcaeholder="salasana"
            type="password"
            maxlength="128"
            password-reveal
            v-model="password"
          ></b-input>
        </b-field>

        <b-button type="is-primary" v-on:click="login">Kirjaudu</b-button>
      </b-tab-item>

      <b-tab-item label="Rekisteröidy">
        <b-field label="Sähköposti">
          <b-input
            type="email"
            placeholder="etunimi.sukunimi@gmail.com"
            maxlength="256"
            checkHtml5Validity
            v-model="email">
          </b-input>
        </b-field>

        <b-field label="Salasana">
            <b-input
              type="password"
              maxlength="128"
              password-reveal
              v-model="password">
            </b-input>
        </b-field>

        <b-field label="Salasana uudestaan">
          <b-input
            type="password"
            maxlength="128"
            password-reveal
            v-model="password2">
          </b-input>
        </b-field>

        <b-button type="is-primary" v-on:click="register">Rekisteröidy</b-button>
      </b-tab-item>
    </b-tabs>
    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      activeTab: 0,
      email: '',
      password: '',
      password2: '',
      isLoading: false,
      alerts: [],
      token: ''
    }
  },
  methods: {
    login () {
      this.isLoading = true

      this.axios
        .post(process.env.ROOT_API + '/user/login', {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          this.isLoading = false
          if (response.data.success) {
            localStorage.token = response.data.token
            this.$router.push('Home')
          }
          this.alerts.length = 0
          this.alerts.push(response.data)
          console.log(response.data)
        })
    },

    register () {
      this.isLoading = true

      this.axios
        .post(process.env.ROOT_API + '/user/register', {
          email: this.email,
          password: this.password,
          password2: this.password2
        })
        .then((response) => {
          this.isLoading = false
          if (response.data.success) {
            this.login()
          }
          this.alerts.length = 0
          this.alerts.push(response.data)
        })
    }
  },
  mounted () {
    if (localStorage.token) {
      this.token = localStorage.token
      this.$router.push('Home')
    }
  }
}
</script>
