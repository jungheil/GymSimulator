function showEWM(yzm){
	$('.qrcode-view').find('div[id^=yzm_]').hide();
	$('.qrcode-view').find('div[id^=yzm_'+yzm+']').show();
	//$('#yzm_'+yzm).show();
	$('.code-number').html(yzm);
	$("#code").empty();
	//海大通过判断预约开始时间，显示不同二维码颜色（开始前5分钟至预约时间结束为绿色，其他时间为红色）
	/*var data={};
	data.detailid=yzm;
	data.minite=5;
	AjaxGet("/order/orderProofTime",data,function(obj){
		if(obj.result=="1"){
			$("#code").qrcode({
				render: "table",
				width: 200,
				height:200,
				text: yzm,
				background: "#ffffff",//背景颜色  
				foreground: "green", //前景颜色
			});
		}else{
			$("#code").qrcode({
				render: "table",
				width: 200,
				height:200,
				text: yzm,
				background: "#ffffff",//背景颜色  
				foreground: "red", //前景颜色
			});
		}
		$("#yzmcode").val(yzm);
	    $('.qrcode-view').show();
	    $('.wrapper').hide();
	},"json");*/
	
	$("#code").qrcode({
		render: "table",
		width: 200,
		height:200,
		text: yzm,
		background: "#ffffff",//背景颜色  
		foreground: "#000", //前景颜色
	});
	$("#yzmcode").val(yzm);
    $('.qrcode-view').show();
    $('.wrapper').hide();
}  
function checkOrder(id){
	var param = {};
	param.id = id;
	AjaxGet('/yyorderdetail/seachOrder', param, seachSuccess, 'html');
}
function seachSuccess(o) {
	if (o.indexOf('hasorder') >= 0) {
		$('.wrapper').hide();
		$('#checkOrderBox').show();
		$('#checkOrderBox').html(o);
	} else {
		info('未查到订单信息');
	}
}
$(function() {
	//订单验证页面关闭按钮动作
	$("#checkOrderBox").on("click","#closeDetailBtn",function(){
		$('#checkOrderBox').hide();
		$('.wrapper').show();
	});
});
