/* a simple procedural texture */
/* the student should change this to implement a checkerboard */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;

/* number of checks over the UV range */
uniform float checks;

void main()
{
    float x = v_uv.x * checks;
    float y = v_uv.y * checks;

    float xc = floor(x);
    float yc = floor(y);

    float d = .5;

    float dx = x-xc-d;
    float dy = y-yc-d;

    float dc = step(mod(xc + yc, 2.0), 0.0);

    gl_FragColor = vec4(mix(light,dark,dc), 1.);
}

