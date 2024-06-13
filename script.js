import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js';

// Setting up the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue background

// Setting up the camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Setting up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Adding OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Adding ground
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/grasslight-big.jpg');
const groundMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
ground.receiveShadow = true;
scene.add(ground);

// Adding ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Adding directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Positioning the camera
camera.position.set(15, 10, 15);
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handling window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Function to create pool based on user input
function createPool() {
    console.log("Create Pool button clicked");

    // Get user input values
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);

    console.log("Length:", length, "Width:", width, "Height:", height);

    // Validate inputs
    if (isNaN(length) || isNaN(width) || isNaN(height)) {
        alert('Please enter valid numbers for all dimensions.');
        return;
    }

    // Remove existing pool if any
    const existingPool = scene.getObjectByName('pool');
    if (existingPool) {
        scene.remove(existingPool);
        console.log("Removed existing pool");
    }

    // Create pool geometry and material
    const poolGeometry = new THREE.BoxGeometry(length, height, width);
    const poolMaterial = new THREE.MeshPhongMaterial({ color: 0x1E90FF, transparent: true, opacity: 0.8 });
    const pool = new THREE.Mesh(poolGeometry, poolMaterial);
    pool.position.y = -height / 2; // Move pool down to sit on the ground
    pool.name = 'pool';
    pool.castShadow = true;
    pool.receiveShadow = true;

    // Add pool to the scene
    scene.add(pool);
    console.log("Added new pool");
}
