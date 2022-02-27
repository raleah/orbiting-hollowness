import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xf3f3f3, wireframe: true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

//light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHeper = new THREE.GridHelper(200,50);
// uncomment to add lighthelper and gridhelper
//scene.add(lightHelper, gridHeper);

const controls = new OrbitControls(camera, renderer.domElement);

//add random stars
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh( geometry, material);

  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);

}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//moon
const moonTexture = new THREE.TextureLoader().load('2k_mercury.jpg');
const normalTexture = new THREE.TextureLoader().load('crater.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    normalMap: normalTexture,
    map: moonTexture
  })
)

scene.add(moon);

moon.position.z = 25;
moon.position.setX(-15);

//venus
const venusTexture = new THREE.TextureLoader().load('venus.jpg');

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    normalMap: normalTexture,
    map: venusTexture
  })
)

scene.add(venus);

venus.position.z = 45;
venus.position.setX(-20);

//earth
const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const earthNormalTexture = new THREE.TextureLoader().load('earthtexture.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    normalMap: earthNormalTexture,
    map: earthTexture
  })
)

scene.add(earth);

earth.position.z = 60;
earth.position.setX(-25);

//function to create new planets
/*
function createPlanet(size, texture, position){
  const planet = new THREE.SphereGeometry(size, 32,32);
  const materialType = new THREE.MeshStandardMaterial({
    map: TextureLoader.load(texture)
  });
  const planetMesh = new THREE.Mesh(planet, materialType);
  const object = new THREE.Object3D();
  object.add(planetMesh);
  scene.add(object);
  planetMesh.position.z = position;
  return{planetMesh, object}
}
const marsTexture
const mars = createPlanet(size, texture, position)
*/

//on scroll
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
  
  venus.rotation.x += 0.05;
  venus.rotation.y += 0.075;
  venus.rotation.z += 0.05;

  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera


//animate 
function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.0025;
  moon.rotation.y += 0.0005;

  venus.rotation.x += 0.0025;
  venus.rotation.y += 0.0005;

  earth.rotation.x += 0.0025;
  earth.rotation.y += 0.0005;

  controls.update();

  renderer.render(scene, camera);
}

animate()