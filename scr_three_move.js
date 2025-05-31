/* ==========================================================
    工場見学
    ・カメラ移動
    ・クレーン往復移動

    作成日：2025.6.1
    作成者：水山
============================================================= */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import CSG from "three/addons/three-csg.js";
import { MyObj } from "./scr_three_fpc_obj.js";
import { Sky } from 'three/addons/objects/Sky.js';


let camera, scene, renderer;
let sky, sun;

init();
render();

function init() {

    // カメラ（視野，アスペクト比，可視範囲（近方，遠方））
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

    // シーン
    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x87cefa );     // 背景色（スカイブルー）
    //scene.fog = new THREE.Fog( 0xffffff, 0, 300 );      // フォグ（色，範囲（近，遠））

    // ライト
    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(300, 300, 50);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    scene.add(light);
    scene.add(light.target);

    // 環境光
    const light_a = new THREE.AmbientLight(0XFFFFFF, 0.45);
    scene.add(light_a);

    // レンダー
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // ウィンドウの大きさ
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
    MyObj.obj_mainOpe(scene, 84, 2, 130, Math.PI)       // 3BAL主操作盤
    MyObj.obj_coil_Souko(scene, 63, 3, 150)             // 立体倉庫＋コイル

    MyObj.obj_muhall(scene, 80, 1, -10)                 // μホール
    MyObj.obj_ground(scene, 25, 0.9, 30)                // 地面
    MyObj.obj_tree2(scene, 65, 1, 20)                   // 樹木(gltf)
    MyObj.obj_tree3(scene, 120, 1, 30)                  // 樹木(gltf)


    // ----------------------------------------------------
    // クレーン
    // ----------------------------------------------------
    const x0 = 0;
    const y0 = 7;
    const z0 = 3;
    
    const bar1 = new THREE.Mesh(            // クレーン横下
        new THREE.BoxGeometry(0.4, 0.4, 2),
        new THREE.MeshStandardMaterial({color: 0xFFD700})
    )
    bar1.position.set(x0, y0, z0)

    const bar2 = new THREE.Mesh(            // クレーン横上
        new THREE.BoxGeometry(0.4, 0.4, 1.6),
        new THREE.MeshStandardMaterial({color: 0xFFD700})
    )
    bar2.position.set(x0, y0+2, z0-0.2)

    const bar3 = new THREE.Mesh(            // クレーン縦
        new THREE.BoxGeometry(0.4, 2.4, 0.4),
        new THREE.MeshStandardMaterial({color: 0xFFD700})
    )
    bar3.position.set(x0, y0+1, z0-1)
    
    const crane = new THREE.Group();

    crane.add(bar1);
    crane.add(bar2);
    crane.add(bar3);
    scene.add(crane);

    // ----------------------------------------------------
    // コイル
    // ----------------------------------------------------
    // 大きな円柱
    var cyl_L = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 1, 32), 
        new THREE.MeshStandardMaterial({color: 0xEEEEEE})
    );
    // 小さな円柱
    var cyl_S = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32), 
        new THREE.MeshStandardMaterial({color: 0xEEEEEE})
    );            
    // 差分
    const cyl_L_bsp = CSG.fromMesh(cyl_L, 0);
    const cyl_S_bsp = CSG.fromMesh(cyl_S, 1);
    const cyl_bsp = cyl_L_bsp['subtract'](cyl_S_bsp);
    const coil = CSG.toMesh(cyl_bsp, cyl_L.matrix);
    coil.material = [cyl_L.material, cyl_S.material];
    coil.castShadow = coil.receiveShadow = true;
    coil.rotation.x = -Math.PI / 2;
    coil.position.set(x0, y0, z0);
    scene.add(coil);
    

    // ----------------------------------------------------
    // アニメーション（カメラ）
    // ----------------------------------------------------

    // クレーン初期設定
    const v_crane0 = 0.5;                 // クレーン速度（定数）
    let v_crane = v_crane0;             // クレーン速度（変数）

    // カメラ初期設定
    const x1 = 8; 
    const y1 = 2; 
    const z1 = -7; 
    
    camera.position.set(x1, y1, z1);    // 初期位置

    const v_camera0 = 0.2;              // カメラ移動速度
    let v_camera = v_camera0; 

    const rotationSpeed = 0.02;         // 回転速度

    let stage = 1;                      // ステージ管理

    // アニメーション
    function animate() {
        requestAnimationFrame(animate);
        
        // クレーン・コイル移動
        crane.position.x += v_crane
        coil.position.x += v_crane
        if(length +20 < crane.position.x ) { v_crane = -v_crane0 }
        if(crane.position.x < -60) { v_crane = v_crane0 }


        // 2BAL(x=-60) まで移動
        if (stage === 1) { 
            camera.position.x -= v_camera;
            camera.position.y = y1;
            camera.position.z = z1;
            if (camera.position.x <= -60) {
                camera.position.x = -60;
                stage = 2;                  // 回転ステージへ
            } else {
                // 視点を移動方向に設定
                const targetPosition = new THREE.Vector3(camera.position.x - v_camera, camera.position.y, camera.position.z);
                camera.lookAt(targetPosition);
            }
        }
        // 回転（180度左回り）
        else if (stage === 2) {
            console.log(`Stage: ${stage}, Rotation Y: ${camera.rotation.y}`);
            camera.rotation.y += rotationSpeed;
            if (camera.rotation.y >= Math.PI*1.5) {
                camera.rotation.y = Math.PI*1.5;        // 回転値を確定
                stage = 3;                          // 次のステージへ移行
            }
        }
        // 階段下(x=-33) まで戻る
        else if (stage === 3) { 
            camera.position.x += v_camera; 
            if (camera.position.x >= -33) {
                camera.position.x = -33; 
                stage = 4;
            } else {
                const targetPosition = new THREE.Vector3(camera.position.x + v_camera, camera.position.y, camera.position.z);
                camera.lookAt(targetPosition);
            }
        }
        // 回転（90度左回り）
        else if (stage === 4) {
            camera.rotation.y += rotationSpeed;
            if (camera.rotation.y >= 0) {
                camera.rotation.y = 0;
                stage = 5;
            }
        }
        // 階段下へ
        else if (stage === 5) { 
            camera.position.z -= v_camera; 
            if (camera.position.z < -15) {
                camera.position.z = -15; 
                stage = 6;
            } else {
                const targetPosition3 = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z - v_camera);
                camera.lookAt(targetPosition3);
            }
        }
        // 回転（90度左回り）
        else if (stage === 6) {
            camera.rotation.y += rotationSpeed;
            if (camera.rotation.y >= Math.PI / 2) {
                camera.rotation.y = Math.PI / 2;
                stage = 7;
            }
        }
        // 階段を上る
        else if (stage === 7) { 
            camera.position.x -= v_camera;
            camera.position.y += v_camera; 
            if (camera.position.x < -40) {
                camera.position.x = -40;
                camera.position.y = 4;
                stage = 8;
            } else {
                const targetPosition = new THREE.Vector3(camera.position.x - v_camera, camera.position.y, camera.position.z);
                camera.lookAt(targetPosition);
            }
        }
        // 回転（90度左回り）
        else if (stage === 8) {
            camera.rotation.y += rotationSpeed;
            if (camera.rotation.y >= Math.PI) {
                camera.rotation.y = Math.PI;
                stage = 9;
            }
        }
        else if (stage === 9) { 
            camera.position.z += v_camera * 0.1; 
            if (camera.position.z < -11) {
                camera.position.z = -11; 
                stage = 10;
            } else {
                const targetPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z + v_camera);
                camera.lookAt(targetPosition);
            }
        }
        // 回転（90度左回り）
        else if (stage === 10) {
            camera.rotation.y += rotationSpeed;
            if (camera.rotation.y >= Math.PI * 1.5) {
                camera.rotation.y = Math.PI * 1.5;
                stage = 11;
            }
        }
        // 階段を上る
        else if (stage === 11) { 
            camera.position.x += v_camera;
            camera.position.y += v_camera; 
            if (camera.position.x > -35) {
                camera.position.x = -35;
                camera.position.y = 8;
                stage = 12;
            } else {
                const targetPosition = new THREE.Vector3(camera.position.x + v_camera, camera.position.y, camera.position.z);
                camera.lookAt(targetPosition);
            }
        }
        // 2階通路入口(x=15) まで戻る
        else if (stage === 12) { 
            camera.position.x += v_camera; 
            if (camera.position.x > 57) {
                camera.position.x = 57; 
                stage = 13;
            } else {
                const targetPosition = new THREE.Vector3(camera.position.x + v_camera, camera.position.y, camera.position.z);
                camera.lookAt(targetPosition);
            }
        }
        // 回転（90度左回り）
        else if (stage === 13) {
            camera.rotation.y += rotationSpeed;
            if (camera.rotation.y > 0) {
                camera.rotation.y = 0;
                stage = 14;
            }
        }
        // 階段を下る
        else if (stage === 14) { 
            camera.position.z += v_camera;
            camera.position.y -= v_camera; 
            if (camera.position.z > -3) {
                camera.position.z = -3;
                camera.position.y = 2;
                stage = 15;
            } else {
                const targetPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z + v_camera);
                camera.lookAt(targetPosition);
            }
        }
        // 階段を降りた後の回転を削除
        // μ事務所側に少し進む
        else if (stage === 15) { 
            camera.position.x += v_camera * 0.2; 
            if (camera.position.x > 60) {
                camera.position.x = 60; 
                stage = 17;
            } else {
                const targetPosition = new THREE.Vector3(camera.position.x + v_camera, camera.position.y, camera.position.z);
                camera.lookAt(targetPosition);
            }
        }
        // 回転（90度右回り）
        else if (stage === 17) {
            camera.rotation.y -= rotationSpeed;
            if (camera.rotation.y < - Math.PI) {
                camera.rotation.y = - Math.PI;
                stage = 18;
            }
        }
        // 第2工場へ
        else if (stage === 18) { 
            camera.position.z += v_camera; 
            if (camera.position.z > 38) {
                camera.position.z = 38; 
                stage = 19;
            } else {
                const targetPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z + v_camera);
                camera.lookAt(targetPosition);
            }
        }
        // 回転（90度左回り）
        else if (stage === 19) {
            camera.rotation.y -= rotationSpeed;
            if (camera.rotation.y < - Math.PI / 2) {
                camera.rotation.y = - Math.PI / 2;
                stage = 20;
            }
        }
        else if (stage === 20) { 
            camera.position.x += v_camera; 
            if (camera.position.x > 115) {
                camera.position.x = 115; 
                stage = 21;
            } else {
                const targetPosition = new THREE.Vector3(camera.position.x + v_camera, camera.position.y, camera.position.z);
                camera.lookAt(targetPosition);
            }
        }
        // 回転（90度右回り）
        else if (stage === 21) {
            camera.rotation.y -= rotationSpeed;
            if (camera.rotation.y < - Math.PI) {
                camera.rotation.y = - Math.PI;
                stage = 22;
            }
        }
        // 第2工場壁沿いに北へ
        else if (stage === 22) { 
            camera.position.z += v_camera; 
            if (camera.position.z > 118) {
                camera.position.z = 118; 
                stage = 23;
            } else {
                const targetPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z + v_camera);
                camera.lookAt(targetPosition);
            }
        }
        // 回転（90度右回り）
        else if (stage === 23) {
            camera.rotation.y += rotationSpeed;
            if (camera.rotation.y > Math.PI / 2) {
                camera.rotation.y = Math.PI / 2;
                stage = 24;
            }
        }
        // 第2工場入口で停止⇒入場
        else if (stage === 24) {
            setTimeout(() => {
                camera.position.x -= v_camera;
                if (camera.position.x < 90) {
                    camera.position.x = 90;
                    stage = 25;
                } else {
                    const targetPosition = new THREE.Vector3(camera.position.x - v_camera, camera.position.y, camera.position.z);
                    camera.lookAt(targetPosition);
                }
            }, 2000);           // 2秒停止
        }        
        // 立体倉庫へ
        else if (stage === 25) {
            camera.position.z += v_camera;
            if (camera.position.z > 120) {
                camera.position.z = 120;
                stage = 26;
            }
        }
        else if (stage === 26) {
            camera.position.x -= v_camera;
            if (camera.position.x < 80) {
                camera.position.x = 80;
                stage = 27;
            } else {
                const targetPosition = new THREE.Vector3(camera.position.x - v_camera, camera.position.y, camera.position.z);
                camera.lookAt(targetPosition);
            }
        } 
        // 回転（90度右回り）
        else if (stage === 27) {
            camera.rotation.y -= rotationSpeed;
            if (camera.rotation.y < 0) {
                camera.rotation.y = 0;
                stage = 28;
            }
        }

        renderer.render(scene, camera);
    }
    animate();
    

    // ----------------------------------------------------
    // マウス操作
    // ----------------------------------------------------
    
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.minDistance = 40;
    controls.maxDistance = 1000;
    //controls.target.set( 0, 10, 0 );
    controls.update();
    window.addEventListener( 'resize', onWindowResize );

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
// レンダリング
// -------------------------------------------------------------------

function render() {
    renderer.render( scene, camera );
};


// -------------------------------------------------------------------
// 空（背景）
// -------------------------------------------------------------------
function initSky() {

    sky = new Sky();
    sky.scale.setScalar( 450000 );        // 元の値：450000
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