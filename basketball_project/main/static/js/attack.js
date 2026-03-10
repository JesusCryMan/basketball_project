/* ====== Основная функция для рисования площадки ====== */
function drawCourt(ctx, canvas) {
    const w = canvas.width, h = canvas.height
    ctx.fillStyle = "#0f0f0f"
    ctx.fillRect(0,0,w,h)

    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.strokeRect(0,0,w,h)

    // корзина
    ctx.beginPath()
    ctx.arc(w/2,30,15,0,Math.PI*2)
    ctx.stroke()

    // краска
    ctx.strokeStyle = "#ffffff55"
    ctx.strokeRect(w/2 - 40,30,80,100)

    // трёхочковая линия
    ctx.beginPath()
    ctx.arc(w/2,30,150,Math.PI,2*Math.PI)
    ctx.stroke()

    // свободная зона
    ctx.beginPath()
    ctx.arc(w/2,30,60,Math.PI,2*Math.PI)
    ctx.stroke()
}

/* ====== СХЕМА 1: ISO (Изоляция) ====== */
function drawIso() {
    const canvas = document.getElementById("isoCanvas")
    canvas.style.display = "block"
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawCourt(ctx, canvas)

    const players = [
        {x:100,y:50,num:2},{x:400,y:50,num:3},
        {x:100,y:250,num:4},{x:400,y:250,num:5},
        {x:250,y:100,num:1} // игрок с мячом
    ]

    const defenders = players.map(p=>{
        if(p.num===1) return {x:p.x, y:p.y-20}
        else return {x:p.x+20, y:p.y+20}
    })

    drawPlayersOnCanvas(ctx, players)
    drawDefendersOnCanvas(ctx, defenders)
}

/* ====== СХЕМА 2: Pick & Roll ====== */
function drawPick() {
    const canvas = document.getElementById("pickCanvas")
    canvas.style.display = "block"
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawCourt(ctx, canvas)

    const players = [
        {x:100,y:50,num:2},{x:400,y:50,num:3},
        {x:250,y:80,num:1},{x:250,y:150,num:4},{x:350,y:200,num:5}
    ]
    const defenders = players.map(p=>{
        if(p.num===1) return {x:p.x, y:p.y-20}
        else return {x:p.x+20, y:p.y+20}
    })

    drawPlayersOnCanvas(ctx, players)
    drawDefendersOnCanvas(ctx, defenders)
}

/* ====== СХЕМА 3: Fast Break ====== */
function drawFast() {
    const canvas = document.getElementById("fastCanvas")
    canvas.style.display = "block"
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawCourt(ctx, canvas)

    const players = [
        {x:200,y:250,num:1},{x:300,y:250,num:2},{x:250,y:150,num:3}
    ]
    const defenders = players.map(p=>{
        if(p.num===1) return {x:p.x, y:p.y-20}
        else return {x:p.x+20, y:p.y+20}
    })

    drawPlayersOnCanvas(ctx, players)
    drawDefendersOnCanvas(ctx, defenders)
}

/* ====== СХЕМА 4: Give & Go ====== */
function drawGo() {
    const canvas = document.getElementById("goCanvas")
    canvas.style.display = "block"
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawCourt(ctx, canvas)

    const players = [
        {x:200,y:200,num:1},{x:300,y:200,num:2},
        {x:150,y:150,num:3},{x:350,y:150,num:4},{x:250,y:120,num:5}
    ]
    const defenders = players.map(p=>{
        if(p.num===1) return {x:p.x, y:p.y-20}
        else return {x:p.x+20, y:p.y+20}
    })

    drawPlayersOnCanvas(ctx, players)
    drawDefendersOnCanvas(ctx, defenders)
}

/* ====== Функции рисования игроков и защитников ====== */
function drawPlayersOnCanvas(ctx, players) {
    players.forEach(p=>{
        ctx.beginPath()
        ctx.arc(p.x,p.y,16,0,Math.PI*2)
        ctx.fillStyle="#f6b93b"
        ctx.fill()
        ctx.fillStyle="black"
        ctx.font="12px Arial"
        ctx.textAlign="center"
        ctx.fillText(p.num,p.x,p.y+4)
    })
}

function drawDefendersOnCanvas(ctx, defenders) {
    defenders.forEach(d=>{
        ctx.beginPath()
        ctx.arc(d.x,d.y,15,0,Math.PI*2)
        ctx.fillStyle="white"
        ctx.fill()
    })
}