module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    pkgFile: 'package.json',

    eslint: {
      target: [
        '*.js'
      ]
    },

    'npm-publish': {
      options: {
        abortIfDirty: true
      }
    },

    'npm-contributors': {
      options: {
        commitMessage: 'chore: Update contributors'
      }
    },

    bump: {
      options: {
        updateConfigs: ['pkg'],
        commitFiles: ['package.json', 'CHANGELOG.md'],
        commitMessage: 'chore: release v%VERSION%',
        pushTo: 'upstream',
        push: false,
        gitDescribeOptions: '| echo "beta-$(git rev-parse --short HEAD)"'
      }
    }
  })

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('default', ['eslint'])

  grunt.registerTask('release', 'Bump the version and publish to npm.', function (type) {
    grunt.task.run([
      'npm-contributors',
      'bump:' + (type || 'patch') + ':bump-only',
      'changelog',
      'bump-commit',
      'npm-publish'
    ])
  })
}
