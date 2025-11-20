import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

(function () {
    console.log("Soft rounded particle background running…");

    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.background = null; // transparent

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        2000
    );
    camera.position.z = 300;

    //   ROUND PARTICLE TEXTURE (Glow soft-circle)

    function createCircleTexture() {
        const size = 64;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        const gradient = ctx.createRadialGradient(
            size / 2, size / 2, 0,
            size / 2, size / 2, size / 2
        );

        gradient.addColorStop(0, "rgba(255,255,255,0.9)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }
       
    // PARTICLE GEOMETRY

    const particles = 2000;
    const positions = new Float32Array(particles * 3);

    for (let i = 0; i < particles; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 900;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 900;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 900;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // AUTO COLOR BASED ON THEME

    function getParticleColor() {
        return new THREE.Color(
            getComputedStyle(document.documentElement)
                .getPropertyValue('--text')
                .trim()
        );
    }


    // MATERIAL WITH ROUND PARTICLES

    const material = new THREE.PointsMaterial({
        size: 4,                    
        transparent: true,
        opacity: 0.35,              
        depthTest: false,
        map: createCircleTexture(), 
        alphaTest: 0.02,
        color: getParticleColor(),
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // LIVE UPDATE COLOR WHEN THEME CHANGES

    const observer = new MutationObserver(() => {
        material.color = getParticleColor();
    });
    observer.observe(document.documentElement, { attributes: true });

    //  PARALLAX MOUSE MOVEMENT

    let mouseX = 0, mouseY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.002;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.002;
    });


    // RESIZE HANDLER

    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

 
    // ANIMATION LOOP

    function animate() {
        points.rotation.y += 0.0007;
        points.rotation.x += 0.0003;

        camera.position.x += (mouseX * 40 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 40 - camera.position.y) * 0.05;

        camera.lookAt(scene.position);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
})();
