/*
 * grunt-init-sample-app
 *
 */

'use strict';

// Description
exports.description = 'This grunt-init template will creates a sample app in your current directory.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Here are some notes.';

// Template-specific notes to be displayed after question prompts.
exports.after = "You should now install the project's  dependencies\n" +
                "To do so run the command `npm install`.\n";

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template
exports.template = function (grunt, init, done) {

  // init.process(options, prompts, done)
  init.process({/* Not sure about these options yet*/}, [
      init.prompt('name'),
      init.prompt('description'),
      init.prompt('version'),
      init.prompt('title'),
      init.prompt('author_name'),
      init.prompt('author_email'),
      init.prompt('author_url')
    ], function(err, props){

    // Directory for bower components, no trailing slash!
    props.pathToBower = "components";

    // These get added to package.json
    props.scripts = {
      "postinstall":  "bower install",
      "postupdate": "bower update"
    };

    props.devDependencies = {
      "grunt": "~0.4.1",
      "grunt-contrib-uglify": "~0.2.1",
      "grunt-contrib-concat": "~0.3.0",
      "grunt-contrib-jshint": "~0.5.4",
      "grunt-contrib-watch": "~0.4.3",
      "grunt-contrib-qunit": "~0.2.1"
    };

    // copy files over.
    var files = init.filesToCopy(props);
    init.copyAndProcess(files, props);

    // Write package.json
    init.writePackageJSON('package.json', props, function(pkg, props){
      if('scripts' in props) {
        pkg.scripts = props.scripts;
      }

      return pkg;
    });

    // Write bower.json file.
    init.writePackageJSON('bower.json', {
      name: props.name,
      version: props.version,
      ignore: [
        "**/.*",
        "node_modules",
        "components"
      ],
      dependencies: {
        "ember": "~1.0.0-rc.3",
        "bootstrap.css": "~2.1.1"
      },
      devDependencies: {
        qunit: '*'
      }

    });

    done();
  });
};