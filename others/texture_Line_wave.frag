//https://glslsandbox.com/e#108080.1

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main(void) {
    vec2 p = (gl_FragCoord.xy / u_resolution.xy) - 0.5;
    float sx = .1 * (p.x + 0.8) * sin(3.0 * p.x - 9.0 * u_time / 40.0);
    float dy = 2.0 / (125.0 * abs(p.y - sx));

    // Definieren Sie zwei Farbvektoren für die Mischung
    vec3 color1 = vec3(1.0, 0.5, 0.0); //Gelb
    vec3 color2 = vec3(0.0, 0.0, 1.0); // Blau

    // Berechnen Sie einen Mischfaktor basierend auf der x-Koordinate, sodass die Farbe
    // entlang der Linie variiert. Sie können dies auch dynamisch mit der Zeit machen.
    float mixFactor = sin(.3 * p.x - u_time);

    // Mischen Sie die beiden Farben mit dem Mischfaktor
    vec3 mixedColor = mix(color1, color2, mixFactor);

    // Anwendung der gemischten Farbe auf die Linie mit der Intensität 'dy'
    vec3 color = mixedColor * dy;

    gl_FragColor = vec4(color, 1.0);
}
