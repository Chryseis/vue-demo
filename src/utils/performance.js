const observer = new PerformanceObserver((list, observe) => {
  console.log(list.getEntries());
  observe.disconnect();
});
observer.observe({ entryTypes: ['navigation'] });

const observer1 = new PerformanceObserver((list, observe) => {
  console.log(list.getEntries());
  //observe.disconnect();
});
observer1.observe({ type: 'first-input', buffered: true });

const observer2 = new PerformanceObserver((list, observe) => {
  console.log(list.getEntries());
  //observe.disconnect();
});
observer2.observe({ type: 'largest-contentful-paint', buffered: true });

export { observer, observer1, observer2 };
