import * as THREE from "three";
import { BackgroundProp } from "./BackgroundSelector";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

THREE.Cache.enabled = true;
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ColorGradientDir, TextProp } from "./TextSetting";

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls,
  container: HTMLCanvasElement;
export function init(
  _container: HTMLCanvasElement,
  width: number,
  height: number
) {
  container = _container;
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: container,
  });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height, false);
  renderer.setAnimationLoop(animate);

  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 80, 0);

  // const domWidth = container.clientWidth;
  // const domHeight = container.clientHeight;

  // camera = new THREE.OrthographicCamera(
  //   domWidth / -2,
  //   domWidth / 2,
  //   domHeight / 2,
  //   domHeight / -2,
  //   0.1,
  //   1000
  // );

  // camera.position.set(0, 10, 0);

  // controls

  controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = false;

  controls.enabled = true;

  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 0.1;
  controls.maxDistance = 50000;

  controls.maxPolarAngle = Math.PI / 2;

  // lights

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
  dirLight2.position.set(-1, -1, -1);
  scene.add(dirLight2);

  const ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);
}

function animate() {
  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  render();
}

function render() {
  renderer.render(scene, camera);
}

export function resize(
  width: number,
  height: number,
  clientWidth: number,
  clientHeight: number
) {
  console.log("resize to width = " + width + " height = " + height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // camera = new THREE.OrthographicCamera(
  //   clientWidth / -2,
  //   clientWidth / 2,
  //   clientHeight / 2,
  //   clientHeight / -2,
  //   0.1,
  //   1000
  // );

  renderer.setSize(width, height, false);
}

let textMesh: THREE.Mesh;
let lastTextProps: TextProp | null = null;
export async function updateTextProps(textProps: TextProp) {
  // const mirror = true;
  // const plane = new THREE.Mesh(
  //   new THREE.PlaneGeometry(10000, 10000),
  //   new THREE.MeshBasicMaterial({
  //     color: 0xffffff,
  //     opacity: 0.5,
  //     transparent: true,
  //   })
  // );
  // plane.position.y = 100;
  // plane.rotation.x = -Math.PI / 2;
  // scene.add(plane);

  if (lastTextProps == null) {
    const geo = await getTextGeometry(textProps);
    const mat = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
    });

    if (Array.isArray(textProps.color)) {
      // 渐变颜色处理
      setGradient(textProps.color, textProps.colorGradientDir, geo, mat);
    } else {
      // 单色处理
      setColor(textProps.color, mat);
    }
    let size = new THREE.Vector3();
    geo.boundingBox?.getSize(size);
    let textMesh1 = new THREE.Mesh(geo, mat);
    textMesh1.rotateX(-Math.PI / 2);
    textMesh1.scale.multiplyScalar(100 / size.x);

    scene.add(textMesh1);

    textMesh = textMesh1;

    lastTextProps = textProps;

    return;
  }

  if (needUpdateGeo(textProps)) {
    let geo = await getTextGeometry(textProps);
    textMesh.geometry.dispose();
    textMesh.geometry = geo;

    if (Array.isArray(textProps.color)) {
      setGradient(
        textProps.color,
        textProps.colorGradientDir,
        textMesh.geometry,
        textMesh.material as THREE.MeshLambertMaterial
      );
    }
  } else {
    if (Array.isArray(textProps.color)) {
      setGradient(
        textProps.color,
        textProps.colorGradientDir,
        textMesh.geometry,
        textMesh.material as THREE.MeshLambertMaterial
      );
    } else {
      // 单色处理
      setColor(textProps.color, textMesh.material as THREE.MeshLambertMaterial);
    }
  }

  scene.add(textMesh);
  lastTextProps = textProps;
}

function needUpdateGeo(textProps: TextProp) {
  return (
    lastTextProps?.text != textProps.text ||
    lastTextProps?.font != textProps.font ||
    lastTextProps?.weight != textProps.weight
  );
}

function setGradient(
  colors: string[],
  dir: ColorGradientDir,
  geo: THREE.BufferGeometry,
  mat: THREE.MeshLambertMaterial
) {
  // 渐变颜色处理
  mat.vertexColors = true;
  mat.needsUpdate = true;
  mat.color.set(1, 1, 1);
  const startColor = new THREE.Color(colors[0]);
  const endColor = new THREE.Color(colors[1]);

  const colorss = [];
  const position = geo.attributes.position;

  if (dir == "l2r") {
    const maxX = geo.boundingBox!.max.x;
    const minX = geo.boundingBox!.min.x;
    const color = new THREE.Color();
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const t = (x - minX) / (maxX - minX); // 归一化
      color.lerpColors(startColor, endColor, t);
      colorss.push(color.r, color.g, color.b);
    }
  } else if (dir == "t2b") {
    const maxY = geo.boundingBox!.max.y;
    const minY = geo.boundingBox!.min.y;
    const color = new THREE.Color();

    for (let i = 0; i < position.count; i++) {
      const y = position.getY(i);
      const t = (y - minY) / (maxY - minY); // 归一化
      color.lerpColors(startColor, endColor, 1.0 - t);
      colorss.push(color.r, color.g, color.b);
    }
  }

  geo.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(new Float32Array(colorss), 3)
  );
  geo.attributes.color.needsUpdate = true;
}

function setColor(color: string, mat: THREE.MeshLambertMaterial) {
  // 渐变颜色处理
  mat.vertexColors = false;
  mat.color.set(color);
  mat.needsUpdate = true;
}

async function getTextGeometry(textProps: TextProp) {
  let text = textProps.text;
  let bevelEnabled = true;
  let font = await loadFont(textProps);
  const depth = 20,
    size = 70,
    // hover = 30,
    curveSegments = 4,
    bevelThickness = 2,
    bevelSize = 1.5;

  let textGeo = new TextGeometry(text, {
    font,
    size: size,
    depth: depth,
    curveSegments: curveSegments,

    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelEnabled: bevelEnabled,
  });

  textGeo.computeBoundingBox();
  textGeo.center();
  textGeo.computeVertexNormals();
  return textGeo;

  // if (mirror) {
  //   textMesh2 = new THREE.Mesh(textGeo, materials);

  //   textMesh2.position.x = centerOffset;
  //   textMesh2.position.y = -hover;
  //   textMesh2.position.z = depth;

  //   textMesh2.rotation.x = Math.PI;
  //   textMesh2.rotation.y = Math.PI * 2;

  //   group.add(textMesh2);
  // }
}

async function loadFont(textProps: TextProp) {
  const loader = new FontLoader();
  let font = await loader.loadAsync(textProps.fontUrl);
  return font;
}

export function updateBackground(bg: BackgroundProp) {
  // if (bg.color) {
  //   scene.background = new THREE.Color(bg.color);
  // } else {
  //   scene.background = null;
  // }
}

// function createGradientTexture(colors: string[]) {
//   const canvas = document.createElement("canvas");
//   canvas.width = 256;
//   canvas.height = 1;
//   const ctx = canvas.getContext("2d")!;

//   const gradient = ctx.createGradientGradient(0, 0, 256, 0);
//   const step = 1 / (colors.length - 1);
//   colors.forEach((color, i) => {
//     gradient.addColorStop(i * step, color);
//   });

//   ctx.fillStyle = gradient;
//   ctx.fillRect(0, 0, 256, 1);

//   return canvas.toDataURL();
// }

export function getPicture(width: number, height: number) {
  if (width == 0 || height == 0) {
    render();
    return container.toDataURL("image/png");
  }

  let lastWidth = renderer.domElement.width;
  let lastHeight = renderer.domElement.height;
  renderer.setSize(width, height, false);
  render();
  const img = container.toDataURL("image/png");
  renderer.setSize(lastWidth, lastHeight, false);
  return img;
}
