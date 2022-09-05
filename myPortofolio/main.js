import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
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

//scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);

const ambientLight = new THREE.AmbientLight(0xffffff);


// Loading person into three
/*
const objLoader = new OBJLoader();
objLoader.load(
  'assets/person.obj',
  (object) => {
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log(error);
  }
)
*/
const fbxLoader = new FBXLoader(); // loader inn en karakter men uten noe materiale så den er derfor helt svart. 
fbxLoader.load(                    // må også ha funksjon for å også faktisk starte animasjonen.
  "assets/walking.fbx",
  (object) => {
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log(error)
}

);



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