/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 rachel.glb
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
// import { Vector3 } from 'three'
import { createMachine, interpret } from 'xstate'


export function Rachel(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/Rachel/rachel.glb')
  const { actions } = useAnimations(animations, group)

  const currentState = useRef("standing")
  const lastAction = useRef(null)
  const activeAction = useRef(null)

  const walk = (context, event) => {
    if (actions?.Walking) {
      lastAction.current = activeAction.current
      if (lastAction.current) {
        lastAction.current.fadeOut(0.2)
      }
      activeAction.current = actions.Walking
      activeAction.current.reset()
      activeAction.current.fadeIn(0.2)
      activeAction.current.play()
    }
    currentState.current = "walking"
  }

  const stand = (context, event) => {
    if (actions?.StandingIdle) {
      lastAction.current = activeAction.current
      if (lastAction.current) {
        lastAction.current.fadeOut(0.5)
      }
      activeAction.current = actions.StandingIdle
      activeAction.current.reset()
      activeAction.current.fadeIn(0.5)
      activeAction.current.play()
    }
    currentState.current = "standing"
  }

  // const goalPosition = useRef(new Vector3(-10, -7, -10))
  
  const locomotionMachine = createMachine({
    predictableActionArguments: true,
    id: "locomotion",
    initial: "standing",
    states: {
      standing: {
        entry: ["stand"],
        on: {
          WALK: "walking",
        },
      },
      walking: {
        entry: ["walk"],
        on: {
          STOP: "standing",
        },
      },
    },
  }, {
    actions: { walk, stand },
  })

  const locomotionActor = interpret(locomotionMachine).start()

  useEffect(() => {
    setInterval(() => {
      if (currentState.current === "standing") {
        locomotionActor.send({ type: "WALK" })
      } else {
        locomotionActor.send({ type: "STOP" })
      }
      
    }, 3000)
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.009}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Ch02_Body" geometry={nodes.Ch02_Body.geometry} material={materials.Ch02_body} skeleton={nodes.Ch02_Body.skeleton} />
          <skinnedMesh name="Ch02_Cloth" geometry={nodes.Ch02_Cloth.geometry} material={materials.Ch02_body} skeleton={nodes.Ch02_Cloth.skeleton} />
          <skinnedMesh name="Ch02_Eyelashes" geometry={nodes.Ch02_Eyelashes.geometry} material={materials.Ch02_hair} skeleton={nodes.Ch02_Eyelashes.skeleton} />
          <skinnedMesh name="Ch02_Hair" geometry={nodes.Ch02_Hair.geometry} material={materials.Ch02_hair} skeleton={nodes.Ch02_Hair.skeleton} />
          <skinnedMesh name="Ch02_Sneakers" geometry={nodes.Ch02_Sneakers.geometry} material={materials.Ch02_body} skeleton={nodes.Ch02_Sneakers.skeleton} />
          <skinnedMesh name="Ch02_Socks" geometry={nodes.Ch02_Socks.geometry} material={materials.Ch02_body} skeleton={nodes.Ch02_Socks.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/Rachel/rachel.glb')
