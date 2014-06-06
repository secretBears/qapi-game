requirejs.config({
  wrap: true,
  insertRequire: ['qapi-game'],
  deps: ['qapi-game'],
  shim: {
  },
  paths: {
    'qapi-game': 'main',
    'jquery': '../../../../../bower_components/jquery/dist/jquery',

    'jquery-ujs': '../../../../../bower_components/jquery-ujs/src/rails'

  }
})

