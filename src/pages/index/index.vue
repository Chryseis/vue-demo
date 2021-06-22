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
      const roundByFour = (num, digits = 4) => {
        try {
          return parseFloat(num.toFixed(digits))
        } catch (e) {
          return 0
        }
      }

      window.addEventListener('load', () => {
        const navigationTiming =
          performance.getEntriesByType('navigation').length > 0
            ? performance.getEntriesByType('navigation')[0]
            : performance.timing
        const resource = performance.getEntriesByType('resource')

        const dns = navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart
        const tcp = navigationTiming.connectEnd - navigationTiming.connectStart
        const html = navigationTiming.responseEnd - navigationTiming.requestStart
        const domParse = navigationTiming.domInteractive - navigationTiming.responseEnd
        const ccp = performance.now()
        const fcp = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')
          ?.startTime

        const jsArr = resource.filter(r => /^.+\.js(?:\?.+|)$/.test(r.name))
        const cssArr = resource.filter(r => /^.+\.css(?:\?.+|)$/.test(r.name))

        const jsLoadDuration =
          jsArr.length > 0
            ? Math.max(...jsArr.map(ele => ele.responseEnd)) - Math.min(...jsArr.map(ele => ele.fetchStart))
            : 0

        const cssLoadDuration =
          cssArr.length > 0
            ? Math.max(...cssArr.map(ele => ele.responseEnd)) - Math.min(...cssArr.map(ele => ele.fetchStart))
            : 0

        if (!!PerformanceObserver && PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')) {
          const po = new PerformanceObserver(l => {
            l.getEntries().map(entry => {
              if (entry.startTime) {
                __bl.performance({
                  cfpt: roundByFour(fcp),
                  ctti: roundByFour(ccp),
                  t1: roundByFour(dns),
                  t2: roundByFour(tcp),
                  t3: roundByFour(navigationTiming.requestStart),
                  t4: roundByFour(navigationTiming.responseEnd),
                  t5: roundByFour(html),
                  t6: roundByFour(entry.startTime),
                  t7: roundByFour(domParse),
                  t8: roundByFour(jsLoadDuration),
                  t9: roundByFour(cssLoadDuration)
                })
              }
            })
          })

          po.observe({ type: 'largest-contentful-paint', buffered: true })
        } else {
          __bl.performance({
            cfpt: roundByFour(fcp),
            ctti: roundByFour(ccp),
            t1: roundByFour(dns),
            t2: roundByFour(tcp),
            t3: roundByFour(navigationTiming.requestStart),
            t4: roundByFour(navigationTiming.responseEnd),
            t5: roundByFour(html),
            t6: 0,
            t7: roundByFour(domParse),
            t8: roundByFour(jsLoadDuration),
            t9: roundByFour(cssLoadDuration)
          })
        }
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
