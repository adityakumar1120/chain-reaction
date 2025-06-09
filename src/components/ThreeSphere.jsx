// src/components/ThreeSphere.js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeSphere = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0); // transparent background
    mountRef.current.appendChild(renderer.domElement);

    // Lights (without shadows)
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(-3, 5, 2);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Sphere geometry and material
    const geometry = new THREE.SphereGeometry(0.7, 32, 32);
    const lightGreenMaterial = new THREE.MeshPhongMaterial({
      color: "#90ee90",
      shininess: 100,
    });

    // Group for orbiting spheres
    const orbitGroup = new THREE.Group();
    orbitGroup.position.set(0, 0, 0);
    scene.add(orbitGroup);

    // Sphere 1 (stationary)
    const sphere1 = new THREE.Mesh(geometry, lightGreenMaterial);
    sphere1.position.set(0, 0, 0);
    scene.add(sphere1);

    // Sphere 2 (orbiting)
    const sphere2 = new THREE.Mesh(geometry, lightGreenMaterial);
    sphere2.position.set(1, 0, 0);
    orbitGroup.add(sphere2);

    // Sphere 3 (orbiting)
    const sphere3 = new THREE.Mesh(geometry, lightGreenMaterial);
    sphere3.position.set(0, 1, 0);
    orbitGroup.add(sphere3);

    let frameId;

    function animate() {
      orbitGroup.rotation.z += 0.02;

      [sphere2, sphere3].forEach((sphere) => {
        sphere.rotation.x += 0.03;
        sphere.rotation.y += 0.03;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      // mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "200px",
        overflow: "hidden",
      }}
    />
  );
};

export default ThreeSphere;
