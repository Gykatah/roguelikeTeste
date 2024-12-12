new Item('knife').setSprite('t').onEquiped((stick)=>{
    stick.spell = (stick,newx,newy)=>{
            new Spell('fireball',stick.x,stick.y)
            .setSprite('t')
            .setDamage(1)
            .setDestroyable(true)
            .setLifeTime(10)
            .goTo(newx,newy,10)
            .create()
    }
}).createAt('hand')
new Item('cajado').setSprite('O').onEquiped((stick)=>{
    stick.spell = (stick,newx,newy)=>{
        for(let i = 0;i<4;i++){
            let bx = i<2?100:-100;
            let by = i%2==0?100:-100;
            new Spell('fireball',stick.x,stick.y)
            .setSprite('Y')
            .setDamage(1)
            .setDestroyable(true)
            .setLifeTime(100)
            .setEverytick((e)=>{
                if(Math.floor(e.lifeTimeTicks/10)%2==0){
                    e.sprite='+'
                }else{
                    e.sprite='x'
                }
                if(e.lifeTimeTicks==0){
                    e.goTo(stick.x+bx,stick.y+by,5)
                }else if(e.lifeTimeTicks==15){
                    e.goTo('','',0)
                }else if(e.lifeTimeTicks==40){
                    e.goTo(newx,newy,8)
                }
            })
            .create()
        }
    }
}).createAt('hand')
new Item('starFury').setSprite('+   +').onEquiped((stick)=>{
    stick.spell = (stick,newx,newy)=>{
        starDelta = Math.floor(Math.random()*2)-1;
        if(starDelta==0){
            starDelta=1
        }
        starDelta2 = Math.floor(Math.random()*2)-1;
        if(starDelta2==0){
            starDelta2=1
        }
        for(let i = 0;i<100;i++){
            ypos = Math.floor(i/20)
            starPos = Math.floor(Math.random()*1000);
            let x = starPos
            let y = (-1000*starDelta)-ypos*(-Math.floor(Math.random()*30))
            if(starDelta2==-1){
                x = (-1000*starDelta)-ypos*(-Math.floor(Math.random()*30))
                y = starPos
            }
            new Spell('fireball',x,y)
            .setSprite('x')
            .setDamage(1)
            .setDestroyable(true)
            .setLifeTime(100)
            .goTo(newx,newy,1000)
            .setEverytick((e)=>{
                if(Math.floor(e.lifeTimeTicks/10)%2==0){
                    e.sprite='x'
                }else{
                    e.sprite='+'
                }
                if(e.y>0||e.y<1000||e.x>0||e.x<1000){
                    e.speed = 30
                }
            })
            .create()
        }
    }
}).createAt('hand')
new Item('pá').setSprite('/   \\').onEquiped((stick)=>{
    stick.spell = (stick,newx,newy)=>{
            new Spell('fireball',stick.x,stick.y)
            .setSprite(' ')
            .setDamage(20)
            .setDestroyable(false)
            .setLifeTime(20)
            .setEverytick((e)=>{
                    new Spell('icon',stick.x,stick.y).setSprite('/').setLifeTime(5).setDamage(0).create()
                    const dx = newx - stick.x+0.01;
                    const dy = newy - stick.y+0.01;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    if(distance>20){
                        stick.x+=directionX*20
                        stick.y+=directionY*20
                        e.x=stick.x
                        e.y=stick.y
                    }
                    if(e.lifeTimeTicks<19){
                        stick.damageable = false;
                    }else{
                        stick.damageable = true;
                    }
            })
            .create()
    }
}).createAt('hand')
new Item('horn').setSprite(' ` ´').createAt('head')
new Item('helmet').setSprite(' ` ´').createAt('head')
new Item('armor').setSprite(' ` ´').createAt('chest')
new Item('healPotion').setConsumable(true).createWithFunction((stick)=>{
    stick.life+=5
})
new Item('daibo').setConsumable(true).createWithFunction((stick)=>{
    for(let i = 0;i<100;i++){
        pos1 = Math.floor(Math.random()*1000);
        pos2 = Math.floor(Math.random()*1000);
        new Stick(false,pos1,pos2,100,1,1000).create()
    }
})
new Item('star').setConsumable(true).createWithFunction(()=>{
    for(let i = 0;i<2000;i++){
        ypos = Math.floor(i/20)
        starPos = Math.floor(Math.random()*1000);
        starDelta = Math.floor(Math.random()*2)-1;
        new Spell('fireball',starPos,ypos*(-Math.floor(Math.random()*30)))
        .setSprite('x')
        .setDamage(1)
        .setData({pos:starPos,deslocamento:starDelta})
        .setDestroyable(true)
        .setLifeTime(1000)
        .setEverytick((e)=>{
            if(Math.floor(e.lifeTimeTicks/10)%2==0){
                e.sprite='+'
            }else{
                e.sprite='x'
            }
            if(e.lifeTimeTicks>40){
                e.x+=e.data.deslocamento
                e.y=e.y+5
            }
        })
        .create()
    }
})
new Item('superNova').setConsumable(true).createWithFunction((stick)=>{
    new Spell('icon',stick.x,stick.y).setSprite('☀').setLifeTime(700).setDamage(0).setEverytick((e)=>{
        if(Math.floor(e.lifeTimeTicks/10)%2==0){
            e.sprite='🌟'
        }else{
            e.sprite='⭐'
        }
    }).create()
    for(let i = 0;i<10000;i++){
        ypos = Math.floor(i/80)
        starPos = Math.floor(Math.random()*4000);
        starDelta = Math.floor(Math.random()*2)-1;
        new Spell('fireball',starPos,ypos*(-Math.floor(Math.random()*30)))
        .setSprite('x')
        .setDamage(0)
        .setDestroyable(false)
        .setData([stick.x,stick.y])
        .setLifeTime(1100)
        .setEverytick((e)=>{
            if(e.lifeTimeTicks<100)return
            if(Math.floor(e.lifeTimeTicks/10)%2==0){
                e.sprite='+'
            }else{
                e.sprite='x'
            }
            if(e.lifeTimeTicks<800){
                if(e.lifeTimeTicks%20==0){
                    e.goTo(e.data[0],e.data[1],4)
                }
            }else{
                e.speed = 8
                e.setDamage(10)
            }
        })
        .create()
    }
})
