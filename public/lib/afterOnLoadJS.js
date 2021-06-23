window.addEventListener('load', () => {
  let script = document.createElement('script')

  script.src = '//lib.baomitu.com/jquery/3.6.0/jquery.js'
  // script.src = './lib/bigJs.js'

  document.body.appendChild(script)

  script.onload = function() {
    console.log('afterOnLoadJs', performance.now())
  }
})
