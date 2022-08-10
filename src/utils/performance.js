// const observer = new PerformanceObserver((list, observe) => {
//   const roundByFour = (num, digits = 4) => {
//     return parseFloat(num.toFixed(digits))
//   }
//
//   list.getEntries().map(entry => {
//     const {
//       domainLookupStart,
//       domainLookupEnd,
//       connectStart,
//       connectEnd,
//       secureConnectionStart,
//       requestStart,
//       responseStart,
//       responseEnd,
//       domInteractive,
//       domContentLoadedEventEnd,
//       loadEventStart,
//       fetchStart
//     } = entry
//
//     const navigation = {
//       dnsLookup: roundByFour(domainLookupEnd - domainLookupStart),
//       initialConnection: roundByFour(connectEnd - connectStart),
//       ssl: roundByFour(connectEnd - secureConnectionStart),
//       ttfb: roundByFour(responseStart - requestStart),
//       contentDownload: roundByFour(responseEnd - responseStart),
//       domParse: roundByFour(domInteractive - responseEnd),
//       resourceDownload: roundByFour(loadEventStart - domContentLoadedEventEnd),
//       domReady: roundByFour(domContentLoadedEventEnd - fetchStart),
//       pageLoad: roundByFour(loadEventStart - fetchStart)
//     }
//     console.log(navigation)
//     return navigation
//   })
//   observe.disconnect()
// })
// observer.observe({ type: 'navigation', buffered: true })

const observer = new PerformanceObserver((list, observe) => {
  list.getEntries().map(entry => {
    console.log(entry)
  })
  observe.disconnect()
})
observer.observe({ type: 'paint', buffered: true })

const paint = performance.getEntriesByType('paint')

const observer2 = new PerformanceObserver((list, observe) => {
  console.log(list.getEntries())
  //observe.disconnect();
})
observer2.observe({ type: 'largest-contentful-paint', buffered: true })

export { observer, observer2 }
