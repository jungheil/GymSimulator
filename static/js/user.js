/* add by yucc 20191126 西南图书馆top重新规定 start*/
/*var csstop = '222px';*/
var csstop = '273px';
/* add by yucc 20191126 西南图书馆top重新规定 end*/
$(function () {
	if($("#flagI").val()=="0"){
		csstop="263px";
	}
	// $('#orderlist').load(cu('/order/showOrderlist'),{'csstop':csstop});
	$(".temporaryLeave").click(function(){
		if(!$(this).hasClass("active")){
			var info={};
			info.orderdetailid=$(this).data("detailid");
			var tt = this;
			// AjaxGet('/yyuser/temporaryLeave',info,function(o){
			// 	if(o.result == '1'){
			// 		swal({
			// 	      title: '提示信息',
			// 	      text: o.message,
			// 	      type: 'info',
			// 	      confirmButtonText: '确定'
			// 	    })
			// 		$(tt).toggleClass("active");
			// 	}else{
			// 		swal({
			// 		      title: '提示信息',
			// 		      text: o.message,
			// 		      type: 'info',
			// 		      confirmButtonText: '确定'
			// 		    })
			// 	}
			// },'json');
		}
	});
});



function vippay(){
	// AjaxGet('/yyuser/vip',null,function(r){
		
	// 	if(r.indexOf('hasvip') == -1){
	// 		info('未查到代金券信息');
	// 		return false;
	// 	}
		
	// 	$('#vippay').html(r);
	// 	$(".maskbody").fadeIn('fast', function() {
	// 		$("#vippay").show();
	// 	});
	// },'html');
	
}


function toProductPage(id){
	window.location.href = cu('/product/show') + '?id='+id;
}
