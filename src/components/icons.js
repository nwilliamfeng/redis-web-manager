import React from 'react'
/**
 * 图标
 */
export const icons={

    CONNECTION_ICON : require('../assets/imgs/connection.png'),
    
    DB_ICON:require('../assets/imgs/db.png'),

    KEY_ICON:require('../assets/imgs/key.png'),

    FOLDER_ICON:require('../assets/imgs/folder.png'),

}


export const ConnectionIcon=({width=16,height=16,viewBox='0 0 1024 1024',fill='gray'})=>
   <svg   viewBox={viewBox} fill={fill}  width={width} height={height}><path d="M497.800533 540.458667l433.809067-210.722134v-47.982933L497.92 71.202133 65.348267 282.914133l-0.725334 47.1296 433.1776 210.414934zM0 369.800533L1.962667 242.688 497.800533 0l497.809067 241.681067v128.119466L497.800533 611.6096 0 369.800533z" p-id="1282"></path><path d="M99.797333 388.1728L1.962667 436.053333 0 563.182933l497.800533 241.800534 497.809067-241.800534V435.063467L890.436267 384l-71.611734 36.3776 112.785067 54.7584v47.982933L497.800533 733.832533 64.622933 523.4176l0.725334-47.1296L173.687467 423.253333z" p-id="1283"></path><path d="M99.797333 580.1728L1.962667 628.053333 0 755.182933l497.800533 241.800534 497.809067-241.800534V627.063467L890.436267 576l-71.611734 36.3776 112.785067 54.7584v47.982933l-433.809067 210.7136L64.622933 715.4176l0.725334-47.1296L173.687467 615.253333z" ></path></svg>

export  const DBIcon =({width=16,height=16,viewBox='0 0 1024 1024'})=>
  <svg   viewBox={viewBox} fill={'#d81e06'}  width={width} height={height}><path d="M578.587 758.356c-54.18 28.236-84.020 27.89-126.836 7.46-42.582-20.431-398.41-169.075-398.41-169.075v0 107.78c0 9.3 12.972 19.054 37.076 30.644 48.668 23.306 318.752 132.227 361.219 152.775 42.586 20.431 72.657 20.547 126.836-7.46 54.175-28.236 307.728-132.345 356.742-158.057v0c24.908-12.966 35.925-23.186 35.925-32.254v-106.401h-0.115c-0.115-0.114-338.495 146.234-392.438 174.587v0zM578.587 758.356z"></path><path d="M578.587 606.954c-54.18 28.236-84.020 27.89-126.836 7.46-42.582-20.547-398.41-169.303-398.41-169.303v0 107.787c0 9.292 12.972 19.054 37.076 30.644 48.668 23.414 318.752 132.345 361.219 152.889 42.586 20.431 72.657 20.547 126.836-7.46 54.175-28.236 307.728-132.345 356.742-158.057 24.908-12.97 35.925-23.184 35.925-32.253v-106.405h-0.115c-0.115-0.001-338.495 146.348-392.438 174.698v0zM578.587 606.954z"></path><path d="M971.251 290.388c0.46-9.3-11.936-17.565-36.386-26.519-47.749-17.559-299.923-117.884-348.246-135.556-48.439-17.68-68.066-16.875-124.769 3.328-56.703 20.203-325.297 125.689-373.047 144.396-24.103 9.414-35.81 18.255-35.121 27.663v-0.114 106.060c0 0 355.598 149.792 398.41 170.223 42.581 20.431 72.657 20.547 126.836-7.46 54.060-28.467 392.668-177.223 392.668-177.223l-0.343-104.797zM852.457 293.254l-139.463 54.979-125.682-49.698 139.229-55.099 125.917 49.818zM594.883 345.48l-64.393 94.24-148.304-61.525 212.698-32.715zM483.197 202.233l-20.547-37.995 64.169 25.025 60.377-19.858-16.415 39.138 61.634 23.186-79.542 8.151-17.909 43.046-28.69-47.87-91.829-8.15 68.755-24.674zM324.801 255.604c62.784 0 113.746 19.627 113.746 44.076 0 24.22-50.961 44.076-113.746 44.076-62.788 0-113.749-19.626-113.749-44.076 0.114-24.103 50.96-44.076 113.749-44.076v0zM324.801 255.604z"></path></svg>

export  const KeyIcon =({width=16,height=16,viewBox='0 0 1024 1024'})=>
   <svg  viewBox={viewBox}   width={width} height={height}><path d="M640 874.666667l-85.333333 85.333333h-85.333334l-85.333333-85.333333V448h256v170.666667l-42.666667 42.666666 42.666667 42.666667v42.666667l-42.666667 42.666666 42.666667 42.666667z" fill="#FFA000"></path><path d="M810.666667 166.4c-10.666667-38.4-42.666667-66.133333-78.933334-76.8C680.533333 78.933333 601.6 64 512 64s-168.533333 14.933333-219.733333 25.6C256 100.266667 224 128 213.333333 166.4c-10.666667 36.266667-21.333333 87.466667-21.333333 142.933333 0 55.466667 10.666667 106.666667 21.333333 142.933334 10.666667 38.4 40.533333 66.133333 78.933334 74.666666 51.2 12.8 130.133333 27.733333 219.733333 27.733334s168.533333-14.933333 219.733333-25.6c38.4-8.533333 68.266667-38.4 78.933334-74.666667s21.333333-87.466667 21.333333-142.933333c0-57.6-10.666667-108.8-21.333333-145.066667zM618.666667 277.333333H405.333333c-23.466667 0-42.666667-19.2-42.666666-42.666666V192c0-12.8 66.133333-21.333333 149.333333-21.333333s149.333333 8.533333 149.333333 21.333333v42.666667c0 23.466667-19.2 42.666667-42.666666 42.666666z" fill="#FFA000"></path><path d="M490.666667 554.666667h42.666666v405.333333h-42.666666z" fill="#D68600" ></path></svg>

