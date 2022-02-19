import child_process from 'child_process'

export async function get() {
  const option = ['--project=./scripts', './scripts/types.jl']
  const julia = child_process.spawnSync('julia', option, { timeout: 200000 })

  if (julia.stderr && julia.stderr.length) {
    console.log(option, Error(julia.output[2].toString()))
  }
  const s = julia.stdout.toString()
  const data = JSON.parse(s)
  return {
    body: { data },
  }
}
