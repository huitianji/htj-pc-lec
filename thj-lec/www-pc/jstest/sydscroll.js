/*
*   sydint.btn  -> 按钮
*   sydint.showBulk  -》  折叠层
*
*   sydint.oScrollbar  ->  滚动条
*   sydint.oListbox   -》  列表盒子
*   sydint.oListcontent  -》 列表内容
*
*
* */
var sydint = {};
sydint.btn = $("[data-type='sydinlist-action']");
sydint.foldBlock = $("[data-type='show-block']");
sydint.oScrollbar = $("[data-type='scrollbar']");
sydint.oScrollbarParent = $("[data-type='scrollbar']").parent();
sydint.oListbox = $("[data-type='listbox']");
sydint.oListcontent = $("[data-type='listcontent']");

sydint.barThis = null;//----scrollbar  == mousedown
sydint.clickBarThis = null;// --- scrollbar == btn.click
sydint.oIconUp = null;
sydint.oIconDown = null;
/*
 封装一个通用函数事件
 */
sydint.myAddEvent = function(obj,sEvent,fn){

    if(obj.attachEvent){
        return obj.attachEvent("on"+sEvent,fn);
    }else{
        return obj.addEventListener(sEvent,fn,false);
    }
}
//阻止默认行为
sydint.preDefault = function preDefault(ev){

    var oEvent = ev || event;

    if (oEvent && oEvent.preventDefault){//如果提供了事件对象，则这是一个非IE浏览器

        oEvent.preventDefault();            //阻止默认浏览器动作(W3C)
    }
    else{            //IE中阻止函数器默认动作的方式
        window.event.returnValue = false;
    }
    return false;
};
//
sydint.showBulk = function(obj){

    return obj.parents("[data-type='row-v1']").find("[data-type='show-block']");
}
//
sydint.objHide = function(obj,cls){
    if(cls){
        obj.each(function(i){
            var self = $(this);
            self.removeClass(cls);
        });
    }else{
        obj.each(function(i){
            var self = $(this);
            self.hide();
        });
    }
};
//滚轮事件
sydint.onMouseWheel = function(ev){
    var oEvent = ev || event,
        bDown = true;

    // IE  chrom
    //wheelDelta 上 正
    //-----------下 负
    //火狐下  detail  上   负
    //---------------下   正
    //alert(oEvent.wheelDelta);//ie下wheelDelta

    bDown = oEvent.wheelDelta ? oEvent.wheelDelta <0 : oEvent.detail>0;

    if(bDown){

        sydint.setTop(sydint.clickBarThis.get(0).offsetTop + 10,sydint.clickBarThis);

    }else{

        sydint.setTop(sydint.clickBarThis.get(0).offsetTop - 10,sydint.clickBarThis);

    }
    sydint.preDefault();

}
//v1滚动条内容适配
sydint.adaptation = function(){
    //
    sydint.oScrollbar.each(function(i){

        var a = sydint.oListbox.eq(i).height(),
            b = sydint.oListcontent.eq(i).height();

        sydint.oScrollbar.eq(i).height((a/b)*100 + "%");
    });
}
//设置相对偏移top
sydint.setTop = function(T,sydintBarThis){

    if(T<0){

        T = 0;

    }else if(T > sydintBarThis.parent().height() - sydintBarThis.height()){

        T = sydintBarThis.parent().height() - sydintBarThis.height();

    }
    sydintBarThis.get(0).style.top = T + "px";

    //比例换算
    var scale = T/(sydintBarThis.parent().height() - sydintBarThis.height()),
        oListbox = sydintBarThis.parents("[data-type='plotwhole']").find("[data-type='listbox']"),
        oListcontent = sydintBarThis.parents("[data-type='plotwhole']").find("[data-type='listbox']>div");

    oListcontent.get(0).style.top = -(oListcontent.height() - oListbox.height())*scale + "px";
    document.title = scale;
}
sydint.setTop_f = function(T){

    if(T<0){

        T = 0;

    }else if(T > sydint.barThis.parent().height() - sydint.barThis.height()){

        T = sydint.barThis.parent().height() - sydint.barThis.height();

    }
    sydint.barThis.get(0).style.top = T + "px";

    //比例换算
    var scale = T/(sydint.barThis.parent().height() - sydint.barThis.height()),
         oListbox = sydint.barThis.parents("[data-type='plotwhole']").find("[data-type='listbox']"),
         oListcontent = sydint.barThis.parents("[data-type='plotwhole']").find("[data-type='listbox']>div");

    oListcontent.get(0).style.top = -(oListcontent.height() - oListbox.height())*scale + "px";
    document.title = scale;
}
//acction
sydint.btn.on("click",function(){

    var _this = $(this),
        foldBlock = sydint.showBulk(_this).css("display");

    sydint.objHide(sydint.btn,"current");
    sydint.objHide(sydint.btn.find("em"),"down");

    _this.addClass("current");
    _this.find("em").addClass("down");

    //折叠层显示隐藏
    if(foldBlock =="none"){

        sydint.objHide(sydint.foldBlock);
        sydint.showBulk(_this).show();
    }else{
        sydint.objHide(sydint.btn,"current");
        sydint.objHide(sydint.btn.find("em"),"down");
        sydint.showBulk(_this).hide();
    }

    //滚动条/内容适配
    sydint.adaptation();

    //设置-》scrollbar--
    sydint.clickBarThis = sydint.showBulk(_this).find("[data-type='scrollbar']");

    //滚轮事件
    sydint.myAddEvent(sydint.clickBarThis.parent().get(0),"mousewheel",sydint.onMouseWheel);
    sydint.myAddEvent(sydint.clickBarThis.parent().get(0),"DOMMouseScroll",sydint.onMouseWheel);

    sydint.myAddEvent(sydint.clickBarThis.parents("[data-type='plotwhole']").find("[data-type='listbox']")
        .get(0),"mousewheel",sydint.onMouseWheel);

    sydint.myAddEvent(sydint.clickBarThis.parents("[data-type='plotwhole']").find("[data-type='listbox']")
        .get(0),"DOMMouseScroll",sydint.onMouseWheel);

    //设置--》up/down模块
    sydint.oIconUp = sydint.showBulk(_this).find("[data-type='up']");
    sydint.oIconDown = sydint.showBulk(_this).find("[data-type='down']");
    //iconArrow
    sydint.oIconDown.click(function(){
        sydint.setTop(sydint.clickBarThis.get(0).offsetTop + 10,sydint.clickBarThis);
    });
    sydint.oIconUp.click(function(){
        sydint.setTop(sydint.clickBarThis.get(0).offsetTop - 10,sydint.clickBarThis);
    });
    //
    //
});

//v2
sydint.oScrollbar.mousedown(function(ev){

    var oEvent = ev || window.event,
         dixY = oEvent.clientY - this.offsetTop;

    sydint.barThis = $(this);

    $(document).bind("mousemove",function(ev){

        var oEvent = ev || window.event,
             T = oEvent.clientY - dixY;

        sydint.setTop(T,sydint.barThis);

    });
    $(document).bind("mouseup",function(){
        $(document).unbind( "mousemove");
        $(document).unbind( "mouseup");
    })
    return false;

});
//v3



