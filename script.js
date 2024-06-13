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

// Adding a simple rectangular pool
const poolGeometry = new THREE.BoxGeometry(10, 2, 5); // length, height, width
const poolMaterial = new THREE.MeshBasicMaterial({ color: 0x1E90FF });
const pool = new THREE.Mesh(poolGeometry, poolMaterial);
pool.position.y = -1; // Move pool down to sit on the ground
scene.add(pool);

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

    renderer.render(scene, camera);
}
animate();

// Handling window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
