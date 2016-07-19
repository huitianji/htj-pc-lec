/**
 *
 */
var sydcms = {};
sydcms.modular1 = {};

sydcms.modular1.aOA = $("div[data-type='zoom-in']>a");
sydcms.modular1.moves =  function(obj,oKey,oValue,oBoolean){

    var _this = $(obj),
        oImg;
    oImg = _this.find(".syddisclosure-enlarge");
    oImg.css("top",oValue+"");

    if(oBoolean){
        oImg.css({"animation":oKey + " 1s ease-in-out","display":"block"});
    }else{
        oImg.css({"animation":oKey + " 1s ease-in-out"});
    }

}
if( !(window.navigator.userAgent.indexOf("MSIE")>=0) ){

    sydcms.modular1.aOA.on("mouseenter",function(){
        sydcms.modular1.moves(this,"movetop","127px",true);
    });

    sydcms.modular1.aOA.on("mouseleave",function(){
        sydcms.modular1.moves(this,"move-default","-100px");
    });

}else{
    alert("IE false")
}


