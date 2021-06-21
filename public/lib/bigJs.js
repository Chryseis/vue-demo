function sleep() {
  let flag = true
  const start = performance.now()
  while (flag) {
    if (performance.now() - start > 3000) {
      flag = false
    }
  }
}

sleep()
