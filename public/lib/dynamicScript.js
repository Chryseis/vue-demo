console.log('dynamic script start', performance.now())
let script = document.createElement('script')

script.src = '//lib.baomitu.com/jquery/3.4.0/jquery.js'

document.body.appendChild(script)

script.onload = function() {
  console.log('dynamic script load', performance.now())
}

console.log('dynamic script end', performance.now())
