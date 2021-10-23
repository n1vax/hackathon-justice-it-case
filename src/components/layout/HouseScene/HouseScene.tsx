import React, { ReactNode, Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { Mesh, Vector2, Shape, ExtrudeGeometry, Color, Vector3 } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

interface HouseSceneProps {
  path: Vector2[],
  height?: number;
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  // @ts-ignore
  useFrame((state) => controls.current!.update());

  // @ts-ignore
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

const HouseScene = ({ path, height = 10 }: HouseSceneProps) => {
  const geometry = React.useMemo(() => {
    if (!path || path.length === 0) {
      return null;
    }

    const shape = new Shape()

    shape.moveTo(path[0].x, path[0].y);

    for (let i = 1; i < path.length; ++i) {
      const { x, y } = path[i];

      shape.lineTo(x, y);
    }

    const _geometry = new ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: false,
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

  const cameraPosition = useMemo(() => {
    const xy = path.reduce((acc, cur) => {
      const length = cur.length();

      return length > acc ? length : acc
    }, 0);

    return new Vector3(xy, xy, 0);
  }, []);

  return (
    <Canvas camera={{
      position: cameraPosition,
    }}>
      <pointLight position={[-cameraPosition.x, 0, 0]} color="#fff" intensity={1.5} />
      <pointLight position={cameraPosition} color="#fff" intensity={1.5} />
      <ambientLight position={[0, cameraPosition.y, 0]} intensity={0.8} />

      {geometry && <mesh geometry={geometry}>
        <meshStandardMaterial attach="material" color="#888" />
      </mesh>}

      <axesHelper scale={20} />

      <CameraControls />
    </Canvas>
  )
}

export default HouseScene;
