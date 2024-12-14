const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
let baseWidth = 800;
let baseHeight = 600;
let scale = 600;
let limiteX = 1000
let limiteY = 1000
let tick = 0
let playerX = 0
let playerY = 0
let cameraX = 0
let cameraY = 0
let keys = []
let isInvOpen = false;
let inventory = new Array(35).fill('')
console.log(inventory)
giveItem('healPotion')
giveItem('Varão')
giveItem('daibo')
giveItem('cajado')
giveItem('cajadoV2')
giveItem('helmet')
giveItem('knife')
giveItem('star')
giveItem('pá')

function resize(){
    let scaleWidth = window.innerWidth / baseWidth;
    let scaleHeight = window.innerHeight / baseHeight;
    scale = Math.min(scaleWidth, scaleHeight);
    canvas.width = baseWidth * scale;
    canvas.height = baseHeight * scale;
}
window.addEventListener('resize', resize);
playerIndex = Sticks.findIndex(item => item.isPlayer == true)
function draw(){
    cameraX = playerX-baseWidth/2
    cameraY = playerY-baseHeight/2
    playerIndex = Sticks.findIndex(item => item.isPlayer == true)
    tick++
    tick>100?tick=0:'';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.fillStyle = 'white';

    ctx.fillRect(0-cameraX,0-cameraY,limiteX,1)
    ctx.fillRect(0-cameraX,limiteY-cameraY,limiteX,1)
    ctx.fillRect(0-cameraX,0-cameraY,1,limiteY)
    ctx.fillRect(limiteX-cameraX,0-cameraY,1,limiteY)
    Sticks.forEach((stick)=>{
        if(stick.x>limiteX)stick.x=limiteX
        if(stick.y>limiteY)stick.y=limiteY
        if(stick.x<0)stick.x=0
        if(stick.y<0)stick.y=0
        if(stick.isPlayer==true){
            playerX = stick.x
            playerY = stick.y
        }else{
            if(tick%5){
                const dx = playerX - stick.x;
                const dy = playerY - stick.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if(distance<stick.vision){
                    stick.vision = stick.firstVision*1.5
                    stick.targetX = playerX
                    stick.isFollowPlayer = true
                    stick.targetY = playerY
                }else{
                    stick.isFollowPlayer = false
                    stick.targetX = stick.x
                    stick.targetY = stick.y
                }
            }
        }
        if(tick%10==0){
            if(stick.isMoving==2){
                stick.isMoving=1
            }else if(stick.isMoving==1){
                stick.isMoving=2
            }
        }
        

        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        let stickPosX = stick.x-cameraX-6
        let chestPos = stick.y-cameraY
        let headPos = stick.y-10-cameraY
        let legPos = stick.y+10-cameraY
        ctx.fillText(stick.isMoving==2?'  O':' O', stickPosX , headPos );
        ctx.fillText(stick.isMoving==2?'  /|\\':' /|\\', stickPosX , chestPos );
        ctx.fillText(stick.isMoving==2?'   /\\':' /\\', stickPosX , legPos );

        
        if(ItemsHead[stick.head]){
            if(ItemsHead[stick.head].everytick!=''){
                ItemsHead[stick.head].everytick(stick)
            }
            ctx.fillText(stick.isMoving==2?' '+ItemsHead[stick.head].text:''+ItemsHead[stick.head].text, stickPosX , headPos );
        }
        if(ItemsChest[stick.chest]&&ItemsHand[stick.hand]!=''){
            if(ItemsChest[stick.chest].everytick!=''){
                ItemsChest[stick.chest].everytick(stick)
            }
            ctx.fillText(stick.isMoving==2?' '+ItemsChest[stick.chest].text:''+ItemsChest[stick.chest].text, stickPosX , chestPos );
        }
        if(ItemsHand[stick.hand]&&ItemsHand[stick.hand]!=''){
            if(ItemsHand[stick.hand].everytick!=''){
                ItemsHand[stick.hand].everytick(stick)
            }
            ctx.fillText(stick.isMoving==2?' '+ItemsHand[stick.hand].text:''+ItemsHand[stick.hand].text, stickPosX , legPos );
        }

        ctx.fillText(Math.floor(stick.life)+'❤', stick.x-cameraX , stick.y+20-cameraY );

    })
    Spells.forEach((e)=>{
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(e.sprite, e.x-cameraX , e.y-cameraY);
    })
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('100$', 0 , 20);
    ctx.fillText('25p', 0 , 42);
    ctx.fillStyle = 'white';
    ctx.fillRect(104,550,600,50)
    for(let i = 0;i<12;i++){
        ctx.fillStyle = 'black';
        ctx.fillRect(110+(i*49),551,48,48)
        if(Items[inventory[i]]){
            ctx.fillStyle = 'white';
            ctx.font = '12px Arial';
            ctx.fillText(Items[inventory[i]].name, 115+(i*49) , 580);
        }else if(inventory[i]!=''&&inventory[i]!=null){
            ctx.fillStyle = 'red';
            ctx.font = '12px Arial';
            ctx.fillText('???', 115+(i*49) , 580);
        }
    }
    if(isInvOpen){
        ctx.fillStyle = 'white';
        ctx.fillRect(104,100,600,400)
        for(let i = 12;i<35;i++){
            let lineNumber = (i-5)%7
            let lineCount = Math.floor((i-5)/7)-1
            ctx.fillStyle = 'black';
            ctx.fillRect(300+(lineNumber*49),110+(lineCount*49),48,48)
            if(Items[inventory[i]]){
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                ctx.fillText(Items[inventory[i]].name, 305+(lineNumber*49) , 140+(lineCount*49));
            }
        }
        for(let i = 0;i<3;i++){
            ctx.fillStyle = 'black';
            ctx.fillRect(110,110+(i*49),48,48)
            if(Items[inventory[i]]){
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                let equipamentos = ['','','']
                equipamentos[0]=Sticks[playerIndex].head;
                equipamentos[1]=Sticks[playerIndex].chest;
                equipamentos[2]=Sticks[playerIndex].hand;
                ctx.fillText(equipamentos[i], 115, 140+(i*49));
            }
            }
        }
    
    ctx.restore()
}
FirstStick = null

function stickMove(){

    Spells.forEach((Spell)=>{
        if(Spell.lifeTime!=-1){
            Spell.lifeTimeTicks++
            if(Spell.lifeTimeTicks>Spell.lifeTime){
                Spells.splice(Spells.indexOf(Spell),1);
            }
        }
        if(Spell.targetX!=''&&Spell.targetY!=''){
            const dx = Spell.targetX - Spell.x+0.01;
            const dy = Spell.targetY - Spell.y+0.01;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const directionX = dx / distance;
            const directionY = dy / distance;
            Spell.setDis(directionX,directionY)
            Spell.goTo('','',Spell.speed)
        }else if(Spell.dx!=''&&Spell.dy!=''){
            Spell.x += Spell.dx * Spell.speed;
            Spell.y += Spell.dy * Spell.speed;
        }
    })
    Sticks.forEach((Stick)=>{
        const dx = Stick.targetX - Stick.x;
        const dy = Stick.targetY - Stick.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let distanceLimite = 20
        if(Stick.isPlayer){
            distanceLimite = 5
            if(keys['a']==true||keys['s']==true||keys['w']==true||keys['d']==true){
                Stick.isMoving==0?Stick.isMoving = 2:''
            }else{
                Stick.isMoving=0
            }
            if(keys['a']==true){
                Stick.x -= Stick.speed
                
            }
            if(keys['d']==true){
                Stick.x += Stick.speed
            }
            if(keys['w']==true){
                Stick.y -= Stick.speed
            }
            if(keys['s']==true){
                Stick.y += Stick.speed
            }
        }else{
            if (distance > distanceLimite) {
                const directionX = dx / distance;
                const directionY = dy / distance;
                Stick.isMoving==0?Stick.isMoving = 2:''
                Stick.x += directionX * Stick.speed;
                Stick.y += directionY * Stick.speed;
            } else {
                if(Stick.isFollowPlayer&&Sticks[playerIndex].damageable){
                    Sticks[playerIndex].life-=0.05
                }
            }
        }
            
    })
}

function checkItemClick(x, y) {
    for (let i = 0; i < 12; i++) {

        const itemX = 110 + (i * 49);
        const itemY = 551;
        const itemWidth = 48;
        const itemHeight = 48;
        if (x >= itemX && x <= itemX + itemWidth && y >= itemY && y <= itemY + itemHeight) {
            let item = Items[inventory[i]]
            if (item) {
                    if(item.function!=null&&Sticks[playerIndex].isPlayer){
                        item.function(Sticks[playerIndex])
                        if(item.consumable){
                            inventory[i] = ''
                        }
                    }
                    if(item.pos=='hand'){
                        if(Sticks[playerIndex].isPlayer){
                            inventory[i] = Sticks[playerIndex].hand
                            Sticks[playerIndex].hand = item.name;
                            return true
                        }
                    }
                    if(item.pos=='chest'){
                            if(Sticks[playerIndex].isPlayer){
                                inventory[i] = Sticks[playerIndex].chest
                                Sticks[playerIndex].chest = item.name;
                                return true
                            }
                    }
                    if(item.pos=='head'){
                            if(Sticks[playerIndex].isPlayer){
                                inventory[i] = Sticks[playerIndex].head
                                Sticks[playerIndex].head = item.name;
                                return true
                            }
                    }
            }
            return true;
        }
    }
    if(isInvOpen){
        for (let i = 12;i<35;i++) {
            const lineNumber = (i-5)%7
            const lineCount = Math.floor((i-5)/7)-1
            const itemX = 300 + (lineNumber * 49);
            const itemY = 110+(lineCount*49);
            const itemWidth = 48;
            const itemHeight = 48;
            if (x >= itemX && x <= itemX + itemWidth && y >= itemY && y <= itemY + itemHeight) {
                let item = Items[inventory[i]]
                if (item) {
                        if(item.function!=null&&Sticks[playerIndex].isPlayer){
                            item.function(Sticks[playerIndex])
                            if(item.consumable){
                                inventory[i] = ''
                            }
                        }
                        if(item.pos=='hand'){
                            if(Sticks[playerIndex].isPlayer){
                                inventory[i] = Sticks[playerIndex].hand
                                Sticks[playerIndex].hand = item.name;
                                return true
                            }
                        }
                        if(item.pos=='chest'){
                                if(Sticks[playerIndex].isPlayer){
                                    inventory[i] = Sticks[playerIndex].chest
                                    Sticks[playerIndex].chest = item.name;
                                    return true
                                }
                        }
                        if(item.pos=='head'){
                                if(Sticks[playerIndex].isPlayer){
                                    inventory[i] = Sticks[playerIndex].head
                                    Sticks[playerIndex].head = item.name;
                                    return true
                                }
                        }
                }
                return true;
            }
        }
        for (let i = 0;i<3;i++) {
            const itemX = 110;
            const itemY = 110+(i*49);
            const itemWidth = 48;
            const itemHeight = 48;
            if (x >= itemX && x <= itemX + itemWidth && y >= itemY && y <= itemY + itemHeight) {
                let item = ''
                switch(i){
                    case 0:
                        item = Sticks[playerIndex].head
                        Sticks[playerIndex].head = ''
                        giveItem(item)
                        break
                    case 1:
                        item = Sticks[playerIndex].chest
                        Sticks[playerIndex].chest = ''
                        giveItem(item)
                        break
                    case 2:
                        item = Sticks[playerIndex].hand
                        Sticks[playerIndex].hand = ''
                        Sticks[playerIndex].spell = ''
                        giveItem(item)
                        break
                }
                return true;
            }
        }
    }
}

function checkSpeelColision() {
    Spells.forEach((Spell)=>{
        if(Spell.everytick!=''){
            Spell.everytick(Spell)
        }
        if(Spell.damage==0)return
        Sticks.forEach((stick)=>{
            if((stick.isPlayer||stick.friendFire==false)&&Spell.damageSource=='player') return;
            if((stick.isPlayer==false)&&Spell.damageSource=='enemy') return;
            if((stick.friendFire==false)) return;
            x=stick.x
            y=stick.y
        
            if (x >= Spell.x-10 && x <= Spell.x+10 && y >= Spell.y-20 && y <= Spell.y+20) {
                stick.life-=Spell.damage
                if(stick.life<=0){
                    Sticks.splice(Sticks.indexOf(stick),1);
                }
                if(Spell.destroyable){
                    Spells.splice(Spells.indexOf(Spell),1);
                }
            }
        })
    })
}

// Adicionar o ouvinte de eventos de clique
canvas.addEventListener('click', function (event) {
    const x1 = event.offsetX/scale;
    const y2 = event.offsetY/scale;
    let invClick = checkItemClick(x1, y2);
    if(invClick) return;
    let x = (event.offsetX)/scale+cameraX;
    let y = (event.offsetY)/scale+cameraY;
    Sticks.forEach((stick)=>{
        if(stick.isPlayer==false)return
            stick.spell(stick,x,y)
    })
});
document.addEventListener("keydown",(e)=>{
    let keysHotbar={
        '1':'0',
        '2':1,
        '3':2,
        '4':3,
        '5':4,
        '6':5,
        '7':6,
        '8':7,
        '9':8,
        '0':9,
        '-':10,
        '=':11,
    }
    if(keysHotbar[e.key]){
        let item = Items[inventory[keysHotbar[e.key]]]
            if (item) {
                    if(item.function!=null&&Sticks[playerIndex].isPlayer){
                        item.function(Sticks[playerIndex])
                        if(item.consumable){
                            inventory[keysHotbar[e.key]] = ''
                        }
                    }
                    if(item.pos=='hand'){
                        if(Sticks[playerIndex].isPlayer){
                            inventory[keysHotbar[e.key]] = Sticks[playerIndex].hand
                            Sticks[playerIndex].hand = item.name;
                            return true
                        }
                    }
                    if(item.pos=='chest'){
                            if(Sticks[playerIndex].isPlayer){
                                inventory[keysHotbar[e.key]] = Sticks[playerIndex].chest
                                Sticks[playerIndex].chest = item.name;
                                return true
                            }
                    }
                    if(item.pos=='head'){
                            if(Sticks[playerIndex].isPlayer){
                                inventory[keysHotbar[e.key]] = Sticks[playerIndex].head
                                Sticks[playerIndex].head = item.name;
                                return true
                            }
                    }
            }
    }
    console.log(e.key)
    keys[e.key] = true
    if(e.key=='e'){
        isInvOpen = !isInvOpen
    }
})
document.addEventListener("keyup",(e)=>{
    keys[e.key] = false
})
resize()
let lastTime = 0;
const interval = 1000 / 60; 

function giveItem(item){
    itemName = ''
    if(typeof(item)=="object"){
        itemName = item.name
    }else{
        itemName = item
    }
    for (let key = 0; key < inventory.length; key++) {
        if(inventory[key]==''){
            inventory[key]= itemName
            break
        }
    }
}

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    if (deltaTime >= interval) {
        lastTime = timestamp - (deltaTime % interval);
        draw();
        checkSpeelColision();
        stickMove();
    }
    requestAnimationFrame(gameLoop);
}
gameLoop()