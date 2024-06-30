// ページの読み込みを待つ
window.addEventListener('load', init);
function init() {
    // サイズを指定
    const width = window.innerWidth;
    const height = window.innerHeight;
    let rot = 0;
    let mousex=0;
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
        antialias:true
    });
    renderer.setSize(width, height);
    
    // シーンを作成
    const scene = new THREE.Scene({});
    scene.background = new THREE.Color(0x000000);     // 0x7799ff
    
    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);

    // 環境光
    var ambientLight = new THREE.AmbientLight(0xFFFFFF);
    scene.add(ambientLight);

    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2; // 光の強さを倍に
    light.position.set(1, 1, 1); // ライトの方向
    scene.add(light);


    // 線を作成
    const lines = new THREE.Group();
    const line_material = new THREE.LineBasicMaterial({ color:0x555555 });

    // for文でランダムな線（newline）を複数作る
    for(var i=0;i<10;i++){
        var line_geometry=new THREE.Geometry();
        line_geometry.vertices.push(
            new THREE.Vector3(-Math.random()*300,0,-Math.random()*300),
            new THREE.Vector3(0,Math.random()*300,-Math.random()*300),
            new THREE.Vector3(Math.random()*300,0,-Math.random()*300),
            new THREE.Vector3(Math.random()*300,0,-Math.random()*300),
            new THREE.Vector3(Math.random()*300,0,-Math.random()*300)
        );
        var newline=new THREE.Line(line_geometry,line_material);
        // newlineをグループに追加
        lines.add(newline);
    }
    scene.add(lines);
    
    // 箱を作成
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(50, 50, 100),
        new THREE.MeshStandardMaterial({color: 0x0000FF})
    );
    scene.add(box);

    
    tick();
    // 毎フレーム時に実行されるループイベントです
    function tick() {
        rot += 0.5; // 毎フレーム角度を0.5度ずつ足していく
        // ラジアンに変換する
        const radian = (rot * Math.PI) / 180;
        const radian2= ((rot+15)*Math.PI)/180;
        lines.position.x=50*Math.sin(radian2);
        lines.position.z=50*Math.cos(radian2);
        
        // 角度に応じてカメラの位置を設定
        camera.position.x = 200 * Math.sin(radian);
        camera.position.z = 200 * Math.cos(radian);
        // 原点方向を見つめる
        camera.lookAt(new THREE.Vector3(0, 10, 0));
        // レンダリング
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}