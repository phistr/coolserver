const assert = require('assert')

async function test() {
  await sleep(4000)
  assert.equal(true, true);
}
function test2() {
  assert.equal(false, true);
}

async function sleep(msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}
test()
//test2()
