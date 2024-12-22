let playerIndex = Sticks.findIndex(item => item.isPlayer == true)

new Item('knife').setSprite('t').onEquiped((stick)=>{
    stick.setSpell('knife',1000,
    stick.spell = (stick,newx,newy)=>{
            new Spell('fireball',stick.x,stick.y)
            .setSprite('t')
            .setDamage(1)
            .setDestroyable(true)
            .setLifeTime(10)
            .goTo(newx,newy,10)
            .create()
    })
}).createAt('hand')

new Item('cajado').setSprite('O').onEquiped((stick)=>{
    stick.setSpell('cajado',50,stick.spell = (stick,newx,newy)=>{
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
    })
}).createAt('hand')

new Item('cajadoV2').setSprite('O').onEquiped((stick)=>{
    stick.spell = (stick,newx,newy)=>{
        for(let i = 0;i<4;i++){
            let bx = i<2?150:-150;
            let by = i%2==0?150:-150;
            new Spell('fireball',newx+bx,newy+by)
            .setSprite(i==0||i==3?'O':'X')
            .setDamage(1)
            .setDestroyable(false)
            .setLifeTime(100)
            .setEverytick((e)=>{
            console.log(e)
            if(e.lifeTimeTicks>20){
                if(Math.floor(e.lifeTimeTicks/20)%2==0){
                    e.sprite='--'
                }else if(Math.floor(e.lifeTimeTicks/10)%2==0){
                    e.sprite='/'
                }else if(Math.floor(e.lifeTimeTicks/5)%2==0){
                    e.sprite='|'
                }else{
                    e.sprite='\\'
                }
                
            }   
            if(e.lifeTimeTicks>40){
                e.y+=-40+e.lifeTimeTicks
            }
                if(e.lifeTimeTicks==0){
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

new Item('bossArms').setSprite('<@>').onEquiped((stick)=>{
    stick.data['bossArms'] = stick.data['bossArms'] || 0
    stick.data['bossArms2'] = stick.data['bossArms2'] || 0
    if(stick.isFollowPlayer){
        stick.data['bossArms']+=1
        stick.data['bossArms2']+=1
    }
    if(stick.data['bossArms2']>2000){
        stick.data['bossArms2']=1
    }
    if(stick.data['bossArms']>40){
        stick.data['bossArms']=1
        for(let i=-1;i<2;i+=2){
            if(stick.data['bossArms2']<1000){
                new Spell('fireball',-1000,-1000)
                .setSprite('[]')
                .setDamage(0.1)
                .setDestroyable(true)
                .setLifeTime(40)
                .setDamageSource('enemy')
                .setEverytick((e)=>{ 
                    const dx = Sticks[playerIndex].x - stick.x+0.01;
                    const dy = Sticks[playerIndex].y - stick.y+0.01;
                    const angle = Math.atan2(dy, dx);
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if(stick.data['bossArms2']>300){
                        if(distance>stick.vision||e.lifeTimeTicks<10){
                            e.x=stick.x- Math.sin(angle) *(100*i)
                            e.y=stick.y+ Math.cos(angle) *(100*i)
                        }else{
                                new Spell('icon',e.x, e.y)
                                .setDamageSource('enemy')
                                .setSprite('[]').setLifeTime(100)
                                .goTo(Sticks[playerIndex].x,Sticks[playerIndex].y,8)
                                .setDamage(1)
                                .create()
                                console.log(e)
                                Spells.splice(Spells.indexOf(e),1)
                        }
                    }else{
                        if(stick.data['bossArms2']<200){
                            e.x=stick.x- Math.sin(angle) *((100-stick.data['bossArms2'])*i)
                            e.y=stick.y+ Math.cos(angle) *((100-stick.data['bossArms2'])*i)
                        }else{
                            e.x=stick.x- Math.sin(angle) *(100*i)
                            e.y=stick.y+ Math.cos(angle) *(100*i)
                        }
                    }
                })
                .create()
            }else if(stick.data['bossArms2']>1200){
                const dx = Sticks[playerIndex].x - stick.x+0.01;
                const dy = Sticks[playerIndex].y - stick.y+0.01;
                
                if(stick.isFollowPlayer){
                    new Spell('fogo',stick.x,stick.y)
                    .setSprite('()')
                    .setDestroyable(true)
                    .setDamage(1)
                    .setDamageSource('enemy')
                    .goTo(Sticks[playerIndex].x,Sticks[playerIndex].y,7)
                    .create()
                    new Spell('fogo',stick.x,stick.y)
                    .setSprite('O')
                    .setDestroyable(true)
                    .setDamage(1)
                    .setDamageSource('enemy')
                    .goTo(Sticks[playerIndex].x,Sticks[playerIndex].y,5)
                    .create()
                    new Spell('fogo',stick.x,stick.y)
                    .setSprite('o')
                    .setDestroyable(true)
                    .setDamage(1)
                    .setDamageSource('enemy')
                    .goTo(Sticks[playerIndex].x,Sticks[playerIndex].y,3)
                    .create()
                }
            }
        }
    }else{
        return
    } 
}).createAt('head')

new Item('healPotion').setConsumable(true).createWithFunction((stick)=>{
    stick.life+=5
})

new Item('daibo').setConsumable(true).createWithFunction((stick)=>{
    for(let i = 0;i<100;i++){
        pos1 = Math.floor(Math.random()*1000);
        pos2 = Math.floor(Math.random()*1000);
        new Stick(false,pos1,pos2,100,1,1).create()
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
new Item('Varão').setConsumable(true).createWithFunction((stick)=>{
    new Spell('varão',stick.x,stick.y)
    .setSprite('O')
    .setDamage(0)
    .setDestroyable(false)
    .setLifeTime(400)
    .setEverytick((e)=>{
        new Spell('fogo',e.x,e.y)
        .setSprite('O>')
        .setDestroyable(true)
        .setDamage(1)
        .setEverytick((fogo)=>{
            const dx = stick.x - e.x+0.01;
            const dy = stick.y - e.y+0.01;
            const distance = Math.sqrt(dx * dx + dy * dy);
            fogo.x-= 10*dx/distance
            fogo.y-= 10*dy/distance
        })
        .create()
    })
    .create()
})