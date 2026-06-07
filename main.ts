namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Heart = SpriteKind.create()
    export const PowerUp = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Heart, function (player2, coracao) {
    coracao.destroy()
    if (info.life() < 5) {
        info.changeLifeBy(1)
        game.splash("Vida +1")
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (player2, estrela) {
    estrela.destroy()
    invencivel = true
    jogador.startEffect(effects.halo, 5000)
    game.splash("INVENCIVEL!", "5 segundos")
    pause(5000)
    invencivel = false
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (player2, moeda) {
    moeda.destroy()
    info.changeScoreBy(1)
    music.baDing.play()
    criarMoeda()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player2, inimigo) {
    if (!(invencivel)) {
        inimigo.destroy()
        info.changeLifeBy(-1)
        scene.cameraShake(4, 200)
        music.wawawawaa.play()
    }
})
function criarEstrela () {
    estrela = sprites.create(img`
        . . 5 . . 
        . 5 5 5 . 
        5 5 5 5 5 
        . 5 5 5 . 
        . . 5 . . 
        `, SpriteKind.PowerUp)
    estrela.setPosition(randint(10, 150), randint(10, 110))
}
function criarCoracao () {
    coracao = sprites.create(img`
        . 2 . . 2 . 
        2 2 2 2 2 2 
        2 2 2 2 2 2 
        . 2 2 2 2 . 
        . . 2 2 . . 
        `, SpriteKind.Heart)
    coracao.setPosition(randint(10, 150), randint(10, 110))
}
function criarMoeda () {
    moeda = sprites.create(img`
        . . 6 6 . . 
        . 6 6 6 6 . 
        6 6 9 9 6 6 
        6 6 9 9 6 6 
        . 6 6 6 6 . 
        . . 6 6 . . 
        `, SpriteKind.Coin)
    moeda.setPosition(randint(10, 150), randint(10, 110))
}
function criarInimigo () {
    inimigo = sprites.create(img`
        . 2 2 2 . 
        2 2 2 2 2 
        2 f 2 f 2 
        2 2 2 2 2 
        . 2 2 2 . 
        `, SpriteKind.Enemy)
    inimigo.setPosition(randint(10, 150), randint(10, 110))
    inimigo.follow(jogador, 20 + nivel * 20)
}
info.onLifeZero(function () {
    game.splash("GAME OVER", "TENTE NOVAMENTE")
    game.over(false, effects.melt)
})
let inimigo: Sprite = null
let moeda: Sprite = null
let coracao: Sprite = null
let estrela: Sprite = null
let invencivel = false
let jogador: Sprite = null
let nivel = 0
nivel = 1
scene.setBackgroundColor(7)
game.splash("HEROI DA FLORESTA", "Colete moedas e sobreviva!")
music.playMelody("C5 A B G A F G E ", 120)
jogador = sprites.create(img`
    . . 5 5 5 . . 
    . 5 5 5 5 5 . 
    . 5 f 5 f 5 . 
    . 5 5 5 5 5 . 
    . . 5 5 5 . . 
    . . 5 . 5 . . 
    . 5 . . . 5 . 
    `, SpriteKind.Player)
controller.moveSprite(jogador, 100, 100)
jogador.setPosition(80, 60)
info.setLife(3)
info.setScore(0)
for (let index = 0; index < 5; index++) {
    criarMoeda()
}
game.onUpdate(function () {
    if (nivel == 1 && info.score() >= 10) {
        nivel = 2
        scene.setBackgroundColor(9)
        game.splash("NIVEL 2", "Inimigos mais fortes!")
    }
    if (nivel == 2 && info.score() >= 20) {
        nivel = 3
        scene.setBackgroundColor(2)
        game.splash("NIVEL 3", "Modo dificil!")
    }
    if (nivel == 3 && info.score() >= 30) {
        game.splash("PARABENS!", "VOCE ZEROU O JOGO!")
        game.over(true, effects.confetti)
    }
})
game.onUpdateInterval(15000, function () {
    criarCoracao()
})
game.onUpdateInterval(3000, function () {
    criarInimigo()
})
game.onUpdateInterval(20000, function () {
    criarEstrela()
})
