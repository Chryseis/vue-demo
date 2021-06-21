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
      data: {}
    }
  },
  mounted() {
    let i = 0

    while (i < 100000) {
      i = i + 1
    }

    this.mockRequest(
      {
        name: 'allen',
        sex: 'male',
        major: 'engineer'
      },
      300
    ).then(data => {
      this.data = data
      this.computePerformance()
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
      window.addEventListener('load', () => {
        const navigationTiming = performance.getEntriesByType('navigation')[0]
        const resource = performance.getEntriesByType('resource')

        const dns = navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart
        const tcp = navigationTiming.connectEnd - navigationTiming.connectStart
        const html = navigationTiming.responseEnd - navigationTiming.requestStart
        const domParse = navigationTiming.domInteractive - navigationTiming.responseEnd
        const domComplete = navigationTiming.domComplete - navigationTiming.fetchStart
        const ccp = performance.now()
        const fcp = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')
          .startTime

        const po = new PerformanceObserver(l => {
          l.getEntries().map(entry => {
            if (entry.startTime) {
              __bl.performance({
                cfpt: fcp,
                ctti: ccp,
                t1: dns,
                t2: tcp,
                t3: navigationTiming.requestStart,
                t4: navigationTiming.responseEnd,
                t5: html,
                t6: entry.startTime,
                t7: domParse
              })
            }
          })
        })

        po.observe({ type: 'largest-contentful-paint', buffered: true })
      })
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
