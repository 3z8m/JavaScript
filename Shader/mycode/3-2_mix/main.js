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
                vec3 colorA = vec3(0.1, 0.2, 0.8); // 青 
                vec3 colorB = vec3(1.0, 0.4, 0.1); // オレンジ
                                
                // vUv.xは左端が0.0、右端が1.0なので左から右へグラデーションになる 
                // vec3 col = mix(colorA, colorB, vUv.x); 

                // 0.3〜0.7の範囲でなめらかに切り替わる 
                float t = smoothstep(0.2, 0.9, vUv.x); 
                vec3 col = mix(colorA, colorB, t);

                gl_FragColor = vec4(col, 1.0); 
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
