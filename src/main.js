import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// // orbit
const orbit = new  OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 20, -30 );
orbit.update();

// //boxgeo
// const boxgeo = new THREE.BoxGeometry( 2,2,2 );
// const boxMat = new THREE.MeshBasicMaterial( {
//     color : 0x00ff00,
//     wireframe : true
// } );
// const boxMesh = new THREE.Mesh( boxgeo, boxMat );
// scene.add( boxMesh );

// //spheregeo
// const sphereGeo = new THREE.SphereGeometry( 2 );
// const sphereMat = new THREE.MeshBasicMaterial( {
//     color : 0x00ff00,
//     wireframe : true
// } );
// const sphereMesh = new THREE.Mesh( sphereGeo, sphereMat );
// scene.add( sphereMesh );
// //ground geo
// const groundGeo = new THREE.PlaneGeometry( 30, 30 );
// const groundMat = new THREE.MeshBasicMaterial( {
//     color : 0xffffff,
//     side : THREE.DoubleSide,
//     wireframe : true
// } );
// const groundMesh = new THREE.Mesh( groundGeo, groundMat );
// scene.add( groundMesh )

 

function animate() {
	renderer.render( scene, camera );
};
renderer.setAnimationLoop( animate );

animate();
// window resize 
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});