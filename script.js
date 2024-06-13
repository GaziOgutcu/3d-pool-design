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
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Adding ground
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = - Math.PI / 2; // Rotate to make it horizontal
scene.add(ground);

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
    // Remove existing pool if any
    const existingPool = scene.getObjectByName('pool');
    if (existingPool) {
        scene.remove(existingPool);
    }

    // Get user input values
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);

    // Create pool geometry and material
    const poolGeometry = new THREE.BoxGeometry(length, height, width);
    const poolMaterial = new THREE.MeshBasicMaterial({ color: 0x1E90FF });
    const pool = new THREE.Mesh(poolGeometry, poolMaterial);
    pool.position.y = -height / 2; // Move pool down to sit on the ground
    pool.name = 'pool';

    // Add pool to the scene
    scene.add(pool);
}
