/**
 * Created by Administrator on 2016/8/31 0031.
 */
$(function(){
    $(".nav li").click(function(){
        var index=$(".nav li").index(this)
        $(".lefts ul").removeClass("xian").eq(index).addClass("xian")
        $(".nav li").removeClass("color").eq(index).addClass("color")
    })
    $(".lefts ul li").click(function(){
        var index=$(".lefts ul li").index(this)
        $(".lefts ul li").removeClass("color").eq(index).addClass("color")
    })
    var canvas=document.querySelector("canvas");
//alert(canvas)
    var copy=$(".copy")[0];
    var xp=$(".xp")[0];
    var cobj=canvas.getContext("2d");

    var obj=new shape(copy,cobj,xp);
    $(".huatu li").click(function(){
        var types=$(this).attr("data-role")
        obj.type=types;
        obj.draw()
        if(types=="bian"){
            obj.bianNum=prompt("请输入边数",5)
        }
        if(types=="jiao"){
            obj.jiaoNum=prompt("请输入角数",5)
        }
        if(types=="pencil"){
            obj.pencil()
        }

    })
    $(".wenjian li:eq(2)").click(function(){
        obj.back()
    })
    $(".yangshi li").click(function(){
        var styles=$(this).attr("data-role")
        obj.style=styles;
        obj.draw()
    })
    $(".yanse li:eq(0) input").change(function(){
        alert(1)
        obj.strokeStyle=$(this).val()
    })
    $(".yanse li:eq(1) input").change(function(){
        obj.fillStyle=$(this).val()
    })
    $(".tiaowen li").click(function(){
        obj.lineWidth=$(this).attr("data-role")
        obj.draw()
    })

    $(".tiaowen li input").change(function(){
        obj.lineWidth=$(this).val()
        obj.draw()
    })
    $(".nav ul li:last").click(function(){
        obj.clear()

    })

    $(".chachu ul li input").change(function(){
        obj.xpsize=$(this).val()
        obj.clear()
    })
    $(".save").click(function(){
        if(obj.history.length>0){
        location.href=canvas.toDataURL().replace("image/png","stream/octet")}
    })
    $(".set").click(function(){
        if(obj.history.length>0){
            var yes=confirm("是否保存")
            if(yes){
            location.href=canvas.toDataURL().replace("image/png","stream/octet")}
        }
        cobj.clearRect(0,0,canvas.width,canvas.height)
        obj.history=[];

    })
})




