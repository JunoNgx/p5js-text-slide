let C = {width: null, height: null, mid: null};

/** @typedef {{pos: Vector, base: number, height: number, angle: number, speed: number}} Parallelogram */
/** @type { Parallelogram [] } */
let shapes;

/** @typedef {{cooldown: number, pos: Vector, interval: number, base: number, height: number, speed: number}} Spawner */
/** @type { Spawner [] } */
let spawners;

const G = {
    // SPEED_MIN: 0.5,
    // SPEED_MAX: 1.5,
    // BASE_MIN: 0.2,
    // BASE_MAX: 0.5,
    // HEIGHT_MIN: 0.4,
    // HEIGHT_MAX: 0.8
    BASE_1: C.width * 0.2,
    HEIGHT_1: C.height * 0.4,
    SPEED_1: 0.5
}

function setup() {
    C.width = windowWidth;
    C.height = windowWidth/2;
    C.mid = createVector(C.width*0.5, C.height*0.5);

    shapes = [];
    // for (let i = 0; i < 5; i++) {
    //     shapes.push({
    //         pos: createVector(random(0, C.width), random(0, C.height)),
    //         base: random(C.width * G.BASE_MIN, C.width * G.BASE_MAX),
    //         height: random(C.height * G.HEIGHT_MIN, C.height * G.HEIGHT_MAX),
    //         angle: PI/1.5,
    //         speed: random(G.SPEED_MIN, G.SPEED_MAX)
    //     });
    // }

    spawners = [
        {
            pos: createVector(C.width * 0.32, C.height * -0.5),
            cooldown: 0,
            interval: 90,
            base: C.width * 0.1,
            height: C.height * 0.3,
            speed: C.height * 0.005,
            isDown: true
        },
        {
            pos: createVector(C.width * 0.51, C.height * 0.6),
            cooldown: 0,
            interval: 90,
            base: C.width * 0.25,
            height: C.height * 0.52,
            speed: C.height * 0.008,
            isDown: false
        },
    ];

    createCanvas(C.width, C.height);
}

function draw() {
    // background(102, 205, 170);
    // background(238, 238, 238);
    background(0);

    spawners.forEach(s => {
        s.cooldown--;
        if (s.cooldown <= 0) {
            shapes.push(paral(
                createVector(s.pos.x, s.pos.y),
                s.base,
                s.height,
                s.speed,
                s.isDown
            ));
            s.cooldown = s.interval;
        }
    });
    // console.log(spawners.length);
    // console.log(spawners[0].cooldown);

    color(170);
    // rect(C.width*0.1, C.height*0.1, C.width*0.8, C.height*0.8);
    shapes.forEach((s) => {

        // s.pos.y = (s.isDown)
        // ? s.pos.y + s.speed*sin(s.angle)
        // : s.pos.y - s.speed*sin(s.angle);
        s.pos.y += s.speed*sin(s.angle);
        s.pos.x += s.speed*cos(s.angle);

        // let tl = createVector(s.pos.x - s.base/2, s.pos.y - s.height/2);
        // let tr = createVector(s.pos.x + s.base/2, s.pos.y - s.height/2);
        // let bl = createVector(s.pos.x - s.base/2, s.pos.y + s.height/2);
        // let br = createVector(s.pos.x + s.base/2, s.pos.y + s.height/2);
        const tl = createVector(s.pos.x, s.pos.y);
        const tr = createVector(s.pos.x + s.base, s.pos.y);
        const bl = createVector(s.pos.x - s.height*tan(s.angle-HALF_PI), s.pos.y + s.height);
        const br = createVector(bl.x + s.base, s.pos.y + s.height);
        noStroke();
        quad(tl.x, tl.y, tr.x, tr.y, br.x, br.y, bl.x, bl.y);
        
        // color(255, 0, 0);
        // circle(s.pos.x, s.pos.y, 10);

        // if (s.pos.y > C.height) {
        //     s.pos.x = random(C.width * 0.4, C.width*1.3);
        //     s.pos.y = random(C.height * -0.5, C.height * -1.5);
        //     s.base = random(C.width * G.BASE_MIN, C.width * G.BASE_MAX);
        //     s.height = random(C.height * G.HEIGHT_MIN, C.height * G.HEIGHT_MAX);
        //     s.speed = random(G.SPEED_MIN, G.SPEED_MAX);
        // }
    });
    shapes = shapes.filter(s =>
        C.height * -1.0 < s.pos.y
        && s.pos.y < C.height * 2.0
    );
    // console.log(shapes);

    textAlign(CENTER);
    textSize(width*0.15);
    text("Juno Nguyen", C.mid.x, C.mid.y);
}

function paral(_pos, _base, _height, _speed, _isDown) {
    return {
        pos: _pos,
        base: _base,
        height: _height,
        speed: _speed,
        angle: _isDown ? PI/1.5 : PI/1.5 + PI
    };
}