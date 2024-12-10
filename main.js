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
let inventory = [
    'knife',
    'helmet',
    'knife',
    'helmet',
    'knife',
    'helmet',
    'knife',
    'helmet',
]
function resize(){
    let scaleWidth = window.innerWidth / baseWidth;
    let scaleHeight = window.innerHeight / baseHeight;
    scale = Math.min(scaleWidth, scaleHeight);
    canvas.width = baseWidth * scale;
    canvas.height = baseHeight * scale;
}
window.addEventListener('resize', resize);

function draw(){
    cameraX = playerX-baseWidth/2
    cameraY = playerY-baseHeight/2
    tick++
    tick>100?tick=0:'';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.fillStyle = 'white';
    // ctx.fillRect(playerX-cameraX,playerY-cameraY,1,1)
    ctx.fillRect(104,550,600,50)
    for(let i = 0;i<12;i++){
        ctx.fillStyle = 'black';
        ctx.fillRect(110+(i*49),551,48,48)
        if(Items[inventory[i]]){
            ctx.fillStyle = 'white';
            ctx.font = '12px Arial';
            ctx.fillText(Items[inventory[i]].name, 115+(i*49) , 580);
        }
    }
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
        
        if(stick )
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
            ctx.fillText(stick.isMoving==2?' '+ItemsHead[stick.head].text:''+ItemsHead[stick.head].text, stickPosX , headPos );
        }
        if(ItemsChest[stick.chest]){
            ctx.fillText(stick.isMoving==2?' '+ItemsChest[stick.chest].text:''+ItemsChest[stick.chest].text, stickPosX , chestPos );
        }
        if(ItemsHand[stick.hand]){
            ctx.fillText(stick.isMoving==2?' '+ItemsHand[stick.hand].text:''+ItemsHand[stick.hand].text, stickPosX , legPos );
        }

        ctx.fillText(stick.life+'❤', stick.x-cameraX , stick.y+20-cameraY );

    })

    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('100$', 0 , 20);
    ctx.fillText('25p', 0 , 42);

    
    ctx.restore()
}
FirstStick = null

function stickMove(){
    Sticks.forEach((Stick)=>{
        const dx = Stick.targetX - Stick.x;
        const dy = Stick.targetY - Stick.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let distanceLimite = 20
        if(Stick.isPlayer){
            distanceLimite = 5
        }
            
        if (distance > distanceLimite) {
            const directionX = dx / distance;
            const directionY = dy / distance;
            Stick.isMoving==0?Stick.isMoving = 2:''
            Stick.x += directionX * Stick.speed;
            Stick.y += directionY * Stick.speed;
        } else {
            if(Stick.isPlayer){
                Stick.isMoving = 0
                Stick.x = Stick.targetX;
                Stick.y = Stick.targetY;
            }else if(Stick.isFollowPlayer){
                console.log('damage', distance)
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
                console.log(item);
                if(item.pos=='hand'){
                    Sticks.forEach((stick)=>{
                        if(stick.isPlayer){
                            if(stick.hand==''){
                                stick.hand = item.name;
                                inventory[i] = ''
                            }
                            return
                        }
                    })
                }
                if(item.pos=='chest'){
                    Sticks.forEach((stick)=>{
                        if(stick.isPlayer){
                            if(stick.chest==''){
                                stick.chest = item.name;
                                inventory[i] = ''
                            }
                            return
                        }
                    })
                }
                if(item.pos=='head'){
                    Sticks.forEach((stick)=>{
                        if(stick.isPlayer){
                            if(stick.head==''){
                                stick.head = item.name;
                                inventory[i] = ''
                            }
                            return
                        }
                    })
                }
            }
            return true;
        }
    }
}

// Adicionar o ouvinte de eventos de clique
canvas.addEventListener('click', function (event) {
    const x1 = event.offsetX/scale;
    const y2 = event.offsetY/scale;
    let invClick = checkItemClick(x1, y2);
    if(invClick) return;
    let x = (event.offsetX)/scale+cameraX;
    let y = (event.offsetY)/scale+cameraY;
    Sticks.forEach((Stick)=>{
        if(Stick.isPlayer==false)return
        Stick.targetX = x
        Stick.targetY = y
    })
});
resize()
function gameLoop(){
    draw()
    stickMove()
    requestAnimationFrame(gameLoop)
}
gameLoop()