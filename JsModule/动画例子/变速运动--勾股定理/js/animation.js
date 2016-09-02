/**动画的封装，包括宽高大小和left,top的位置减速柔和变化
  *
  *透明度为1-100之内的整数
  **/
function move(element,target,fn){
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
}