let Sticks = []
let Items = []
let ItemsHead = []
let ItemsChest = []
let ItemsHand = []
class Stick{
    constructor(player,x,y,life,speed,vision){
            vision = vision || 0
            this.x = x,
            this.y = y,
            this.targetX = x,
            this.targetY = y,
            this.speed = speed,
            this.head = '',
            this.hand = '',
            this.chest = '',
            this.life = life,
            this.isMoving  =  0
            this.isPlayer  =  player
            this.isFollowPlayer  =  false
            this.vision = vision
            this.firstVision = vision
    }
}
class Item{
    constructor(name,text){
        this.name = name
        this.text = text

    }
    add(pos){
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
    }
}