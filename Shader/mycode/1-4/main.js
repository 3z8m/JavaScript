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


    // WebGPUレンダラー
    /*
    renderer = new WebGPURenderer({ antialias: true });
    await renderer.init();      // WebGPUは初期化が非同期
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    */

    // ライト
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5);
    light.castShadow = true;
    scene.add(light);

    scene.add(new THREE.AmbientLight(0x404040));


    const material_sh = new THREE.ShaderMaterial({ 
        vertexShader: ` 
            void main() { 
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 
            } 
        `, 
        fragmentShader: ` 
            void main() { 
                gl_FragColor = vec4(1.0, 0.2, 0.0, 0.5); 
            } 
        `, 
    });

    material_sh.transparent = true;     // 透明を有効化

    const material_sh2 = new THREE.ShaderMaterial({
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            void main() {
                vec3 lightDir = normalize(vec3(0.5, 1.0, 0.75)); // 光の方向
                float diff = max(dot(vNormal, lightDir), 0.0);    // 拡散反射
                vec3 color = vec3(1.0, 0.5, 0.0) * diff + vec3(0.1, 0.05, 0.0); // ベース色＋環境光
                gl_FragColor = vec4(color, 1.0);
            }
        `,
    });

    // 床
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // 立方体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    //const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material_sh);
    cube.castShadow = true;
    cube.position.y = 0.5;
    scene.add(cube);

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
