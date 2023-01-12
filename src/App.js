import './App.css';
import './components/Tab/Tab.css';
import TabContent from "./components/Tab/TabContent";
import Input from "./components/Input/InputText";
import Tabs from "./components/Tab/Tabs";
import React, { useState } from "react"
import { useEffect, useRef } from 'react';


/**
 * Root Component (EntryPoint)
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  // const mapElement = useRef(null);
  //
  //
  // useEffect(() => {
  //   const { naver } = window;
  //   if (!mapElement.current || !naver) return;
  //
  //   // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
  //   const location = new naver.maps.LatLng(37.5656, 126.9769);
  //   const mapOptions: naver.maps.MapOptions = {
  //     center: location,
  //     zoom: 17,
  //     zoomControl: true,
  //     zoomControlOptions: {
  //       position: naver.maps.Position.TOP_RIGHT,
  //     },
  //   };
  //   const map = new naver.maps.Map(mapElement.current, mapOptions);
  //   new naver.maps.Marker({
  //     position: location,
  //     map,
  //   });
  // }, []);
  //
  //
  // return <div ref={mapElement} style={{ minHeight: '400px' }} />;


  return (
    <div className="App">
      <div className={"container"}>
        <Tabs tabs={[
          {
            name: "ID 로그인",
            content: () => (
              <TabContent>
                <Input label={"아이디"} />
                <Input label={"비밀번호"} />
                <input type={"checkbox"}/> 로그인 상태 유지
                <div className={`toggle-container ${isOn ? "toggle--checked" : ""}`} />
                <button>로그인</button>
              </TabContent>
            )
          },
          {
            name: "일회용 번호",
            content: () => (
              <TabContent>
                <div>네이버앱의 메뉴 등등......</div>
                <input />
                <button>로그인</button>
              </TabContent>
            )
          },
          {
            name: "QR 코드",
            content: () => (
              <TabContent>
                <img />
                <div />
                <div />
              </TabContent>
            )
          }
        ]} />
      </div>
    </div>
  );
}

export default App;
