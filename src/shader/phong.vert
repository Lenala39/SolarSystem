//=============================================================================
//
//   Exercise code for the lecture "Introduction to Computer Graphics"
//     by Prof. Mario Botsch, Bielefeld University
//
//   Copyright (C) by Computer Graphics Group, Bielefeld University
//
//=============================================================================

#version 150
#extension GL_ARB_explicit_attrib_location : enable

layout (location = 0) in vec4 v_position; // input vertex position
layout (location = 1) in vec3 v_normal;   // input vertex normal
layout (location = 2) in vec2 v_texcoord; // input texture coordinates

out vec2 v2f_texcoord;  // output: texture coordinates
out vec3 v2f_normal;    // output: normal at current point
out vec3 v2f_light;     // output: normalized light vector from current vertex to light source
out vec3 v2f_view;      // output: normalized view vector from current vertex to the eye

uniform mat4 modelview_projection_matrix;
uniform mat4 modelview_matrix;
uniform mat3 normal_matrix;
uniform vec4 light_position; //in eye space coordinates already

void main()
{
    /** \todo Implement the phong vertex shader.
     * - Setup all `out` variables defined above. They will be the input of the phong fragment shader.
     * - To do so you can use all other vectors and matrices above
     * - In `Solar_Viewer::draw_scene(...)` you have to set all uniforms from both the vertex AND the pixel shader
     *
     * Hints: - Compute the vertex position, normal and light vector in eye space.
     *        - Store the final vertex position in `gl_Position`
     *        - Make sure that your vector sizes match
     *        - Via .xyz you can access the first three components of a vec4
     */

    v2f_texcoord = v_texcoord;
    v2f_normal = normal_matrix * v_normal;
    v2f_light = light_position - (modelview_matrix * v_position);
    v2f_view = (modelview_matrix * v_position) - vec4(0,0,0,1) // vector from point (v_position) to eye in eye space (eye == (0,0,0) in eye space)
	gl_Position = modelview_projection_matrix * v_position;


} 
