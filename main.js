import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#3d-canvas'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Floating spheres
function createFloatingSpheres() {
  const geometry = new THREE.SphereGeometry(0.3, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    emissive: 0x00ffff,
    shininess: 100
  });

  for (let i = 0; i < 100; i++) {
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(
      Math.random() * 40 - 20,
      Math.random() * 40 - 20,
      Math.random() * 40 - 20
    );
    scene.add(sphere);
  }
}

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x00ff00, 50);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Camera position
camera.position.z = 15;

// Create elements
createFloatingSpheres();

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Scroll animations
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight * 0.8) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
});

// Window resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});