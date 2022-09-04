import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas : document.querySelector('#bg'),})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10,3,16,100);

const material = new THREE.MeshStandardMaterial({color: 0xFF6347});

const torus = new THREE.Mesh(geometry,material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);

const ambientLight = new THREE.AmbientLight(0xffffff);
/*
const objs = [];
const fbxLoader = new THREE.FBXLoader();
fbxLoader.load("./assets/Walking.fbx", model => {
  const mixer = new THREE.AnimationMixer(model);
  mixer.clipAction(model.animations[0].play());
  scene.add(model); 
  objs.push({model,mixer});
    }
      )
https://pastebin.com/rUcx9TSq

*/


pointLight.position.set(10,10,10);

scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
//scene.add(lightHelper,gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); // må forstå denne funksjonen så du kan lage et statisk array.

  star.position.set(x,y,z);
  scene.add(star);

}
// kan få stjerna til å forflytt seg med å faktisk deklarer dem utenfor en funksjon

const spaceTexture = new THREE.TextureLoader().load('./assets/sp.jpg');
scene.background = spaceTexture;

for(var i = 0; i < 100; i ++)
  addStar();

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  
  controls.update;
  renderer.render(scene,camera);

}

animate();

//https://www.youtube.com/watch?v=Q7AOvWpIVHU 13:00