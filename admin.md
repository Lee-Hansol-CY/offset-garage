```json
{
  "title": "OFFSET GARAGE - ADMIN GUIDE",
  "purpose": "이 문서는 OFFSET GARAGE 웹사이트에 새로운 아트워크 페이지를 추가하고 관리하기 위한 가이드입니다. AI와 인간 관리자 모두가 이 문서를 읽고 새로운 아트워크를 웹페이지에 연결 및 배포할 수 있도록 상세히 설명합니다.",
  "artworkAdditionWorkflow": [
    "**새 아트워크 HTML 파일 생성:** `artwork-[고유ID].html` 형식으로 새로운 아트워크 상세 페이지를 생성합니다.",
    "**썸네일 이미지 파일 추가:** 아트워크 썸네일 이미지를 `assets/images/` 폴더에 추가합니다.",
    "**메인 페이지 (`index.html`) 업데이트:** 새 아트워크의 썸네일 박스를 `<main id=\"art-grid\">` 안에 추가하고, 디자인 양식과 비율 템플릿을 선택하여 `data-link` 속성에 아트워크 HTML 파일 경로를 연결합니다.",
    "**배포 (선택 사항):** 변경된 파일을 웹 서버에 배포합니다."
  ],
  "detailedGuide": {
    "step1_createArtworkPage": {
      "heading": "단계 2.1: 새로운 아트워크 상세 페이지 생성",
      "description": "프로젝트 루트 폴더에 `artwork-[고유ID].html` (예: `artwork-20240720-001.html`) 형식으로 새로운 HTML 파일을 생성합니다. `[고유ID]`는 날짜와 순번 등을 조합하여 중복되지 않도록 합니다. 이 HTML 파일은 아트워크의 상세 내용을 담는 페이지가 될 것입니다.",
      "exampleHtmlSnippet": [
        "```html",
        "<!DOCTYPE html>",
        "<html lang=\"ko\">",
        "<head>",
        "    <meta charset=\"UTF-8\">",
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
        "    <title>OFFSET GARAGE - [아트워크 제목]</title>",
        "    <link rel=\"stylesheet\" href=\"css/style.css\">",
        "    <!-- 필요한 경우 아트워크 전용 CSS/JS 추가 -->",
        "</head>",
        "<body>",
        "    <!-- 헤더 및 푸터는 메인 페이지와 동일하게 포함 가능 -->",
        "    <header class=\"site-header\">...</header>",
        "    <main>",
        "        <h1>[아트워크 제목]</h1>",
        "        <p>이곳은 아트워크에 대한 상세 설명이 들어갈 공간입니다.</p>",
        "        <img src=\"assets/images/[아트워크_이미지_파일명].png\" alt=\"[아트워크 제목]\">",
        "        <!-- 추가적인 이미지, 비디오, 텍스트 등 -->",
        "    </main>",
        "    <footer class=\"site-footer-bottom\">...</footer>",
        "    <script src=\"js/theme.js\"></script>",
        "    <script src=\"js/main.js\"></script>",
        "    <!-- 필요한 경우 아트워크 전용 JS 추가 -->",
        "</body>",
        "</html>",
        "```"
      ]
    },
    "step2_addThumbnailImage": {
      "heading": "단계 2.2: 썸네일 이미지 파일 추가",
      "description": "아트워크를 대표할 썸네일 이미지 파일 (JPG, PNG, GIF 등)을 `assets/images/` 폴더에 업로드합니다. 파일명을 기억해둡니다. (예: `my-new-artwork-thumb.png`)"
    },
    "step3_updateIndexHtml": {
      "heading": "단계 2.3: 메인 페이지 (`index.html`) 업데이트",
      "description": "`index.html` 파일의 `<main id=\"art-grid\">` 섹션 안에 새로운 `div` 요소를 추가하여 아트워크 썸네일 박스를 정의합니다.",
      "thumbnailTemplateGuide": {
        "description": "아래 4가지 디자인 양식 중 하나를 선택하고, 해당 양식에 맞는 HTML 구조를 사용합니다.",
        "templates": [
          {
            "name": "텍스트만 작성되어있는 박스",
            "class": "text-only",
            "notes": "텍스트만으로 구성된 가장 기본적인 형태. 내부 `<p>` 태그에 `fs-36`, `fs-18`, `fs-14`, `fs-12` 중 적절한 글꼴 크기 클래스를 적용합니다.",
            "htmlSnippet": [
              "```html",
              "<div class=\"thumbnail-box draggable [가로세로비율클래스]\" data-link=\"artwork-[고유ID].html\">",
              "    <div class=\"content text-only initial-padding\">",
              "        <p class=\"fs-18\">여기에 아트워크 제목이나 짧은 설명을 입력합니다.</p>",
              "    </div>",
              "</div>",
              "```"
            ]
          },
          {
            "name": "이미지만 포함되어있는 박스",
            "class": "image-only",
            "notes": "이미지로만 구성되며, 박스 테두리가 없습니다. `img` 태그의 `src`에 이미지 경로를, `alt`에 설명을 입력합니다.",
            "htmlSnippet": [
              "```html",
              "<div class=\"thumbnail-box draggable [가로세로비율클래스] image-only\" data-link=\"artwork-[고유ID].html\">",
              "    <img src=\"assets/images/[썸네일_이미지_파일명]\" alt=\"아트워크 이미지\">",
              "</div>",
              "```"
            ]
          },
          {
            "name": "말풍선 형태이며, 텍스트만 작성되어있는 박스",
            "class": "speech-bubble",
            "notes": "말풍선 모양의 박스이며 텍스트만 포함합니다. 꼬리 위치는 JS에 의해 랜덤하게 (좌측 또는 우측 끝에서 30px 간격) 결정됩니다.",
            "htmlSnippet": [
              "```html",
              "<div class=\"thumbnail-box draggable [가로세로비율클래스] speech-bubble\" data-link=\"artwork-[고유ID].html\">",
              "    <div class=\"content text-only initial-padding\">",
              "        <p class=\"fs-18\">여기에 말풍선 내용처럼 짧은 문구를 입력합니다.</p>",
              "    </div>",
              "</div>",
              "```"
            ]
          },
          {
            "name": "텍스트/이미지와 체크버튼(각 항목별 체크리스트)가 합쳐진 박스",
            "class": "checklist-box-type",
            "notes": "가로로 긴 박스에만 적용 가능합니다. 좌측에 텍스트, 우측에 체크리스트가 위치하며 가운데 구분선이 있습니다. `id=\"cl-[고유ID]-itemX\"`는 해당 체크박스에 대한 고유한 ID여야 합니다. `[checked]` 속성은 선택적으로 추가하여 기본적으로 체크된 상태로 만들 수 있습니다.",
            "htmlSnippet": [
              "```html",
              "<div class=\"thumbnail-box draggable [가로세로비율클래스] checklist-box-type\" data-link=\"artwork-[고유ID].html\">",
              "    <div class=\"content checklist-layout\">",
              "        <div class=\"checklist-text-area\">",
              "            <p class=\"fs-18\">체크리스트 관련 제목이나 설명</p>",
              "            <p class=\"fs-14\">추가 설명</p>",
              "        </div>",
              "        <div class=\"separator\"></div>",
              "        <div class=\"checklist-items-area\">",
              "            <ul>",
              "                <li>",
              "                    <input type=\"checkbox\" id=\"cl-[고유ID]-item1\" [checked]>",
              "                    <label for=\"cl-[고유ID]-item1\" class=\"custom-checkbox fs-18\">체크리스트 항목 1</label>",
              "                </li>",
              "                <li>",
              "                    <input type=\"checkbox\" id=\"cl-[고유ID]-item2\">",
              "                    <label for=\"cl-[고유ID]-item2\" class=\"custom-checkbox fs-18\">체크리스트 항목 2</label>",
              "                </li>",
              "                <!-- 필요한 만큼 li 추가 -->",
              "            </ul>",
              "        </div>",
              "    </div>",
              "</div>",
              "```"
            ]
          }
        ]
      },
      "aspectRatioGuide": {
        "heading": "가로세로 비율 템플릿 (필수 선택):",
        "description": "아래 클래스 중 하나를 `thumbnail-box` 요소에 반드시 추가해야 합니다. 이 비율들은 CSS에 정의되어 있습니다.",
        "ratios": [
          "`ratio-1-1` (1:1 정사각형)",
          "`ratio-16-9` (16:9 가로가 긴 직사각형)",
          "`ratio-4-3` (4:3 가로가 긴 직사각형)",
          "`ratio-3-4` (3:4 세로가 긴 직사각형)",
          "`ratio-9-16` (9:16 세로가 긴 직사각형)",
          "`ratio-2-1` (2:1 매우 가로가 긴 직사각형)",
          "`ratio-1-2` (1:2 매우 세로가 긴 직사각형)",
          "`ratio-1-3` (1:3 세로가 매우 긴 직사각형)"
        ]
      }
    },
    "step4_deployment": {
      "heading": "단계 2.4: 배포",
      "description": "로컬에서 변경 사항을 확인한 후, 웹 호스팅 서버에 업데이트된 `index.html`, `artwork-[고유ID].html`, `assets/images/` 내의 새로운 썸네일 이미지, 그리고 변경된 `css/style.css`, `js/thumbnailManager.js`, `js/main.js` 파일을 업로드합니다."
    }
  },
  "aiInstructionExample": "새 아트워크를 추가해줘. 제목은 'Digital Flow', 썸네일 이미지는 `assets/images/digital-flow.png`이고, 상세 페이지는 `artwork-digital-flow.html`로 연결해줘. 디자인 양식은 **이미지만 포함된 박스**로 하고, 비율은 **16:9**로 해줘."
}