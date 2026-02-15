import * as THREE from 'three'
import { ReactThreeFiber } from '@react-three/fiber'
import { Object3DNode, BufferGeometryNode, MaterialNode } from '@react-three/fiber'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>
            group: Object3DNode<THREE.Group, typeof THREE.Group>
            points: Object3DNode<THREE.Points, typeof THREE.Points>
            pointMaterial: MaterialNode<THREE.PointsMaterial, typeof THREE.PointsMaterial>
            meshStandardMaterial: MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
            meshDistortMaterial: any
            octahedronGeometry: BufferGeometryNode<THREE.OctahedronGeometry, typeof THREE.OctahedronGeometry>
            torusGeometry: BufferGeometryNode<THREE.TorusGeometry, typeof THREE.TorusGeometry>
            icosahedronGeometry: BufferGeometryNode<THREE.IcosahedronGeometry, typeof THREE.IcosahedronGeometry>
            ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>
            directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>
            pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>
            fog: Object3DNode<THREE.Fog, typeof THREE.Fog>
        }
    }
}
