/**
 * 轮播图banner.js使用说明：
 * 	 对html层次结构的要求：
 * 		1.class和id可以自定义。
 * 		2.banner_bg为最外层盒子（控制图片可视区域）。
 * 		3.banner_box为承载图片的盒子，注意图片的摆放顺序。
 * 		4.banner_btn为左右按钮，要求必须把左右按钮的class名称传进banner方法。
 * 		5.banner_num为图片‘索引’小按钮，要求class命名为‘num1/num2/num3...’格式。
 * 	
 *  <div class="banner_bg" id="banner">
		<div class="banner_box" style="left:-1310px">
			<img src="images/banner4.jpg"/>
			<img src="images/banner1.jpg"/>
			<img src="images/banner2.jpg"/>
			<img src="images/banner3.jpg"/>
			<img src="images/banner4.jpg"/>
			<img src="images/banner1.jpg"/>
		</div>
		<div class="banner_btn">
			<span class="banner_lbtn">&lt;</span>
			<span class="banner_rbtn">&gt;</span>
		</div>
		<div class="banner_num">
			<span class="num1 seclect"></span>
			<span class="num2"></span>
			<span class="num3"></span>
		</div>
	</div>
	.banner{
		height: 452px;
		position: relative;
		overflow: hidden;
		z-index: 0;
	}
	.banner_bg{
		position: absolute;
		width: 1310px;
		height: 452px;
		left: 50%;
		margin-left: -654px;
		overflow: hidden;
	}
	.banner_box{
		position: absolute;
		height: 452px;
		width: 6540px;
		font-size: 0;
		letter-spacing: -5px;
	}

	.banner_btn{
		position: absolute;
		width: 90%;
		left: 0;
		right: 0;
		margin: auto;
		top: 200px;
		font:  20px "宋体";
		font-weight: bold;
	}
	.banner_btn span{
		border: 1px solid #fff;
		border-radius: 50%;
		float: left;
		width: 36px;
		line-height: 36px;
		text-align: center;
		color: #fff;
		cursor: pointer;
	}
	span.banner_rbtn{
		float: right;
	}
	.banner_btn span:hover{
		background: #ccc;
	}

	.banner_num{
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 20px;
		text-align: center;
	}
	.banner_num span{
		width: 8px;
		height: 8px;
		display: inline-block;
		margin-right: 15px;
		background: #ccc;
		border-radius: 50%;
	}
	.banner_num .seclect{
		background: #fff;
	}
	.banner_num span:hover{
		background: #fff;
		cursor: pointer;
	}
 *
 *  对其他js文件的依赖关系：
 *  	1.Util.js（内有EventUtil的支持）
 *
 * Created by chping on 2016/8/17.
 */


/*=================banner start=======================*/
//必备参数
var params = (function(){
	var Params ={
		bannerBox: '',
		imgW: 0,
		imgBigNum: 3,
		lbtn:'',
		rbtn:'',
		numDc: '',
		numSc: '',
		timer: 0,
		speed: 0,
		imgNum: 2,//当前图片的下标（从0开始）
		interval: 0,
		flag: true
	};
	return Params;
})();

/**
 * [轮播图入口方法]
 * @param  {[Element]} bannerNode            [承载img,btn,num的父节点]
 * @param  {[number]}  imgW                  [img的宽度]
 * @param  {[number]}  imgBigNum             [图片的真实数量]
 * @param  {[string]}  banner_lbtn           [向左按钮class]
 * @param  {[string]}  banner_rbtn           [向右按钮class]
 * @param  {[string]}  numDc                 [num按钮默认颜色]
 * @param  {[string]}  numSc                 [num按钮选中颜色]
 * @param  {[number]}  timer                 [图片轮播切换时间]
 * @param  {[number]}  speed                 [单张图片的匀速切换速度]
 */
function banner(bannerNode,imgW,imgBigNum,banner_lbtn,banner_rbtn,numDc,numSc,timer,speed){
	params.bannerBox = bannerNode;
	params.imgW = imgW;
	params.imgBigNum = imgBigNum;
	params.lbtn = banner_lbtn;
	params.rbtn = banner_rbtn;
	params.numDc = numDc;
	params.numSc = numSc;
	params.timer = timer;
	params.speed = speed;
	//自动轮播
	params.interval = setInterval(changeRight,params.timer);
	//鼠标移入图片，自动轮播暂停
	EventUtil.addHandler(params.bannerBox.children[0],'mouseover',handler);
	//鼠标移出图片，自动轮播继续
	EventUtil.addHandler(params.bannerBox.children[0],'mouseout',handler1);
	//向左右切换
	EventUtil.addHandler(params.bannerBox.children[1],'click',handler2);
	//num滑过事件
	EventUtil.addHandler(params.bannerBox.children[2],'mouseover',handler3);
	EventUtil.addHandler(params.bannerBox.children[2],'mouseout',handler4);
}

/*img右切换方法*/
function changeRight(){
	//鼠标滑入滑出图片时周期函数是否执行的开关
	if(params.flag){
		//判断右侧边界，实现左右循环
		if(params.imgNum > params.imgBigNum+1){
			params.bannerBox.children[0].style.left= -params.imgW +'px';
			params.imgNum = 2;
		}
		//num切换
		numChange(params.imgNum-1);
		//img切换
		var leftAdd= setInterval(function(){
			if(parseInt(params.bannerBox.children[0].style.left.slice(1,-2))+params.speed >= (params.imgNum-1)*params.imgW){
				clearInterval(leftAdd);
				params.bannerBox.children[0].style.left = -(params.imgNum-1)*params.imgW+'px';
			} else{
				params.bannerBox.children[0].style.left = 
				parseInt(params.bannerBox.children[0].style.left.slice(0,-2)) - params.speed +'px';
			}
		},50);
		params.imgNum ++;
	}
}

/*img左切换方法*/
function changeLeft(){
	//每次切换完成后imgNum自加了，所以前一张为减2
	params.imgNum -= 2;
	if(params.imgNum < 0){
		params.bannerBox.children[0].style.left=-params.imgW*params.imgBigNum+'px';
		params.imgNum = params.imgBigNum-1;
	}
	//num切换
	numChange(params.imgNum-1);
	//img切换
	var leftAdd= setInterval(function(){
		if(parseInt(params.bannerBox.children[0].style.left.slice(1,-2))-params.speed <= (params.imgNum-1)*params.imgW){
			clearInterval(leftAdd);
			params.bannerBox.children[0].style.left = -(params.imgNum-1)*params.imgW+'px';
		} else{
			params.bannerBox.children[0].style.left = 
			parseInt(params.bannerBox.children[0].style.left.slice(0,-2))+ params.speed +'px';
		}
	},50);	
	params.imgNum ++;
}

/**
 * num选中切换方法
 * @param  [number] selected	[待切换图片的num下标(从0开始)]
 */
function numChange(selected){
	//重置为默认颜色
	for(var i=0;i<params.bannerBox.children[2].children.length;i++){
		params.bannerBox.children[2].children[i].style.background=params.numDc;
	}
	var lengthNum = params.imgBigNum+1;
	//处理两个边界
	if(params.imgNum == lengthNum){
		//当最后一张图片出来时，其实应该是真实的第一张的num变色
		params.bannerBox.children[2].children[0].style.background=params.numSc;
	}else if(selected == -1){
		//当隐藏的第一张图片出来时，起始就是最后一张的num变色
		params.bannerBox.children[2].children[params.imgBigNum-1].style.background=params.numSc;
	}else{
		//待切换图片的num变色
		params.bannerBox.children[2].children[selected].style.background=params.numSc;
	}
}

/*鼠标移入图片暂停自动轮播handler*/
function handler(e){
	e = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(e);
	if(target.nodeName == 'IMG'){
		params.flag = false;
	}
}

/*鼠标移入图片继续自动轮播handler*/
function handler1(e){
	e = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(e);
	if(target.nodeName == 'IMG'){
		params.flag = true;
	}
}

/*img左右切换按钮事件handler*/
function handler2(e){
	e = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(e);
	clearInterval(params.interval);
	//确定事件源，执行不同操作
	switch(target.className){
		case params.lbtn:
			changeLeft();
			break;
		case params.rbtn:
			changeRight();
			break;
	}
	params.interval = setInterval(changeRight,params.timer);
}

/*num切换滑入事件handler*/
function handler3(e){
	e = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(e);
	if(target.className.substr(0,3) == 'num'){
		clearInterval(params.interval);
		//获取当前滑过的num下标
		var mouseoverNum = parseInt(target.className.substr(3,1));
		//判断滑过num在当前num的左侧还是右侧，以便执行不同方向的切换
		if(mouseoverNum >= params.imgNum){
			params.imgNum = mouseoverNum;
			changeRight();
		}else{
			params.imgNum = mouseoverNum+2;
			changeLeft();
		}
	}
}

/*num切换滑出事件handler*/
function handler4(e){
	e = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(e);
	if(target.className.substr(0,3) == 'num'){
		//重启自动轮播
		params.interval = setInterval(changeRight,params.timer);
	}
}
/*=================banner end=======================*/