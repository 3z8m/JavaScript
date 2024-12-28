/* ==============================================================
Pointer Lock Controls

【作成】水山
【改訂履歴】
   2024.10.20  コイル変更（three-csg）
   2024.10.21  ファイル分割

================================================================ */

import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { MyObj } from "./scr_three_fps_obj.js";
import { Sky } from 'three/addons/objects/Sky.js';

let camera, scene, renderer, controls;
let sky, sun;

const objects = [];

let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

init();
animate();

function init() {

    // カメラ（視野，アスペクト比，可視範囲（近方，遠方））
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.y = 10;                             // カメラの高さ
    camera.lookAt(new THREE.Vector3(-100, 30, 30));     // カメラの初期方向(-100, 30, 30)

    // シーン
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x87cefa );     // 背景色（スカイブルー）
    scene.fog = new THREE.Fog( 0xffffff, 0, 300 );      // フォグ（色，範囲（近，遠））

    // ライト
    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(300, 300, 50);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    scene.add(light);
    scene.add(light.target);

    const light_a = new THREE.AmbientLight(0XFFFFFF, 0.45);
    scene.add(light_a);

    // Pointer Lock Controls（プレーヤー）
    controls = new PointerLockControls( camera, document.body );

    const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById( 'instructions' );

    instructions.addEventListener( 'click', function () {
        controls.lock();
    } );

    controls.addEventListener( 'lock', function () {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    } );

    controls.addEventListener( 'unlock', function () {
        blocker.style.display = 'block';
        instructions.style.display = '';
    } );

    // プレーヤー初期位置
    controls.getObject().position.set(30, 4, -5);   // 1ミルWS(30, 4, -5)
    //controls.getObject().position.set(75, 4, 120);   // テスト用
    scene.add( controls.getObject() );

    // キー操作
    const onKeyDown = function ( event ) {
        switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;
            case 'Space':
                if ( canJump === true ) velocity.y += 350;
                canJump = false;
                break;
        }
    };

    const onKeyUp = function ( event ) {
        switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;
        }
    };

    document.addEventListener( 'keydown', onKeyDown );
    document.addEventListener( 'keyup', onKeyUp );

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, -1, 0 ), 0, 10 );

    //
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //
    window.addEventListener( 'resize', onWindowResize );

    // 空
    initSky();

    // --------------------------------------------------------
    // オブジェクトを配置
    // --------------------------------------------------------
    MyObj.obj_center(scene, 0, 2, 0)                    // 中心点（マーカー）
    MyObj.obj_factory1(scene, -10, 1, 0)                // 第１工場　床・外壁
    MyObj.obj_secondFloar(scene, 0, 6, -15)             // 2階通路
    MyObj.obj_step(scene, -35, 0, -15)                  // 階段

    MyObj.obj_grinder(scene, 45, 2, -5)                 // グラインダー
    MyObj.obj_mill(scene, 15, 3, 7)                     // 1ミル
    MyObj.obj_mainOpe(scene, 15, 2, 1, Math.PI/2)       // 1ミル主操作盤
    MyObj.obj_mill(scene, 15, 3, -30)                   // 2ミル
    MyObj.obj_mainOpe(scene, 15, 2, -23, -Math.PI/2)    // 2ミル主操作盤
    MyObj.obj_2bal(scene, -50, 2, 7)                    // 2BAL
    MyObj.obj_mainOpe(scene, -50, 2, 1, Math.PI/2)      // 2BAL操作盤

    MyObj.obj_coil_JSON(scene, -35, 2, 5)               // コイル（JSONファイル）
    MyObj.obj_coils(scene, 0, 2, 10)                    // コイル（繰り返し）

    MyObj.obj_factory2(scene, 80, 1, 100)               // 第2工場
    MyObj.obj_grinder(scene, 87, 2, 50)                 // 2グラインダー
    MyObj.obj_3mill(scene, 87, 3, 70)                   // 3ミル
    MyObj.obj_mainOpe(scene, 70, 2, 70, Math.PI)        // 3ミル主操作盤
    MyObj.obj_3bal(scene, 87, 3, 120)                   // 3BAL
    MyObj.obj_mainOpe(scene, 80, 2, 120, Math.PI)       // 3BAL主操作盤
    MyObj.obj_coil_Souko(scene, 63, 3, 150)             // 立体倉庫＋コイル

    MyObj.obj_muhall(scene, 80, 1, -10)                 // μホール
    MyObj.obj_ground(scene, 25, 0.9, 30)                // 地面
    //MyObj.obj_tree(scene, 65, 1, 20)                    // 樹木
    MyObj.obj_tree2(scene, 65, 1, 20)                   // 樹木(gltf)
    MyObj.obj_tree3(scene, 120, 1, 30)                  // 樹木(gltf)

}   

// -------------------------------------------------------------------
// ウィンドウ自動調整
// -------------------------------------------------------------------
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

// -------------------------------------------------------------------
// アニメーション
// -------------------------------------------------------------------

function animate() {
    requestAnimationFrame( animate );
    const time = performance.now();

    if ( controls.isLocked === true ) {
        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;
        const intersections = raycaster.intersectObjects( objects, false );
        const onObject = intersections.length > 0;
        const delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta;                          // 重量 = 100.0

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        if ( onObject === true ) {
            velocity.y = Math.max( 0, velocity.y );
            canJump = true;
        }

        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );
        controls.getObject().position.y += ( velocity.y * delta );  // 上下左右の動き

        if ( controls.getObject().position.y < 4 ) {
            velocity.y = 0;
            controls.getObject().position.y = 4;     // プレーヤーの高さ（初期値）
            canJump = true;
        }
    }
    prevTime = time;
    
    renderer.render( scene, camera );
};


// -------------------------------------------------------------------
// 空（背景）
// -------------------------------------------------------------------
function initSky() {

    sky = new Sky();
    sky.scale.setScalar( 4500 );        // 元の値：450000
    scene.add( sky );

    sun = new THREE.Vector3();

    const effectController = {
        turbidity: 10,                              // 大気の濁度（曇り具合）
        rayleigh: 3,                                // レイリー散乱の強度
        mieCoefficient: 0.005,                      // Mie散乱係数
        mieDirectionalG: 0.7,                       // Mie散乱の方向性ギャップ
        elevation: 10,                              // 太陽の高度角（元：2⇒夕方）
        azimuth: 180,                               // 太陽の方位角
        exposure: renderer.toneMappingExposure      // トーンマッピングの露出
    };

    function guiChanged() {

        const uniforms = sky.material.uniforms;
        uniforms[ 'turbidity' ].value = effectController.turbidity;
        uniforms[ 'rayleigh' ].value = effectController.rayleigh;
        uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
        uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;

        // 太陽の位置
        const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
        const theta = THREE.MathUtils.degToRad( effectController.azimuth );

        sun.setFromSphericalCoords( 1, phi, theta );

        uniforms[ 'sunPosition' ].value.copy( sun );

        renderer.toneMappingExposure = effectController.exposure;
        renderer.render( scene, camera );

    }
    
    guiChanged();  
}