function sleep() {
  console.log('bigJs exec', performance.now())
  let flag = true
  const start = performance.now()
  while (flag) {
    if (performance.now() - start > 3000) {
      flag = false
    }
  }
}

sleep()
