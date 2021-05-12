const observer = new PerformanceObserver((list, observe) => {
  console.log(list.getEntries());
  observe.disconnect();
});
observer.observe({ entryTypes: ['navigation'] });

const observer1 = new PerformanceObserver((list, observe) => {
  console.log(list.getEntries());
  //observe.disconnect();
});
observer1.observe({ type: 'largest-contentful-paint', buffered: true });
