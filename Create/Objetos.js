let Sticks = []
let Spells = []
let Items = []
let ItemsHead = []
let ItemsChest = []
let ItemsHand = []
class Stick{
    constructor(player,x,y,life,speed,vision){
            vision = vision || 0
            this.x = x,
            this.y = y,
            this.spell = ()=>{}
            this.spellCD = [],
            this.spellName = 'none',
            this.spellCDTicks = [],
            this.targetX = x,
            this.targetY = y,
            this.speed = speed,
            this.head = '',
            this.hand = '',
            this.data = {},
            this.friendFire = true,
            this.chest = '',
            this.life = life,
            this.isMoving  =  0
            this.isPlayer  =  player
            this.isFollowPlayer  =  false
            this.damageable  =  true
            this.vision = vision
            this.firstVision = vision
    }
    setSpell(name,cd, spell){
        this.spell = spell
        this.spellCD[name] = cd 
        this.spellName = name
        return this
    }
    create(){
        Sticks.push(this)
    }
}
class Item{
    constructor(name,text){
        this.name = name || 'air'
        this.text = text || ''
        this.consumable = false
        this.data = {};
        this.function = null
        this.everytick = ''
    }
    setConsumable(bool){
        this.consumable = bool;
        return(this)
    }
    setSprite(text){
        this.text = text;
        return(this)
    }
    createAt(pos){
        this.pos = pos
        Items[this.name]=this;
        switch(pos){
            case 'head':
                ItemsHead[this.name]=this;
            break;
            case 'chest':
                ItemsChest[this.name]=this;
            break;
            case 'hand':
                ItemsHand[this.name]=this;
            break;
        }
        return(this)
    }
    
    onEquiped(functionToLoad){
        this.everytick=functionToLoad
        return(this)
    }
    createWithFunction(functionToLoad){
        this.function=functionToLoad
        Items[this.name]=this;
    }
}
class Spell{
    constructor(name,x,y){
        this.name = name
        this.x = x
        this.y = y
        this.lifeTimeTicks = 0;
        this.lifeTime = 100;
        this.damage = 1
        this.damageSource = 'player'
        this.destroyable = false
        this.targetX = ''
        this.targetY = ''
        this.dx = ''
        this.dy = ''
        this.speed = 0
        this.sprite = 'O'
        this.data = {}
        this.everytick = ''
    }
    setSprite(value){
        this.sprite = value || 'O'
        return(this)
    }
    setData(value){
        this.data = value || null
        return(this)
    }
    setEverytick(value){
        this.everytick = value || ''
        return(this)
    }
    setLifeTime(value){
        this.lifeTime = value || 100
        return(this)
    }
    setDamageSource(value){
        this.damageSource = value || 100
        return(this)
    }
    setDamage(value){
        this.damage = value || 0
        return(this)
    }
    setDestroyable(value){
        this.destroyable = value || false
        return(this)
    }
    goTo(x,y,speed){
        this.targetX = x
        this.targetY = y
        this.speed = speed
        return(this)
    }
    setDis(x,y){
        this.dx = x
        this.dy = y
        return(this)
    }
    create(){
        Spells.push(this)
    }
}