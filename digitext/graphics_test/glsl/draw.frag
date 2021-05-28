#ifdef GL_ES
precision highp float;
#endif

uniform vec4 color;
uniform sampler2D lastFrame;
varying vec2 velocity;
varying vec3 age;
uniform float maxAge;

const float DELTA = 0.2;

void main() {
    vec4 lFColor = texture2D(lastFrame, gl_PointCoord);

    if(age.x <= 0.0) {
        discard;
    } else {
        gl_FragColor = vec4(1.0 * (age.y) + 0.0 * (1.0 - age.y), 0.0 * (age.y) + 0.1 * (1.0 - age.y) , 0.2 * (age.y) + 0.8 * (1.0 - age.y), 1.0 - (age.z / maxAge));
    }
}
