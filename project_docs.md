```json
{
  "projectName": "OFFSET GARAGE",
  "projectOverview": "OFFSET GARAGE는 창의적인 아트워크를 아카이빙하고 전시하는 포트폴리오 웹사이트입니다. 사용자에게 독특하고 인터랙티브한 경험을 제공하기 위해 Broken Grid 레이아웃과 드래그 가능한 썸네일 박스를 구현했습니다. 클린 아키텍처와 모듈화 원칙을 엄격히 준수하여 효율적인 개발 및 유지보수를 지향합니다.",
  "coreFeatures": [
    {
      "name": "인터랙티브 메인 페이지",
      "description": "다양한 비율과 디자인(텍스트, 이미지, 말풍선, 체크리스트)의 아트워크 썸네일 박스를 제공합니다. 박스는 드래그를 통해 자유롭게 위치를 조정할 수 있으며, 다른 박스와 50px 이상 겹치지 않도록 밀려납니다. 밀려난 박스는 해당 위치에 고정되며, 페이지 로드 시에도 박스들이 서로 겹치지 않도록 랜덤 배치됩니다. 로고 클릭 시 메인 페이지로 이동하는 기능이 포함되어 있습니다."
    },
    {
      "name": "테마 변경 기능",
      "description": "라이트 모드, 다크 모드, 시스템 설정 모드를 지원하여 사용자의 시각적 선호도를 존중합니다. 테마 버튼과 드롭다운 메뉴는 텍스트 형태로만 표시됩니다."
    },
    {
      "name": "About 페이지 (오버레이)",
      "description": "제작자 정보를 표시하는 페이지로, 메인 페이지에 오버레이 형태로 나타납니다. 배경 블러 효과와 닫기 버튼을 포함합니다."
    },
    {
      "name": "Inkdrop (방명록) 페이지",
      "description": "메인 페이지와 유사한 디자인 톤으로 방명록 게시글을 표시합니다. 하단에 고정된 텍스트 입력창(최대 100자)이 있으며, 실시간 글자 수 카운트와 입력창 자동 높이 조절 기능을 제공합니다. IP 기반 1일 3회 작성 제한이 프론트엔드에서 시뮬레이션됩니다. 방명록 게시글 박스는 클릭 및 드래그가 불가능합니다."
    },
    {
      "name": "버전 표시기",
      "description": "웹사이트의 현재 버전 정보, 향후 로드맵, 업데이트 내역을 표시하는 UI입니다. 마우스 호버 시 썸네일 박스와 동일한 디자인의 정보 상자가 나타납니다."
    }
  ],
  "technicalStack": {
    "frontend": {
      "languages": ["HTML", "CSS", "JavaScript"],
      "libraries": [],
      "customModules": [
        "js/main.js (공통 초기화, About 페이지 로직, 페이지별 썸네일 초기화)",
        "js/draggable.js (박스 드래그, z-index 관리, 충돌 감지 및 밀어내기 로직)",
        "js/theme.js (라이트/다크/시스템 모드 전환 및 저장)",
        "js/thumbnailManager.js (썸네일 박스 초기 배치, 겹침 방지, 말풍선 꼬리 위치 설정)",
        "js/guestbook.js (Inkdrop 페이지 전용: 입력 처리, 글자 수, IP 제한 시뮬레이션)"
      ]
    },
    "backend_concept_for_inkdrop": {
      "technology": "Node.js + Express (또는 서버리스 함수)",
      "dataStorage": "JSON 파일 (guestbook-entries.json) 또는 경량 파일 기반 DB",
      "features": [
        "방명록 POST 요청 처리",
        "IP 기반 1일 작성 횟수 제한",
        "텍스트 유효성 검사",
        "방명록 데이터 저장 및 조회"
      ],
      "note": "백엔드는 현재 구상 단계이며, 실제 구현 시 CORS 설정, 보안 강화, 영구적인 데이터베이스 연동이 필요합니다."
    }
  },
  "projectStructure": {
    "root": "OFFSET-GARAGE/",
    "files": [
      "├── index.html              // 메인 페이지 (아트웍 그리드)",
      "├── inkdrop.html            // 방명록 페이지",
      "├── admin.md                // AI를 위한 콘텐츠 추가 가이드 (본 문서와 함께 제공)",
      "├── project_docs.md         // 프로젝트 전체 설명서 (현재 파일)",
      "│",
      "├───assets/",
      "│   ├───images/",
      "│   │   └── logo.svg        // 사이트 로고",
      "│   │   └── artwork-*.png   // 아트워크 이미지 파일",
      "│   └───fonts/",
      "│       └── Arial-Narrow-Bold.woff2 // 커스텀 폰트 파일 (예시)",
      "│",
      "├───css/",
      "│   └───style.css           // 사이트 전체 스타일시트",
      "│",
      "└───js/",
      "    ├───main.js             // 공통 초기화 및 About 페이지 로직",
      "    ├───draggable.js        // 박스 드래그 및 충돌 처리 핵심 로직",
      "    ├───theme.js            // 라이트/다크 모드 관리",
      "    ├───thumbnailManager.js // 썸네일 박스 초기 배치, 디자인 특성 관리",
      "    └───guestbook.js        // Inkdrop 페이지 전용 로직"
    ]
  },
  "uiUxGuidelinesAdherence": {
    "buttonHeights": ["32px", "48px"],
    "fontSizes": ["36px", "18px", "14px", "12px"],
    "lightModeColors": {
      "background": "#00FF00",
      "content": "#000000"
    },
    "darkModeColors": {
      "background": "#7F7F7F",
      "content": "#000000"
    },
    "thumbnailBoxStyle": {
      "backgroundColor": "#FFFFFF",
      "borderColor": "#000000",
      "borderWidth": "1.5px",
      "contentColor": "#000000"
    },
    "borderRadius": "0px (모든 요소에 곡률 없음)",
    "fontFamily": "Arial Narrow Bold (font-stretch 80%)",
    "boxWidthConstraint": "150px ~ 420px"
  },
  "developmentPrinciples": [
    "**클린 아키텍처:** HTML, CSS, JavaScript를 명확히 분리하고, 각 JavaScript 파일은 특정 기능(모듈)을 담당하도록 설계되었습니다.",
    "**모듈화 및 재활용:** 각 컴포넌트와 기능은 독립적인 모듈로 개발되어, 쉬운 교체, 수정, 재활용을 통해 유지보수성을 극대화합니다.",
    "**README.md (project_docs.md):** 프로젝트의 모든 코드와 기능에 대한 상세한 설명을 제공하여 개발 및 협업을 용이하게 합니다."
  ],
  "installationAndExecution": {
    "frontend": "1. 프로젝트를 로컬에 클론하거나 다운로드합니다.\n2. 웹 서버(예: VS Code Live Server 확장, Python의 `http.server`, Apache, Nginx 등)를 사용하여 `index.html` 파일을 엽니다.",
    "backend_inkdrop_api": "1. `OFFSET-GARAGE` 프로젝트와 같은 레벨에 `OFFSET-GARAGE-BACKEND` 폴더를 생성합니다.\n2. `server.js`와 `guestbook-entries.json` 파일을 생성합니다 (백엔드 구상 섹션 참조).\n3. `OFFSET-GARAGE-BACKEND` 폴더에서 `npm init -y` 명령 후 `npm install express body-parser`를 실행합니다.\n4. `node server.js` 명령어로 서버를 실행합니다.\n5. `js/guestbook.js` 파일 내의 `fetch` 호출 주석을 해제하고, 실제 백엔드 API 엔드포인트(예: `http://localhost:3000/api/inkdrop-post`)로 변경하여 연동합니다."
  },
  "roadmap": [
    "Inkdrop 방명록 기능 백엔드 연동 (현재 프론트엔드 시뮬레이션)",
    "아트워크 콘텐츠 동적 관리 시스템 구현 (ADMIN.md 기반)",
    "전반적인 웹사이트 접근성(Accessibility) 강화",
    "추가 썸네일 박스 템플릿 및 인터랙션 개발"
  ],
  "license": "(C) 2025. OFFSET GARAGE. LEE HANSOL ALL RIGHTS RESERVED.",
  "contact": "LEE HANSOL"
}