import React, { ReactNode, Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { Mesh, Vector2, Shape, ExtrudeGeometry, Color, Vector3 } from 'three';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SolarPanel from '../SolarPanel';

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
// extend({ OrbitControls });

interface HouseWallsProps {
  path: Vector2[],
  height?: number;
}

const HouseScene = ({ path, height = 10 }: HouseWallsProps) => {
  // const [colorMap, displacementMap, normalMap, roughnessMap] = useTexture([
  //   '/assets/textures/bricks/Bricks051_1K_Color.jpg',
  //   '/assets/textures/bricks/Bricks051_1K_Displacement.jpg',
  //   '/assets/textures/bricks/Bricks051_1K_NormalDX.jpg',
  //   '/assets/textures/bricks/Bricks051_1K_Roughness.jpg',
  // ]);

  const geometry = React.useMemo(() => {
    const shape = new Shape()

    shape.moveTo(path[0].x, path[0].y);

    for (let i = 1; i < path.length; ++i) {
      const { x, y } = path[i];

      shape.lineTo(x, y);
    }

    const _geometry = new ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: false,
      steps: 2,

    });

    const rad90Deg = Math.PI / 2;

    _geometry.rotateY(Math.PI);
    _geometry.rotateZ(rad90Deg);
    _geometry.rotateX(rad90Deg);

    const { min, max } = _geometry.center().boundingBox!;
    const { x, z } = min.add(max);
    const y = height / 2;

    _geometry.translate(x, y, z);

    return _geometry;
  }, [path]);


  return (
    <mesh onClick={(event) => {
      // let vector = new Vector3(); 
      // event.point
      // event.object.getWorldPosition(vector);
      console.log(event.point, "test");
    }} geometry={geometry}>
      <meshStandardMaterial attach="material" color="#888" />
      {/* <meshStandardMaterial
        normalScale={new Vector2(0.1, 0.1)}
        bumpScale={0.1}
        displacementScale={0}
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      /> */}
    </mesh>
  )

  // (
  //   <Canvas camera={{
  //     position: cameraPosition,
  //   }}>
  //     <Suspense fallback={null}>
  //       <pointLight position={[-cameraPosition.x, 0, 0]} color="#fff" intensity={1.5} />
  //       <pointLight position={cameraPosition} color="#fff" intensity={1.5} />
  //       <ambientLight position={[0, cameraPosition.y, 0]} intensity={0.8} />

  //       {geometry && <mesh geometry={geometry}>
  //         <meshStandardMaterial attach="material" color="#888" />
  //       </mesh>}

  //       <group>
  //         {solarPanels}
  //       </group>

  //       <axesHelper scale={20} />
  //       <OrbitControls />
  //       {/* <CameraControls /> */}
  //     </Suspense>
  //   </Canvas>
  // )
}

export default HouseScene;
