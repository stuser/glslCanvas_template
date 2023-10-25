document.addEventListener("DOMContentLoaded", function() {
    // Initialize WebGL context
    const canvas = document.getElementById("glslCanvas");
    const gl = canvas.getContext("webgl");

    if (!gl) {
        console.log("WebGL not supported, falling back on experimental-webgl");
        gl = canvas.getContext("experimental-webgl");
    }

    if (!gl) {
        alert("Your browser does not support WebGL");
    }

    // Initialize shader program (Assume you have functions to do this)
    // let shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    // Shader dropdown
    const shaderSelect = document.getElementById("shaderSelect");

    shaderSelect.addEventListener("change", function() {
        const selectedShaderFile = shaderSelect.value;
        
        // Fetch the new shader file
        fetch(selectedShaderFile)
            .then(response => response.text())
            .then(data => {
                // Replace the fragment shader source
                // Assume replaceFragmentShader is a function you've written to replace the shader
                // replaceFragmentShader(gl, shaderProgram, data);
            });
    });
});
