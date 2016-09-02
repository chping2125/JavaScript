/**
 * 包括EventUtil、DomUtil、WindowUtil、CookeieUtil、RandomUtil、Ajax等常用Util工具类
 *
 * 持续更新中
 * 
 * Created by Administrator on 2016/8/13.
 */
var EventUtil ={
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on'+type] = handler;
        }
    },
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,handler);
        }else{
            element['on'+type] = null;
        }
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    preventDafult:function(event){
        if(event.preventDafult){
            event.preventDafult();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.calcelBubble = true;
        }
    },
    /**
     * 返回鼠标按键键值
     * @param  {[Object]} event [当前鼠标事件]
     * @return {[number]}       [0:左键、1：滑轮键、3：右键]
     */
    getMouseButton:function(event){
        if(document.implementation.hasFeature("MouseEvents","2.0")){
            return event.button;
        }else{
            //针对IE8及以前版本
            console.log('button:'+event.button)
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7: return 0;
                case 4: return 1;
                case 2:
                case 6: return 2;
            }
        }
    },
    /*IE8及以前的浏览器的event不支持pageX属性*/
    getPageX:function(event){
        if(event.pageX === undefined){
            //scrollLeft属性严格模式属于<body>节点对象，混杂模式属于<html>节点对象
            return event.clientX+(document.body.scrollLeft||document.documentElement.scrollLeft);
        }else{
            return event.pageX;
        }
    },
    /*IE8及以前的浏览器的event不支持pageY属性*/
    getPageY:function(event){
        if(event.pageY === undefined){
            //scrollTop属性严格模式属于<body>节点对象，混杂模式属于<html>节点对象
            return event.clientY+(document.body.scrollTop||document.documentElement.scrollTop);
        }else{
            return event.pageY;
        }
    },
    /*滑轮*/
    getWheelDelta:function(event){
        if(event.wheelDelta){
            return (client.engine.opera&&client.engine.opera<9.5?-event.wheelDelta:event.wheelDelta);
        }else{
            return -event.detail*40;
        }
    },
    /*获得键盘值*/
    getCharCode:function(event){
        if(typeof event.charCode == 'number'){
            return event.charCode;
        }else{
            return event.keyCode;
        }
    }
}
var DomUtil ={
    /**
     * 获取第一个子节点
     * @param  {[Object]} node [节点对象]
     * @return {[Object]}      [第一个子节点]
     */
    getFirstChild: function(node){
        return node.firstElementChild || node.firstChild;
    },
    /**
     * 获取最后一个子节点
     * @param  {[Object]} node [节点对象]
     * @return {[Object]}      [最后一个子节点]
     */
    getLastChild:function(node){
        return node.lastElementChild || node.lastChild;
    },
    /**
     * 获取上一个子节点
     * @param  {[Object]} node [节点对象]
     * @return {[Object]}      [下一个子节点]
     */
    getNextSibling:function(node){
        return node.nextElementSibling || node.nextSibling;
    },
    /**
     * 获取最后一个子节点
     * @param  {[Object]} node [节点对象]
     * @return {[Object]}      [第一个子节点]
     */
    getPreviousSibling:function(node){
        return node.previousElementSibling || node.previousSibling;
    },
    /**
     * 获取所有子节点
     * @param  {[Object]}                 Node [节点对象]
     * @return {[Collection/NodeList]}         [子节点的集合或者list]
     */
    getChildNodes:function(Node){
        return Node.children || Node.childNodes;
    },
	/**
     * 实现去除childNodes的空白节点的实现
     * @param  {[HTMLElement]} Node [需要获取子节点的父节点]
     * @return {[Array]}            [子节点数组]
     */
    getChildNodes2:function(Node){
        var collection = Node.childNodes;
        var arr = [];
        for(var i=0;i<collection.length;i++){
            if(collection[i].nodeType == 1){
                arr.push(collection[i]);
            }
        }
        return arr;
    },
    /*NodeList类数组转为Array*/
    nodeListToArray:function(nodeList){
        var array = null;
        try{
            //正常浏览器
            array = Array.prototype.slice.call(nodeList,0);
        }catch(ex){
            //ie8及以前版本规定NodeList为一个COM对象，所以智能通过枚举的方法转换。
            array = new Array();
            for(var i=0;i<nodeList.length;i++){
                array.push(nodeList[i]);
            }
        }
        return array;
    },
    /*获取css样式*/
    getStyle:function(node,attr){
    	if(node.currentStyle){
    		return node.currentStyle[attr];
    	}else{
    		return window.getComputedStyle(node,false)[attr];
    	}
    }

}
var WindowUtil = {
    getScreenLeft:function(){
        return (typeof window.screenLeft == 'number')?window.screenLeft:window.screenX;
    },
    getScreenTop:function(){
        return typeof window.screenTop == 'number'?window.screenTop:window.screenY;
    },
    getPageWidth:function(){
        var pageWidth = window.innerWidth;
        if(typeof pageWidth != 'number'){
            if(document.compatMode == 'CSS1Compat'){
                pageWidth = document.documentElement.clientWidth;
            }else{
                pageWidth = document.body.clientWidth;
            }
        }
        return pageWidth;
    },
    getPageHeight:function(){
        var pageHeight = window.innerHeight;
        if(typeof pageHeight != 'number'){
            if(document.compatMode == 'CSS1Compat'){
                pageHeight = document.documentElement.clientHeight;
            }else{
                pageHeight = document.body.clientHeight;
            }
        }
        return pageHeight;
    },
    /*获取滚动条距离顶端的距离*/
    getScrollTop:function(){
        return document.documentElement.scrollTop||document.body.scrillTop;
    },
    /*获取滚动条距离左侧的距离*/
    getScrollLeft:function(){
        return document.documentElement.scrollLeft||document.body.scrillLeft;
    }
}
var CookieUtil = {
    addCookie:function(name,value,days){
        var date = new Date();
        date.setDate(date.getDate()+days);
        document.cookie = name+'='+encodeURIComponent(value)+';expires='+date;
    },
    removeCookie:function(name){
        this.addCookie(name,"",-1);
    },
    getCookie:function(name){
        var itemArr = [];
        var a="";
        if(document.cookie.length>0) {
            var cookieArr = document.cookie.split('; ');
            cookieArr.forEach(function (item, index) {
                itemArr = item.split('=');
                if (itemArr[0] == name)
                    a = decodeURIComponent(itemArr[1]);
            });

        }
        return a;
    }
}
var RandomUtil = {
    /*返回包括两个边界的随机数*/
    getRandom1:function(num1,num2){
        //random()产生随机数[0,1),乘上要求区间内数字个数后[0，num2-num1+1)
        //然后加上num1后[num1，num2-num1+1+num1)=[num1,num2+1),此时有两个边界问题存在。
        //第一个是num1的机率必须和其他非边界数机率相同，第二个是虽然取不到num2+1但会取到比num2大，比num2+1
        //小的小数。为了解决这个问题，我们使用floor向下取整，就可以使问题完美解决。
        return Math.floor(Math.random()*(num2-num1+1)+num1);
    }

}
var Ajax ={
   getXHR:function(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }else if(window.ActiveXObject){
            try{
                //ie6之后
                return new ActiveXObject('MSXML2.XMLHTTP');
            }catch(e){
                //ie6之前
                try{
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }catch(e){}

            }
        }else{
            throw new Error('No XHR object available.');
        }
    },
    getAjaxJsonData:function (data) {
        if(JSON.parse){
            return JSON.parse(data);
        }else{
            return window.eval("("+data+")");
        }
    }
}


