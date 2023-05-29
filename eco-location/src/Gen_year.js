import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import GenApiCall from './GenApiCall';

export default function Gen_year (data) {
    const year_data={data}
    console.log('Gen_year가 받은 data:',data);
    

    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{ width: '100%', height: '500px', margin: '0 auto' }}>
            <ResponsiveBar
                //chart에 사용될 데이터
                data={year_data}
                
                // chart에 보여질 데이터 key (측정되는 값)
                keys={['generateSolarAmountAverage', 'generateWindAmountAverage']}
                
                // keys들을 그룹화하는 index key (분류하는 값)
                indexBy="location"
                
                //chart margin
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                
                //chart padding (bar간 간격)
                padding={0.3}
                
                // chart 색상
                //colors={['olive', 'brown', 'orange']} // 커스텀하여 사용할 때
                colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                
                // color 적용 방식
                colorBy="id" // 색상을 keys 요소들에 각각 적용
                // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용

                theme={{
                    
                    // label style (bar에 표현되는 글씨)
                    labels: {
                        text: {
                            fontSize: 14,
                            fill: '#000000',
                        },
                    },
                    
                    // legend style (default로 우측 하단에 있는 색상별 key 표시)
                    legends: {
                        text: {
                            fontSize: 12,
                            fill: '#000000',
                        },
                    },

                    axis: {
                        
                        // axis legend style (bottom, left에 있는 글씨)
                        legend: {
                            text: {
                                fontSize: 20,
                                fill: '#000000',
                            },
                        },
                        
                        // axis ticks style (bottom, left에 있는 값)
                        ticks: {
                            text: {
                                fontSize: 16,
                                fill: '#000000',
                            },
                        },
                    },
                }}
                
                // axis bottom 설정
                axisBottom={{
                    tickSize: 0, // 값 설명하기 위해 튀어나오는 점 크기
                    tickPadding: 5, // tick padding
                    tickRotation: 0, // tick 기울기
                    legend: '강원', // bottom 글씨
                    legendPosition: 'middle', // 글씨 위치
                    legendOffset: 40, // 글씨와 chart간 간격
                }}
                
                // axis left 설정
                axisLeft={{
                    tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
                    tickPadding: 5, // tick padding
                    tickRotation: 0, // tick 기울기
                    legend: '재생에너지 발전량', // left 글씨
                    legendPosition: 'middle', // 글씨 위치
                    legendOffset: -60, // 글씨와 chart간 간격
                }}
                
                // label 안보이게 할 기준 width
                labelSkipWidth={36}
                
                // label 안보이게 할 기준 height
                labelSkipHeight={12}
                
                
                // legend 설정 (default로 우측 하단에 있는 색상별 key 표시)
                legends={[
                    {
                        dataFrom: 'keys', // 보일 데이터 형태
                        anchor: 'bottom-right', // 위치
                        direction: 'column', // item 그려지는 방향
                        justify: false, // 글씨, 색상간 간격 justify 적용 여부
                        translateX: 120, // chart와 X 간격
                        translateY: 0, // chart와 Y 간격
                        itemsSpacing: 2, // item간 간격
                        itemWidth: 100, // item width
                        itemHeight: 20, // item height
                        itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                        itemOpacity: 0.85, // item opacity
                        symbolSize: 20, // symbol (색상 표기) 크기
                        effects: [
                            {
                                // 추가 효과 설정 (hover하면 item opacity 1로 변경)
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};


// data={[
// {year: 2016, generateSolarAmountAverage: 183.4666,          generateWindAmountAverage: 183.4666},
// {year: 2017, generateSolarAmountAverage: 312.763675,        generateWindAmountAverage: 312.763675},
// {year: 2018, generateSolarAmountAverage: 407.8721515833334, generateWindAmountAverage: 407.8721515833334},
// {year: 2019, generateSolarAmountAverage: 681.6248042499998, generateWindAmountAverage: 681.6248042499998},
// {year: 2020, generateSolarAmountAverage: 980.9091911666665, generateWindAmountAverage: 980.9091911666665},
// {year: 2021, generateSolarAmountAverage: 1288.6535794166668,generateWindAmountAverage: 1288.6535794166668},
// {year: 2022, generateSolarAmountAverage: 1506.7544335,      generateWindAmountAverage: 1506.7544335},
// {year: 2023, generateSolarAmountAverage: 1608.0724500000001,generateWindAmountAverage: 1608.0724500000001},
// {year: 2012, generateSolarAmountAverage: 22.633325,         generateWindAmountAverage: 22.633325},
// {year: 2013, generateSolarAmountAverage: 47.153555,         generateWindAmountAverage: 47.153555},
// {year: 2014, generateSolarAmountAverage: 69.984485,         generateWindAmountAverage: 69.984485},
// {year: 2015, generateSolarAmountAverage: 125.355281,        generateWindAmountAverage: 125.355281},
// ]}

// export default Gen_year

// const Gen_year = () => {
    //     const handle = {
        //       barClick: (data=data) => {
            //             console.log(data);
            //         },
            //     };
            //     const data=[];
            
            //     for(var i=0;i<1;i++){};


//     return (
//         // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
//         <div style={{ width: '100%', height: '500px', margin: '0 auto' }}>
//             <ResponsiveBar
//                 //chart에 사용될 데이터
//                 data={[
                    
//                     { location: '2012', 풍력: 3200, 태양광: 3000, 바이오: 310 },
//                     { location: '2013', 풍력: 3200, 태양광: 3000, 바이오: 310 },
//                     { location: '2014', 풍력: 3200, 태양광: 3000, 바이오: 310 },
//                     { location: '2015', 풍력: 3200, 태양광: 300, 바이오: 3100 },
//                     { location: '2016', 풍력: 3200, 태양광: 3000, 바이오: 310 },
//                     { location: '2017', 풍력: 3200, 태양광: 3000, 바이오: 310 },
//                     { location: '2018', 풍력: 3200, 태양광: 2000, 바이오: 2010 },
//                     { location: '2019', 풍력: 900, 태양광: 1000, 바이오: 3100 },
//                     { location: '2020', 풍력: 3200, 태양광: 3000, 바이오: 310 },
//                     { location: '2021', 풍력: 3200, 태양광: 3000, 바이오: 310 },
//                     { location: '2022', 풍력: 3200, 태양광: 3000, 바이오: 310 },
//                     { location: '2023', 풍력: 3200, 태양광: 3000, 바이오: 310 },
//                 ]}
                
//                 // chart에 보여질 데이터 key (측정되는 값)
//                 keys={['태양광', '풍력']}
                
//                 // keys들을 그룹화하는 index key (분류하는 값)
//                 indexBy="location"
                
//                 //chart margin
//                 margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                
//                 //chart padding (bar간 간격)
//                 padding={0.3}
                
//                 // chart 색상
//                 //colors={['olive', 'brown', 'orange']} // 커스텀하여 사용할 때
//                 colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                
//                 // color 적용 방식
//                 colorBy="id" // 색상을 keys 요소들에 각각 적용
//                 // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용

//                 theme={{
                    
//                     // label style (bar에 표현되는 글씨)
//                     labels: {
//                         text: {
//                             fontSize: 14,
//                             fill: '#000000',
//                         },
//                     },
                    
//                     // legend style (default로 우측 하단에 있는 색상별 key 표시)
//                     legends: {
//                         text: {
//                             fontSize: 12,
//                             fill: '#000000',
//                         },
//                     },

//                     axis: {
                        
//                         // axis legend style (bottom, left에 있는 글씨)
//                         legend: {
//                             text: {
//                                 fontSize: 20,
//                                 fill: '#000000',
//                             },
//                         },
                        
//                         // axis ticks style (bottom, left에 있는 값)
//                         ticks: {
//                             text: {
//                                 fontSize: 16,
//                                 fill: '#000000',
//                             },
//                         },
//                     },
//                 }}
                
//                 // axis bottom 설정
//                 axisBottom={{
//                     tickSize: 0, // 값 설명하기 위해 튀어나오는 점 크기
//                     tickPadding: 5, // tick padding
//                     tickRotation: 0, // tick 기울기
//                     legend: '강원', // bottom 글씨
//                     legendPosition: 'middle', // 글씨 위치
//                     legendOffset: 40, // 글씨와 chart간 간격
//                 }}
                
//                 // axis left 설정
//                 axisLeft={{
//                     tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
//                     tickPadding: 5, // tick padding
//                     tickRotation: 0, // tick 기울기
//                     legend: '재생에너지 발전량', // left 글씨
//                     legendPosition: 'middle', // 글씨 위치
//                     legendOffset: -60, // 글씨와 chart간 간격
//                 }}
                
//                 // label 안보이게 할 기준 width
//                 labelSkipWidth={36}
                
//                 // label 안보이게 할 기준 height
//                 labelSkipHeight={12}
                
//                 // bar 클릭 이벤트
//                 onClick={handle.barClick}
                
//                 // legend 설정 (default로 우측 하단에 있는 색상별 key 표시)
//                 legends={[
//                     {
//                         dataFrom: 'keys', // 보일 데이터 형태
//                         anchor: 'bottom-right', // 위치
//                         direction: 'column', // item 그려지는 방향
//                         justify: false, // 글씨, 색상간 간격 justify 적용 여부
//                         translateX: 120, // chart와 X 간격
//                         translateY: 0, // chart와 Y 간격
//                         itemsSpacing: 2, // item간 간격
//                         itemWidth: 100, // item width
//                         itemHeight: 20, // item height
//                         itemDirection: 'left-to-right', // item 내부에 그려지는 방향
//                         itemOpacity: 0.85, // item opacity
//                         symbolSize: 20, // symbol (색상 표기) 크기
//                         effects: [
//                             {
//                                 // 추가 효과 설정 (hover하면 item opacity 1로 변경)
//                                 on: 'hover',
//                                 style: {
//                                     itemOpacity: 1,
//                                 },
//                             },
//                         ],
//                         onClick: handle.legendClick, // legend 클릭 이벤트
//                     },
//                 ]}
//             />
//         </div>
//     );
// };
