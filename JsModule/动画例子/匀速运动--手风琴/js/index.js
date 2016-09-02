/**
 *
 * 手风琴动画封装
 *
 * html结构要求：
 * 	1.data-flag属性表示方向  1：左侧，2：右侧
 * 	
 * <div class="banner" id="banner">
		<div class="banner_box" data-flag="1">
			<img class="img1" src="img/1.jpg" data-flag="1">
			<img class="img2" src="img/2.jpg" data-flag="1">
			<img class="img3" src="img/3.jpg" data-flag="1">
			<img class="img4" src="img/4.jpg" data-flag="1" >
		</div>
	</div>
 */

var params =(function(){
	var Params ={
		bannerNode: null,
		imgNum: 0,	    //当前图片张数图片数量
		imgMaxNum: 0,	//图片数量
		imgWidth: 0,	//图片的宽度
		imgOut: 0,      //图片之间的间隔距离
		timer: 0,      //自动轮播间隔事件
		interval: 0,
		interval2: 0,
		tag: true
	};
	return Params;
}());

window.onload = function(){
	params.bannerNode = document.getElementById('banner');
	params.imgNum = 4;
	params.imgMaxNum = 4;
	params.imgWidth = 400;
	params.imgOut = 40;
	params.tag = true;
	params.timer = 3000;
	//1.注册点击事件
	EventUtil.addHandler(params.bannerNode,'click',handler);
	//2.自执行
	params.interval2 = setInterval(iife,params.timer);
}
//点击事件handler
function handler(e){
	e = EventUtil.getEvent(e);
	var target =EventUtil.getTarget(e);
	clearInterval(params.interval2);
	switch(target.className){
		case 'img1':
			clickHandler(target,1);
			break;
		case 'img2':
			clickHandler(target,2);
			break;
		case 'img3':
			clickHandler(target,3);
			break;
		case 'img4':
			clickHandler(target,4);
			break;
	}
	params.interval2 = setInterval(iife,params.timer);
}
//根据点击目标确定要执行的操作
function clickHandler(target,num){
	//防止重复点击，只准许每次操作完成后进行下一次操作
	if(params.interval == 0){
		var speed =20; //每个周期移动的距离
		var node = target.parentNode.children;
		var width = params.imgWidth+(num-1)*params.imgOut; //右侧移动时的边界
		var width2 = (num-1)*params.imgOut; //左侧移动时的边界
		params.interval =setInterval(function(){
			params.imgNum = num;
			//1.判断移动的方向
			if(target.getAttribute('data-flag') == '1'){
				//向右侧移动
				if(num != params.imgMaxNum){
					//2.向右侧移动的边界判断
					if(node[num].offsetLeft + speed >= width){
						//边界处理，规整位置
						for(var i= num;i< params.imgMaxNum;i++){
							node[i].style.left = width+'px';
							width += params.imgOut;
							node[i].setAttribute("data-flag","2");
						}
						clearInterval(params.interval);
						params.interval = 0;
					}else{
						//当前点击目标的所有其上面的图片向右移动
						for(var i=num;i < params.imgMaxNum;i++){
							//判断其上面的图片是否已经在右侧
							if(node[i].getAttribute("data-flag") == '2'){
								continue;
							}else{
								node[i].style.left = node[i].offsetLeft+speed+'px';
							}
						}
					}
				}else{
					clearInterval(params.interval);
					params.interval = 0;
					return;
				}
			}else{
				//2.向左侧移动的边界判断
				if(node[num-1].offsetLeft - speed <= width2){
					//边界处理，规整位置
					for(var i= num-1; i >0; i--){
						node[i].style.left = width2+'px';
						width2 -= params.imgOut;
						node[i].setAttribute("data-flag","1");
					}
					clearInterval(params.interval);
					params.interval = 0;
				}else{
					//当前点击目标的所有其下面的图片向左移动
					for(var i= 1;i < num;i++){
						//判断其下面的图片是否已经在左侧
						if(node[i].getAttribute("data-flag") == '1'){
							continue;
						}else{
							node[i].style.left = node[i].offsetLeft-speed+'px';
						}
					}
				}
			}
		},60);
	}
}
//setInterval回调函数
function iife(){
	if(params.imgNum <= 1){
		params.tag =false;
	}else if (params.imgNum >= 4){
		params.tag=true;
		params.imgNum =4;
	}
	if(params.tag){
		params.imgNum--;
		clickHandler(params.bannerNode.children[0].children[params.imgNum],params.imgNum);
	}else{
		params.imgNum++;
		clickHandler(params.bannerNode.children[0].children[params.imgNum-1],params.imgNum);
	}
}