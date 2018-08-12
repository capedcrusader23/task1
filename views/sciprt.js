
var canvas=document.querySelector('canvas');

var c=canvas.getContext('2d');
canvas.width=1821.33;
canvas.height=882.67;






function star(){
  this.rad=(Math.random()*10)+3;
  this.x=this.rad+(canvas.width-this.rad*2)*Math.random();
  this.y=-10;
  this.dx=(Math.random()-0.5)*20;
  this.dy=30;
  this.gra=.5;
  this.fric=.53;


  this.update=function(){
    if(this.y+this.rad+this.dy>=canvas.height-gh){
      this.dy=-this.dy*this.fric;
      this.dx=this.dx*this.fric;
      this.rad=this.rad-3;
      explosions.push(new Explode(this));
    }else {
      this.dy=this.dy+this.gra;
    }

    if(this.x+this.rad+this.dx>=canvas.width||this.x-this.rad+this.dx<0)
    {
      this.dx=-this.dx;
      this.dx=this.dx*this.fric;
      explosions.push(new Explode(this));
    }
    this.x+=this.dx;
    this.y+=this.dy;

    this.draw();

    for(var i=0;i<explosions.length;i++)
    {
      explosions[i].update();
    }

  }
  this.draw=function(){
    c.save();
    c.beginPath();
    c.arc(this.x,this.y,Math.abs(this.rad),0,Math.PI*2,false);
    c.shadowColor = '#E3EAEF';
				c.shadowBlur = 20;
				c.shadowOffsetX = 0;
				c.shadowOffsetY = 0;

				c.fillStyle = "#E3EAEF";
				c.fill();
				c.closePath();
				c.restore();


  }
}

function part(x,y,dx,dy){

this.x=x;
this.y=y;
this.size={
  width:2,
  height:2
};

this.dx=dx;
this.dy=dy;
this.gra=0.09;
this.fric=0.88;
this.time=3;
this.opacity=1;


this.update=function(){
  if(this.y+ this.size.height +this.dy>=canvas.height-gh)
  {
    this.dy=-this.dy*this.fric;
    this.dx=this.dx*this.fric;
  }
  else {
    this.dy=this.dy+this.gra;
  }

if(this.x+this.size.width+this.dx>=canvas.width||this.x+this.dx<0){
  this.dx=-this.dx;
  this.dx=this.dx*this.fric;
}

this.x+=this.dx;
this.y+=this.dy;
this.draw();
this.time=this.time-0.01;
this.opacity-=1/(this.time/0.01);
}

this.draw=function(){
  c.save();
  c.fillStyle = "rgba(227, 234, 239," + this.opacity + ")";
      c.shadowColor = '#E3EAEF';
      c.shadowBlur = 20;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 0;
      c.fillRect(this.x, this.y, this.size.width, this.size.height);
      c.restore();
}

this.live=function(){
  return 0<=this.time;
}
}


function Explode(sta)
{
  this.particle=[];
  this.init=function(pstar)
  {

    for(var i=0;i<5;i++)
    {
      var vel={
        x:(Math.random()-0.5)*5,
        y:(Math.random()-0.5)*15,
      }
      this.particle.push(new part(pstar.x,pstar.y,vel.x,vel.y));
    }
  }
  this.init(sta);
  this.update=function(){
    for(var i=0;i<this.particle.length;i++)
    {
      this.particle[i].update();
      if(this.particle[i].live()==false){
        this.particle.splice(i,1);
      }
    }
  }
}



    var timer = 0;
  		var stars = [];
  		var explosions = [];
  		var gh = canvas.height * 0.15;
  		var randomSpawnRate = Math.floor((Math.random() * 25) + 60)
  		var backgroundGradient = c.createLinearGradient(0,0,0, canvas.height);
  		backgroundGradient.addColorStop(0,"rgba(23, 30, 38, 0.7)");
  		backgroundGradient.addColorStop(1,"rgba(63, 88, 107, 0.7)");


function animate(){
window.requestAnimationFrame(animate);
c.fillStyle = backgroundGradient;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = backgroundGradient;
    			c.fillRect(0, 0, canvas.width, canvas.height);


			c.fillStyle = "#182028";
			c.fillRect(0, canvas.height - gh, canvas.width, gh);

      for (var i = 0; i < stars.length; i++) {
    			    stars[i].update();


    			    if (stars[i].rad <= 0) {
    			    	stars.splice(i, 1);
    			    }
    			}

    			for (var i = 0; i < explosions.length; i++) {
    			    if (explosions[i].length <= 0) {
    			    	explosions.splice(i, 1);
    			    }
    			}

    			timer ++;
    			// console.log(timer);
    			if (timer % randomSpawnRate == 0) {
    				stars.push(new star());
    				randomSpawnRate = Math.floor((Math.random() * 10) + 75)
    			}

}


animate();
