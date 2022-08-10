<template>
  <div>About</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'about',
  mounted() {
    console.log('about')
    this.fetchUrl()
  },
  methods: {
    fetchUrl() {
      const request = axios.create()

      request
        .get(
          'https://76f49b91-f08e-4f2e-a611-3152b3384631.mock.pstmn.io/performance/getAreaList?startDate=2021-08-11%2009:00:00&endDate=2021-08-16%2023:00:00&projectId=10',
          {
            params: {
              startDate: '2021-08-11 09:00:00',
              endDate: '2021-08-11 23:00:00',
              projectId: 10
            },
            withCredentials: false
          }
        )
        .then(data => {
          console.log(data)
        })
    }
  }
}
</script>

<style scoped></style>
