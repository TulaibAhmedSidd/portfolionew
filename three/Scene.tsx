"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 2000 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null!);

    const sphere = useMemo(() => {
        const points = new Float32Array(count * 3);
        const radius = 2; // Fixed radius for sphere
        for (let i = 0; i < count; i++) {
            // Uniform distribution on sphere surface
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            // Add some randomness to volume
            const r = 2 + Math.random() * 5;
            points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            points[i * 3 + 2] = r * Math.cos(phi);
        }
        return points;
    }, [count]);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#8b5cf6"
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function FloatingShapes({ isMobile }: { isMobile?: boolean }) {
    const meshRef = useRef<THREE.Group>(null!);
    const { mouse } = useThree();

    useFrame(() => {
        if (meshRef.current) {
            // Smooth interpolation for mouse parallax
            meshRef.current.rotation.x = THREE.MathUtils.lerp(
                meshRef.current.rotation.x,
                mouse.y * 0.5,
                0.05
            );
            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                mouse.x * 0.5,
                0.05
            );
        }
    });

    const materialProps = isMobile
        ? { color: "#002147", wireframe: true }
        : { color: "#002147", speed: 2, distort: 0.4 };

    const Mat = isMobile ? <meshStandardMaterial {...materialProps} /> : <MeshDistortMaterial {...materialProps} />;

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[-2, 1, -2]}>
                    <octahedronGeometry args={[0.5, 0]} />
                    {isMobile ? <meshStandardMaterial color="#002147" wireframe /> : <MeshDistortMaterial color="#002147" speed={2} distort={0.4} />}
                </mesh>
            </Float>

            <Float speed={3} rotationIntensity={2} floatIntensity={1}>
                <mesh position={[2, -1, -1]}>
                    <torusGeometry args={[0.4, 0.1, 16, 100]} />
                    {isMobile ? <meshStandardMaterial color="#8b5cf6" wireframe /> : <MeshDistortMaterial color="#8b5cf6" speed={3} distort={0.3} />}
                </mesh>
            </Float>

            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={3}>
                <mesh position={[0, -2, -3]}>
                    <icosahedronGeometry args={[0.6, 0]} />
                    {isMobile ? <meshStandardMaterial color="#312e81" wireframe /> : <MeshDistortMaterial color="#312e81" speed={1.5} distort={0.5} />}
                </mesh>
            </Float>
        </group>
    );
}

export default function Scene({ isMobile }: { isMobile?: boolean }) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: !isMobile, powerPreference: "high-performance" }} dpr={isMobile ? [1, 1.5] : [1, 2]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#002147" />
            <Particles count={isMobile ? 500 : 2000} />
            <FloatingShapes isMobile={isMobile} />
            <fog attach="fog" args={["#020617", 5, 20]} />
        </Canvas>
    );
}
