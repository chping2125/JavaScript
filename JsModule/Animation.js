/**
  * 动画的封装：变速运动、匀速运动、鼠标事件在box的位置
  * 	target对象的属性：width、height、left、top、opacity
  *
  * 	说明：使用前，必须引入Util.js工具类
  * 	
  * Created by Administrator on 2016/8/16.
  **/
var Animation ={
    /**
     * [宽高大小和left,top的位置以及透明色减速柔和变化（变速运动）]
     * @param  {[Element]}   element [需要添加动画的节点]
     * @param  {[Object]}    target  [left/top/width/height/opacity的对象和参数]
     * @param  {Function}    fn      [回调函数]
     */
    transfrom:function(element,target,fn){
        //1.取消同一个节点的上一次周期函数，防止对于一个节点多个周期函数出现
        clearInterval(element.timer);
        //2.绑定周期函数
        element.timer = setInterval(function(){
            //用来标记是否target内的所有属性都设置完毕，完毕则取消周期函数
            var isComplete = true;
            //3.循环target内的所有属性并设置
            for(var attr in target){
                //对于透明度（0-1）的特殊范围进行特殊处理
                if(attr == 'opacity'){
                    var current = Math.round(parseFloat(DomUtil.getStyle(element,attr))*100);
                }else{
                    var current = Math.round(parseFloat(DomUtil.getStyle(element,attr)));
                }
                //防止current取值后转为NaN的特殊情况
                if(!current){
                    current = 0;
                }
                //4.（目标值-当前值)/自定义倍数  设置变化速度
                var speed = (target[attr]-current)/10;
                //5.针对速度值进行取整操作，主要是针对小数
                speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
                //6.判断当前值是否达到目标值
                if(current == target[attr]){

                }else{
                    isComplete = false;
                    if(attr == 'opacity'){
                        //透明度的兼容处理
                        element.style.opacity = (current + speed)/100;
                        element.style.filter = 'alpha(opacity:'+parseInt(current +speed)+')';
                    }else{
                        element.style[attr] =current +speed+'px';
                    }
                }
            }
            //7.所有属性设置完毕，清除周期函数，并执行回调函数
            if(isComplete){
                clearInterval(element.timer);
                if(fn){
                    fn();
                }
            }

        },100);
    },
    transform2:function(element,target,speed,fn){
		clearInterval(element.timer);
		element.timer=setInterval(function(){
			var isComplete =true;
			for(var attr in target){
				if(attr == 'opacity'){
                    var current = Math.round(parseFloat(DomUtil.getStyle(element,attr))*100);
                }else{
                    var current = Math.round(parseFloat(DomUtil.getStyle(element,attr)));
                }
                if(!current){
                    current=0
                }
                if(current+speed >=target[attr]){

                }else{
                	isComplete = false;
                	if(attr == 'opacity'){
                		element.style.opacity = (current + speed)/100;
                        element.style.filter = 'alpha(opacity:'+parseInt(current +speed)+')';
                	}else{
                		element.style[attr] = current+speed +'px';
                	}
                }
                if(isComplete){
                    clearInterval(element.timer);
                	if(fn){
                		fn();
                	}
                }

			}
		});
	},
	/**
     * 鼠标移入方向的判断
     * @param  {[HTMLEvent]} event [事件的event对象]
     * @return {[number]}          [1：上、2：右、3：下、4：左]
     * 
     */
	mouseDirection:function(event){
        var target = EventUtil.getTarget(event);
        var x =event.offsetX;
        var y =event.offsetY;
        //左上右下连线的斜率（过二四象限，肯定为负值）
        var k = -target.offsetHeight/target.offsetWidth;
        //左下右上连线斜率应该为上一条的负数，对称性。然后通过斜率比较判断方向
        //k1即进入点的坐标和矩形中心的连线
        var k1 = (y-target.offsetHeight/2)/(x-target.offsetWidth/2);
        /*console.log('k:'+k)
        console.log('k1:'+k1)*/
        //k < k1 < -k鼠标一定是从左右方向移入，反之上下方向
        if(k1 >k && k1< -k){
            //target.offsetWidth/2 > x 左侧移入，反之右侧
            if(target.offsetWidth/2>x){
                return 4;
            }else{
                return 2;
            }
        }else{
            //target.offsetHeight/2>y 上侧移入，反之下侧
            if(target.offsetHeight/2>y){
                return 1;
            }else{
                return 3;
            }
        }
    }
}