<template>
  <div class="wrapper">
    <section class="entries">
      <el-button
        v-for="route in routes.filter(r => r.name !== 'index')"
        :key="route.name"
        @click="$router.push(route.path)"
      >
        {{ route.name }}
      </el-button>
    </section>
    <section class="person-info">
      <div class="label">name:{{ data.name }}</div>
      <div class="label">sex:{{ data.sex }}</div>
      <div class="label">major:{{ data.major }}</div>
    </section>
  </div>
</template>

<script>
import { routes } from '@/router'

export default {
  name: 'index',
  data() {
    return {
      routes,
      data: null
    }
  },
  mounted() {
    let i = 0

    while (i < 100000) {
      i = i + 1
    }

    this.mockRequest({
      name: 'allen',
      sex: 'male',
      major: 'engineer'
    }).then(data => {
      this.data = data
    })
  },
  methods: {
    mockRequest(data, delay) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data)
        }, delay)
      })
    },
    computePerformance() {
      const navigationTiming = performance.getEntriesByType('navigation')[0]
      const resource = performance.getEntriesByType('resource')

      const dns = navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart
      const tcp = navigationTiming.connectEnd - navigationTiming.connectStart
      const html = navigationTiming.responseEnd - navigationTiming.requestStart
      const domParse = navigationTiming.domContentLoadedEventEnd - navigationTiming.domInteractive
      const domComplete = navigationTiming.domComplete - navigationTiming.fetchStart
      const ccp = performance.now()
      const fcp = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint').startTime
      let lcp

      const po = new PerformanceObserver(l => {
        l.getEntries().map(entry => {
          lcp = entry.startTime
        })
      })

      po.observe({ type: 'largest-contentful-paint', buffered: true })

      if (lcp) {
        __bl.performance({})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  .entries {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto 20px;
    width: 70%;
  }

  .person-info {
  }
}
</style>
