function qiang(){
	var url = document.location.hostname.slice(0,document.location.hostname.indexOf('.'));
	if(url == 'www'){
		//预约页面
		console.log('www URL匹配成功，开始执行准备抢购程序')
		pre();
	}else if(url == 'item'){
		//选择配置页面
		console.log('item URL匹配成功，开始执行选择配置程序')
		choose();
	}else if(url == 'cart'){
		console.log('cart URL匹配成功，开始执行...')
		var nextBtn = document.querySelector('#nextBtn')
		nextBtn.click();
	}else if(url == 'account'){
		var login = document.querySelector('#login-button');
		login.click();
	}else if(url == 'static'){
		console.log('static URL匹配成功，开始执行购物车信息填写')
		cart();
	}else if( url == 'order'){
		console.log('order URL匹配成功，开始执行地址填写')
		pay();
	}
	
}

//第一个页面
//获取立即购买按钮并且完成跳转
function pre(){
	var nav = document.querySelector('.nav').children[1];
	var btn = document.querySelector('.J_buyBtn');
	if(nav.innerHTML == '立即购买' || btn.innerHTML == '立即购买'){
		if(nav){
			tiemr(nav);
			console.log('nav 存在');
		}else if(btn){
			tiemr(btn);
			console.log('nav 不存在 btn 存在');
		}else{
			console.log('跳转中选购页面');
		}
	}
}

//时间函数
function tiemr(btn){
	console.log('启动抢购程序')
	var timer = setInterval(function(){
		var hour = new Date().getHours();
		var minute = new Date().getMinutes();
		if(hour==10&&minute==0){
	        btn.click();
			clearInterval(timer);
	    }else{
			console.log('秒：'+ new Date().getSeconds())
		}
	},1000);
}

//第二个页面
//版本选择页面
function choose(){
	//选择版本和颜色和套餐
	var J_proStep = document.querySelector('#J_proStep');
	if(J_proStep){
		console.log('开始选择配置信息')
		var pro = J_proStep.children;
		for(var i=0,len = pro.length;i<len;i++){
			var ul = pro[i].children[1];
			ul.children[0].click();
			if(i==len-1){
				var timer2 = setInterval(function(){
					if(pro[len]){
						clearInterval(timer2);
						var peijian = document.querySelector('#J_choosePackage');
						peijian.children[1].children[0].click();
						//选择下一步
						var next = document.querySelector('#J_proBuyBtn')
						next.click();
						console.log('已点击');
						return;
					}
				},1);
			}
			
		}
	}
}

//第三个页面
//购物车
function cart(){
	console.log('开始填写购物车信息')
	var btn = document.querySelector('#J_goCheckout');
	btn.click();
}

//第四个页面
//收货地址
function pay(){
	console.log('开始填写收货地址')
	var address = document.querySelector('#J_addressList');
	address.children[0].click();
	var pay = document.querySelector('#J_checkoutToPay');
	pay.click();
}
qiang();