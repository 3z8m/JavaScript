/* -------------------------------------------------------------
6面の背景をつなげて立方体のなかでカメラを回す。
・画像ファイルは「縦：横＝1：1」にする
-------------------------------------------------------------- */

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let renderer, scene, camera, cubeCamera;

init();

function init() {

    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 0, 30 );

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 256 );

    cubeCamera = new THREE.CubeCamera( 1, 1000, cubeRenderTarget );

    // controls
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.minDistance = 10;
    controls.maxDistance = 50;
    controls.enablePan = false;

    // envmap
    const genCubeUrls = function ( prefix, postfix ) {
        return [
            prefix + 'px' + postfix, prefix + 'nx' + postfix,
            prefix + 'py' + postfix, prefix + 'ny' + postfix,
            prefix + 'pz' + postfix, prefix + 'nz' + postfix
        ];
    };

    const urls = genCubeUrls( 'textures/cube/myroom/', '.png' );

    new THREE.CubeTextureLoader().load( urls, function ( cubeTexture ) {

        scene.background = cubeTexture;
        cubeCamera.update( renderer, scene );

        render();
    } );

    // listener
    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {

    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
}

function render() {
    renderer.render( scene, camera );
}

