import { useTexture } from "@react-three/drei";
import { PlaneGeometryProps } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
// import { TextureLoader } from 'three/src/loaders/TextureLoader'

interface SolarPanelProps {
  width?: number;
  height?: number;
  translate?: THREE.Vector3;
  rotateX?: number;
}

const SolarPanel = ({ translate, rotateX = Math.PI / -2, width, height }: SolarPanelProps) => {
  const [colorMap, displacementMap, normalMap, roughnessMap, metalnessMap] = useTexture([
    '/assets/solar-panel-texture/SolarPanel002_1K_Color.jpg',
    '/assets/solar-panel-texture/SolarPanel002_1K_Displacement.jpg',
    '/assets/solar-panel-texture/SolarPanel002_1K_NormalDX.jpg',
    '/assets/solar-panel-texture/SolarPanel002_1K_Roughness.jpg',
    '/assets/solar-panel-texture/SolarPanel002_1K_Metalness.jpg',
  ]);

  const geometry = useMemo(() => {
    const _geometry = new THREE.PlaneGeometry(width, height)

    if (typeof rotateX === "number") {
      _geometry.rotateX(rotateX);
    }

    if (translate) {
      _geometry.translate(translate.x, translate.y, translate.z)
    }

    return _geometry;
  }, [translate, rotateX]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        side={THREE.DoubleSide}
        displacementScale={0.01}
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        metalnessMap={metalnessMap}
      />
    </mesh>
  )
}

export default SolarPanel
