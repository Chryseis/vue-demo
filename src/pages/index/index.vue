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
    <img src="@/assets/imgs/img1.png" alt="" @load="imgLoad" />
    <img :src="data.src" alt="" @load="imgLoad" />
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
    this.mockRequest(
      {
        name: 'allen',
        sex: 'male',
        major: 'engineer',
        src: require('@/assets/imgs/img2.png')
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
      try {
        const roundByFour = (num, digits = 4) => {
          if (num) {
            return parseFloat(num.toFixed(digits))
          }
          return 0
        }

        let ccp

        const navigationTiming =
          performance.getEntriesByType('navigation').length > 0
            ? performance.getEntriesByType('navigation')[0]
            : performance.timing
        const resource = performance.getEntriesByType('resource')

        const dns = navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart
        const tcp = navigationTiming.connectEnd - navigationTiming.connectStart
        const html = navigationTiming.responseEnd - navigationTiming.requestStart
        const domParse = navigationTiming.domInteractive - navigationTiming.responseEnd
        const fcp = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')
          ?.startTime

        const jsArr = resource.filter(r => /^.+\.js(?:\?.+|)$/.test(r.name))
        const cssArr = resource.filter(r => /^.+\.css(?:\?.+|)$/.test(r.name))
        const images = document.querySelectorAll('img')

        images.forEach(image => {
          image.onload = () => {
            ccp = performance.now()
          }
          image.onerror = err => {
            console.log('image err', err)
          }
        })

        const jsLoadDuration =
          jsArr.length > 0
            ? Math.max(...jsArr.map(ele => ele.responseEnd)) - Math.min(...jsArr.map(ele => ele.fetchStart))
            : 0

        const cssLoadDuration =
          cssArr.length > 0
            ? Math.max(...cssArr.map(ele => ele.responseEnd)) - Math.min(...cssArr.map(ele => ele.fetchStart))
            : 0

        const stopEvent = ['click', 'touchstart']

        const timeLimit = 5000

        let timerId

        let lcp = 0

        let po

        if (!!PerformanceObserver && PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')) {
          po = new PerformanceObserver(l => {
            l.getEntries().forEach(entry => {
              if (entry.startTime) {
                lcp = roundByFour(entry.startTime)
              }
            })
          })

          po.observe({ type: 'largest-contentful-paint', buffered: true })
        }

        const handleEvent = () => {
          timerId && clearTimeout(timerId)
          po && po.disconnect()
          ccp = Math.min(timeLimit, ccp)

          __bl.performance({
            cfpt: fcp,
            ctti: roundByFour(ccp),
            t1: roundByFour(dns),
            t2: roundByFour(tcp),
            t3: roundByFour(navigationTiming.responseStart - navigationTiming.requestStart),
            t4: roundByFour(navigationTiming.responseEnd - navigationTiming.responseStart),
            t5: roundByFour(html),
            t6: lcp,
            t7: roundByFour(domParse),
            t8: roundByFour(jsLoadDuration),
            t9: roundByFour(cssLoadDuration)
          })

          stopEvent.forEach(event => {
            document.body.removeEventListener(event, handleEvent)
          })
        }

        stopEvent.forEach(event => {
          document.body.addEventListener(event, handleEvent, { once: true })
        })

        timerId = setTimeout(() => {
          handleEvent()
        }, timeLimit)
      } catch (err) {
        console.log(err)
      }
    },
    imgLoad(e) {
      console.log('img load', e, performance.now())
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
