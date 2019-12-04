//=============================================================================
//
//   Exercise code for the lecture "Introduction to Computer Graphics"
//     by Prof. Mario Botsch, Bielefeld University
//
//   Copyright (C) by Computer Graphics Group, Bielefeld University
//
//=============================================================================

#version 150

// output from phong.vert --> input from phong.frag
in vec3 v2f_normal;
in vec2 v2f_texcoord;
in vec3 v2f_light;
in vec3 v2f_view;

out vec4 f_color;

uniform sampler2D tex;
uniform bool greyscale;

const float shininess = 8.0;
const vec3  sunlight = vec3(1.0, 0.941, 0.898);

void main()
{
    
    /* // fetch color from texture
    vec3 color = texture(tex, v2f_texcoord.st).rgb;
    float alpha = texture(tex, v2f_texcoord.st).a;

    // convert RGB color to YUV color and use only the luminance
    if (greyscale) color = vec3(0.299*color.r+0.587*color.g+0.114*color.b);

    // add the required alpha value
    f_color = vec4(color.rgb, alpha);*/
    
    /**
    *  Implement the Phong shading model (like in the first exercise)
    *  - Use the passed `in` variables to compute the resulting color and store it in `f_color`.
    *  - The texture's color value should be used as material parameter for ambient, diffuse and specular lighting.
    *  - You can copy the function to extract the texture's color from the `color.frag` fragmentshader.
    *  - Scale ambient and specular light component by 0.2 to get a more realistic result
    *  - You do not have to implement shadows.
    *
    *  Hint: Here, functions like reflect, dot, max, min, normalize can be used in the same way as in the raytracer.
     */

    vec3 color = vec3(0.0,0.0,0.0);
	float alpha = 1.0;
    vec3 texture_color = texture(tex, v2f_texcoord.st).rgb;

    //ambient lighting (ambient color source??)
    color = texture_color * 0.2;

    //diffuse lighting
    vec3 diff = vec3(0,0,0);
    float diff_angle = dot(v2f_light, v2f_normal);
    if (diff_angle >= 0.0) {
        diff = texture_color * diff_angle;
        color += diff;
    }

    //specular light
    vec3 spec = vec3(0,0,0);
    vec3 mirrored_light = vec3(0,0,0);
    mirrored_light = reflect(v2f_light, v2f_normal);
    float spec_angle = dot(mirrored_light, v2f_view);
    if (diff_angle > 0 && spec_angle > 0) {
        spec = texture_color * pow(spec_angle, shininess);
        color = color + (spec * 0.2);
    }
    
    // convert RGB color to YUV color and use only the luminance
    if (greyscale) color = vec3(0.299*color.r+0.587*color.g+0.114*color.b);

    // add required alpha value
    f_color = vec4(color, alpha);
    //f_color = vec4(0,0,0, alpha);
}
