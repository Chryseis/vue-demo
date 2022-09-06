<template>
  <div class="wrapper">
    <section class="entries">
      <el-button
        v-for="route in routes.filter(r => r.name !== 'index')"
        :key="route.name"
        @click="jump2Page(route.path)"
      >
        {{ route.name }}
      </el-button>
    </section>
    <img src="@/assets/imgs/img1.png" alt="" @load="imgLoad" />
    <img :src="data.src" alt="" @load="imgLoad" />
    <img src="https://allen-static.oss-cn-beijing.aliyuncs.com/assets/banner.jpg" alt="" />
    <img
      src="https://allen-static.oss-cn-beijing.aliyuncs.com/assets/banner.jpg?x-oss-process=image/format,webp"
      alt=""
    />
    <about />
    <slotDemo>
      <template slot="default" slot-scope="sex, age">
        <div>sex = {{ sex }}</div>
        <div>age = {{ age }}</div>
      </template>
    </slotDemo>
    <section class="person-info">
      <div class="label">name:{{ data.name }}</div>
      <div class="label">sex:{{ data.sex }}</div>
      <div class="label">major:{{ data.major }}</div>
    </section>
    <a href="http://localhost:3000/#/" target="_blank">click me</a>
  </div>
</template>

<script>
import { routes } from '@/router'
import axios from 'axios'
import about from './components/about'
import slotDemo from './components/slotDemo'

export default {
  name: 'index',
  components: {
    about,
    slotDemo
  },
  data() {
    return {
      routes,
      data: {}
    }
  },
  mounted() {
    console.log('index')
    this.fetchUrl()
    // this.mockRequest(
    //   {
    //     name: 'allen',
    //     sex: 'male',
    //     major: 'engineer',
    //     src: require('@/assets/imgs/img2.png')
    //   },
    //   300
    // ).then(data => {
    //   this.data = data
    //   // this.computePerformance()
    // })
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
        const fcp = performance
          .getEntriesByType('paint')
          .find(entry => entry.name === 'first-contentful-paint')?.startTime

        const jsArr = resource.filter(r => /^.+\.js(?:\?.+|)$/.test(r.name))
        const cssArr = resource.filter(r => /^.+\.css(?:\?.+|)$/.test(r.name))
        const images = document.querySelectorAll('imgs')

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
      console.log('imgs load', performance.now())
    },
    fetchUrl() {
      const request = axios.create()

      request
        .get(
          'https://76f49b91-f08e-4f2e-a611-3152b3384631.mock.pstmn.io/performance/getMetricsTrendList?startDate=2021-08-17%2000:00:00&endDate=2021-08-17%2023:00:00&projectId=10&href=http://www.baidu.com',
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
    },
    jump2Page(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  .entries {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin: 0 auto 20px;
    width: 70%;
  }

  .person-info {
  }
}
</style>
