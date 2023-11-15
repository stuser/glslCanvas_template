// Author: CMH
// Title: Learning Shaders


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//依照網頁canvas的data-textures參數宣告之檔案順序:
uniform sampler2D u_tex0; //對應到data/MonaLisa.jpg
uniform sampler2D u_tex1; //對應到data/hatch_0.jpg
uniform sampler2D u_tex2; //對應到data/hatch_1.jpg
uniform sampler2D u_tex3; //對應到data/hatch_2.jpg
uniform sampler2D u_tex4; //對應到data/hatch_3.jpg
uniform sampler2D u_tex5; //對應到data/hatch_4.jpg
uniform sampler2D u_tex6; //對應到data/hatch_5.jpg


void main()
{
    vec2 uv= gl_FragCoord.xy/u_resolution.xy;
    vec2 vUv=fract(6.0*uv);                   //key
    float shading= texture2D(u_tex0, uv).g;   //取MonaLisa"綠色(g)"版作為明亮值

    vec4 c;
	            //以下要將明亮值分成六個等級，依不同等級去貼材質
				
                float step = 1. / 6.;
                if( shading <= step ){   
                    c = mix( texture2D( u_tex6, vUv ), texture2D( u_tex5, vUv ), 6. * shading );  //明亮值:最暗的使用data/hatch_5.jpg的材質, 次一級的用data/hatch_4.jpg
                }
                if( shading > step && shading <= 2. * step ){
                    c = mix( texture2D( u_tex5, vUv ), texture2D( u_tex4, vUv) , 6. * ( shading - step ) );
                }
                if( shading > 2. * step && shading <= 3. * step ){
                    c = mix( texture2D( u_tex4, vUv ), texture2D( u_tex3, vUv ), 6. * ( shading - 2. * step ) );
                }
                if( shading > 3. * step && shading <= 4. * step ){
                    c = mix( texture2D( u_tex3, vUv ), texture2D( u_tex2, vUv ), 6. * ( shading - 3. * step ) );
                }
                if( shading > 4. * step && shading <= 5. * step ){
                    c = mix( texture2D( u_tex2, vUv ), texture2D( u_tex1, vUv ), 6. * ( shading - 4. * step ) );
                }
                if( shading > 5. * step ){
                    c = mix( texture2D( u_tex1, vUv ), vec4( 1. ), 6. * ( shading - 5. * step ) );
                }
                
     vec4 inkColor = vec4(0.0, 0.0, 1.0, 1.0);
     vec4 src = mix( mix( inkColor, vec4( 1. ), c.r ), c, .5 );
     gl_FragColor = src;

}

