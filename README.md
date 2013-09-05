# smart-template

> if your subject contains underscore and requirejs,and you also use the template function provided by underscore,you will need it.


## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install smart-template --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('smart-template');
```

## The "smart_template" task


### Options

#### options.prefix
Type: `String`
Default value: `''`

A string value that is used as the prefix a module name.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  smart_template: {
    options: {
		prefix:'',
	},
    files: {
      'dest/tpl.js': ['src/tpl.html'],
    },
  },
})
```
content of compiled files just like a requirejs module
the name of module is from the filename without ext of the html file 
```js
define( moduleName, [], function(data){ 
	... 
});
```
#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  smart_template: {
    options: {
      prefix: 'TPL_',
    },
    files: {
      'dest/tpl.js': [''src/tpl_1.html', 'src/tpl_2.html'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
