/*
 * @Description: 场景类
 * @Version: 1.0
 * @Autor: jiangzhikun
 * @Date: 2023-03-17 13:55:31
 * @LastEditors: jiangzhikun
 * @LastEditTime: 2023-03-21 16:20:07
 */
// 引入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 动画库
import gsap from 'gsap';

export default class LoadScene {
    containerId: string

    sceneDom: HTMLElement | null // 场景容器dom

    scene: any // 场景

    camera: any // 相机

    renderer: any // 渲染器

    control: any // 控制器

    raycaster: any // 

    cb: Function | undefined

    /**
     * @param {string} containerId 场景容器id
     * @param {Function} cb 场景初始化结束回调
     * @memberof loadScene
     */
    constructor(containerId: string, cb: Function) {
        this.containerId = containerId;
        this.sceneDom = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.control = null;
        this.raycaster = null;
        this.cb = cb;
        this.init();
        return this.scene;
    }
    
    /**
     * @description 初始化
     * @memberof LoadScene
     */
    init() {
        this.scene = new window.THREE.Scene();
        // 添加天空盒
        // 创建一个正方形贴图加载器
        const cubeTextureLoader = new window.THREE.CubeTextureLoader();
        const cubeTexture = cubeTextureLoader.load([
        'images/skybox/CloudySky/posx.jpg',
        'images/skybox/CloudySky/negx.jpg',
        'images/skybox/CloudySky/posy.jpg',
        'images/skybox/CloudySky/negy.jpg',
        'images/skybox/CloudySky/posz.jpg',
        'images/skybox/CloudySky/negz.jpg']);
        // 添加环境背景
        this.scene.background = cubeTexture;
        // 设置所有物体的环境贴图
        // this.scene.environment = cubeTexture;

        // 添加一组环境光
        // const light = new window.THREE.AmbientLight('#FF4500', 0.2);
        // this.scene.add(light);

        // 添加一组平行光
        // const directionalLight = new window.THREE.DirectionalLight('#FF4500', 0.8);
        // this.scene.add(directionalLight);

        // 添加一个点光源
        // const pointLight = new window.THREE.PointLight('#FF4500', 1, 1000);
        // pointLight.position.set(800,110,0);
        // this.scene.add(pointLight);

        this.initCamera();
        this.initRender();
        this.initControl();
        this.render();
        this.createBox();
        // this.createHome();
        this.createShowBox();
        this.watchViewsChange();

        // 添加坐标轴辅助器
        // const axesHelper = new window.THREE.AxesHelper(5);
        // this.scene.add(axesHelper);

        this.raycaster = new window.THREE.Raycaster();
        // 绑定点击事件
        this.sceneDom?.addEventListener('mousedown', this.handleSceneClick.bind(this), false);
        
        // 执行回调
        setTimeout(() => {
            const { scene, camera, renderer, control } = this;
            window.app = {
                scene, camera, renderer, control
            };
            this.cb && this.cb();
        },0);
    }

    /**
     * @description 初始化相机
     * @memberof LoadScene
     */
    initCamera() {
        this.camera = new window.THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.scene.add(this.camera);
    }

    /**
     * @description 初始化渲染器
     * @memberof LoadScene
     */
    initRender() {
        const containerDom = document.getElementById(this.containerId);
        this.sceneDom = containerDom;
        // 创建渲染器
        this.renderer = new window.THREE.WebGLRenderer();
        // 设置渲染器大小
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // 将渲染器添加到指定容器中
        containerDom?.appendChild(this.renderer.domElement);
    }

    /**
     * @description 初始化控制器
     * @memberof LoadScene
     */
    initControl() {
        this.control = new OrbitControls(this.camera, this.renderer.domElement);
        // 设置控制器阻尼 开启后需要在渲染器中设置update
        this.control.enableDamping = true;
    }

    /**
     * @description 渲染函数 每一帧渲染一次
     * @memberof LoadScene
     */
    render() {
        // 使用渲染器，通过相机将场景渲染出来
        this.control.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }

    /**
     * @description 监听可视区变化 自适应分辨率
     * @memberof LoadScene
     */
    watchViewsChange() {
        window.addEventListener('resize', () => {
            // 更新摄像头宽高比
            this.camera.aspect = window.innerWidth/window.innerHeight;
            // 更新摄像机的投影矩阵
            this.camera.updateProjectionMatrix();
            // 更新渲染器
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            // 设置渲染器像素比
            this.renderer.setPixelRatio(window.devicePixelRatio);
        });
    }

    /**
     * @description 创建几何体
     * @memberof LoadScene
     */
    createBox() {
        // 导入纹理
        // const textureLoader = new window.THREE.TextureLoader();
        // 加载纹理图
        // const jsColorTexture = textureLoader.load('/jswl.jpg');
        // // 设置贴图重复
        // jsColorTexture.repeat.set(1,1);

        // 创建几何体
        // const geometry = new window.THREE.BoxGeometry( 1, 1, 1 );
        const geometry = new window.THREE.SphereGeometry(1, 20, 20);
        // 创建材质
        // const material = new window.THREE.MeshBasicMaterial( {
        //     color: '#fff', // 颜色
        //     map: jsColorTexture, // 贴图
        //     transparent: true,
        //     opacity: 0.7
        // } );
        // 标准网格材质
        const material = new window.THREE.MeshStandardMaterial({
            metalness: 0.7, // 金属度
            roughness: 0.1, // 反射度
        });
        // 根据几何体和材质创建物体
        const cube = new window.THREE.Mesh( geometry, material );
        cube.name = '光滑的圆';
        cube.twinType = 'Thing';

        this.scene.add(cube);
        this.camera.position.z = 6.3;
        this.camera.position.x = -7.4;
        this.camera.position.y = 6.8;
        // gsap.to(cube.position, { x: 5, duration: 5 , ease: 'power1.inOut', repeat: 2, yoyo: true, onStart: () => { console.log('jzk 动画开始'); }, onComplete: () => { console.log('jzk 动画完成'); } });
        // gsap.to(cube.rotation, { x: 1 * Math.PI, duration: 5, delay: 5, ease: 'power1.inOut', repeat: 2, });
    }

    // 创建阴影物体（受阴影影响）
    createShowBox() {
        // 目标：阴影的属性 满足如下所有条件才生效
        // 灯光阴影
        // 1、材质要满足能够对光照有反应
        // 2、设置渲染器开启阴影的计算 renderer.shadowMap.enabled = true
        // 3、设置光照投射阴影 light.castShadow = true
        // 4、设置物体投射阴影 object3D.castShadow = true
        // 5、设置物体接收阴影 area.receiveShadow = true

        // 材质
        const defaultMater = new window.THREE.MeshStandardMaterial( {color: 0xffffff } );
        const noneLightMater = new window.THREE.MeshBasicMaterial( {color: 0xff0000 } );

        // 先创建一个面 用于接收阴影
        const geoArea = new window.THREE.BoxGeometry(50,50,1);
        const plane = new window.THREE.Mesh( geoArea, defaultMater );
        plane.rotation.set(Math.PI / 2, 0, 0);
        plane.position.y = -1;
        plane.name = '面';
        plane.receiveShadow = true;
        this.scene.add( plane );

        // 创建一个正方体
        const geoCube = new window.THREE.BoxGeometry(1,1,1);
        const cube = new window.THREE.Mesh(geoCube, defaultMater);
        cube.name = '正方体';
        cube.twinType = 'Thing';
        cube.position.set(3,0,3);
        cube.receiveShadow = true;
        cube.castShadow = true;
        this.scene.add(cube);

        // 创建一个聚光灯
        const spotLight = new window.THREE.SpotLight( 0xffffff, 1, 80, Math.PI/10, 0.5, 0.9 );
        spotLight.position.set( 10, 10, 10 );
        spotLight.shadow.radius = 8;
        spotLight.castShadow = true;
        this.scene.add(spotLight);

        // 创建一个点光源
        const geoPoint = new window.THREE.SphereGeometry(0.05,20,20);
        const pointLight = new window.THREE.PointLight( 0xff0000, 0.3, 15 );
        const modelPointLight = new window.THREE.Mesh(geoPoint, noneLightMater);
        modelPointLight.add(pointLight);
        modelPointLight.position.set(3,1,1);
        modelPointLight.name = '点光源小球';
        modelPointLight.twinType = 'Thing';
        this.scene.add(modelPointLight);

        this.renderer.shadowMap.enabled = true;
    }

    // ar看房功能
    createHome() {
        // 盒子
        const homeGeoCube = new window.THREE.BoxGeometry(1,1,1);
        // 材质
        const paths = [
        'images/skybox/home/posx.jpg',
        'images/skybox/home/negx.jpg',
        'images/skybox/home/posy.jpg',
        'images/skybox/home/negy.jpg',
        'images/skybox/home/posz.jpg',
        'images/skybox/home/negz.jpg'
        ];
        const materials = paths.map((item: string, index: number) => {
            const texture = new window.THREE.TextureLoader().load(item);
            if (index === 2) {
                texture.rotation = -Math.PI / 2;
                texture.center = new window.THREE.Vector2(0.5,0.5);
                return new window.THREE.MeshBasicMaterial({ map: texture })
            }else if (index === 3) {
                texture.rotation = Math.PI / 2;
                texture.center = new window.THREE.Vector2(0.5,0.5);
                return new window.THREE.MeshBasicMaterial({ map: texture })
            } else {
                return new window.THREE.MeshBasicMaterial({ map: texture })
            }
        });

        const cube = new window.THREE.Mesh(homeGeoCube, materials);
        cube.geometry.scale(1,1,-1);

        this.scene.add(cube);
        
        this.camera.position.z = 0.1;
    }

    // 封装飞行方法 飞到目标位置
    flyTo(object3D: any) {
        if (!object3D) return;
        // 开始飞行时禁用缩放、平移、旋转
        this.control.enableZoom = false;
        this.control.enablePan = false;
        this.control.enableRotate = false;
        const { position } = object3D;
        // 在原有position的基础上进行向量计算，得到偏45独角上方俯视角度
        const target = { x: (position.x + 1) * 2, y: (position.y + 1) * 2, z: (position.z + 1) * 2 };
        // 动画库执行动画
        gsap.to(this.camera.position, { x: target.x, y: target.y, z: target.z, duration: 1, onComplete: () => {
            // 结束后重置目标位置
            this.camera.lookAt(position.x, position.y, position.z);
            // 飞行结束后启用缩放、平移、旋转
            this.control.enableZoom = true;
            this.control.enablePan = true;
            this.control.enableRotate = true;
        } });
    }

    // 场景点击事件处理函数
    handleSceneClick(e: any) {
        e.preventDefault();
        if (!this.sceneDom) return;
        // 将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标
        const mouse = {
            x: ((e.clientX - this.sceneDom.getBoundingClientRect().left) / this.sceneDom.offsetWidth) * 2 - 1,
            y: -((e.clientY - this.sceneDom.getBoundingClientRect().top) / this.sceneDom.offsetHeight) * 2 + 1
        };
        // 通过鼠标的位置和当前相机的矩阵计算出raycaster
        this.raycaster.setFromCamera( mouse, this.camera );
        // 获取raycaster直线和所有模型相交的数组集合
        const allThings = this.scene.children.filter((item: any) => item.twinType === 'Thing');
        const intersects = this.raycaster.intersectObjects( allThings );
        if (intersects.length === 0) return;
        console.log('jzk allThings', intersects[0]);
        const object3D = intersects[0].object;
        // 调用飞行方法
        this.flyTo(object3D);
    }

    /**
     * @description 物体等比缩放
     * @param {*} thing 目标物体
     * @param {number} num 倍数
     * @memberof LoadScene
     */
    thingScale(thing: any, num: number){
        if (!thing || num) return;
        thing.scale.set(num, num, num);
    }
}