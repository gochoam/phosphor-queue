require('dts-generator').generate({
  name: 'phosphor-queue',
  main: 'phosphor-queue/index',
  baseDir: 'lib',
  files: ['index.d.ts'],
  out: 'lib/phosphor-queue.d.ts',
});
