import * as THREE from 'three';
//import { WebGPURenderer } from 'three/webgpu';

// WebGPU は非同期初期化が必要
let camera, scene, renderer, cube;

init();
animate();

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


    const material_sh = new THREE.ShaderMaterial({ 
        vertexShader: ` 
            varying vec2 vUv; 
 
            void main() { 
                vUv = uv; // Three.jsが提供するUV座標をvaryingに入れる 
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 
            }
        `, 
        fragmentShader: `
            varying vec2 vUv; 
    
            void main() { 
                // vUvのx成分を赤、y成分を緑として色に使う 
                gl_FragColor = vec4(vUv.x, vUv.y, 0.0, 1.0); 
            }
        `, 
    });

    material_sh.transparent = true;     // 透明を有効化

    // 床
    const planeGeometry = new THREE.PlaneGeometry(5, 5, 64, 64);  // 分割数を増やす
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const plane = new THREE.Mesh(planeGeometry, material_sh);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // 立方体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.position.y = 0.5;
    //scene.add(cube);

    window.addEventListener('resize', onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
