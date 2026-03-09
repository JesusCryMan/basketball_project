let animations = {}

function toggleCanvas(id, players, steps) {
    const canvas = document.getElementById(id)
    if (canvas.style.display === "block") {
        canvas.style.display = "none"
        return
    }
    canvas.style.display = "block"
    animations[id] = { step: 0, progress: 0 }
    draw(canvas, players, steps)
}

function nextStep(id, players, steps) {
    if (!animations[id]) animations[id] = { step: 0, progress: 0 }
    animateStep(id, players, steps)
}

function animateStep(id, players, steps) {
    if (!animations[id]) return

    let step = animations[id].step
    let progress = animations[id].progress

    progress += 0.03  // скорость движения
    if (progress > 1) progress = 1

    animations[id].progress = progress

    draw(document.getElementById(id), players, steps)

    if (progress < 1) {
        requestAnimationFrame(() => animateStep(id, players, steps))
    } else {
        // Переход к следующему шагу после завершения текущего
        animations[id].step++
        if (animations[id].step >= steps.length) animations[id].step = 0
        animations[id].progress = 0
    }
}

function draw(canvas, players, steps) {
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCourt(ctx, canvas)
    drawPlayers(ctx, players)
    drawDefenders(ctx)
    drawMoves(ctx, steps[animations[canvas.id].step], animations[canvas.id].progress)
    drawBall(ctx, players[0])
}

function drawCourt(ctx, canvas) {
    ctx.fillStyle = "#d98c3a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.strokeRect(canvas.width/2-60, 0, 120, 100)
    ctx.beginPath()
    ctx.arc(canvas.width/2, 100, 40, 0, Math.PI)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(canvas.width/2, 40, 130, 0, Math.PI)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(canvas.width/2, 20, 7, 0, Math.PI*2)
    ctx.stroke()
}

function drawPlayers(ctx, players) {
    const currentStep = animations[ctx.canvas.id]?.step ?? 0
    const moves = window[ctx.canvas.id.replace("Canvas","Steps")]

    players.forEach(p => {
        let highlight = false
        if (moves && moves[currentStep]) {
            moves[currentStep].forEach(m => {
                if ((m.type === "run" || m.type === "pass") &&
                    ((m.from[0] === p.x && m.from[1] === p.y) ||
                     (m.to[0] === p.x && m.to[1] === p.y))) {
                    highlight = true
                }
            })
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, 16, 0, Math.PI*2)
        ctx.fillStyle = "#f6b93b"
        ctx.fill()

        if (highlight) {
            ctx.lineWidth = 3
            ctx.strokeStyle = "red"
            ctx.stroke()
        }

        ctx.fillStyle = "black"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(p.num, p.x, p.y+4)
    })
}

function drawDefenders(ctx) {
    const defenders = [
        {x:150,y:160},{x:230,y:110},{x:320,y:110},{x:260,y:180},{x:370,y:150}
    ]
    defenders.forEach(d => {
        ctx.beginPath()
        ctx.arc(d.x, d.y, 15, 0, Math.PI*2)
        ctx.fillStyle = "white"
        ctx.fill()
    })
}

function drawMoves(ctx, moves, progress) {
    moves.forEach(m => {
        let x = m.from[0] + (m.to[0]-m.from[0])*progress
        let y = m.from[1] + (m.to[1]-m.from[1])*progress

        ctx.strokeStyle = (m.type==="pass") ? "cyan" : "yellow"
        ctx.lineWidth = 3

        if (m.type==="pass") ctx.setLineDash([6,6])
        else ctx.setLineDash([])

        ctx.beginPath()
        ctx.moveTo(m.from[0], m.from[1])
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.setLineDash([])
    })
}

function drawBall(ctx, player) {
    ctx.beginPath()
    ctx.arc(player.x, player.y-20, 6, 0, Math.PI*2)
    ctx.fillStyle = "orange"
    ctx.fill()
}

/* ===== PLAYERS ===== */
const isoPlayers = [
    {x:250,y:220,num:1},{x:120,y:120,num:2},{x:380,y:120,num:3},
    {x:200,y:200,num:4},{x:320,y:200,num:5}
]
const pickPlayers = [...isoPlayers]
const fastPlayers = [...isoPlayers]
const goPlayers = [...isoPlayers]

/* ===== STEPS ===== */
const isoSteps = [
    [{type:"run",from:[250,220],to:[250,150]}],
    [{type:"run",from:[250,150],to:[260,120]}]
]
const pickSteps = [
    [{type:"run",from:[200,200],to:[180,170]}],
    [{type:"run",from:[250,220],to:[200,170]}],
    [{type:"pass",from:[200,170],to:[240,140]}]
]
const fastSteps = [
    [{type:"run",from:[250,220],to:[250,120]}],
    [{type:"pass",from:[250,120],to:[320,100]}]
]
const goSteps = [
    [{type:"pass",from:[250,220],to:[200,180]}],
    [{type:"run",from:[250,220],to:[250,120]}],
    [{type:"pass",from:[200,180],to:[250,120]}]
]