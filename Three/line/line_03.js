window.addEventListener('DOMContentLoaded', init);

function init() {
    
    // set window's size
    const width = window.innerWidth;
    const height = window.innerHeight;
    let rot = 0;
    
    // create a renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
        antialias:true
    });
    renderer.setSize(width, height);
    
    // create a scene
    const scene = new THREE.Scene({});
    
    // create a camera
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0,0,500);

    // 線のグループを作る
    var lines=new THREE.Group();
    const line_material=new THREE.LineBasicMaterial({ color:0xffffff });
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
    // linesグループをシーンに追加
    scene.add(lines);

    tick();
    
    function tick() {          
        
        // rotate camera
        rot+=0.5;
        const radian=Math.PI/180*rot;
        camera.position.x=500*Math.sin(radian);
        camera.position.z=500*Math.cos(radian);
        camera.lookAt(0,0,0);
        
        // Rendering
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
        
}