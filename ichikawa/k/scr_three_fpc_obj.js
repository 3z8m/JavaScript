/* ============================================================
オブジェクト関数

    obj_center          // 中心点（マーカー）
    obj_factory1        // 第１工場　床・外壁
    obj_secondFloar     // 2階通路
    obj_step            // 内階段

    obj_grinder         // グラインダー
    obj_mill            // 1・2ミル
    obj_2bal            // 2BAL
    obj_mainOpe         // 主操作盤

    obj_factory2        // 第2工場
    obj_grinder         // 2グラインダー
    obj_3mill           // 3ミル
    obj_3bal            // 3BAL

    obj_coil_Souko      // 立体倉庫＋コイル
    obj_coil_JSON       // コイル（JSONファイル）
    obj_coils           // コイル（繰り返し）

    obj_muhall          // μホール
    obj_ground          // 地面
    obj_tree            // 樹木
    obj_cloud           // 雲

============================================================= */


import * as THREE from "three";
import CSG from "three/addons/three-csg.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from "three/addons/loaders/FontLoader.js";


export class MyObj {

    // 中心点（マーカー）
    static obj_center(scene, x, y, z) {
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
        const material = new THREE.MeshStandardMaterial({
            color: 0x0000FF,
            opacity: 0.5,
            transparent: true,
        })
        const box = new THREE.Mesh(geometry, material)
        box.position.set(x, y, z)
        scene.add(box)
    };

    // -------------------------------------------------------------------
    // 第1工場　床 外壁
    // -------------------------------------------------------------------
    static obj_factory1(scene, x, y, z) {

        const Opacity_wall = 0.5;               // 透明度

        // 床
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(130, 40, 1, 1), 
            new THREE.MeshPhongMaterial({ color: 0x00AA00 })
        );
        plane.position.set(x, y, z);
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        const plane2 = new THREE.Mesh(
            new THREE.PlaneGeometry(60, 20, 1, 1), 
            new THREE.MeshPhongMaterial({ color: 0x00AA00 })
        );
        plane2.position.set(x+35, y, z-30);
        plane2.rotation.x = -Math.PI / 2;
        scene.add(plane2);

        // 壁（東）
        const wall_E = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 16, 40), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
                opacity: Opacity_wall,          // 透明度
                transparent: true,
            })
        );
        wall_E.position.set(x-65, y+8, z);   
        scene.add(wall_E);

        // 壁（西1）
        const wall_W1 = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 16, 60), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
                opacity: Opacity_wall,
                transparent: true,
            })
        );
        wall_W1.position.set(x+65, y+8, z-10);   
        scene.add(wall_W1);

        // 壁（西2）
        const wall_W2 = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 16, 20), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
                opacity: Opacity_wall,
                transparent: true,
            })
        );
        wall_W2.position.set(x+5, y+8, z-30);   
        scene.add(wall_W2);

        // 内壁（RS）
        const wall_W3 = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 5, 40), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
                opacity: 0.8,
                transparent: true,
            })
        );
        wall_W3.position.set(x+45, y+2.5, z);   
        scene.add(wall_W3);

        // 壁（北）
        const wall_N1 = new THREE.Mesh(
            new THREE.BoxGeometry(130, 16, 0.2), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
                opacity: Opacity_wall,
                transparent: true,
            })
        );
        wall_N1.position.set(x, y+8, z+20);
        scene.add(wall_N1);

        // 壁（南1）
        const wall_S1 = new THREE.Mesh(
            new THREE.BoxGeometry(60, 16, 0.2), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
                opacity: Opacity_wall,
                transparent: true,
            })
        );
        wall_S1.position.set(x+35, y+8, z-40);
        scene.add(wall_S1);

        // 壁（南2）２ミル
        const wall_S2 = new THREE.Mesh(
            new THREE.BoxGeometry(70, 16, 0.2), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
                opacity: Opacity_wall,
                transparent: true,
            })
        );
        wall_S2.position.set(x-30, y+8, z-20);
        scene.add(wall_S2);

        // 外階段
        for (let i = 0; i < 15; i++) {
            const Kaidan = new THREE.Mesh(
                new THREE.BoxGeometry(2, 0.1, 0.5),
                new THREE.MeshPhongMaterial({ color: 0xEEEEEE })
            );
            Kaidan.position.set(x+66, y+i*0.3, z-24+i*0.5);  
            scene.add(Kaidan);
        };
    
    };

    // -------------------------------------------------------------------
    // 2階通路
    // -------------------------------------------------------------------
    static obj_secondFloar(scene, x, y, z) {
        const second_flor = new THREE.Mesh(
            new THREE.BoxGeometry(90, 0.1, 10), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
                opacity: 0.8,
                transparent: true,
            })
        );
        second_flor.position.set(x+10, y, z);
        scene.add(second_flor);

        // 手摺り
        for (let i = 0; i < 15; i++) {
            const poleV = new THREE.Mesh(
                new THREE.CylinderGeometry(0.05, 0.05, 1.6, 32, 1, false),
                new THREE.MeshStandardMaterial({ color: 0xFFFF00 })
            );
            poleV.position.set(x-5*i+35, y+0.8, z+5);
            scene.add(poleV);
        };

        const poleH = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 70, 32, 1, false),
            new THREE.MeshStandardMaterial({ color: 0xFFFF00 })
        );
        poleH.rotation.z = Math.PI / 2;
        poleH.position.set(x, y+1.6, z+5);
        scene.add(poleH);

    };

    // -------------------------------------------------------------------
    // 階段
    // -------------------------------------------------------------------
    static obj_step(scene, x, y, z) {
        // 階段（下）
        for (let i = 0; i < 7; i++) {
            const Kaidan = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.1, 3),
                new THREE.MeshPhongMaterial({ color: 0xEEEEEE })
            );
            Kaidan.position.set(x-i*0.5, y+i*0.3+1, z);  
            scene.add(Kaidan);
        };
        // 階段（上）
        for (let i = 0; i < 7; i++) {
            const Kaidan = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.1, 3),
                new THREE.MeshPhongMaterial({ color: 0xEEEEEE })
            );
            Kaidan.position.set(x+i*0.5-3, y+i*0.3+4, z+3);  
            scene.add(Kaidan);
        };
        // 中間フロア
        const Chukan = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.1, 6),
            new THREE.MeshPhongMaterial({ color: 0xEEEEEE })
        );
        Chukan.position.set(x-4.3, y+3.5, z+1.2);
        scene.add(Chukan);
    };


    // -------------------------------------------------------------------
    // グラインダー
    // -------------------------------------------------------------------
    static obj_grinder(scene, x, y, z) {
        // 台座
        const box_1 = new THREE.Mesh(
            new THREE.BoxGeometry(2, 3, 7), 
            new THREE.MeshPhongMaterial({ color: 0x555555 })
        );
        box_1.position.set(x, y, z);
        scene.add(box_1);

        // 芯押し側（左）
        const box_2L = box_1.clone()
        box_2L.scale.set(0.5, 0.3, 0.1)
        box_2L.position.set(x, y+2, z-2.1)
        scene.add(box_2L)

        // 駆動側（右）
        const box_2R = box_2L.clone()
        box_2R.position.set(x, y+2, z+2.1)
        scene.add(box_2R)

        // モニター

        // ロール
        const Roll = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 3, 32, 1, false),
            new THREE.MeshStandardMaterial({ color: 0xEEEEEE })  
        );
        Roll.position.set(x, y+2, z); 
        Roll.rotation.x = Math.PI / 2;
        scene.add(Roll);

        const TaperL = new THREE.Mesh(
            new THREE.CylinderGeometry(0, 0.1, 0.4, 32, 1, true),
            new THREE.MeshPhongMaterial({ color: 0xEEEEEE })
        )
        TaperL.rotation.x = Math.PI / 2
        TaperL.position.set(x, y+2, z-1.6)
        scene.add(TaperL)

        const TaperR = TaperL.clone()
        TaperR.rotation.x = -Math.PI /2
        TaperR.position.set(x, y+2, z+1.6)
        scene.add(TaperR)    

        // 砥石
        const Toishi = new THREE.Mesh(
            new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32, 1, false),
            new THREE.MeshStandardMaterial({ color: 0x88EE88 })  
        );
        Toishi.position.set(x+0.6, y+2, z); 
        Toishi.rotation.x = Math.PI / 2;
        scene.add(Toishi);

        // フランジ
        const Frangi = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32, 1, false),
            new THREE.MeshStandardMaterial({ color: 0xEEEEEE })  
        );
        Frangi.position.set(x+0.6, y+2, z); 
        Frangi.rotation.x = Math.PI / 2;
        scene.add(Frangi);
    };

    // -------------------------------------------------------------------
    // 1ミル，2ミル
    // -------------------------------------------------------------------
    static obj_mill(scene, x, y, z) {
        const geo_roll = new THREE.CylinderGeometry(0.1, 0.1, 2, 32, 1, false)
        const mat_roll = new THREE.MeshStandardMaterial({ color: 0xEEEEEE })
        const Wr = new THREE.Mesh(geo_roll, mat_roll)
        Wr.position.set(x, y, z)                      // 位置を設定
        Wr.rotation.x = -Math.PI / 2
        scene.add(Wr)

        // WR（上）
        const Wr1 = Wr.clone()                  // wrをコピー
        Wr1.position.set(x, y+0.2, z)           // 移動
        scene.add(Wr1)

        // IMR（右上）
        const Imr = Wr.clone()                  // wrをコピー
        Imr.scale.set(1.5, 1, 1.5)              // 拡大
        Imr.position.set(x+0.15, y+0.4, z)      // 移動  
        scene.add(Imr)

        // IMR（左上）
        const Imr1 = Imr.clone()
        Imr1.position.set(x-0.15, y+0.4, z)
        scene.add(Imr1)

        // IMR（右下）
        const Imr2 = Imr.clone()
        Imr2.position.set(x+0.15, y-0.2, z)
        scene.add(Imr2)

        // IMR（右下）
        const Imr3 = Imr.clone()
        Imr3.position.set(x-0.15, y-0.2, z)
        scene.add(Imr3)

        // BUR（大径）
        const Bur_L = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 0.36, 32, 1, false),
            new THREE.MeshStandardMaterial({ color: 0xEEEEEE })
        )
        Bur_L.rotation.x = -Math.PI / 2

        // BUR（小径）
        const Bur_S = new THREE.Mesh(
            new THREE.CylinderGeometry(0.17, 0.17, 0.36, 32, 1, false),
            new THREE.MeshStandardMaterial({ color: 0xEEEEEE })
        )
        Bur_S.rotation.x = -Math.PI / 2

        // BUR（A～F軸）
        for (let i = 0; i < 5; i++) {
            var Bur_A = Bur_L.clone()
            Bur_A.position.set(x+0.44, y+0.56, z+0.4*i-0.8)
            scene.add(Bur_A)

            var Bur_B = Bur_S.clone()            
            Bur_B.position.set(x, y+0.68, z+0.4*i-0.8)
            scene.add(Bur_B)

            var Bur_C = Bur_L.clone()            
            Bur_C.position.set(x-0.44, y+0.56, z+0.4*i-0.8)
            scene.add(Bur_C)

            var Bur_D = Bur_L.clone()
            Bur_D.position.set(x-0.44, y-0.36, z+0.4*i-0.8)
            scene.add(Bur_D)

            var Bur_E = Bur_S.clone()
            Bur_E.position.set(x, y-0.48, z+0.4*i-0.8)
            scene.add(Bur_E)

            var Bur_F = Bur_L.clone()
            Bur_F.position.set(x+0.44, y-0.36, z+0.4*i-0.8)
            scene.add(Bur_F)
        }

        // ハウジング
        const box_out = new THREE.Mesh(
            new THREE.BoxGeometry(3.4, 3, 3),
            new THREE.MeshStandardMaterial()
        )       
        const box_in = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 4),
            new THREE.MeshStandardMaterial()
        )            
        // 差分
        var box_out_bsp = CSG.fromMesh(box_out, 0);
        var box_in_bsp = CSG.fromMesh(box_in, 1);
        let box_bsp = box_out_bsp['subtract'](box_in_bsp);
        let housing = CSG.toMesh(box_bsp, box_out.matrix);
        housing.material = new THREE.MeshStandardMaterial({
            color: 0xAAAAAA,
            opacity: 0.3,
            transparent: true,
        })
        housing.castShadow = housing.receiveShadow = true
        housing.position.set(x, y, z)
        scene.add(housing) 

        // 屋根
        const roof_face = new THREE.Shape()
        roof_face.moveTo(-9, 0)
        roof_face.lineTo(9, 0)
        roof_face.lineTo(9, -1)
        roof_face.lineTo(6, -1)
        roof_face.lineTo(3, -1.5)
        roof_face.lineTo(-3, -1.5)
        roof_face.lineTo(-6, -1)
        roof_face.lineTo(-9, -1)
        roof_face.lineTo(-9, 0)

        // 形状を押し出してジオメトリを作成
        const roof_extrude = { depth: 3, bevelEnabled: false };
        const roof = new THREE.Mesh(
            new THREE.ExtrudeGeometry(roof_face, roof_extrude),
            new THREE.MeshStandardMaterial({
                color: 0x66FF66,
                opacity: 0.8,
                transparent: true,
            })
        );
        roof.position.set(x, y+3, z-1.5)
        scene.add(roof)


        // ワイパー
        const wiper_R = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 0.2, 1.6),
            new THREE.MeshStandardMaterial({
                color: 0xFFFF55,
                opacity: 0.8,
                transparent: true,
            })
        )
        wiper_R.position.set(x-2, y+0.1, z)
        scene.add(wiper_R)

        const wiper_L =wiper_R.clone()
        wiper_L.position.set(x+2, y+0.1, z)
        scene.add(wiper_L)

        // X線筐体
        const xray_box_R = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 0.5, 1.5),
            new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
        )
        xray_box_R.position.set(x-3, y+0.5, z)
        scene.add(xray_box_R)

        const xray_box_L = xray_box_R.clone()
        xray_box_L.position.set(x+3, y+0.5, z)
        scene.add(xray_box_L)

        // X線
        const xray_beam_R = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.3, 32),
            new THREE.MeshNormalMaterial()
            //new THREE.MeshStandardMaterial({ color: 0x0000AA })
        )
        xray_beam_R.position.set(x-3, y+0.2, z)
        scene.add(xray_beam_R)

        const xray_beam_L = xray_beam_R.clone()
        xray_beam_L.position.set(x+3, y+0.2, z)
        scene.add(xray_beam_L)

        // デフロール（右）
        const DefRoll = Wr.clone()               // wrをコピー
        DefRoll.scale.set(3, 1, 3)
        DefRoll.position.set(x+5, y-0.2, z)
        scene.add(DefRoll)

        // デフロール（左）
        const DefRoll_1 = DefRoll.clone()
        DefRoll_1.position.set(x-5, y-0.2, z)
        scene.add(DefRoll_1)

        // サポートロール（右）
        const SapRoll = Wr.clone()
        SapRoll.scale.set(3, 1, 3)
        SapRoll.position.set(x+5.7, y-0.5, z)
        scene.add(SapRoll)

        // サポートロール（左）
        const SapRoll_1 = SapRoll.clone()
        SapRoll_1.position.set(x-5.7, y-0.5, z)
        scene.add(SapRoll_1)

        // テンションリール（右）
        const TR_R = Wr.clone()
        TR_R.scale.set(8, 0.76, 8)
        TR_R.position.set(x+7.2, y-0.5, z)
        scene.add(TR_R)

        // コア（右）
        const TRc_R = Wr.clone()
        TRc_R.material = new THREE.MeshStandardMaterial({ color: 0xAAAAAA });
        TRc_R.scale.set(5, 1, 5)
        TRc_R.position.set(x+7.2, y-0.5, z)
        scene.add(TRc_R)

        // テンションリール（左）
        const TR_L = TR_R.clone()
        TR_L.position.set(x-7.2, y-0.5, z)
        scene.add(TR_L)

        // コア（左）
        const TRc_L = TRc_R.clone()
        TRc_L.position.set(x-7.2, y-0.5, z)
        scene.add(TRc_L)

        // 板（中央）
        const Strip = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 1.5), 
            new THREE.MeshPhongMaterial({ color: 0xEEEEEE })
        )
        Strip.position.set(x, y+0.1, z)
        Strip.rotation.x = -Math.PI / 2
        scene.add(Strip)

        // 板（右1）
        const Strip1 = Strip.clone()
        Strip1.scale.x = 0.09
        Strip1.rotation.y = 0.4
        Strip1.position.set(x+5.5, y-0.08, z)
        scene.add(Strip1)

        // 板（右2）
        const Strip2 = Strip.clone()
        Strip2.scale.x = 0.11
        Strip2.rotation.y = 0.9
        Strip2.position.set(x+6.25, y-0.65, z)
        scene.add(Strip2)

        // 板（左1）
        const Strip1_1 = Strip1.clone()
        Strip1_1.rotation.y = -0.4
        Strip1_1.position.set(x-5.5, y-0.08, z)
        scene.add(Strip1_1)

        // 板（左2）
        const Strip2_1 = Strip2.clone()
        Strip2_1.rotation.y = -0.9
        Strip2_1.position.set(x-6.25, y-0.65, z)
        scene.add(Strip2_1)
    }


    // -------------------------------------------------------------------
    // 2BAL
    // -------------------------------------------------------------------
    static obj_2bal(scene, x, y, z) {
        // POR
        const Coil = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 1, 32, 1, false),
            new THREE.MeshStandardMaterial({ color: 0xEEEEEE })
        )
        Coil.position.set(x-1, y, z)
        Coil.rotation.x = -Math.PI / 2
        scene.add(Coil)

        // コア(POR)
        const Core_POR = Coil.clone()
        Core_POR.material = new THREE.MeshStandardMaterial({ color: 0xAAAAAA });
        Core_POR.scale.set(0.5, 1.5, 0.5)
        Core_POR.position.set(x-1, y, z)
        scene.add(Core_POR)

        // 搬送ロール
        const Roll = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 1.5, 32, 1, false),
            new THREE.MeshStandardMaterial({ color: 0xEEEEEE })
        )
        Roll.position.set(x-3.8, y+0.3, z)
        Roll.rotation.x = -Math.PI / 2
        scene.add(Roll)

        // 洗浄槽
        const CleanBox_U = new THREE.Mesh(
            new THREE.BoxGeometry(6, 1, 3),
            new THREE.MeshStandardMaterial({
                color: 0xAAAAAA,
                opacity: 0.5,
                transparent: true,
            })
        )
        CleanBox_U.position.set(x-8, y+0.7, z)
        scene.add(CleanBox_U)

        // 洗浄槽（液面下）
        const CleanBox_L = new THREE.Mesh(
            new THREE.BoxGeometry(6, 1.2, 3),
            new THREE.MeshStandardMaterial({
                color: 0x0000FF,
                opacity: 0.5,
                transparent: true,
            })
        )
        CleanBox_L.position.set(x-8, y-0.4, z)
        scene.add(CleanBox_L)

        // 電解槽ロール
        const Roll_Clean1 = Roll.clone()
        Roll_Clean1.scale.set(1, 1, 1)
        Roll_Clean1.position.set(x-5, y+0.3, z)
        scene.add(Roll_Clean1)

        const Roll_Clean2 = Roll.clone()
        Roll_Clean2.scale.set(2, 1, 2)
        Roll_Clean2.position.set(x-6, y+0.1, z)
        scene.add(Roll_Clean2)

        const Roll_Clean3 = Roll.clone()
        Roll_Clean3.scale.set(2, 1, 2)
        Roll_Clean3.position.set(x-10, y+0.1, z)
        scene.add(Roll_Clean3)

        const Roll_Clean4 = Roll.clone()
        Roll_Clean4.scale.set(1, 1, 1)
        Roll_Clean4.position.set(x-11, y+0.3, z)
        scene.add(Roll_Clean4)

        // スクラバー槽
        const BrashBox = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshStandardMaterial({
                color: 0xAAFFFF,
                opacity: 0.5,
                transparent: true,
            })
        )
        BrashBox.position.set(x-13, y+0.5, z)
        scene.add(BrashBox)

        // ブラシ
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('./textures/brash7.png');

        const Brash1 =  new THREE.Mesh(
            new THREE.CylinderGeometry(0.4, 0.4, 1.5, 32, 1, false),
            new THREE.MeshStandardMaterial({ map : texture })
        )
        Brash1.position.set(x-12.5, y+0.9, z)
        Brash1.rotation.x = -Math.PI / 2
        scene.add(Brash1)

        const Brash2 = Brash1.clone()
        Brash2.position.set(x-13.5, y+0.1, z)
        scene.add(Brash2)


        // リンス槽
        const box_out = new THREE.Mesh(
            new THREE.BoxGeometry(2.6, 4, 3),
            new THREE.MeshStandardMaterial()
        )       
        const box_in = new THREE.Mesh(
            new THREE.BoxGeometry(2.4, 3.8, 4),
            new THREE.MeshStandardMaterial()
        )            
        var box_out_bsp = CSG.fromMesh(box_out, 0);
        var box_in_bsp = CSG.fromMesh(box_in, 1);
        let box_bsp = box_out_bsp['subtract'](box_in_bsp);
        const RinseBox = CSG.toMesh(box_bsp, box_out.matrix);
        RinseBox.material = new THREE.MeshStandardMaterial({
            color: 0xAAAAAA,
            opacity: 0.5,
            transparent: true,
        })
        RinseBox.castShadow = RinseBox.receiveShadow = true
        RinseBox.position.set(x-16.2, y+1.1, z)
        scene.add(RinseBox)

        // リンススプレー
        const rinse_face = new THREE.Shape()
        rinse_face.moveTo(0, 0)
        rinse_face.lineTo(-0.5, -1)
        rinse_face.lineTo(0.5, -1)
        rinse_face.lineTo(0, 0)

        const rinse_extrude = { depth: 2, bevelEnabled: false };
        const rinse_geo = new THREE.ExtrudeGeometry(rinse_face, rinse_extrude)
        const rinse_mat = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vPosition;
                void main() {
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vPosition;
                void main() {
                    float alpha = (vPosition.y + 0.8) / 1.0;
                    gl_FragColor = vec4(0.0, 0.0, 1.0, alpha);
                }
            `,
            transparent: true
        });        
        const rinse = new THREE.Mesh(rinse_geo, rinse_mat)
        rinse.scale.y = 1

        const rinse_L1 = rinse.clone()
        rinse_L1.rotation.z = -Math.PI /2
        rinse_L1.position.set(x-15.2, y+2, z-1)
        scene.add(rinse_L1)

        const rinse_R1 = rinse.clone()
        rinse_R1.rotation.z = Math.PI /2
        rinse_R1.position.set(x-17.2, y+2, z-1)
        scene.add(rinse_R1)

        
        // デフロール
        const Roll_Clean5 = Roll.clone()
        Roll_Clean5.position.set(x-16, y+0.7, z)
        scene.add(Roll_Clean5)

        // ドライヤー
        const DryerBox = new THREE.Mesh(
            new THREE.BoxGeometry(2.6, 5, 3),
            new THREE.MeshStandardMaterial({
                color: 0xFFAA55,
                opacity: 0.5,
                transparent: true,
            })
        ) 
        DryerBox.position.set(x-16.2, y+6.5, z)
        scene.add(DryerBox)

        const roll_Top1 = Roll.clone()
        roll_Top1.position.set(x-16, y+10, z)
        scene.add(roll_Top1)

        const roll_Top2 = Roll.clone()
        roll_Top2.position.set(x-13, y+10, z)
        scene.add(roll_Top2)

        const roll_Fur1 = Roll.clone()
        roll_Fur1.position.set(x-12.6, y+5.2, z)
        scene.add(roll_Fur1)

        // 炉
        const Furnace_geo = new THREE.BoxGeometry(10, 2, 3)
        const Furnace_mat = new THREE.MeshStandardMaterial({
            color: 0xEE0000,
            opacity: 0.5,
            transparent: true,
        })
        const FurnaceBox = new THREE.Mesh(Furnace_geo, Furnace_mat)
        FurnaceBox.position.set(x-5, y+5, z)
        scene.add(FurnaceBox)

        // 冷却帯
        const CoolingBox = CleanBox_U.clone()
        CoolingBox.scale.set(0.8, 2, 1)
        CoolingBox.position.set(x+3, y+5, z)
        scene.add(CoolingBox)

        // 炉出側ロール
        const BalRoll_03 = Roll.clone()
        BalRoll_03.position.set(x+10.6, y+4.8, z)
        scene.add(BalRoll_03)

        const BalRoll_04 = Roll.clone()
        BalRoll_04.position.set(x+10.6, y+0.7, z)
        scene.add(BalRoll_04)

        const BalRoll_05 = Roll.clone()
        BalRoll_05.position.set(x+7, y+0.3, z)
        scene.add(BalRoll_05)

        // テンションリール
        const Coil_TR = Coil.clone()
        Coil_TR.position.set(x+5, y, z)
        scene.add(Coil_TR)

        // コア(TR)
        const Core_TR = Core_POR.clone()
        Core_TR.scale.set(0.5, 1.5, 0.5)
        Core_TR.position.set(x+5, y, z)
        scene.add(Core_TR)

        // 板（ベース）
        const stripBase = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1), 
            new THREE.MeshPhongMaterial({ color: 0xEEEEEE })
        )
        stripBase.rotation.x = -Math.PI / 2

        const strip_POR = stripBase.clone()
        strip_POR.scale.x = 2.4
        strip_POR.position.set(x-2.7, y-0.1, z)
        strip_POR.rotation.y = 0.53
        scene.add(strip_POR)

        const strip_Clean1 = stripBase.clone()
        strip_Clean1.scale.x = 1.2
        strip_Clean1.position.set(x-4.4, y+0.51, z)
        scene.add(strip_Clean1)

        const strip_Clean2 = stripBase.clone()
        strip_Clean2.scale.x = 1
        strip_Clean2.position.set(x-5.5, y, z)
        strip_Clean2.rotation.y = -0.9
        scene.add(strip_Clean2)

        const strip_Clean3 = stripBase.clone()
        strip_Clean3.scale.x = 4
        strip_Clean3.position.set(x-8, y-0.35, z)
        scene.add(strip_Clean3)

        const strip_Clean4 = stripBase.clone()
        strip_Clean4.scale.x = 1.1
        strip_Clean4.position.set(x-10.6, y+0.1, z)
        strip_Clean4.rotation.y = 0.9
        scene.add(strip_Clean4)

        const strip_Clean5 = stripBase.clone()
        strip_Clean5.scale.x = 5
        strip_Clean5.position.set(x-13.5, y+0.51, z)
        scene.add(strip_Clean5)

        const strip_Base = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.01, 1), 
            new THREE.MeshPhongMaterial({ color: 0xFFFFFF })
        )

        const strip_Dry = strip_Base.clone()
        strip_Dry.scale.x = 9.3
        strip_Dry.rotation.z = Math.PI /2
        strip_Dry.position.set(x-16.2, y+5.3, z)
        scene.add(strip_Dry)

        const strip_Top1 = strip_Base.clone()
        strip_Top1.scale.x = 3.2
        strip_Top1.position.set(x-14.5, y+10.1, z)
        scene.add(strip_Top1)

        const strip_Top2 = strip_Base.clone()
        strip_Top2.scale.x = 4.9
        strip_Top2.rotation.z = Math.PI /2
        strip_Top2.position.set(x-12.8, y+7.6, z)
        scene.add(strip_Top2)

        const strip_Fur = strip_Base.clone()
        strip_Fur.scale.x = 23.2
        strip_Fur.position.set(x-1, y+5, z)
        scene.add(strip_Fur)

        const strip_Ext1 = strip_Base.clone()
        strip_Ext1.scale.x = 4.2
        strip_Ext1.rotation.z = Math.PI /2
        strip_Ext1.position.set(x+10.8, y+2.8, z)
        scene.add(strip_Ext1)

        const strip_Ext2 = strip_Base.clone()
        strip_Ext2.scale.x = 3.66
        strip_Ext2.position.set(x+8.8, y+0.51, z)
        scene.add(strip_Ext2)

        const strip_Ext3 = strip_Base.clone()
        strip_Ext3.scale.x = 1.6
        strip_Ext3.rotation.z = 0.78
        strip_Ext3.position.set(x+6.3, y-0.1, z)
        scene.add(strip_Ext3)
    }

    // -------------------------------------------------------------------
    // 主操作盤
    // -------------------------------------------------------------------
    static obj_mainOpe(scene, x, y, z, angle) {

        // 平面
        const ope_face = new THREE.Shape()
        ope_face.moveTo(0, 0)
        ope_face.lineTo(2, 0)
        ope_face.lineTo(2, 1.5)
        ope_face.lineTo(1, 1.5)
        ope_face.lineTo(0.5, 2)
        ope_face.lineTo(0, 2)
        ope_face.lineTo(0, 0)

        // 形状を押し出してジオメトリを作成
        const ope_extrude = { depth: 3, bevelEnabled: false };
        const ope_box = new THREE.Mesh(
            new THREE.ExtrudeGeometry(ope_face, ope_extrude),
            new THREE.MeshStandardMaterial({ color: 0xFFFFCC })  
        );
        ope_box.rotation.y = angle
        ope_box.position.set(x, y-1, z)
        scene.add(ope_box)
    };


    // -------------------------------------------------------------------
    // 第2工場
    // -------------------------------------------------------------------
    static obj_factory2(scene, x, y, z) {

        const Opacity_wall = 0.5                // 透明度（0～1）

        // 床
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 130, 1, 1), 
            new THREE.MeshPhongMaterial({ color: 0x00AA00 })
        )
        plane.position.set(x+5, y, z+5)
        plane.rotation.x = -Math.PI / 2
        scene.add(plane)

        // 壁（東）
        const wall_E = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 16, 130), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
                opacity: Opacity_wall,          // 透明度
                transparent: true,
            })
        )
        wall_E.position.set(x-20, y+8, z+5)
        scene.add(wall_E)

        // 壁（西内）
        const wall_W = wall_E.clone()
        wall_W.position.set(x+20, y+8, z+5)
        scene.add(wall_W)


        // 壁（西外）
        const wall_W2a = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 16, 50), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
            })
        )
        wall_W2a.position.set(x+30, y+8, z+45)
        scene.add(wall_W2a)

        const wall_W2b = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 16, 76), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
            })
        )
        wall_W2b.position.set(x+30, y+8, z-22)
        scene.add(wall_W2b)

        const wall_W2c = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 12, 4), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
            })
        )
        wall_W2c.position.set(x+30, y+10, z+18)
        scene.add(wall_W2c)

        // フォントを読み込み
        const fontLoader = new FontLoader();
        fontLoader.load( 'javascripts/script/fonts/helvetiker_regular.typeface.json', function ( font ) {
            const matLite = new THREE.MeshBasicMaterial( {
                color: 0xFFFFFF,
                transparent: true,
                opacity: 0.4,
                side: THREE.DoubleSide
            })

            // 文字を表示
            const geo_1 = new THREE.ShapeGeometry(
                font.generateShapes( 'Nippin Steel Chemical & Material', 0.3 )
            )
            const text_1 = new THREE.Mesh( geo_1, matLite );
            text_1.position.set(x+30.2, y+4.2, z+21);
            text_1.rotation.y = Math.PI/2;
            scene.add( text_1 )
        })


        // 壁（北）
        const wall_N = new THREE.Mesh(
            new THREE.BoxGeometry(50, 16, 0.2), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
                opacity: Opacity_wall,          // 透明度
                transparent: true,
            })
        )
        wall_N.position.set(x+5, y+8, z+70) 
        scene.add(wall_N)

        // 壁（南）
        const wall_S = wall_N.clone()
        wall_S.position.set(x+5, y+8, z-60)
        scene.add(wall_S)

        // 壁（内1）
        const wall_M1 = wall_N.clone()
        wall_M1.position.set(x+5, y+8, z-10)
        scene.add(wall_M1)

        // 壁（内2）
        const wall_M2 = wall_N.clone()
        wall_M2.position.set(x+5, y+8, z-45)
        scene.add(wall_M2)
    };

    // -------------------------------------------------------------------
    // 3ミル
    // -------------------------------------------------------------------
    static obj_3mill(scene, x, y, z) {
        const geo_roll = new THREE.CylinderGeometry(0.1, 0.1, 2, 32, 1, false)
        const mat_roll = new THREE.MeshStandardMaterial({ color: 0xEEEEEE })
        const Wr = new THREE.Mesh(geo_roll, mat_roll);
        Wr.position.set(x, y, z)                // 位置を設定
        Wr.rotation.x = Math.PI / 2
        Wr.rotation.z = Math.PI / 2
        scene.add(Wr)

        // WR（上）
        const Wr1 = Wr.clone();                 // wrをコピー
        Wr1.position.set(x, y+0.2, z);          // 移動
        scene.add(Wr1);

        // IMR（右上）
        const Imr = Wr.clone();                 // wrをコピー
        Imr.scale.set(1.5, 1, 1.5);             // 拡大
        Imr.position.set(x, y+0.4, z+0.15);     // 移動  
        scene.add(Imr);

        // IMR（左上）
        const Imr1 = Imr.clone();
        Imr1.position.set(x, y+0.4, z-0.15);  
        scene.add(Imr1);

        // IMR（右下）
        const Imr2 = Imr.clone();
        Imr2.position.set(x, y-0.2, z+0.15);
        scene.add(Imr2);

        // IMR（右下）
        const Imr3 = Imr.clone();
        Imr3.position.set(x, y-0.2, z-0.15);
        scene.add(Imr3);

        // BUR（大径）
        const Bur_L = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 0.36, 32, 1, false),
            new THREE.MeshStandardMaterial({ color: 0xEEEEEE })
        )
        Bur_L.rotation.z = -Math.PI / 2

        // BUR（小径）
        const Bur_S = new THREE.Mesh(
            new THREE.CylinderGeometry(0.17, 0.17, 0.36, 32, 1, false),
            new THREE.MeshStandardMaterial({ color: 0xEEEEEE })
        )
        Bur_S.rotation.z = -Math.PI / 2

        // BUR（A～F軸）
        for (let i = 0; i < 5; i++) {
            var Bur_A = Bur_L.clone()
            Bur_A.position.set(x+0.4*i-0.8, y+0.56, z+0.44)
            scene.add(Bur_A)

            var Bur_B = Bur_S.clone()            
            Bur_B.position.set(x+0.4*i-0.8, y+0.68, z)
            scene.add(Bur_B)

            var Bur_C = Bur_L.clone()            
            Bur_C.position.set(x+0.4*i-0.8, y+0.56, z-0.44)
            scene.add(Bur_C)

            var Bur_D = Bur_L.clone()
            Bur_D.position.set(x+0.4*i-0.8, y-0.36, z-0.44)
            scene.add(Bur_D)

            var Bur_E = Bur_S.clone()
            Bur_E.position.set(x+0.4*i-0.8, y-0.48, z)
            scene.add(Bur_E)

            var Bur_F = Bur_L.clone()
            Bur_F.position.set(x+0.4*i-0.8, y-0.36, z+0.44)
            scene.add(Bur_F)
        }
 
        // ハウジング
        const box_out = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3.4),
            new THREE.MeshStandardMaterial()
        )       
        const box_in = new THREE.Mesh(
            new THREE.BoxGeometry(4, 2, 2),
            new THREE.MeshStandardMaterial()
        )            
        // 差分
        var box_out_bsp = CSG.fromMesh(box_out, 0);
        var box_in_bsp = CSG.fromMesh(box_in, 1);
        let box_bsp = box_out_bsp['subtract'](box_in_bsp);
        let housing = CSG.toMesh(box_bsp, box_out.matrix);
        housing.material = new THREE.MeshStandardMaterial({
            color: 0x00AAAA,
            opacity: 0.3,
            transparent: true,
        })
        housing.castShadow = housing.receiveShadow = true;
        housing.position.set(x, y, z);
        scene.add(housing);

        // 屋根
        const roof_face = new THREE.Shape()
        roof_face.moveTo(-9, 0)
        roof_face.lineTo(9, 0)
        roof_face.lineTo(9, -1)
        roof_face.lineTo(6, -1)
        roof_face.lineTo(3, -1.5)
        roof_face.lineTo(-3, -1.5)
        roof_face.lineTo(-6, -1)
        roof_face.lineTo(-9, -1)
        roof_face.lineTo(-9, 0)

        // 形状を押し出してジオメトリを作成
        const roof_extrude = { depth: 3, bevelEnabled: false };
        const roof = new THREE.Mesh(
            new THREE.ExtrudeGeometry(roof_face, roof_extrude),
            new THREE.MeshStandardMaterial({
                color: 0x66FF66,
                opacity: 0.8,
                transparent: true,
            })
        );
        roof.rotation.y = Math.PI /2
        roof.position.set(x-1.5, y+3, z)
        scene.add(roof)

        // ワイパー
        const wiper_R = new THREE.Mesh(
            new THREE.BoxGeometry(1.6, 0.2, 0.2),
            new THREE.MeshStandardMaterial({
                color: 0xFFFF55,
                opacity: 0.8,
                transparent: true,
            })
        )
        wiper_R.position.set(x, y+0.1, z-2)
        scene.add(wiper_R)

        const wiper_L =wiper_R.clone()
        wiper_L.position.set(x, y+0.1, z+2)
        scene.add(wiper_L)

        // X線筐体
        const xray_box_R = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 0.5, 0.2),
            new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
        )
        xray_box_R.position.set(x, y+0.5, z-3)
        scene.add(xray_box_R)

        const xray_box_L = xray_box_R.clone()
        xray_box_L.position.set(x, y+0.5, z+3)
        scene.add(xray_box_L)

        // X線
        const xray_beam_R = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.3, 32),
            new THREE.MeshNormalMaterial()
            //new THREE.MeshStandardMaterial({ color: 0x0000AA })
        )
        xray_beam_R.position.set(x, y+0.2, z-3)
        scene.add(xray_beam_R)

        const xray_beam_L = xray_beam_R.clone()
        xray_beam_L.position.set(x, y+0.2, z+3)
        scene.add(xray_beam_L)

        // デフロール（右）
        const DefRoll = Wr.clone();             // wrをコピー
        DefRoll.scale.set(3, 1, 3);             // 拡大
        DefRoll.position.set(x, y-0.2, z+5);    // 移動  
        scene.add(DefRoll);

        // デフロール（左）
        const DefRoll_1 = DefRoll.clone();
        DefRoll_1.position.set(x, y-0.2, z-5);  
        scene.add(DefRoll_1);

        // サポートロール（右）
        const SapRoll = Wr.clone();
        SapRoll.scale.set(3, 1, 3);
        SapRoll.position.set(x, y-0.5, z+5.7);  
        scene.add(SapRoll);

        // サポートロール（左）
        const SapRoll_1 = SapRoll.clone();
        SapRoll_1.position.set(x, y-0.5, z-5.7);  
        scene.add(SapRoll_1);

        // テンションリール（右）
        const TR_R = Wr.clone();
        TR_R.scale.set(8, 0.76, 8);
        TR_R.position.set(x, y-0.5, z+7.2);
        scene.add(TR_R);

        // テンションリール押さえ（右）
        const TRc_R = Wr.clone();
        TRc_R.material = new THREE.MeshStandardMaterial({ color: 0xAAAAAA });
        TRc_R.scale.set(5, 1, 5);
        TRc_R.position.set(x, y-0.5, z+7.2);
        scene.add(TRc_R);

        // テンションリール（左）
        const TR_L = TR_R.clone();
        TR_L.position.set(x, y-0.5, z-7.2);
        scene.add(TR_L);

        // テンションリール押さえ（左）
        const TRc_L = TRc_R.clone();
        TRc_L.position.set(x, y-0.5, z-7.2);
        scene.add(TRc_L);

        // 板（中央）
        const Strip = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 1.5), 
            new THREE.MeshPhongMaterial({ color: 0xEEEEEE })
        );
        Strip.position.set(x, y+0.1, z);
        Strip.rotation.x = -Math.PI / 2;
        Strip.rotation.z = Math.PI / 2;
        scene.add(Strip);

        // 板（右1）
        const Strip1 = Strip.clone();
        Strip1.scale.x = 0.09;
        Strip1.rotation.x = -1.12;
        Strip1.position.set(x, y-0.08, z+5.5); 
        scene.add(Strip1);

        // 板（右2）
        const Strip2 = Strip.clone();
        Strip2.scale.x = 0.11;
        Strip2.rotation.x = -0.75;
        Strip2.position.set(x, y-0.65, z+6.25); 
        scene.add(Strip2);

        // 板（左1）
        const Strip1_1 = Strip1.clone();
        Strip1_1.rotation.x = -2;
        Strip1_1.position.set(x, y-0.08, z-5.5); 
        scene.add(Strip1_1);

        // 板（左2）
        const Strip2_1 = Strip2.clone();
        Strip2_1.rotation.x = -2.4;
        Strip2_1.position.set(x, y-0.65, z-6.25); 
        scene.add(Strip2_1);
    };

    // -------------------------------------------------------------------
    // 3BAL
    // -------------------------------------------------------------------
    static obj_3bal(scene, x, y, z) {

        const geo_coil = new THREE.CylinderGeometry(1, 1, 1, 32, 1, false);
        const mat_coil = new THREE.MeshStandardMaterial({ color: 0xEEEEEE });
        const Coil = new THREE.Mesh(geo_coil, mat_coil)
        Coil.rotation.x = Math.PI / 2
        Coil.rotation.z = Math.PI / 2

        // POR1
        const Coil_POR1 = Coil.clone()
        Coil_POR1.position.set(x, y, z+6)
        scene.add(Coil_POR1)

        // コア(POR1)
        const Core_POR1 = Coil.clone()
        const mat_core_POR = new THREE.MeshStandardMaterial({ color: 0xAAAAAA });
        Core_POR1.material = mat_core_POR;   // マテリアルを変更
        Core_POR1.scale.set(0.5, 1.5, 0.5)
        Core_POR1.position.set(x, y, z+6)
        scene.add(Core_POR1)

        // POR2        
        const Coil_POR2  = Coil_POR1.clone()
        Coil_POR2.position.set(x, y, z+3)
        scene.add(Coil_POR2)

        // コア(POR2)
        const Core_POR2 = Core_POR1.clone()
        Core_POR2.position.set(x, y, z+3)
        scene.add(Core_POR2)        

        const geo_roll = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 32, 1, false);
        const mat_roll = new THREE.MeshStandardMaterial({ color: 0xEEEEEE });
        const Roll = new THREE.Mesh(geo_roll, mat_roll);
        Roll.position.set(x, y+0.3, z+8.8); 
        Roll.rotation.x = Math.PI / 2;
        Roll.rotation.z = Math.PI / 2;
        scene.add(Roll);

        // 洗浄槽
        const CleanBox_U = new THREE.Mesh(
            new THREE.BoxGeometry(3, 1, 6),
            new THREE.MeshStandardMaterial({
                color: 0xAAAAAA,
                opacity: 0.5,
                transparent: true,
            })
        )
        CleanBox_U.position.set(x, y+0.7, z+13)
        scene.add(CleanBox_U)

        // 洗浄槽（液面下）
        const CleanBox_L = new THREE.Mesh(
            new THREE.BoxGeometry(3, 1.2, 6),
            new THREE.MeshStandardMaterial({
                color: 0x0000FF,
                opacity: 0.5,
                transparent: true,
            })
        )
        CleanBox_L.position.set(x, y-0.4, z+13)
        scene.add(CleanBox_L)

        // 電解槽ロール
        const Roll_Clean1 = Roll.clone()
        Roll_Clean1.scale.set(1, 1, 1)
        Roll_Clean1.position.set(x, y+0.3, z+10)
        scene.add(Roll_Clean1)

        const Roll_Clean2 = Roll.clone()
        Roll_Clean2.scale.set(2, 1, 2)
        Roll_Clean2.position.set(x, y+0.1, z+11)
        scene.add(Roll_Clean2)

        const Roll_Clean3 = Roll.clone()
        Roll_Clean3.scale.set(2, 1, 2)
        Roll_Clean3.position.set(x, y+0.1, z+15)
        scene.add(Roll_Clean3)

        const Roll_Clean4 = Roll.clone()
        Roll_Clean4.scale.set(1, 1, 1)
        Roll_Clean4.position.set(x, y+0.3, z+16)
        scene.add(Roll_Clean4)


        // スクラバー槽
        const BrashBox = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 2.8),
            new THREE.MeshStandardMaterial({
                color: 0xAAFFFF,
                opacity: 0.5,
                transparent: true,
            })
        )
        BrashBox.position.set(x, y+0.5, z+18)
        scene.add(BrashBox)

        const Brash1 =  new THREE.Mesh(
            new THREE.CylinderGeometry(0.4, 0.4, 1.5, 32, 1, false),
            new THREE.MeshStandardMaterial({ color: 0xAAFFFF })
        )
        Brash1.position.set(x, y+0.9, z+17.5)
        Brash1.rotation.z = -Math.PI / 2
        scene.add(Brash1)

        const Brash2 = Brash1.clone()
        Brash2.position.set(x, y+0.1, z+18.5)
        scene.add(Brash2)

        
        // リンス槽
        const box_out = new THREE.Mesh(
            new THREE.BoxGeometry(3, 4, 2.6),
            new THREE.MeshStandardMaterial()
        )       
        const box_in = new THREE.Mesh(
            new THREE.BoxGeometry(4, 3.8, 2.4),
            new THREE.MeshStandardMaterial()
        )            
        var box_out_bsp = CSG.fromMesh(box_out, 0);
        var box_in_bsp = CSG.fromMesh(box_in, 1);
        let box_bsp = box_out_bsp['subtract'](box_in_bsp);
        const RinseBox = CSG.toMesh(box_bsp, box_out.matrix);
        RinseBox.material = new THREE.MeshStandardMaterial({
            color: 0xAAAAAA,
            opacity: 0.5,
            transparent: true,
        })
        RinseBox.castShadow = RinseBox.receiveShadow = true
        RinseBox.position.set(x, y+1.1, z+21.2)
        scene.add(RinseBox)

        // リンススプレー
        const rinse_face = new THREE.Shape()
        rinse_face.moveTo(0, 0)
        rinse_face.lineTo(-0.5, -1)
        rinse_face.lineTo(0.5, -1)
        rinse_face.lineTo(0, 0)

        const rinse_extrude = { depth: 2, bevelEnabled: false };
        const rinse_geo = new THREE.ExtrudeGeometry(rinse_face, rinse_extrude)
        const rinse_mat = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vPosition;
                void main() {
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vPosition;
                void main() {
                    float alpha = (vPosition.y + 0.8) / 1.0;
                    gl_FragColor = vec4(0.0, 0.0, 1.0, alpha);
                }
            `,
            transparent: true
        });        
        const rinse = new THREE.Mesh(rinse_geo, rinse_mat)
        rinse.rotation.y = Math.PI /2
        rinse.scale.y = 1

        const rinse_L1 = rinse.clone()
        rinse_L1.rotation.z = -Math.PI /2
        rinse_L1.position.set(x-1, y+2, z+20.2)
        scene.add(rinse_L1)

        const rinse_R1 = rinse.clone()
        rinse_R1.rotation.z = Math.PI /2
        rinse_R1.position.set(x-1, y+2, z+22.2)
        scene.add(rinse_R1)


        // デフロール
        const Roll_Clean5 = Roll.clone()
        Roll_Clean5.position.set(x, y+0.7, z+21)
        scene.add(Roll_Clean5)

        // ドライヤー
        const DryerBox = new THREE.Mesh(
            new THREE.BoxGeometry(3, 4.5, 2.6),
            new THREE.MeshStandardMaterial({
                color: 0xFFAA55,
                opacity: 0.5,
                transparent: true,
            })
        ) 
        DryerBox.position.set(x, y+6, z+21.2)
        scene.add(DryerBox)


        const roll_Top1 = Roll.clone();
        roll_Top1.position.set(x, y+9, z+21.4); 
        scene.add(roll_Top1);

        // 入側ルーパー
        for (let i = 0; i < 5; i++) {
            var roll_roop_up = Roll.clone()
            roll_roop_up.position.set(x, y+9, z+23+i*0.8)
            scene.add(roll_roop_up)

            var roll_roop_dw = Roll.clone()
            roll_roop_dw.position.set(x, y-1, z+23.4+i*0.8)
            scene.add(roll_roop_dw)
        }

        const roll_Top2 = Roll.clone();
        roll_Top2.position.set(x, y+10, z+26.6); 
        scene.add(roll_Top2);

        const roll_Top3 = Roll.clone();
        roll_Top3.position.set(x, y+10, z+18); 
        scene.add(roll_Top3);

        const roll_Fur1 = Roll.clone();
        roll_Fur1.position.set(x, y+5.2, z+17.6); 
        scene.add(roll_Fur1);

        // 炉
        const Furnace_geo = new THREE.BoxGeometry(3, 2, 10);
        const Furnace_mat = new THREE.MeshStandardMaterial({
            color: 0xEE0000,
            opacity: 0.5,
            transparent: true,
        });
        const FurnaceBox = new THREE.Mesh(Furnace_geo, Furnace_mat);
        FurnaceBox.position.set(x, y+5, z+5); 
        scene.add(FurnaceBox);    

        // 冷却帯
        const CoolingBox = CleanBox_U.clone()
        CoolingBox.scale.set(1, 2, 0.8)
        CoolingBox.position.set(x, y+5, z-3)
        scene.add(CoolingBox)

        // 炉出側ロール
        const BalRoll_03 = Roll.clone()
        BalRoll_03.position.set(x, y+5.2, z-8.6)
        scene.add(BalRoll_03)

        const BalRoll_04 = Roll.clone()
        BalRoll_04.position.set(x, y+10, z-9)
        scene.add(BalRoll_04)

        const BalRoll_05 = Roll.clone()
        BalRoll_05.position.set(x, y+10, z-13.6)
        scene.add(BalRoll_05)

        // 出側ルーパー
        for (let i = 0; i < 5; i++) {
            var roll_roop_up = Roll.clone()
            roll_roop_up.position.set(x, y+9, z-10-i*0.8)
            scene.add(roll_roop_up)

            var roll_roop_dw = Roll.clone()
            roll_roop_dw.position.set(x, y-1, z-10.4-i*0.8)
            scene.add(roll_roop_dw)
        }
        
        const BalRoll_06 = Roll.clone()
        BalRoll_06.position.set(x, y+3, z-9.6)
        scene.add(BalRoll_06)

        const BalRoll_07 = Roll.clone()
        BalRoll_07.position.set(x, y+2.6, z-3.6)
        scene.add(BalRoll_07)

        const BalRoll_08 = Roll.clone()
        BalRoll_08.position.set(x, y+1.6, z-3.6)
        scene.add(BalRoll_08)

        // TR1
        const Coil_TR1 = Coil_POR1.clone()
        Coil_TR1.position.set(x, y, z-5)
        scene.add(Coil_TR1)

        // コア(TR1)
        const Core_TR1 = Core_POR1.clone()
        Core_TR1.material = mat_core_POR;   // マテリアルを変更
        Core_TR1.position.set(x, y, z-5)
        scene.add(Core_TR1)

        const Coil_TR2 = Coil_TR1.clone()
        Coil_TR2.position.set(x, y, z-2)
        scene.add(Coil_TR2)

        const Core_TR2 = Core_TR1.clone()
        Core_TR2.position.set(x, y, z-2)
        scene.add(Core_TR2)        

        // ----------------------------------------------
        // 板（ベース）
        // ----------------------------------------------
        const stripBase = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.01, 1), 
            new THREE.MeshPhongMaterial({ color: 0xEEEEEE })
        )

        const strip_POR = stripBase.clone()
        strip_POR.scale.z = 2.4
        strip_POR.position.set(x, y-0.1, z+7.7)
        strip_POR.rotation.x = -0.53
        scene.add(strip_POR)

        const strip_Clean1 = stripBase.clone()
        strip_Clean1.scale.z = 1.2
        strip_Clean1.position.set(x, y+0.51, z+9.4)
        scene.add(strip_Clean1)

        const strip_Clean2 = stripBase.clone()
        strip_Clean2.scale.z = 1
        strip_Clean2.position.set(x, y, z+10.5)
        strip_Clean2.rotation.x = 0.9
        scene.add(strip_Clean2)

        const strip_Clean3 = stripBase.clone()
        strip_Clean3.scale.z = 4
        strip_Clean3.position.set(x, y-0.35, z+13)
        scene.add(strip_Clean3)

        const strip_Clean4 = stripBase.clone()
        strip_Clean4.scale.z = 1.1
        strip_Clean4.position.set(x, y+0.1, z+15.6)
        strip_Clean4.rotation.x = -0.9
        scene.add(strip_Clean4)

        const strip_Clean5 = stripBase.clone()
        strip_Clean5.scale.z = 5
        strip_Clean5.position.set(x, y+0.51, z+18.5)
        scene.add(strip_Clean5)

        const strip_Base = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.01, 1), 
            new THREE.MeshPhongMaterial({ color: 0xFFFFFF })
        )

        const strip_Dry = strip_Base.clone()
        strip_Dry.scale.z = 8.3
        strip_Dry.rotation.x = Math.PI /2
        strip_Dry.position.set(x, y+4.8, z+21.2)
        scene.add(strip_Dry)

        const strip_Top1 = strip_Base.clone()
        strip_Top1.scale.z = 1.6
        strip_Top1.position.set(x, y+9.1, z+22.2)
        scene.add(strip_Top1)

        const strip_Top3 = strip_Base.clone()
        strip_Top3.scale.z = 8.6
        strip_Top3.position.set(x, y+10.1, z+22.3)
        scene.add(strip_Top3)

        // ルーパー内
        for (let i = 0; i < 9; i++) {
            var strip_roop_en = strip_Base.clone()
            strip_roop_en.scale.z = 10
            strip_roop_en.rotation.x = Math.PI /2
            strip_roop_en.position.set(x, y+4, z+23.2+i*0.4)
            scene.add(strip_roop_en)
        }

        const strip_roop_en1 = strip_Base.clone()
        strip_roop_en1.scale.z = 11
        strip_roop_en1.rotation.x = Math.PI /2
        strip_roop_en1.position.set(x, y+4.5, z+26.8)
        scene.add(strip_roop_en1) 

        const strip_Top2 = strip_Base.clone()
        strip_Top2.scale.z = 4.9
        strip_Top2.rotation.x = Math.PI /2
        strip_Top2.position.set(x, y+7.6, z+17.8)
        scene.add(strip_Top2)

        const strip_Fur = strip_Base.clone()
        strip_Fur.scale.z = 26.2
        strip_Fur.position.set(x, y+5, z+4.5)
        scene.add(strip_Fur)

        const strip_Ext1 = strip_Base.clone()
        strip_Ext1.scale.z = 4.8
        strip_Ext1.rotation.x = Math.PI /2
        strip_Ext1.position.set(x, y+7.6, z-8.8)
        scene.add(strip_Ext1)

        const strip_Ext2 = strip_Base.clone()
        strip_Ext2.scale.z = 4.6
        strip_Ext2.position.set(x, y+10.2, z-11.3)
        scene.add(strip_Ext2)

        const strip_roop_ex1 = strip_Base.clone()
        strip_roop_ex1.scale.z = 11
        strip_roop_ex1.rotation.x = Math.PI /2
        strip_roop_ex1.position.set(x, y+4.5, z-13.8)
        scene.add(strip_roop_ex1)

        // ルーパー内
        for (let i = 0; i < 9; i++) {
            var strip_roop_ex = strip_Base.clone()
            strip_roop_ex.scale.z = 10
            strip_roop_ex.rotation.x = Math.PI /2
            strip_roop_ex.position.set(x, y+4, z-10.2-i*0.4)
            scene.add(strip_roop_ex)
        }

        const strip_Ext3 = strip_Base.clone()
        strip_Ext3.scale.z = 6
        strip_Ext3.rotation.x = Math.PI /2
        strip_Ext3.position.set(x, y+6, z-9.8)
        scene.add(strip_Ext3)

        const strip_Ext4 = strip_Base.clone()
        strip_Ext4.scale.z = 6
        strip_Ext4.position.set(x, y+2.8, z-6.6)
        scene.add(strip_Ext4)

        const strip_Ext5 = strip_Base.clone()
        strip_Ext5.scale.z = 1
        strip_Ext5.rotation.x = Math.PI /2
        strip_Ext5.position.set(x, y+2.1, z-3.4)
        scene.add(strip_Ext5)

        const strip_Ext6 = strip_Base.clone()
        strip_Ext6.scale.z = 2
        strip_Ext6.rotation.x = -Math.PI /2.6
        strip_Ext6.position.set(x, y+0.6, z-3.74)
        scene.add(strip_Ext6)
    }


    // -------------------------------------------------------------------
    // 立体倉庫
    // -------------------------------------------------------------------
    static obj_coil_Souko(scene, x, y, z) {
        // コイル
        document.addEventListener('DOMContentLoaded', () => {   // DOMContentLoadedイベントが発生した際に実行
            if (typeof warehouseData !== 'undefined') {         // warehouseDataが存在するか確認
                for (let i = 0; i < 35; i++) {                  // z方向に繰り返し
                    for (let j = 0; j < 5; j++) {               // y方向に繰り返し
                        
                        // three_fpc.ejsからwarehouseDataを読み込み
                        warehouseData.forEach(row => {
                            const [column0, column1, column2, , , content] = row; // 必要なデータを取得
                            
                            // 文字列に変換し、2桁で先頭をゼロ埋め
                            const paddedI = String(i+1).padStart(2, '0');  // '01', '02', ...
                            const paddedJ = String(j+1).padStart(2, '0');
        
                            // 条件が「棚01」の場合のみ処理を実行
                            if (column0 === '01' && column1 === paddedI && column2 === paddedJ) {
                                // 色をマッピング（文字列 -> 16進カラーコード）
                                const colorMap = {
                                    'coil'      : '#EEEEEE',    // グレー
                                    'palette'   : '#000000',    // 黒
                                    'other'     : '#0000FF'     // 青
                                };
                                // colorMap[content]がundefinedやnull等の場合、'#FFFFFF'（デフォルト）
                                const materialColor = colorMap[content] || '#FFFFFF';
        
                                // 大きな円柱を作成
                                const cyl_L = new THREE.Mesh(
                                    new THREE.CylinderGeometry(1, 1, 1, 32),
                                    new THREE.MeshLambertMaterial({ color: materialColor })
                                );
        
                                // 小さな円柱を作成
                                const cyl_S = new THREE.Mesh(
                                    new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32),
                                    new THREE.MeshLambertMaterial({ color: materialColor })
                                );
        
                                // 差分作成 (CSG)
                                const cyl_L_bsp = CSG.fromMesh(cyl_L, 0);
                                const cyl_S_bsp = CSG.fromMesh(cyl_S, 1);
                                const cyl_bsp = cyl_L_bsp.subtract(cyl_S_bsp);
                                const coil = CSG.toMesh(cyl_bsp, cyl_L.matrix);
        
                                coil.material = cyl_L.material;
                                coil.castShadow = coil.receiveShadow = true;
        
                                coil.rotation.x = -Math.PI / 2;
                                coil.position.set(x, y+j*3, z-i*2); // 各コイルの座標
                                scene.add(coil);
                            }
                        });
                    }
                }
            } else {
                console.error('warehouseDataが存在しません。');
            }
        });
        
        /*
        // 元のコード（materialは単一色）
        for (let i = 0; i < 35; i++) {                      // z方向に繰り返し
            for (let j = 0; j < 5; j++) {                   // y方向に繰り返し

                // 大きな円柱
                var cyl_L = new THREE.Mesh(
                    new THREE.CylinderGeometry(1, 1, 1, 32), 
                    new THREE.MeshLambertMaterial({color: 0xEEEEEE})
                );
                // 小さな円柱
                var cyl_S = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32), 
                    new THREE.MeshLambertMaterial({color: 0xEEEEEE})
                );            
                // 差分
                var cyl_L_bsp = CSG.fromMesh(cyl_L, 0);
                var cyl_S_bsp = CSG.fromMesh(cyl_S, 1);
                let cyl_bsp = cyl_L_bsp['subtract'](cyl_S_bsp);
                let coil = CSG.toMesh(cyl_bsp, cyl_L.matrix);
                coil.material = [cyl_L.material, cyl_S.material];
                coil.castShadow = coil.receiveShadow = true;
                coil.rotation.x = -Math.PI / 2;
                coil.position.set(x, y+j*3, z-i*2);
                scene.add(coil);
            }
        };
        */

        //倉庫
        for (let i = 0; i < 35; i++) {
            for (let j = 0; j < 5; j++) {
                const plate_H = new THREE.Mesh(             // 底板
                    new THREE.BoxGeometry(2, 0.2, 2),
                    new THREE.MeshPhongMaterial({ color: 0xFFFFFF })
                );
                plate_H.position.set(x, y+j*3-1.2, z-i*2);
                scene.add(plate_H);

                const plate_V = new THREE.Mesh(             // 側板
                    new THREE.BoxGeometry(2, 3, 0.2),
                    new THREE.MeshPhongMaterial({ color: 0xFFFFFF })
                );
                plate_V.position.set(x, y+j*3, z-i*2-1);
                scene.add(plate_V);
            }
        }
    }

    // -------------------------------------------------------------------
    // コイル
    // -------------------------------------------------------------------
    static obj_coil_JSON(scene, x, y, z) {

        // サーバー側でJSONファイルを読み込み
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof storageData !== 'undefined') {
                let jsonObject = JSON.parse(storageData);   // 文字列を配列に変換

                jsonObject.forEach((row) => {
                    // 大きな円柱
                    const cyl_L = new THREE.Mesh(
                        new THREE.CylinderGeometry(1, 1, 1, 32),
                        new THREE.MeshLambertMaterial({ color: row.color })
                    );
                    // 小さな円柱
                    const cyl_S = new THREE.Mesh(
                        new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32),
                        new THREE.MeshLambertMaterial({ color: row.color })
                    );
                    // 差分作成 (CSG)
                    const cyl_L_bsp = CSG.fromMesh(cyl_L, 0);
                    const cyl_S_bsp = CSG.fromMesh(cyl_S, 1);
                    const cyl_bsp = cyl_L_bsp.subtract(cyl_S_bsp);
                    const coil = CSG.toMesh(cyl_bsp, cyl_L.matrix);
        
                    coil.material = cyl_L.material;
                    coil.castShadow = coil.receiveShadow = true;
                    coil.rotation.x = -Math.PI / 2;
                    coil.position.set(row.Lx * 3 + x, y, row.Lz * 2 + z);
                    scene.add(coil);
                });
            } else {
                console.error('storageDataが存在しません');
            }
        });
        
        /*
        // クライアント側でJSONファイルを読み込み
        for (let i = 0; i < 100; i++) {                       // x方向に繰り返し
            fetch("./javascripts/script/coil.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((obj) => {
                // 大きな円柱
                var cyl_L = new THREE.Mesh(
                    new THREE.CylinderGeometry(1, 1, 1, 32), 
                    new THREE.MeshLambertMaterial({ color: obj[i].color })  // i番目のcolorを読み取る
                );
                // 小さな円柱
                var cyl_S = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32), 
                    new THREE.MeshLambertMaterial({ color: obj[i].color })
                );            
                // 差分
                var cyl_L_bsp = CSG.fromMesh(cyl_L, 0);
                var cyl_S_bsp = CSG.fromMesh(cyl_S, 1);
                let cyl_bsp = cyl_L_bsp['subtract'](cyl_S_bsp);
                let coil = CSG.toMesh(cyl_bsp, cyl_L.matrix);
                coil.material = [cyl_L.material, cyl_S.material];
                coil.castShadow = coil.receiveShadow = true;
                coil.rotation.x = -Math.PI / 2;
                coil.position.set(obj[i].Lx *3 +x, y, obj[i].Lz *2 +z);        // 位置を設定
                scene.add(coil);
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        }
        */
    }

    // コイル集合
    static obj_coils(scene, x, y, z) {
        for (let i = 0; i < 5; i++) {                       // x方向に繰り返し
            for (let j = 0; j < 5; j++) {                   // z方向に繰り返し

                // 大きな円柱
                var cyl_L = new THREE.Mesh(
                    new THREE.CylinderGeometry(1, 1, 1, 32), 
                    new THREE.MeshLambertMaterial({color: 0xEEEEEE})
                );
                // 小さな円柱
                var cyl_S = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32), 
                    new THREE.MeshLambertMaterial({color: 0xEEEEEE})
                );            
                // 差分
                var cyl_L_bsp = CSG.fromMesh(cyl_L, 0);
                var cyl_S_bsp = CSG.fromMesh(cyl_S, 1);
                let cyl_bsp = cyl_L_bsp['subtract'](cyl_S_bsp);
                let coil = CSG.toMesh(cyl_bsp, cyl_L.matrix);
                coil.material = [cyl_L.material, cyl_S.material];
                coil.castShadow = coil.receiveShadow = true;
                coil.rotation.x = -Math.PI / 2;
                coil.position.set(x-i*3, y, z-j*2);
                scene.add(coil);
            }
        }
    }


    // -------------------------------------------------------------------
    // μホール
    // -------------------------------------------------------------------
    static obj_muhall(scene, x, y, z) {

        const Opacity_wall = 0.8                // 透明度（0～1）

        // 壁（東）
        const wall_E = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 16, 30), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
                opacity: Opacity_wall,          // 透明度
                transparent: true,
            })
        )
        wall_E.position.set(x-15, y+8, z)
        scene.add(wall_E)

        // 壁（西）
        const wall_W = wall_E.clone()
        wall_W.position.set(x+15, y+8, z)
        scene.add(wall_W)

        // 壁（北）
        const wall_N = new THREE.Mesh(
            new THREE.BoxGeometry(30, 16, 0.2), 
            new THREE.MeshPhongMaterial({ 
                color: 0xFFFFFF,
                opacity: Opacity_wall,          // 透明度
                transparent: true,
            })
        )
        wall_N.position.set(x, y+8, z+15) 
        scene.add(wall_N)

        // 壁（南）
        const wall_S = wall_N.clone()
        wall_S.position.set(x, y+8, z-15)
        scene.add(wall_S)

        // 机
        for (let i = 0; i < 4; i++) {
            const desk_board = new THREE.Mesh(
                new THREE.BoxGeometry(16, 0.2, 2), 
                new THREE.MeshPhongMaterial({ color: 0xFFFFFF })
            )
            desk_board.position.set(x-4, y+1, z+i*6-10) 
            scene.add(desk_board)
        }

        //椅子 ＆ PC
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 6; j++) {
                // PCモニターモニター
                const pc_monitor1 = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 0.6, 0.05), 
                    new THREE.MeshPhongMaterial({ color: 0x101010 })
                );
                pc_monitor1.rotation.x = Math.PI /15;
                pc_monitor1.position.set(x+j*2.6-11, y+1.8, z+i*6-10.2);
                scene.add(pc_monitor1);
                
                const pc_monitor2 = pc_monitor1.clone();
                pc_monitor2.rotation.x = - Math.PI /15;
                pc_monitor2.position.set(x+j*2.6-11, y+1.8, z+i*6-9.8);
                scene.add(pc_monitor2);

                // 椅子1（グループ化）【南側】
                const chair1 = new THREE.Group();

                // 椅子1（シート）
                const chair_top1 = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32), 
                    new THREE.MeshPhongMaterial({ color: 0x6495ED })
                );
                chair_top1.position.y = 0.2;
                // 椅子1（下部）
                const chair_base1 = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32), 
                    new THREE.MeshPhongMaterial({ color: 0x808080 })
                );
                chair_base1.position.y = -0.2;
                // 椅子1（支柱）
                const chair_rod1 = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.1, 0.1, 0.4, 32), 
                    new THREE.MeshPhongMaterial({ color: 0x808080 })
                );
                // 椅子1（背板）
                const chair_back1 = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32), 
                    new THREE.MeshPhongMaterial({ color: 0x6495ED })
                );
                chair_back1.position.y = 0.6;
                chair_back1.position.z = - 0.4;
                chair_back1.rotation.x = Math.PI /2.2;

                // グループ（chair1）にパーツを追加
                chair1.add(chair_top1);
                chair1.add(chair_base1);
                chair1.add(chair_rod1);
                chair1.add(chair_back1);
            
                chair1.position.set(x+j*2.6-11, y+0.6, z+i*6-11.5);
                scene.add(chair1);

                // 椅子2 【北側】
                const chair2 = new THREE.Group();

                const chair_top2 = chair_top1.clone();
                const chair_base2 = chair_base1.clone();
                const chair_rod2 = chair_rod1.clone();

                const chair_back2 = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32), 
                    new THREE.MeshPhongMaterial({ color: 0x6495ED })
                );
                chair_back2.position.y = 0.6;
                chair_back2.position.z = 0.4;
                chair_back2.rotation.x = - Math.PI /2.2;

                chair2.add(chair_top2);
                chair2.add(chair_base2);
                chair2.add(chair_rod2);
                chair2.add(chair_back2);

                chair2.position.set(x+j*2.6-11, y+0.6, z+i*6-8.5);
                scene.add(chair2);                

            }
        }
    }


    // -------------------------------------------------------------------
    // 地面
    // -------------------------------------------------------------------
    static obj_ground(scene, x, y, z) {
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(300, 400),
            new THREE.MeshPhongMaterial({ color: 0x90ee90 })
        )
        ground.rotation.x = - Math.PI /2
        ground.position.set(x, y, z)
        scene.add(ground)
    }


    // -------------------------------------------------------------------
    // 樹木
    // -------------------------------------------------------------------
    static obj_tree(scene, x, y, z) {
        for (let i = 0; i < 10; i++) {           // x方向に繰り返し
            // 幹
            const trunk = new THREE.Mesh(
                new THREE.CylinderGeometry(0.5, 0.5, 5, 12),
                new THREE.MeshPhongMaterial({ color: 0x8B4513 })
            )
            trunk.position.set(x+i*4, y, z)
            scene.add(trunk);

            // 葉
            const textureLoader = new THREE.TextureLoader();
            const texture = textureLoader.load('./textures/green3.png');

            const leaves = new THREE.Mesh(
                new THREE.CylinderGeometry(0, 2, 5, 12),
                new THREE.MeshPhongMaterial({ color: 0x008800 })
                //new THREE.MeshStandardMaterial({ map : texture })
            );
            leaves.position.set(x+i*4, y+5, z);
            scene.add(leaves);
        }
    }

    // ----------------------------------------------------
    // 樹木（glb/gltf）
    // ----------------------------------------------------

    static obj_tree2(scene, x, y, z) {
        const loader = new GLTFLoader().setPath( './javascripts/script/models/gltf/tree/' )
        loader.load(
            'beech.gltf', 
            function ( gltf ) {
                const beech = gltf.scene
                beech.position.set(0, 0, 0)
                beech.scale.set(0.4, 0.4, 0.4)

                for (let i = 0; i < 10; i++) {
                    var beech2 = beech.clone()
                    beech2.position.set(x+i*4, y, z)
                    scene.add( beech2 )
                }
            }
        )
    }

    static obj_tree3(scene, x, y, z) {
        const loader = new GLTFLoader().setPath( './javascripts/script/models/gltf/tree/' )
        /*
        loader.load(
            'beech.gltf', 
            function ( gltf ) {
                const beech = gltf.scene
                beech.position.set(0, 0, 0)
                beech.scale.set(0.4, 0.4, 0.4)

                for (let i = 0; i < 40; i++) {
                    var beech2 = beech.clone()
                    beech2.position.set(x, y, z+i*4)
                    scene.add( beech2 )
                }

                for (let i = 0; i < 80; i++) {
                    var beech3 = beech.clone()
                    beech3.position.set(x+30, y, z+i*4 -160)
                    scene.add( beech3 )
                }
            }
        )
        */

        loader.load(
            'spruce.gltf', 
            function ( gltf ) {
                const beech = gltf.scene
                beech.position.set(0, 0, 0)
                beech.scale.set(0.4, 0.4, 0.4)

                for (let i = 0; i < 40; i++) {
                    var beech2 = beech.clone()
                    beech2.position.set(x+4, y, z+i*4+2)
                    scene.add( beech2 )
                }

                for (let i = 0; i < 80; i++) {
                    var beech3 = beech.clone()
                    beech3.position.set(x+34, y, z+i*4 +2 -160)
                    scene.add( beech3 )
                }
            }
        )
    }

    // -------------------------------------------------------------------
    // 雲
    // -------------------------------------------------------------------
    /*
    static obj_cloud(scene, x, y, z) {

        const cloud_geo = new THREE.CylinderGeometry(5, 5, 4, 32);
        const cloud_mat = new THREE.ShaderMaterial({
            // 頂点シェーダー
            vertexShader: `
                varying vec3 vPosition;
                void main() {
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            // フラグメントシェーダー
            // 上面（Y = 10）の透明度が最大（1.0）、下面（Y = -10）の透明度が最小（0.0）
            fragmentShader: `
                varying vec3 vPosition;
                void main() {
                    float alpha = (vPosition.y + 1.0) / 2.0;
                    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
                }
            `,
            // 透明度を有効にする
            transparent: true
        });
        const cloud = new THREE.Mesh(cloud_geo, cloud_mat);
        cloud.position.set(x, y, z);
        scene.add(cloud);
    }
    */
}
