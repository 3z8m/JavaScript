import * as THREE from 'three';
//import { WebGPURenderer } from 'three/webgpu';

// WebGPU は非同期初期化が必要
let camera, scene, renderer, cube;

//init();
//animate();

let material_sh;
const clock = new THREE.Clock();

async function init() {
   // カメラ設定
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(4, 4, 5);
    camera.lookAt(0, 0, 0);

    // シーン設定
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x201919);

    // WebGLレンダラー
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // ライト
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5);
    light.castShadow = true;
    scene.add(light);

    scene.add(new THREE.AmbientLight(0x404040));


    material_sh = new THREE.ShaderMaterial({
        uniforms: {
            uTime:  { value: 0.0 },
            uColor: { value: new THREE.Color(0x4488ff) },
            uScale: { value: 1.5 },
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            varying vec2 vUv;
            void main() {
                float r = sin(uTime + vUv.x * 3.0) * 0.5 + 0.5;
                float g = sin(uTime * 0.7 + vUv.y * 3.0) * 0.5 + 0.5;
                float b = sin(uTime * 1.3) * 0.5 + 0.5;
                gl_FragColor = vec4(r, g, b, 1.0);
            }
        `,
    });

    material_sh.transparent = true;     // 透明を有効化


    // 床
    const planeGeometry = new THREE.PlaneGeometry(5, 5, 64, 64);  // 分割数を増やす
    const plane = new THREE.Mesh(planeGeometry, material_sh);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    window.addEventListener('resize', onWindowResize);
}


function animate() {
    requestAnimationFrame(animate);
    material_sh.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}

// ★ async init の完了後に animate を開始する
init().then(() => {
    animate();
});


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
