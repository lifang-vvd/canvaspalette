/**
 * Created by Administrator on 2016/8/31 0031.
 */
function shape (copy,cobj,xp){
    this.copy=copy;
    this.cobj=cobj;
    this.style="stroke";
    this.history=[];
    this.type="line";
    this.fillStyle="#000";
    this.strokeStyle="#000";
    this.lineWidth=1;
    this.canvasH=copy.offsetHeight;
    this.canvasW=copy.offsetWidth;
    this.flag=true;
    this.bianNum=5;
    this.jiaoNum=5;
    this.xp=xp;
    this.xpsize=10;
}
shape.prototype={
    init:function(){
        this.cobj.fillStyle=this.fillStyle;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.lineWidth=this.lineWidth
        this.xp.style="display:none"
    },
    draw:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            that.init();
            var ox= e.offsetX;
            var oy= e.offsetY;
            that.flag=true;
            that.copy.onmousemove=function(e){
                var movex= e.offsetX;
                var movey= e.offsetY;
                that.flag=true;
                that.cobj.clearRect(0,0,that.canvasH,that.canvasW);
                if(that.history.length!=0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0)
                }
                that[that.type](ox,oy,movex,movey)
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH))
                that.copy.onmousemove=null;
                that.copy.onmouseup=null
            }
        }
    },
    pencil:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            that.init();
            var ox= e.offsetX;
            var oy= e.offsetY;
            that.cobj.beginPath()
            that.cobj.moveTo(ox,oy);
            that.copy.onmousemove=function(e){
                var movex= e.offsetX;
                var movey= e.offsetY;
                that.cobj.lineTo(movex,movey);
                that.cobj.stroke()
                that[that.type](ox,oy,movex,movey)
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH))
                that.copy.onmousemove=null;
                that.copy.onmouseup=null
            }
        }
    },
    line:function(x,y,x1,y1){
        this.cobj.beginPath()
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1)
        this.cobj.stroke()
    },
    rect:function(x,y,x1,y1){
        this.cobj.beginPath()
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj[this.style]()
    },
    arc:function(x,y,x1,y1){
        this.cobj.beginPath()
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y))
        this.cobj.arc(x,y,r,0,Math.PI*2);
        this.cobj[this.style]()
    },
    bian:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y))
        var a=360/this.bianNum*Math.PI/180
        this.cobj.beginPath()
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(x+Math.cos(a*i)*r,y+Math.sin(a*i)*r)
        }
        this.cobj.closePath()
        this.cobj[this.style]()
    },
    jiao:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y))
        var r1=r/3;
        var a=360/(this.jiaoNum*2)*Math.PI/180;
        for(var i=0; i<this.jiaoNum*2;i++){
            if(i%2==0){
                this.cobj.lineTo(x+Math.cos(a*i)*r,y+Math.sin(a*i)*r)
            }else {
                this.cobj.lineTo(x+Math.cos(a*i)*r1,y+Math.sin(a*i)*r1)
            }
        }
        this.cobj.closePath()
        this.cobj[this.style]()
    },
    back:function(){
        if(this.history.length==0){
            this.cobj.clearRect(0,0,this.canvasH,this.canvasW)
            setTimeout(function(){
                alert("不能后退")
            },1000)
            return
        }
        if(this.flag){
            if(this.history.length==1){
                this.history.pop()
                this.cobj.clearRect(0,0,this.canvasH,this.canvasW)
            }else{
                this.history.pop()
                this.cobj.putImageData(this.history.pop(),0,0)
            }
        }else{
            this.cobj.putImageData(this.history.pop(),0,0)
        }
        this.flag=false
    },
    clear:function(){
        var that=this;
        that.copy.onmousemove=function(e){
            var movex= e.offsetX;
            var movey= e.offsetY;
            var left=movex-that.xpsize/2;
            var top=movey-that.xpsize/2;
            if(left<0){
                left=0
            }
            if(top<0){
                top=0
            }
            if(left>that.canvasW-that.xpsize){
                left=that.canvasW-that.xpsize
            }
            if(top>that.canvasH-that.xpsize){
                top=that.canvasH-that.xpsize
            }
            that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px;"
        }
        that.copy.onmousedown=function(){
            that.copy.onmousemove=function(e){
                var movex= e.offsetX;
                var movey= e.offsetY;
                var left=movex-that.xpsize/2;
                var top=movey-that.xpsize/2;
                if(left<0){
                    left=0
                }
                if(top<0){
                    top=0
                }
                if(left>that.canvasW-that.xpsize){
                    left=that.canvasW-that.xpsize
                }
                if(top>that.canvasH-that.xpsize){
                    top=that.canvasH-that.xpsize
                }
                that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px;"

                that.cobj.clearRect(left,top,that.xpsize,that.xpsize)
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH))
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.clear()
            }
        }
    }
}