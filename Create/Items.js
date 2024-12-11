new Item('knife').setSprite('t').createAt('hand')
new Item('horn').setSprite(' ` ´').createAt('head')
new Item('helmet').setSprite(' ` ´').createAt('head')
new Item('armor').setSprite(' ` ´').createAt('chest')
new Item('healPotion').setConsumable(true).createWithFunction((stick)=>{
    stick.life+=5
})
new Item('daibo').setConsumable(true).createWithFunction((stick)=>{
    new Stick(false,stick.x-100,stick.y-100,100,1,1000).create()
    new Stick(false,stick.x+100,stick.y-100,100,1,1000).create()
    new Stick(false,stick.x-100,stick.y+100,100,1,1000).create()
    new Stick(false,stick.x+100,stick.y+100,100,1,1000).create()
})