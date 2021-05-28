#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D lastFrame;
varying vec3 age;
uniform float maxAge;

const float DELTA = 0.2;

void main() {
    vec4 lFColor = texture2D(lastFrame, gl_PointCoord);

    if(age.x <= 0.0) {
        discard;
    } else {
        vec4 color1 = vec4(25.0 / 255.0, 80.0 / 255.0, 151.0 / 255.0, 1.0);
        vec4 color2 = vec4(235.0 / 255.0, 233.0 / 255.0, 149.0 / 255.0, 1.0);
        gl_FragColor = vec4(color1.r * (age.y) + color2.r * (1.0 - age.y), color1.g * (age.y) + color2.g * (1.0 - age.y) , color1.b * (age.y) + color2.b * (1.0 - age.y), (1.0 - (age.z / maxAge)) * 0.5);
    }
}
