import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { reduced } from './motion.js';

// One soft pearl blob in the hero, drawn with Three.js (loaded on demand).
// It rotates and breathes on its own, leans toward the cursor, and drifts with the scroll.
export default function HeroOrb() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let dispose = () => {};
    let dead = false;

    // The blob's setup (shader compile, environment map) blocks the main thread for a moment, so it waits until the hero entrance has finished.
    const timer = setTimeout(async () => {
      try {
        const THREE = await import('three');
        const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
        const { mergeVertices } = await import('three/examples/jsm/utils/BufferGeometryUtils.js');
        if (dead || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.9;

        const scene = new THREE.Scene();
        const pmrem = new THREE.PMREMGenerator(renderer);
        scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        // The canvas is 30% larger than the blob, so the camera sits 30% further back: same blob size, room to spare
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
        camera.position.z = 6.76;

        const key = new THREE.DirectionalLight(0xffffff, 1.4);
        key.position.set(3, 4, 5);
        scene.add(key);
        const rim = new THREE.PointLight(0x2f7a5e, 40, 12); // faint green rim, echoes the brand accent
        rim.position.set(-3.5, -2, -1.5);
        scene.add(rim);

        // Indexed sphere, so normals stay smooth after displacement
        let geometry = new THREE.IcosahedronGeometry(1.25, 15);
        geometry.deleteAttribute('normal');
        geometry.deleteAttribute('uv');
        geometry = mergeVertices(geometry);
        const base = geometry.attributes.position.array.slice();
        const pos = geometry.attributes.position;
        const material = new THREE.MeshPhysicalMaterial({
          color: 0xe4d9ef, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.08,
          iridescence: 1, iridescenceIOR: 1.4, iridescenceThicknessRange: [180, 520], sheen: 1, sheenColor: new THREE.Color(0xb7a3d4),
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Cursor, in the blob's own space (the blob bulges toward it)
        const ray = new THREE.Raycaster();
        const ndc = new THREE.Vector2();
        const sphere = new THREE.Sphere();
        const hit = new THREE.Vector3();
        const inv = new THREE.Matrix4();
        const cursor = new THREE.Vector3();
        const lean = { value: 0, target: 0 };
        const tilt = { x: 0, y: 0 };
        const toX = gsap.quickTo(tilt, 'x', { duration: 1.2, ease: 'power3.out' });
        const toY = gsap.quickTo(tilt, 'y', { duration: 1.2, ease: 'power3.out' });

        const deform = (t) => {
          for (let i = 0; i < base.length; i += 3) {
            const x = base[i], y = base[i + 1], z = base[i + 2];
            let n = Math.sin(x * 1.7 + t * 0.7) * Math.sin(y * 1.9 + t * 0.55) * Math.sin(z * 1.6 + t * 0.8) * 0.16
                  + Math.sin(x * 3.1 - t * 0.9 + z * 2.2) * 0.035;
            const dx = x - cursor.x * 1.25, dy = y - cursor.y * 1.25, dz = z - cursor.z * 1.25;
            n += lean.value * 0.3 * Math.exp(-(dx * dx + dy * dy + dz * dz) / 0.5);
            const s = 1 + n;
            pos.setXYZ(i / 3, x * s, y * s, z * s);
          }
          pos.needsUpdate = true;
          geometry.computeVertexNormals();
        };

        // pointer events only record the position; the maths runs once per frame in draw()
        const pointer = { x: 0, y: 0, moved: false };
        const onMove = (e) => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.moved = true; };
        const track = () => {
          pointer.moved = false;
          const e = { clientX: pointer.x, clientY: pointer.y };
          const rect = canvas.getBoundingClientRect();
          ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
          ray.setFromCamera(ndc, camera);
          sphere.set(mesh.position, 1.25 * mesh.scale.x);
          if (ray.ray.intersectSphere(sphere, hit)) {
            lean.target = 1;
          } else {
            ray.ray.closestPointToPoint(sphere.center, hit);
            lean.target = Math.max(0, 1 - (hit.distanceTo(sphere.center) - sphere.radius) / 1.6);
            hit.sub(sphere.center).setLength(sphere.radius).add(sphere.center);
          }
          inv.copy(mesh.matrixWorld).invert();
          cursor.copy(hit).applyMatrix4(inv).divideScalar(1.25);
          toX((e.clientX / window.innerWidth - 0.5) * 0.9);
          toY((e.clientY / window.innerHeight - 0.5) * 0.6);
        };
        const onLeave = () => { lean.target = 0; pointer.moved = false; };
        if (!reduced) {
          window.addEventListener('pointermove', onMove);
          document.addEventListener('pointerleave', onLeave);
        }

        const resize = () => {
          const w = canvas.clientWidth, h = canvas.clientHeight;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        let draw;
        const ro = new ResizeObserver(() => { resize(); if (reduced && draw) draw(0); });
        ro.observe(canvas);

        let visible = true;
        const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
        io.observe(canvas);

        draw = (t) => {
          if (pointer.moved) track();
          lean.value += (lean.target - lean.value) * 0.08;
          deform(t);
          mesh.rotation.y = t * 0.12 + tilt.x;
          mesh.rotation.x = tilt.y;
          const scroll = Math.min(window.scrollY, window.innerHeight * 1.5);
          mesh.position.y = scroll * 0.0016;
          mesh.scale.setScalar(1 - Math.min(scroll / (window.innerHeight * 2.4), 0.35));
          mesh.updateMatrixWorld();
          renderer.render(scene, camera);
        };

        resize();
        let tick = null;
        if (reduced) {
          draw(0); // a single still frame
        } else {
          const start = performance.now();
          tick = () => { if (visible) draw((performance.now() - start) / 1000); };
          gsap.ticker.add(tick);
          gsap.fromTo(canvas, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out' });
        }

        dispose = () => {
          if (tick) gsap.ticker.remove(tick);
          gsap.killTweensOf([canvas, tilt]);
          window.removeEventListener('pointermove', onMove);
          document.removeEventListener('pointerleave', onLeave);
          ro.disconnect();
          io.disconnect();
          geometry.dispose();
          material.dispose();
          pmrem.dispose();
          renderer.dispose();
        };
      } catch {
        canvasRef.current?.remove(); // no WebGL: the hero simply has no blob
      }
    }, reduced ? 0 : 2000);

    return () => { dead = true; clearTimeout(timer); dispose(); };
  }, []);

  return <canvas ref={canvasRef} className="hero-orb" aria-hidden="true" />;
}
