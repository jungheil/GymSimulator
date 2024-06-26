$(function() {
	$('.mescroll').css('top', $('#csstop').val());
	var vm = new Vue(
			{
				el : "#dataList",
				data : {
					mescroll : null,
					pdlist : []
				},
				mounted : function() {
					// 创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
					// 解析: 下拉回调默认调用mescroll.resetUpScroll();
					// 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
					var self = this;
					self.mescroll = new MeScroll(
							"mescroll",
							{
								up : {
									callback : self.upCallback, // 上拉回调
									// 以下参数可删除,不配置
									page : {
										size : 8
									}, // 可配置每页8条数据,默认10
									toTop : { // 配置回到顶部按钮
										src : ctxpath
												+ "/themes/mobile/mescroll-master/demo/res/img/mescroll-totop.png", // 默认滚动到1000px显示,可配置offset修改
										offset : 500
									},
									empty : { // 配置列表无任何数据的提示
										warpId : "dataList",
										icon : ctxpath
												+ "/themes/mobile/mescroll-master/demo/res/img/mescroll-empty.png",
									}
								}
							});

					// 初始化vue后,显示vue模板布局
					document.getElementById("dataList").style.display = "block";
				},
				methods : {
					// 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始;
					// size:每页数据条数,默认10
					upCallback : function(page) {
						// 联网加载数据
						var self = this;
						getListDataFromNet(page.num, page.size, function(data) {
							// 如果是第一页需手动制空列表
							if (page.num == 1)
								self.pdlist = [];
							// 更新列表数据
							self.pdlist = self.pdlist.concat(data);
							// 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
							// 传参:数据的总数;
							// mescroll会自动判断列表是否有无下一页数据,如果数据不满一页则提示无更多数据;
							self.mescroll.endSuccess(data.length);
						}, function() {
							// 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
							self.mescroll.endErr();
						});
					},
					getHref : function(url, par, val) {// 获取跳转地址
						return cu(url) + '?' + par + '=' + val;
					},
					getPic : function(val) {// 获取图片
						return ctxpath
								+ '/upload/image/'
								+ (val != null ? val.substring(0, 22)
										: 'default.jpg');
					},
					delorder : function(val) {// 删除订单
						waringM('delOrder', val);
						/*
						 * var param = {}; param.orderid = val;
						 * AjaxPost("/order/delorder", param, function(o) {
						 * if(o.result=='1'){ info(o.message);
						 * $('.del_'+val).remove(); // window.location.href =
						 * cu('/order/orderlist'); }else{ info(o.message); } });
						 */
					},
					toHref : function(url, par, val) {// 点击跳转
						window.location.href = cu(url) + '?' + par + '=' + val;
					},
					formatPar : function(val) {// 数据处理
						if (val != null && val.length > 4) {
							var a = [];
							for (var i = 0; i < 4; i++) {
								a.push(val[i]);
							}
							return a;
						} else {
							return val;
						}
					},
					classa : function(val) {// 点击跳转
						return 'button button-plain del_' + val;
					}
				},
			});
})

function delOrder(orderid) {
	var param = {};
	param.orderid = orderid;
	AjaxPost("/order/delorder", param, function(o) {
		if (o.result == '1') {
			info(o.message);
			$('.del_' + orderid).remove();
			// window.location.href = cu('/order/orderlist');
		} else {
			info(o.message);
		}
	});
}

/* 加载列表数据 */
function getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
	// 延时一秒,模拟联网
	// setTimeout(function() {
	// 	axios.get(cu('/yyuser/searchorder'), {
	// 		params : {
	// 			page : pageNum, // 页码
	// 			rows : pageSize, // 每页长度
	// 			status : $('#status').val(),
	// 			iscomment : $('#iscomment').val(),
	// 			stockSDate : $('#sdate').val(),
	// 			stockEDate : $('#edate').val()
	// 		}
	// 	}).then(function(response) {
	// 		var listData = response.data;// 分页数据
	// 		$.each(listData, function(i, item) {
	// 			if (item.successdate) {
	// 				if(item.successdate.substring(0, 10)==getNowFormatDate(new Date)){
	// 					item.flag="1";
	// 				}else
	// 					item.flag="0";
	// 			}
	// 			else{
	// 				item.flag="0";
	// 			}
	// 		})
	// 		successCallback && successCallback(listData);// 成功回调
	// 		$('#dataList').show();
	// 	})
	// }, 200)
}
