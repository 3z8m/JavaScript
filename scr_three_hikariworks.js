/*
    製鋼プロセス
    【作成日】2024.1.22
*/

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import CSG from "three/addons/three-csg.js";

let camera, scene, renderer;
let isAnimating = true;         // フラグを追加
let animationFrameId;           // requestAnimationFrame IDを保持

init();
render();

function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild( renderer.domElement );

    // カメラ（視野，アスペクト比，可視範囲（近方，遠方））
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set(-60, 30, -130);             // カメラの位置  
    camera.lookAt(new THREE.Vector3(0, 0, 0));      // カメラの初期方向(-100, 30, 30)

    // オブジェクトのテクスチャ設定
    const environment = new RoomEnvironment( renderer );
    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    // シーン
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x87cefa );     // 背景色（スカイブルー）
    //scene.fog = new THREE.Fog( 0xffffff, 0, 300 );      // フォグ（色，範囲（近，遠））

    // GLTFオブジェクトのテクスチャを表示
    scene.environment = pmremGenerator.fromScene( environment ).texture;
    environment.dispose();

    // マウス操作
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );      // use if there is no animation loop
    controls.update();
    window.addEventListener( 'resize', onWindowResize );

    // アニメーション（カメラ移動）
    let angle = Math.PI;                            // 角度の初期値
    function animate() {
        if (isAnimating) {
            animationFrameId = requestAnimationFrame(animate);
            angle += 0.005;
            camera.position.x = 100 * Math.sin(angle);
            camera.position.z = 100 * Math.cos(angle);
            camera.lookAt(scene.position);      // 常にシーンの中心を見るようにする
            renderer.render(scene, camera);
        }
    }
    animate()

    // ボタンのイベントリスナーを追加（アニメーション）
    document.getElementById('toggleAnimation').addEventListener('click', function() {
        isAnimating = !isAnimating;
        if (isAnimating) {
            animate();
            this.textContent = 'STOP';
        } else {
            cancelAnimationFrame(animationFrameId);
            this.textContent = 'START';
        }
    });

    // --------------------------------------------------------
    // オブジェクトを配置
    // --------------------------------------------------------

    obj_light();                    // 光源
    obj_ground(0, 0, 0);            // 地面
    obj_grass(0, 0, 0)              // 緑地
    obj_foil(1, 0, -40)             // 箔工場
    obj_sheet_1(7, 0, -27)          // 薄板1
    obj_sheet_2(5, 0, -8)           // 薄板2
    obj_steel(-7, 0, -9)            // 製鋼
    //text_stell(-7, 4.1, -9)       // 製鋼（文字）
    obj_pipe(-9, 0, -31)            // 電縫鋼管
    obj_wire1(-9, 0, 3)             // 棒線1
    obj_wire2(-9, 0, 14)            // 棒線2
    obj_push1(-7, 0, 21)            // 熱押1
    obj_push2(-9, 0, 30)            // 熱押2
    obj_power(-6, 1, 9)             // 自家発電
    
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
};

function render() {
    renderer.render( scene, camera );
};


// ==================================================================
// オブジェクト用関数
// ==================================================================

function obj_light(){
    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2;            // 光の強さを倍に
    light.position.set(1, 1, 1);    // ライトの方向
    scene.add(light);

    // 環境光源
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.5;
    scene.add(ambientLight);
}


// -------------------------------------------------------------------
// 地面
// -------------------------------------------------------------------
function obj_ground(x, y, z) {

    const ground_face = new THREE.Shape()
    ground_face.moveTo(50, -60)
    ground_face.lineTo(50, 70)
    ground_face.lineTo(10, 70)
    ground_face.lineTo(-30, 40)
    ground_face.lineTo(-30, 10)
    ground_face.lineTo(-20, -10)
    ground_face.lineTo(-24, -11)
    ground_face.lineTo(-40, 20)     // 埠頭（北東）
    ground_face.lineTo(-40, 42)     // 埠頭（南東）
    ground_face.lineTo(-44, 42)     // 埠頭（南西）
    ground_face.lineTo(-44, 20)     // 埠頭（北西）・川（南側・南東）
    ground_face.lineTo(-10, -51)    // 川（南側・北東）
    ground_face.lineTo(-15, -51)    // 川（南側・北西）
    ground_face.lineTo(-55, 10)     // 川（南側・南西）
    ground_face.lineTo(-60, 8)
    ground_face.lineTo(-60, -60)
    ground_face.lineTo(-9, -60)     // 川（北側・北西）
    ground_face.lineTo(-14, -52)    // 川（北側・南西）
    ground_face.lineTo(-9, -52)     // 川（北側・南東）
    ground_face.lineTo(-4, -60)     // 川（北側・北東）
    ground_face.lineTo(50, -60)

    const ground_extrude = { depth: 1, bevelEnabled: false };
    const ground = new THREE.Mesh(
        new THREE.ExtrudeGeometry(ground_face, ground_extrude),
        new THREE.MeshStandardMaterial({
            color: 0x666666
        })
    );
    ground.rotation.x = Math.PI / 2
    ground.position.set(x, y, z)
    scene.add(ground)

    // 海・川（南）
    const water_face = new THREE.Shape()
    water_face.moveTo(-60, 70)
    water_face.lineTo(10, 70)
    water_face.lineTo(-30, 40)
    water_face.lineTo(-30, 10)
    water_face.lineTo(-20, -10)
    water_face.lineTo(-24, -11)
    water_face.lineTo(-40, 20)
    water_face.lineTo(-40, 42)
    water_face.lineTo(-44, 42)
    water_face.lineTo(-44, 20)
    water_face.lineTo(-10, -51)
    water_face.lineTo(-15, -51)
    water_face.lineTo(-55, 10)
    water_face.lineTo(-60, 8)
    water_face.lineTo(-60, 70)

    const water_extrude = { depth: 0.5, bevelEnabled: false };
    const water = new THREE.Mesh(
        new THREE.ExtrudeGeometry(water_face, water_extrude),
        new THREE.MeshStandardMaterial({
            color: 0x191970,
            opacity: 0.5,
            transparent: true
        })
    );
    water.rotation.x = Math.PI / 2
    water.position.set(x, y-0.5, z)
    scene.add(water)

    // 川（北）
    const water2_face = new THREE.Shape()
    water2_face.moveTo(-9, -60)
    water2_face.lineTo(-14, -52)
    water2_face.lineTo(-9, -52)
    water2_face.lineTo(-4, -60)
    water2_face.lineTo(-9, -60)

    const water2_extrude = { depth: 0.5, bevelEnabled: false };
    const water2 = new THREE.Mesh(
        new THREE.ExtrudeGeometry(water2_face, water2_extrude),
        new THREE.MeshStandardMaterial({
            color: 0x191970,
            opacity: 0.5,
            transparent: true
        })
    );
    water2.rotation.x = Math.PI / 2
    water2.position.set(x, y-0.5, z)
    scene.add(water2)    
}

// 緑地
function obj_grass(x, y, z) {

    // テクスチャ
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
        './textures/grass2.png', 
        function (texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(0.5, 0.5);           // 繰り返し設定
        }
    );

    // 緑地（北東）
    const grass1_face = new THREE.Shape()
    grass1_face.moveTo(1, -50)
    grass1_face.lineTo(13, -50)
    grass1_face.lineTo(25, -36)
    grass1_face.lineTo(25, -2)
    grass1_face.lineTo(16, -2)
    grass1_face.lineTo(16, -38)
    grass1_face.lineTo(11, -38)
    grass1_face.lineTo(11, -47)
    grass1_face.lineTo(1, -47)
    grass1_face.lineTo(1, -50)

    const grass1_extrude = { depth: 0.2, bevelEnabled: false };
    const grass1 = new THREE.Mesh(
        new THREE.ExtrudeGeometry(grass1_face, grass1_extrude),
        new THREE.MeshStandardMaterial({ map : texture })
    );
    grass1.rotation.x = Math.PI / 2
    grass1.position.set(x, y+0.4, z)
    scene.add(grass1)

    // 緑地（北西）
    const grass2_face = new THREE.Shape()
    grass2_face.moveTo(-2, -50)
    grass2_face.lineTo(-2, -47)
    grass2_face.lineTo(-10, -47)
    grass2_face.lineTo(-42, 20.4)
    grass2_face.lineTo(-43, 20)        
    grass2_face.lineTo(-10, -50)
    grass2_face.lineTo(-2, -50)

    const grass2_extrude = { depth: 0.2, bevelEnabled: false };
    const grass2 = new THREE.Mesh(
        new THREE.ExtrudeGeometry(grass2_face, grass2_extrude),
        new THREE.MeshStandardMaterial({ map : texture })
    );
    grass2.rotation.x = Math.PI / 2
    grass2.position.set(x, y+0.4, z)
    scene.add(grass2)

}


// -------------------------------------------------------------------
// 工場
// -------------------------------------------------------------------
function obj_foil(x, y, z) {

    // 第2工場
    const foil1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 5),
        new THREE.MeshStandardMaterial({
            color: 0xFF0000,
            opacity: 0.8,
            transparent: true
        })
    )
    foil1.position.set(x+0.5, y+1, z-2.5)
    scene.add(foil1)

    const foil2_face = new THREE.Shape()
    foil2_face.moveTo(1.5, 1)
    foil2_face.lineTo(9, 1)
    foil2_face.lineTo(9, 2)
    foil2_face.lineTo(4, 2)
    foil2_face.lineTo(4, 2.5)
    foil2_face.lineTo(1.5, 2.5)
    foil2_face.lineTo(1.5, 1)

    // 第1工場
    const foil2_extrude = { depth: 2, bevelEnabled: false };
    const foil2 = new THREE.Mesh(
        new THREE.ExtrudeGeometry(foil2_face, foil2_extrude),
        new THREE.MeshStandardMaterial({
            color: 0xFF0000,
            opacity: 0.8,
            transparent: true,
        })
    );
    foil2.rotation.x = Math.PI / 2
    foil2.position.set(x, y+2, z)
    scene.add(foil2)

    // μホール
    const mu = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 1),
        new THREE.MeshPhongMaterial({
            color: 0xDDDDDD,
            opacity: 0.8,
            transparent: true
        })
    )
    mu.position.set(x+0.5, y+1, z+2)
    scene.add(mu)
}


// 薄板１工場
function obj_sheet_1(x, y, z) {

    const factory_face = new THREE.Shape()
    factory_face.moveTo(8, 2)
    factory_face.lineTo(-4, 2)
    factory_face.lineTo(-4, 3)
    factory_face.lineTo(7, 3)
    factory_face.lineTo(7, 6)
    factory_face.lineTo(-1, 6)
    factory_face.lineTo(-1, 8)
    factory_face.lineTo(-5, 8)
    factory_face.lineTo(-5, 1)
    factory_face.lineTo(-6, 1)
    factory_face.lineTo(-6, -9)
    factory_face.lineTo(6, -9)
    factory_face.lineTo(6, -5)
    factory_face.lineTo(0, -5)
    factory_face.lineTo(0, -3)
    factory_face.lineTo(-5, -3)
    factory_face.lineTo(-5, -2)
    factory_face.lineTo(8, -2)
    factory_face.lineTo(8, 2)

    const factory_extrude = { depth: 3, bevelEnabled: false };
    const factory = new THREE.Mesh(
        new THREE.ExtrudeGeometry(factory_face, factory_extrude),
        new THREE.MeshStandardMaterial({
            color: 0x0044FF,
            opacity: 0.8,
            transparent: true,
        })
    );
    factory.rotation.x = Math.PI / 2
    factory.position.set(x, y+3, z)
    scene.add(factory)
}

// 薄板2工場
function obj_sheet_2(x, y, z) {

    const factory_face = new THREE.Shape()
    factory_face.moveTo(-2, -5)
    factory_face.lineTo(-2, 5)
    factory_face.lineTo(0, 5)
    factory_face.lineTo(0, 7)
    factory_face.lineTo(2, 7)
    factory_face.lineTo(2, 5)
    factory_face.lineTo(4, 5)
    factory_face.lineTo(4, 2)
    factory_face.lineTo(2, 2)
    factory_face.lineTo(2, -2)
    factory_face.lineTo(4, -2)
    factory_face.lineTo(4, -6)
    factory_face.lineTo(0, -6)
    factory_face.lineTo(0, -5)
    factory_face.lineTo(-2, -5)

    const factory_extrude = { depth: 3, bevelEnabled: false };
    const factory = new THREE.Mesh(
        new THREE.ExtrudeGeometry(factory_face, factory_extrude),
        new THREE.MeshStandardMaterial({
            color: 0x0044FF,
            opacity: 0.8,
            transparent: true,
        })
    );
    factory.rotation.x = Math.PI / 2
    factory.position.set(x, y+3, z)
    scene.add(factory)
}

// 製鋼工場
function obj_steel(x, y, z) {

    const factory_face = new THREE.Shape()
    factory_face.moveTo(5, 3)
    factory_face.lineTo(3, 3)
    factory_face.lineTo(3, 4)
    factory_face.lineTo(-2, 4)
    factory_face.lineTo(-2, 3)
    factory_face.lineTo(-8, 3)
    factory_face.lineTo(-8, 1)
    factory_face.lineTo(-1, 1)
    factory_face.lineTo(-1, 0)
    factory_face.lineTo(-5, 0)
    factory_face.lineTo(-5, -4)
    factory_face.lineTo(-6, -4)
    factory_face.lineTo(-6, -6)
    factory_face.lineTo(0, -6)
    factory_face.lineTo(0, -4)
    factory_face.lineTo(4, -4)
    factory_face.lineTo(4, -3)
    factory_face.lineTo(5, -3)
    factory_face.lineTo(5, 3)

    const factory_extrude = { depth: 4, bevelEnabled: false };
    const factory = new THREE.Mesh(
        new THREE.ExtrudeGeometry(factory_face, factory_extrude),
        new THREE.MeshStandardMaterial({
            color: 0x0000FF,
            opacity: 0.8,
            transparent: true,
        })
    );
    factory.rotation.x = Math.PI / 2
    factory.position.set(x, y+4, z)
    scene.add(factory)
}

// 電縫鋼管工場
function obj_pipe(x, y, z) {

    const factory_face = new THREE.Shape()
    factory_face.moveTo(5, 4)
    factory_face.lineTo(-1, 4)
    factory_face.lineTo(-1, 6)
    factory_face.lineTo(-4, 6)
    factory_face.lineTo(-4, 3)
    factory_face.lineTo(-5, 3)
    factory_face.lineTo(-5, 0)
    factory_face.lineTo(-4, 0)
    factory_face.lineTo(-4, -8)
    factory_face.lineTo(0, -8)
    factory_face.lineTo(0, -4)
    factory_face.lineTo(5, -4)
    factory_face.lineTo(5, 4)

    const factory_extrude = { depth: 3, bevelEnabled: false };
    const factory = new THREE.Mesh(
        new THREE.ExtrudeGeometry(factory_face, factory_extrude),
        new THREE.MeshStandardMaterial({
            color: 0xDDDDDD,
            opacity: 0.8,
            transparent: true,
        })
    );
    factory.rotation.x = Math.PI / 2
    factory.rotation.z = Math.PI / 6
    factory.position.set(x, y+3, z)
    scene.add(factory)
}

// 電縫鋼管工場
function obj_wire1(x, y, z) {

    const factory_face = new THREE.Shape()
    factory_face.moveTo(7, 1)
    factory_face.lineTo(7, -1)
    factory_face.lineTo(-6, -1)
    factory_face.lineTo(-6, 2)
    factory_face.lineTo(3, 2)
    factory_face.lineTo(3, 1)
    factory_face.lineTo(7, 1)

    const factory_extrude = { depth: 3, bevelEnabled: false };
    const factory = new THREE.Mesh(
        new THREE.ExtrudeGeometry(factory_face, factory_extrude),
        new THREE.MeshStandardMaterial({
            color: 0xDDDDDD,
            opacity: 0.8,
            transparent: true,
        })
    );
    factory.rotation.x = Math.PI / 2
    factory.position.set(x, y+3, z)
    scene.add(factory)
}

function obj_wire2(x, y, z) {

    const factory_face = new THREE.Shape()
    factory_face.moveTo(7, 2)
    factory_face.lineTo(7, -2)
    factory_face.lineTo(-2, -2)
    factory_face.lineTo(-2, -3)
    factory_face.lineTo(-6, -3)
    factory_face.lineTo(-6, -2)
    factory_face.lineTo(-8, -2)
    factory_face.lineTo(-8, -1)
    factory_face.lineTo(-9, -1)
    factory_face.lineTo(-9, 1)
    factory_face.lineTo(-5, 1)
    factory_face.lineTo(-5, 2)
    factory_face.lineTo(7, 2)

    const factory_extrude = { depth: 3, bevelEnabled: false };
    const factory = new THREE.Mesh(
        new THREE.ExtrudeGeometry(factory_face, factory_extrude),
        new THREE.MeshStandardMaterial({
            color: 0xDDDDDD,
            opacity: 0.8,
            transparent: true,
        })
    );
    factory.rotation.x = Math.PI / 2
    factory.position.set(x, y+3, z)
    scene.add(factory)
}

// 熱押1
function obj_push1(x, y, z) {

    const factory_face = new THREE.Shape()
    factory_face.moveTo(5, 1)
    factory_face.lineTo(5, 0)
    factory_face.lineTo(3, 0)
    factory_face.lineTo(3, -3)
    factory_face.lineTo(0, -3)
    factory_face.lineTo(0, 0)
    factory_face.lineTo(-6, 0)
    factory_face.lineTo(-6, 1)
    factory_face.lineTo(-3, 1)
    factory_face.lineTo(-3, 2)
    factory_face.lineTo(2, 2)
    factory_face.lineTo(2, 1)
    factory_face.lineTo(5, 1)

    const factory_extrude = { depth: 3, bevelEnabled: false };
    const factory = new THREE.Mesh(
        new THREE.ExtrudeGeometry(factory_face, factory_extrude),
        new THREE.MeshStandardMaterial({
            color: 0xDDDDDD,
            opacity: 0.8,
            transparent: true,
        })
    );
    factory.rotation.x = Math.PI / 2
    factory.position.set(x, y+3, z)
    scene.add(factory)
}

// 熱押2
function obj_push2(x, y, z) {

    const factory_face = new THREE.Shape()
    factory_face.moveTo(7, 3)
    factory_face.lineTo(7, 2)
    factory_face.lineTo(3, 2)
    factory_face.lineTo(3, 0)
    factory_face.lineTo(5, 0)
    factory_face.lineTo(5, -1)
    factory_face.lineTo(7, -1)
    factory_face.lineTo(7, -4)
    factory_face.lineTo(-6, -4)
    factory_face.lineTo(-6, 2)
    factory_face.lineTo(-2, 2)
    factory_face.lineTo(-2, 3)
    factory_face.lineTo(7, 3)

    const factory_extrude = { depth: 3, bevelEnabled: false };
    const factory = new THREE.Mesh(
        new THREE.ExtrudeGeometry(factory_face, factory_extrude),
        new THREE.MeshStandardMaterial({
            color: 0xDDDDDD,
            opacity: 0.8,
            transparent: true,
        })
    );
    factory.rotation.x = Math.PI / 2
    factory.position.set(x, y+3, z)
    scene.add(factory)
}

// 自家発電
function obj_power(x, y, z) {

    for (let i=0; i<3; i++) {
        // 大きな円柱
        var cyl_L = new THREE.Mesh(
            new THREE.CylinderGeometry(0.6, 0.6, 1.5, 32), 
            new THREE.MeshStandardMaterial()
        );
        // 小さな円柱
        var cyl_S = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.3, 1.6, 32), 
            new THREE.MeshStandardMaterial()
        );            
        // 差分
        var cyl_L_bsp = CSG.fromMesh(cyl_L, 0);
        var cyl_S_bsp = CSG.fromMesh(cyl_S, 1);
        let cyl_bsp = cyl_L_bsp['subtract'](cyl_S_bsp);

        // 赤い部分
        let coil_R = CSG.toMesh(cyl_bsp, cyl_L.matrix);
        coil_R.material = new THREE.MeshStandardMaterial({
            color: 0xFF3333,
            opacity: 0.5,
            transparent: true,
        });
        coil_R.position.set(x, y+i*3+1.5, z);
        scene.add(coil_R);

        // 白い部分
        let coil_W = CSG.toMesh(cyl_bsp, cyl_L.matrix);
        coil_W.material = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            opacity: 0.9,
            transparent: true,
        });
        coil_W.position.set(x, y+i*3, z);
        scene.add(coil_W);  
    }
  
}


function text_stell(x, y, z) {
    // Canvasエレメントを作成してテキストを描画
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 600;

    const context = canvas.getContext('2d');
    // 背景を透明にするためにクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    // テキストのスタイルと位置を設定して描画
    context.font = '300px Arial';
    context.fillStyle = 'black';
    context.fillText('製鋼', 10, 300);

    // Canvasをテクスチャとして使用
    const texture = new THREE.CanvasTexture(canvas);
    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(12, 6), 
        new THREE.MeshBasicMaterial({ 
            map: texture, 
            side: THREE.DoubleSide,
            transparent: true 
        })
    );
    mesh.rotation.x = -Math.PI / 2
    mesh.position.set(x, y, z)
    scene.add(mesh);
}