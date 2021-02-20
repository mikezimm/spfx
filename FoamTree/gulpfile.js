'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

//Added for this project:  https://stackoverflow.com/questions/50968594/gulp-bundle-ship-the-build-failed-because-a-task-wrote-output-to-stderr
build.addSuppression(`Warning - tslint - src/webparts/foamtree/FoamtreeWebPart.ts(24,5): error no-unused-expression: unused expression, expected an assignment or function call`);

build.initialize(require('gulp'));
