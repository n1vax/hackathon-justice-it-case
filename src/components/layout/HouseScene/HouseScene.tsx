import React, { ReactNode, Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls, useCubeTexture, useTexture } from '@react-three/drei'
import { Mesh, Vector2, Shape, ExtrudeGeometry, Color, Vector3 } from 'three';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SolarPanel from '../SolarPanel';
import HouseWalls from './HouseWalls';
import { CircularProgress } from '@material-ui/core';


interface HouseSceneProps {
  path: Vector2[],
  height?: number;
}


const SkyBox = () => {
  const { scene } = useThree();
  // const texture = useCubeTexture([
  //   "bay_bk.jpg",
  //   "bay_ft.jpg",
  //   "bay_up.jpg",
  //   "bay_dn.jpg",
  //   "bay_lf.jpg",
  //   "bay_rt.jpg",
  // ], {
  //   path: "/assets/textures/skybox/"
  // });

  // scene.background = new Color("#fff");

  return null;
}

const HouseScene = ({ path, height = 10 }: HouseSceneProps) => {
  const maxPathItemLength = useMemo(() => {
    return path.reduce((acc, cur) => {
      const length = cur.length();

      return length > acc ? length : acc
    }, 0);
  }, [path]);

  const position = useMemo(() => {
    return new Vector3(maxPathItemLength, maxPathItemLength, 0);
  }, [maxPathItemLength]);

  // const solarPanels = useMemo(() => {
  //   return Array.from({ length: 10 }, (_, i) => {
  //     const position = new Vector3((i - 5) * 1 + 0.2, height, 0);

  //     return <SolarPanel key={i} translate={position} width={1} height={1.65} />
  //   });
  // }, []);

  return (
    <Canvas camera={{ position }}>
      <Suspense fallback={null}>
        <pointLight position={[-maxPathItemLength, 0, 0]} color="#fff" intensity={1.5} />
        <pointLight position={position} color="#fff" intensity={1.5} />
        <ambientLight position={[0, maxPathItemLength, 0]} intensity={0.8} />

        {path && <HouseWalls path={path} />}

        {/* <group>
          {solarPanels}
        </group> */}

        <axesHelper scale={maxPathItemLength} />

        <SkyBox />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}

export default HouseScene;
