;(function(__context){
    var module = {
        id : "118cd57f279558dffcbae8096c7cf113" ,
        filename : "index.js" ,
        exports : {}
    };
    if( !__context.____MODULES ) { __context.____MODULES = {}; }
    var r = (function( exports , module , global ){
    	var $ =__context.____MODULES['8777f761b8463a858236c246bedbce92'];
		exports.ajax = function(){
			$.ajax({
				url: '/web/getJSON',
				method: 'GET',
				data: {},
				success: function(res){
					var str = "";
					$.each(res.data,function(index,value){
						str+="<li>"+value+"</li>";
					});
					$('.ul').html(str);
				}
			})
		}
		exports.count = 1;
    })( module.exports , module , __context );
    __context.____MODULES[ "118cd57f279558dffcbae8096c7cf113" ] = module.exports;
})(this);

/**
 * Node针对CommonJs规范进行的模块包装
 *
 * 在编译过程中，Node对获取的JavaScript文件内容进行了两层IIFE的包装，
 * 这也是为什么每个模块都可以实现作用域的隔离。
 *
 * 1.最外层IIFE包装，此层包装的目的：
 * 		1> 为了传入宿主对象。宿主对象中有一个“____MODULES”数组，储存着每一个模块的映射。
 * 		2> 创建当前模块的module对象，该对象中包括id/filename/exports属性。
 *
 * 2.内层IIFE包装，此层包装的目的：
 * 		1> 从1.中传入的宿主对象中的“____MODULES”数组取出依赖（如果有的话）。
 * 		2> 将该模块需要暴露出去的方法或变量赋值给该module对象的exports对象。
 * 		3> 将该模块的id储存到宿主对象的“____MODULES”数组中，以便其他模块引用依赖。
 *
 *
 *
 * 注：常见问题：在CommonJS中，每个模块都有一个module对象代表当前模块对象，其exports对象中储存了
 * 		暴露给其他模块的变量和方法。
 */
