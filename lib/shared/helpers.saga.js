// Sometimes local scripts won't simulate latency between actions or maybe
// an async workflow will cause a bit of jank because of abruptness in how
// it operates.  In those cases, drop an `yield call(simulateLatency)`
// invocation into the mix and smooth out the rough edges.
//
export function simulateLatency(ms = 300) {
  return new Promise((resolve) => { setTimeout(resolve, ms) })
}
