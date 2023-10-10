import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
const boxgeo = new THREE.BoxGeometry( 2,2,2 );
const boxMat = new THREE.MeshBasicMaterial( {
    color : 0x00ff00,
    wireframe : true
} );
const boxMesh = new THREE.Mesh( boxgeo, boxMat );
scene.add( boxMesh );

// //spheregeo
const sphereGeo = new THREE.SphereGeometry( 2 );
const sphereMat = new THREE.MeshBasicMaterial( {
    color : 0x00ff00,
    wireframe : true
} );
const sphereMesh = new THREE.Mesh( sphereGeo, sphereMat );
scene.add( sphereMesh );
// //plane geo
const groundGeo = new THREE.PlaneGeometry( 30, 30 );
const groundMat = new THREE.MeshBasicMaterial( {
    color : 0xffffff,
    side : THREE.DoubleSide,
    wireframe : true
} );
const groundMesh = new THREE.Mesh( groundGeo, groundMat );
scene.add( groundMesh )
//axex helper
const axixHelper = new THREE.AxesHelper(25);
scene.add(axixHelper);



// cannon js start
const world = new CANNON.World( {
    gravity : new CANNON.Vec3( 0, -9.81, 0 ),
} );

const groundPhysMat = new CANNON.Material();
//plane-ground body
const groundBody = new CANNON.Body( {
    //shape : new CANNON.Plane(),
    //mass: 10,
    shape : new CANNON.Box( new CANNON.Vec3( 15, 15, 0.1 ) ),
    type : CANNON.Body.STATIC,
    material : groundPhysMat 
} );

world.addBody( groundBody );
groundBody.quaternion.setFromEuler(  -Math.PI / 2, 0, 0,);

const boxPhyMat = new CANNON.Material(); 


// boxbody

const boxBody = new CANNON.Body( {
    mass : 1,
    shape : new CANNON.Box( new CANNON.Vec3( 1, 1, 1 ) ),
    position : new CANNON.Vec3( 1, 20, 0 ),
    material : boxPhyMat
} );
world.addBody(boxBody);
boxBody.angularVelocity.set(0, 10, 0);

const groundBoxContactMat = new CANNON.ContactMaterial(
    groundPhysMat,
    boxPhyMat,
    { friction : 0 }
);

world.addContactMaterial(groundBoxContactMat);
// spherebody

const sphereBody = new CANNON.Body( {
    mass : 10,
    shape : new CANNON.Sphere(2),
    position : new CANNON.Vec3( 0, 15, 0 )
} );
world.addBody(sphereBody);
sphereBody.linearDamping = 0.32;

// time
const timeSteps = 1 / 60;

function animate() {
    world.step(timeSteps);

    groundMesh.position.copy(groundBody.position);
    groundMesh.quaternion.copy(groundBody.quaternion);

    boxMesh.position.copy(boxBody.position);
    boxMesh.quaternion.copy(boxBody.quaternion);

    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);

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