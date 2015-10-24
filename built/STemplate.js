/*
 * smart-template
 * https://github.com/stevenCJC/smart-template
 *
 * Copyright (c) 2013 steven_chen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	grunt.registerMultiTask('smart_template', 'if your project contains underscore and requirejs,and you also use the template function provided by underscore,you will need it.', function () {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
				prefix : '',
				baseUrl : '../../main-static/trunk/repair-cms/source',
			});
		grunt.log.writeln('begin ' + Object.keys(this.files).length);
		// Iterate over all specified file groups.
		this.files.forEach(function (f) {
			grunt.log.writeln('begin ' + f.dest);
			// Concat specified files.
			var src = f.src.filter(function (filepath) {
					if (!grunt.file.exists(filepath)) {
						grunt.log.warn('Source file "' + filepath + '" not found.');
						return false;
					} else {
						return true;
					}
				}).map(function (filepath) {
					var f = filepath.split(/\/|\\/g);
					f = f[f.length - 1].split(/[^a-z0-9_]/ig);
					f.splice(f.length - 1, 1);
					f = f.join("_");
					return template(grunt.file.read(filepath), f, options);
				});
			if (src.length === 0) {
				nextFileObj();
			} else {
				src = src.join(';');
			}

			// Write the destination file.
			grunt.file.write(f.dest, src);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});
	
	//嵌套模板
	function importTpl(tplData, options) {
		if (!tplData)
			return tplData || '';
		return tplData.replace(/\<\%\@import\s*?[\'\"].+?[\'\"]\s*?\%\>/ig, function (it) {
			console.log(it);
			var filepath = it.replace(/\<\%\@import\s*?[\'\"]|[\'\"]\s*?\%\>/ig, '').replace(/\~/, options.baseUrl);
			var file = grunt.file.read(filepath);
			console.log(filepath);
			return importTpl(file, options);
		});
	}

	function template(text, moduleName, settings) {
		var ArrayProto = Array.prototype,
		ObjProto = Object.prototype,
		FuncProto = Function.prototype;
		var push = ArrayProto.push,
		slice = ArrayProto.slice,
		concat = ArrayProto.concat,
		toString = ObjProto.toString,
		hasOwnProperty = ObjProto.hasOwnProperty;
		var nativeForEach = ArrayProto.forEach,
		nativeMap = ArrayProto.map,
		nativeReduce = ArrayProto.reduce,
		nativeReduceRight = ArrayProto.reduceRight,
		nativeFilter = ArrayProto.filter,
		nativeEvery = ArrayProto.every,
		nativeSome = ArrayProto.some,
		nativeIndexOf = ArrayProto.indexOf,
		nativeLastIndexOf = ArrayProto.lastIndexOf,
		nativeIsArray = Array.isArray,
		nativeKeys = Object.keys,
		nativeBind = FuncProto.bind;

		text = importTpl(text || '', settings);

		var noMatch = /(.)^/;
		var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
		var templateSettings_ = {
			evaluate : /<%([\s\S]+?)%>/g,
			interpolate : /<%=([\s\S]+?)%>/g,
			escape : /<%-([\s\S]+?)%>/g
		};
		var escapes = {
			"'" : "'",
			'\\' : '\\',
			'\r' : 'r',
			'\n' : 'n',
			'\t' : 't',
			'\u2028' : 'u2028',
			'\u2029' : 'u2029'
		};

		var render;
		settings = defaults({}, settings, templateSettings_);

		var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');

		var index = 0;
		var source = "__p+='";
		text.replace(matcher,
			function (match, escape, interpolate, evaluate, offset) {
			source += text.slice(index, offset).replace(escaper,
				function (match) {
				return '\\' + escapes[match];
			});

			if (escape) {
				source += "'+\n((__t=(" + escape + "))==null?'':_escape(__t))+\n'";
			}
			if (interpolate) {
				source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
			}
			if (evaluate) {
				source += "';\n" + evaluate + "\n__p+='";
			}
			index = offset + match.length;
			return match;
		});
		source += "';\n";

		// If a variable is not specified, place data values in local scope.
		if (!settings.variable)
			source = 'with(obj||{}){\n' + source + '}\n';

		source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n function _escape(string) {if (string == null) return ''; return ('' + string).replace(new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'), function(match) {return {'&': '&amp;','<': '&lt;', '>': '&gt;', '\"': '&quot;', '\\'': '&#x27;','/': '&#x2F;'}[match]; });};";

		return 'define([],function(){window.TPL=window.TPL||{}; window.TPL["' + moduleName + '"]=function(' + (settings.variable || 'obj') + '){\n' + source + '};})';

		function defaults(obj) {
			each(slice.call(arguments, 1),
				function (source) {
				if (source) {
					for (var prop in source) {
						if (obj[prop] == null)
							obj[prop] = source[prop];
					}
				}
			});
			return obj;
		};
		function each(obj, iterator, context) {
			if (obj == null)
				return;
			if (nativeForEach && obj.forEach === nativeForEach) {
				obj.forEach(iterator, context);
			} else if (obj.length === +obj.length) {
				for (var i = 0,
					l = obj.length; i < l; i++) {
					if (iterator.call(context, obj[i], i, obj) === breaker)
						return;
				}
			} else {
				for (var key in obj) {
					if (_.has(obj, key)) {
						if (iterator.call(context, obj[key], key, obj) === breaker)
							return;
					}
				}
			}
		};

	};

};
