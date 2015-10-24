
module.exports = function(grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        
		
		smart_template:{
			options:{
				baseUrl:"<%=pkg.basePath%>",
			},
			doit:{
				expand: true,
				cwd: '<%=pkg.basePath%>/',
				src: ['**/tpl/*.html'],
				dest: '<%=pkg.basePath%>/',
				ext: '.js',
			},
		},
		
		
		watch:{

			tpl:{
				files: '<%=pkg.basePath%>/**/tpl/*.html',
				tasks: ['smart_template']
			},
			
		},
		
		
		
		
		
    });
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadTasks( "built" );
	
	grunt.registerTask('default', ['smart_template','watch']);
	
}; 

















