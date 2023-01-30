import { useEffect, useRef, useState } from 'react';
import axios from "axios";

function NaverMap() {
    const [areaCodes, setAreaCodes] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error,setError] = useState(null);

        useEffect(() => {
            axios.get('http://localhost:7777/api/v1/map/fetchList')
                .then(response => {
                    setAreaCodes(response.data.areaCode);
                });
        }, []);

    const mapElement = useRef(null);

    useEffect(() => {
        const { naver } = window;
        if (!mapElement.current || !naver) return;

        // 마커 위치

        const location = new naver.maps.LatLng(37.6002, 126.9345);

        const mapOptions: naver.maps.MapOptions = {
            center: location,
            zoom: 17,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };
        // map 생성
        const map = new naver.maps.Map(mapElement.current, mapOptions);

        console.log("areaCodes-->"+JSON.stringify(areaCodes));
        // marker 생성
        areaCodes.forEach((a) => {

            new naver.maps.Marker({
                position: new naver.maps.LatLng(a.coordinate.latitude, a.coordinate.longitude),
                map,
            })

        })
    }, []);

    // if (loading) return <div>로딩중..</div>
    // if (error) return <div>에러가 발생했습니다</div>
    // if (!codes) return <div>왜 널이여</div>;

    return (
        <div ref={mapElement} style={{ minHeight: '400px' }}></div>

    )
};


export default NaverMap;