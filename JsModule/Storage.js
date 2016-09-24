(function(fn) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = fn();
    } else if (typeof define === "function" && define.amd) {
        define([], fn);
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }
        g.storage = fn();
    }
})(function() {
	storage = {
		"getOrSetStorage":  getOrSetStorage,
		"clearStorage": clearStorage
	}
	return storage;

	/**
	 * 添加、修改、获取指定session/local的Storage中的数据
	 * @param type[String](session/local)       指定要存储为sessionStorage/localStorage
	 * @param key[String]                       待添加、修改、获取的Storage的key值
	 * @param value[all Type]                   待添加、修改的Storage的value值,缺省时为获取数据
	 * @return [Boolean/value]                  添加、修改返回Boolean,获取返回value值
	 **/
	function getOrSetStorage(type,key,value){
	  //检查兼容性
	  var storage = checkoutStorage(type)
	  if(storage != null){
	    if(value != undefined){
	      //存一个值，或者改一个值
	      storage.setItem(key,addTagToValue(value));
	      if(storage.getItem(key) != null){
	        return true;
	      }else{
	        return false;
	      }
	    }else{
	      //取一个值
	      var obj = JSON.parse(storage.getItem(key));
	      //防止为空(当value传参为null的时候，key存在，但是Strong中不存在该数据，返回null)
	      if(obj!=null){
	        return obj.value;
	      }
	    }
	  }else{
	    return false;
	  }
	}


	/**
	 * 删除一个或多个Storage中的数据
	 * @param type[String](session/local)       指定要存储为sessionStorage/localStorage
	 * @param key[String]                       待删除的Storage的key值，缺省时为清空所有Storage
	 * @return [Boolean]
	 * */
	function clearStorage(type,key){
	  //检查兼容性
	  var storage = checkoutStorage(type)
	  if(storage != null){
	    if(key != undefined){
	      var flag = storage.getItem(key);
	      if(flag !=null){
	        //当要删除兑现存在的时候继续执行
	        if(confirm('你确定要删除当前同源路径下的'+type+'Storage的'+key+'数据吗？')){
	          storage.removeItem(key);
	          if(storage.getItem(key) == null){
	            return true;
	          }else{
	            //删除不成功回调继续删除
	            clearStorage(type,key);
	          }
	        }
	      }else{
	        return true;
	      }
	    }else{
	      var flag = storage.getItem(key);
	      if(flag !=null){
	        if(confirm('你确定要删除所有当前同源路径下的'+type+'Storage的数据吗？')){
	          storage.clear();
	          if(storage.length == 0){
	            return true;
	          }else{
	            //删除不成功回调继续删除
	            clearStorage(type,key);
	          }
	        }
	      }else{
	        return true;
	      }
	    }
	  }else{
	    return false;
	  }
	}

	function addTagToValue(value){
	  var tag = Object.prototype.toString.call(value).slice(8,-1);
	  var newObj = {
	    "tag":tag,//这里存不存tag没有什么作用
	    "value":value
	  }
	  return JSON.stringify(newObj);
	}

	function checkoutStorage(type){
	  if(type == 'session'){
	    if(window.sessionStorage){
	      return window.sessionStorage;
	    }else{
	      console.log('Your Browser Not Support '+type+'Storage');
	      return  null;
	    }
	  }else if(type == 'local'){
	    if(window.localStorage){
	      return  window.localStorage;
	    }else{
	      console.log('Your Browser Not Support '+type+'Storage');
	      return  null;
	    }
	  }else{
	    console.log('No '+type+'Storage Object');
	    return  null;
	  }
	}
});

