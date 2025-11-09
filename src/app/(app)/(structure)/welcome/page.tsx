"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function FBXViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const [status, setStatus] = useState("Initializing...");
  const [scale, setScale] = useState(0.01);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); 

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, -3, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 10, 7.5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    let mixer: THREE.AnimationMixer | null = null;
    const loader = new FBXLoader();
    setStatus("Loading FBX file...");

    loader.load(
      "/roboDance.fbx",
      (object) => {
        console.log("FBX loaded successfully!", object);
        modelRef.current = object;

        object.scale.setScalar(0.04);
        object.position.set(0, 0, 0);

        object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.material = new THREE.MeshStandardMaterial({
              color: "white",
              side: THREE.DoubleSide,
              roughness: 0.6,
              metalness: 0.2,
            });
          }
        });

        scene.add(object);

        const skeletonHelper = new THREE.SkeletonHelper(object);
        (skeletonHelper.material as THREE.LineBasicMaterial).color.setHex(0xffffff);
        (skeletonHelper.material as THREE.LineBasicMaterial).linewidth = 5; 
        skeletonHelper.scale.setScalar(2); 
        scene.add(skeletonHelper);

        if ((object as any).animations?.length) {
          mixer = new THREE.AnimationMixer(object);
          const action = mixer.clipAction((object as any).animations[0]);
          action.play();
        }
        setStatus("FBX loaded!");
      },
      (xhr) => {
        const percent = (xhr.loaded / xhr.total) * 100;
        setStatus(`Loading: ${percent.toFixed(0)}%`);
      },
      (error) => {
        console.error("Error loading FBX:", error);
        setStatus("Error loading FBX");
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      const width = mount.clientWidth;
      const height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", onResize, { passive: true });
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
      controls.dispose();
      renderer.dispose();
      if (mixer) mixer.stopAllAction();
      try {
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      } catch {}
    };
  }, []);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.scale.setScalar(scale);
    }
  }, [scale]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={mountRef}
        style={{
          width: "600px",
          height: "400px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          color: "white",
          background: "black",
          padding: "10px 15px",
          borderRadius: "8px",
          fontFamily: "monospace",
          fontSize: "14px",
        }}
      >
        {status}
      </div>
    </div>
  );
}
