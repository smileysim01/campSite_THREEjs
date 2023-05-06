/*
 * Placeholder shader
 * The student should replace this with their own shader file.
 */
varying vec2 surfacePosition;

void main() {
    surfacePosition = uv;
    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}