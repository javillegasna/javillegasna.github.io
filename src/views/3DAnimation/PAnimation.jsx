import React from "react";
import Introduction from "../../components/introduction/Introduction";
import intro_img from "./assets/portfolio-1.png";
import { CopyBlock, dracula } from "react-code-blocks";
import "./PAnimation.css";
const PAnimation = () => {
  return (
    <main className="portfolio-item-individual">
      <Introduction
        title={"3D Cube"}
        title_strong={"Animation"}
        subtitle={"Whit only CSS"}
        img={intro_img}
      />
      <h3 className="view__subtitle">Normalization of css</h3>
      <p>
        This project was done in order to understand how the rotate and
        translate properties of css work.
      </p>
      <p>
        The first part consists of standardizing the css properties, since it is
        well known that in each browser properties such as padding and margin
        are different.
      </p>
      <pre className="code_block">
        <CopyBlock
          language={"css"}
          showLineNumbers={true}
          startingLineNumber={1}
          theme={dracula}
          text={`* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    list-style: none;
  }`}
        />
      </pre>
      <h3 className="view__subtitle">Html structure</h3>
      <p>
        The next step is to define the structure that our animation will
        maintain.
      </p>
      <pre className="code_block">
        <CopyBlock
          language={"html"}
          showLineNumbers={true}
          startingLineNumber={7}
          theme={dracula}
          text={`<section class="scene">
  <div class="floor"></div>
  <div class="cube">
    <div class="front"></div>
    <div class="back"></div>
    <div class="left"></div>
    <div class="right"></div>
    <div class="top">
      <div class="ballShadow"></div>
    </div>
    <div class="bottom"></div>
  </div>
  <div class="ball"></div>
</section>`}
        />
      </pre>
      <p>
        As you can see the three main parts are the floor, a cube and the ball.
        As it is evident the cube is composed of six faces but it is necessary
        to place a shadow for the sphere that will be on the cube.
      </p>
      <h3 className="view__subtitle">The scene configuration</h3>
      <p>
        The first thing to configure is the scene, and the most important
        property here is{" "}
        <code className="code">transform-style: preserve-3d;</code> since this
        makes possible to rotate or to move a container in its 3 axes, in
        addition it is necessary to define completely an animation with the
        frames to use its speed and recurrence.
      </p>
      <pre className="code_block">
        <CopyBlock
          language={"css"}
          showLineNumbers={true}
          startingLineNumber={21}
          theme={dracula}
          text={`.scene{
  position: relative;
  transform-style: preserve-3d;
  animation: 
    sceneRotate var(--rotateSpeed) infinite linear;
}
@keyframes sceneRotate {
  to { transform: rotateY(360deg); }
}`}
        />
      </pre>
      <h3 className="view__subtitle">Floor styling</h3>
      <p>
        As all the components of this animation, need to leave the normal flow
        of the document, we add the property{" "}
        <code className="code">position: absolute;</code> which allows us to
        move it freely from it we position it in the middle of the scene with
        50% in both width and height. Then we rotate it in the x-axis to give it
        depth.
      </p>
      <p>
        Once we have it positioned we give it a checkerboard appearance using
        <code className="code">repeating-conic-gradient</code> every 45 degrees,
        which if we color every 90 degrees does result in a full square pattern.
      </p>
      <pre className="code_block">
        <CopyBlock
          language={"css"}
          showLineNumbers={true}
          startingLineNumber={30}
          theme={dracula}
          text={`.floor{
  position: absolute;
  transform: translate(-50%, -50%)
  rotateX(90deg);
  top: 1em;
  width: 10em;
  height: 10em;
  background-image:
    radial-gradient(#8888, var(--color-palette-L003)),
    repeating-conic-gradient(
    from 45deg,
    #80808036  0deg 90deg, 
    #000 90deg 180deg);
  background-size: 1000%, 1em 1em;
}`}
        />
      </pre>
      <h3 className="view__subtitle">Cube building and animation</h3>
      <p>
        Since each side of the cube is represented by a div inside a container
        with the cube class, it is necessary to re-set the{" "}
        <code className="code">transform-style: preserve-3d property;</code>{" "}
        since from this a new perspective will be built for each side.
      </p>
      <p>
        In addition, as the height of this will change with the bounce of the
        sphere, an ease-out linear animation is configured, modifying the height
        of the main container since from this one the interior heights will be
        taken.
      </p>
      <pre className="code_block">
        <CopyBlock
          language={"css"}
          showLineNumbers={true}
          startingLineNumber={45}
          theme={dracula}
          text={`.cube{
  width: 2em;
  height: 2em;
  transform-style: preserve-3d;
  position: absolute;
  bottom: -1em;
  left: -1em;
  animation: cubeHeight var(--bounceSpeed) infinite ease-out;  
}
@keyframes cubeHeight {
  0%, 100% { height: 1.5em;}
  14%, 93.5% { height: 2em;}
}`}
        />
      </pre>
      <p>
        For the construction of the cube we first format each side with the same
        styles, heights and effects, remembering that by placing the relative
        measure 100% we mean 100% of the parent.
      </p>
      <p>
        Then we position each side rotating only if necessary, since in some
        cases like the front we don't need to rotate it but we need to move it
        out of the screen.
      </p>
      <pre className="code_block">
        <CopyBlock
          language={"css"}
          showLineNumbers={true}
          startingLineNumber={58}
          theme={dracula}
          text={`.left, .right, .front, .back{
  width: 100%;
  height: 100%;
  position: absolute;
  background: var(--color-palette-O002);
  box-shadow: 0 0 0.5em var(--color-palette-L003) inset;
}
.front{transform: translateZ(1em);}
.right{transform: rotateY(90deg) translateZ(1em);}
.back{transform: rotateY(180deg) translateZ(1em);}
.left{transform: rotateY(270deg) translateZ(1em);}
.top{
  width: 2em;
  height: 2em;
  position: absolute;
  background: var(--color-palette-O002);
  transform: translateY(-50%) rotateX(90deg);
}
.bottom{
  width: 2em;
  height: 2em;
  position: absolute;
  bottom: 0;
  background: #0007;
  box-shadow: 0 0 0.5em var(--color-palette-L003);
  transform: translateY(48%) rotateX(90deg);
}`}
        />
      </pre>
      <p>
        In the case of the top and bottom, their heights and colors are defined
        separately, since the heights need to be fixed and not modified
        according to the animation and their colors must reflect the shadow
        according to their perspective.
      </p>
      <h3 className="view__subtitle">Sphere styling and final animation</h3>
      <p>
        Finally for the final animation, we build a sphere, from a div; first we
        generate a circle with border-radius: 50%; and we give it a visual
        effect for the depth with a radial gradient.
      </p>
      <p>
        To animate it we modify the distance from the top face of the cube and
        we simulate acceleration by modifying the time function in the middle of
        the animation, emulating the speed gain with the bouncing of the cube.
      </p>
      <pre className="code_block">
        <CopyBlock
          language={"css"}
          showLineNumbers={true}
          startingLineNumber={84}
          theme={dracula}
          text={`.ball{
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: absolute;
  left: -0.5em;
  bottom: 1em;
  background-image: radial-gradient(
    circle at top,
    var(--color-palette-L005), 
    var(--color-palette-L003)
  );
  animation:
  ballBounce var(--bounceSpeed) infinite ease-out,
  sceneRotate var(--rotateSpeed) infinite linear reverse;
}
@keyframes ballBounce{
  0%, 100% { bottom: .5em; }
  50% {
    bottom: 3em;
    animation-timing-function: ease-in;
  }
}
.ballShadow{
  position: absolute;
  width: 100%; height: 100%;
  background-image: radial-gradient(#000, #0007 50%);
}`}
        />
      </pre>
    </main>
  );
};

export default PAnimation;
