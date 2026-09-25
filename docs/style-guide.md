# 포트폴리오 스타일 가이드

기준일: 2026-09-25 · 대상: `codex/ta-portfolio-migration`의 TA 기반 사이트.

현재 구현을 설명하고 기존 포폴을 이식할 때 사용할 기준을 정리한다. **현재 구현**과 **새 페이지 작성 기준**을 구분한다. 이 문서를 추가하면서 공개 화면의 스타일을 변경하지는 않았다.

## 1. 어디서 무엇을 확인하는가

| 자료 | 역할 |
|---|---|
| 이 문서 | 색상·타이포·레이아웃·인터랙션의 사용 규칙 |
| [Component Library](../component-library.html) | 실제 공통 CSS를 사용하는 시각적 예시와 동작 확인 |
| [프로젝트 작성 가이드](project-template.md) | 콘텐츠 구성, 복사·수정·검증 순서 |
| [상세 HTML 템플릿](../projects/_template.html) | 새 프로젝트의 실행 가능한 출발점. 공개 대상 아님 |
| [공통 CSS](../css/style.css), [이미지 뷰어 CSS](../css/image-viewer.css) | 브라우저에 적용되는 값의 원본 |
| [콘텐츠 맵](../map.md) | 프로젝트별 메시지·근거·관련 수정 위치 |
| [이식 목록](portfolio-migration.md) | 기존 6개 작업의 원본과 이식 상태 |

스타일을 변경하면 CSS/해당 HTML, 이 문서, 컴포넌트 예시를 같은 변경에서 갱신한다. 문서와 화면이 다르면 해당 선택자의 최종 CSS 및 HTML 클래스를 먼저 확인한다. `docs/plans/2026-02-15-*`는 초기 기획 기록이며 현재 사양으로 사용하지 않는다.

빠르게 적용하려면 [패턴 선택표](../component-library.html#choosing-patterns) → 해당 섹션의 실제 예시 → 「HTML 코드」 순서로 확인한다. 코드는 펼쳐서 복사할 수 있다. 카드 코드는 `index.html`, 미디어 코드는 `projects/{slug}.html` 기준이므로 각 코드의 경로 안내를 따른다. `[REPLACE]`, 번역, 경로, 이미지 크기는 실제 프로젝트에 맞춰 수정한다.

## 2. 화면 방향과 콘텐츠 계층

- 흰 배경, 넓은 여백, 작업 이미지와 읽기 쉬운 설명을 중심으로 구성한다.
- 홈은 직무·강점 소개 → 주요 프로젝트 → 제작 도구와 기술 실험 → 소개·경력·기술 → 푸터 순서다.
- 주요 프로젝트의 현재 순서는 NPR → Character System → UE5 Profiling → Shotloom이다.
- 상세는 대표 미디어와 제목을 먼저 보여주고, 역할·문제·판단·구현·결과를 설명한다. 섹션 이름과 개수는 프로젝트 내용에 맞춘다.
- 숫자와 비교 이미지는 측정 조건·제작 시점·본인 담당 범위를 함께 설명한다. 기술명을 나열하는 것만으로 기여를 대신하지 않는다.
- AI 보정 썸네일, 개념도, 실제 개발 캡처를 캡션으로 구분한다. Shotloom 카드의 보정 표시와 직접 진입 경로는 유지한다.

### 내용에 따라 패턴 선택하기

| 전달할 내용 | 기본 패턴 | 선택 기준과 피할 사용 |
|---|---|---|
| 문제·접근·판단 | [일반 본문](../component-library.html#panels) | 문단 하나에 핵심 판단 하나. 긴 서술을 여러 패널에 쪼개지 않는다. |
| 작업 환경·제약·담당 범위 | [정보 패널](../component-library.html#panels) | 본문과 분리해도 이해되는 짧은 요약. 페이지 전체를 패널로 감싸지 않는다. |
| 시각 품질·변환 차이 | [이미지·비교](../component-library.html#media) | 같은 구도·입력·설정인지 밝힌다. 비교 조건이 다르면 차이를 성능 개선으로 단정하지 않는다. |
| 시간·메모리·처리량 비교 | [수치 표](../component-library.html#tables) | 환경·단위·측정 범위가 있는 결과만. 수치가 없으면 관찰한 결과를 문장으로 설명한다. |
| 조작·시간에 따른 변화 | [설명 영상](../component-library.html#media) | 핵심 동작과 볼 시점을 설명한다. 정지 화면으로 충분한 설명에 긴 영상을 강요하지 않는다. |
| 여러 작업 중 선택 | [홈 카드](../component-library.html#cards) | 작업을 식별하는 이미지와 한 문장 소개. 작은 UI 텍스트는 상세 이미지에서 보여준다. |

같은 자료도 목적에 따라 배치가 달라진다. 도구의 **완성 화면**은 대표 이미지, **사용 순서**는 조작 영상, **구현 선택의 이유**는 문단, **검증 환경**은 짧은 패널, **측정한 전후 차이**는 표에 둔다. 모든 프로젝트에 이 다섯 가지를 억지로 채우지는 않는다.

## 3. 색상

색상은 `css/style.css`의 RGB 채널 변수와 각 HTML의 Tailwind 설정으로 연결된다. 예: `text-muted` → `rgb(var(--c-muted))`. 일반 UI에는 의미에 맞는 클래스를 사용한다.

| 변수 / Tailwind 이름 | 기본 라이트 | 보조 다크 | 용도 |
|---|---|---|---|
| `--c-bg` / `bg` | `#FFFFFF` | `#16161A` | 페이지 바탕 |
| `--c-surface` / `surface` | `#F5F5F7` | `#202026` | 정보 패널 |
| `--c-border` / `border` | `#E1E1E6` | `#32323A` | 구분선 |
| `--c-muted` / `muted` | `#6E6E73` | `#96969B` | 본문 설명·메타정보 |
| `--c-body` / `body` | `#28282D` | `#D2D2D7` | 기본 글자·소개 |
| `--c-heading` / `heading` | `#55555A` | `#AFAFB4` | 선택한 제목·표 레이블·호버 |
| `--c-accent` / `accent` | `#505FE6` | `#6478F0` | 본문 링크·성과 표시 |

`heading`은 라이트 모드에서 `body`보다 밝다. 이름만 보고 가장 진한 색이라고 가정하지 않는다. 대비 적합성은 배경·투명도·글자 크기의 조합으로 별도 검증하며, 토큰 이름 자체가 접근성 보증은 아니다.

**현재 구현:** 페이지 진입 시 라이트 모드다. 다크 변수와 `js/theme.js`는 남아 있지만 공개 홈·상세 푸터에는 테마 전환 버튼이 없다. 컴포넌트 문서의 다크 버튼은 내부 점검용이다. 사용자 선택을 저장하거나 시스템 테마에 따라 자동 전환하지 않는다.

예외 색상은 코드 블록(`#1A1A2E` / `#B8D4A8`), 썸네일 위 흰 글자·검은 그라데이션, 이미지 확대 뷰어의 어두운 바탕이다.

컴포넌트 문서의 기본 팔레트는 현재 미리보기 테마를 따른다. 색상칩은 `--c-*`를 사용하고 HEX 표시는 같은 변수에서 읽는다. 접힌 다크 팔레트는 별도의 `data-theme="dark"` 범위로 표시한다. 위 Markdown 표는 기준일의 수동 기록이므로 CSS 색상을 바꾸면 함께 갱신해야 한다.

## 4. 타이포그래피와 언어

- 기본 본문·한국어: **Noto Sans KR**, 실패 시 시스템 sans-serif.
- 영어의 주요 제목·카드·경력 직무·내비 링크: **Noto Rashi Hebrew**, 실패 시 serif.
- `js/i18n.js`는 한국어 모드에서 `.hero-tagline`, `.page-title`, `.card-title`, `.about-role`, `.nav-links a`를 Noto Sans KR로 바꾼다.
- 글자 크기는 현재 공통 클래스와 Tailwind 클래스에 정의되어 있다. `--t-*` CSS 변수는 구현되어 있지 않다.

아래 px 값은 루트 글자 크기 16px 기준이다.

[Typography 예시](../component-library.html#typography)의 언어 버튼으로 한·영을 전환하면, 예시 아래의 글꼴·크기·굵기·줄높이가 계산된 CSS 값으로 갱신된다. 글꼴명은 지정된 첫 번째 글꼴이며 실제 다운로드 성공이나 글리프별 대체 글꼴 사용을 보증하지 않는다. 본문은 15px, 패널 안 본문은 14px, 오버레이 카드 제목은 17.6px인 문맥 차이도 함께 확인한다.

| 역할 / 클래스 | 크기 | 굵기·행간 / 비고 |
|---|---|---|
| 홈 직무 `.hero-tagline` | 32px | 기본 400, 행간 1.4 |
| 홈 설명 `.hero-summary` | `clamp(16.8px, 2.1vw, 21.6px)` | 행간 1.75, 최대 폭 800px |
| 상세 제목 `.page-title` | 32px | 700, 행간 1.5 |
| 상세 부제 `.page-subtitle` | 15px | 설명 문장 |
| 일반 섹션 `text-xl font-bold` | 20px | 700 |
| 기본 카드 제목 `.card-title` | 16.8px | 500 |
| **홈 이미지 위 카드 제목** | **17.6px** | **600**, 흰색; 상위 `.card-overlay-text`가 재정의 |
| 기본 카드 부제 `.card-subtitle` | 13px | 홈 오버레이 안에서는 **14px** |
| 본문 `text-sm leading-relaxed` | 15px | 행간 1.625; Tailwind 기본 `text-sm`을 확장함 |
| 패널 본문 `.bg-surface p/div` | 14px | 행간 1.7 |
| 경력 직무 / 세부 `.about-role` / `.about-detail` | 15px / 13px | 직무 500, 세부 400 |
| 레이블·캡션 `text-xs` | 12px | 보조 정보용 |
| `.section-label`, `.skill-label` | 12px | 섹션 레이블 자간 0.1em |
| 로고 `.nav-logo` / 내비 링크 | 20px / 14px | 로고 700 |
| 태그·툴팁 | 11px | 본문 대체 용도로 사용하지 않음 |

현재 `p, h1, h2, h3, td, th, summary, blockquote`에는 `text-wrap: balance`, `word-break: keep-all`이 적용된다. 홈 설명은 긴 문자열이 넘치지 않도록 `overflow-wrap: anywhere`도 사용한다.

### 언어 작성 규칙

```html
<p class="text-muted text-sm leading-relaxed" data-ko="문제와 해결 과정을 한국어로 설명합니다.">Describe the problem and the solution in English.</p>
```

영문을 본문에, 한국어를 `data-ko`에 넣는다. 초기 표시 언어는 항상 한국어이며 페이지 이동·새로고침 후 선택 언어는 유지되지 않는다. `data-en`은 스크립트가 원래 HTML을 저장할 때 생성한다. 이력서 HTML은 한국어 전용 별도 레이아웃이다.

스크립트는 번역 대상 요소의 `innerHTML`을 교체한다. 이미지 링크·버튼·폼·복잡한 섹션 전체에 `data-ko`를 붙이지 말고 **교체할 텍스트 요소에만** 붙인다. 특히 이미지 뷰어 링크를 번역 컨테이너 안에 넣으면 이벤트 연결을 잃을 수 있다. `alt`, `aria-label`, 문서 제목과 메타 설명은 자동 번역되지 않는다.

## 5. 레이아웃·간격·반응형

| 대상 | 현재 기준 |
|---|---|
| 홈·상단 내비·홈 푸터 | `max-w-[1400px] mx-auto px-6` |
| 상세 본문 | `max-w-4xl mx-auto px-6` — 외곽 최대 896px |
| 비교 이미지 / 좁은 미디어 | 문맥에 따라 `max-w-3xl` 768px, `max-w-xl` 576px, `max-w-lg` 512px |
| 공통 좌우 여백 | `px-6` — 24px |
| 홈 카드 | `grid-cols-1 md:grid-cols-2 gap-6` — 24px 간격 |
| `md` 경계 | 768px; 카드 2열, 데스크톱 내비 표시 |
| 내비 높이 | `h-16` — 64px, 상단 고정 |
| 홈 소개 | `pt-32 pb-12` — 위 128px, 아래 48px |
| 홈 프로젝트 | HTML은 `py-16`; CSS `#projects`가 위쪽을 48px로 재정의, 아래 64px |
| 홈 About | `py-24` — 96px |
| 상세 시작·끝 | `pt-16 pb-24` — 64px / 96px |
| 상세 섹션 사이 | 보통 `mb-16` — 64px |
| 제목→본문 / 문단 사이 | `mb-4` 16px / `mb-6` 24px 중심 |
| 이미지 그룹 사이 | 보통 `mb-8` 32px 또는 `mb-10` 40px |

**새 페이지 작성 기준:** 모바일 1열을 기본으로 하고 비교가 필요한 그룹만 768px 이상에서 2열로 만든다. 표는 `.overflow-x-auto`로 감싸 표 영역에서만 스크롤되도록 한다. 긴 제목·영문·한국어·원본 비율 이미지를 390px에서 확인한다. 섹션 링크가 있으면 `scroll-mt-24`를 사용한다.

모서리는 홈 작업 카드와 큰 작업 이미지가 직각, 패널·코드 블록이 `rounded-lg`(8px), 성과 배지·툴팁이 4px다. 컴포넌트 문서의 12px 프레임은 예시를 담는 내부 문서 UI이며 사이트 카드 규칙이 아니다.

[Layout 도식](../component-library.html#layout)의 막대는 1400px을 100%로 환산한 상대 폭이다. 작은 브라우저에서도 1400/896/768px의 차이를 보여주기 위한 도식이며 실제 픽셀 크기나 현재 컨테이너 폭은 아니다. `max-w-4xl px-6`은 외곽 최대 896px, 내부 최대 848px다.

## 6. 컴포넌트 사용

### 홈 작업 카드

카드 전체를 상세 페이지로 연결한다. 썸네일은 16:9, `object-fit: cover`; 제목과 부제는 하단 검은 그라데이션 위에 항상 보인다. 제목을 hover 때만 노출하지 않는다. hover는 이미지 1.04배, 0.5초 전환이다.

```html
<a href="projects/project-slug.html" class="card-overlay group">
  <div class="card-overlay-inner">
    <img src="assets/images/project-slug/thumbnail.webp" alt="결과물을 식별할 수 있는 설명" class="card-overlay-img" loading="lazy" decoding="async">
    <div class="card-overlay-text">
      <h3 class="card-title" data-ko="프로젝트 제목">Project title</h3>
      <p class="card-subtitle" data-ko="역할과 핵심 내용을 한 문장으로">One line about the role and the work</p>
    </div>
  </div>
</a>
```

위 경로는 작성 예시다. 실제 파일로 바꾼 뒤 공개 목록에 넣는다. 화면 처음에 보이는 핵심 이미지는 무조건 lazy로 설정하지 않는다.

### 패널·표·코드

- 짧은 정보 묶음은 `bg-surface rounded-lg p-6`. `.bg-surface > h3`는 자동 구분선이 생긴다.
- 상세 설명은 일반 문단을 중심으로 구성하고, 모든 섹션을 패널로 둘러싸지 않는다.
- 표는 `.tbl`, 레이블 셀 `.lbl`, 값 `.val`, 우측 정렬 수치 `.val-r`, 검증된 변화량은 `.gain`을 사용한다.
- 단위, 측정 대상, 환경, 전후 조건이 있는 수치만 성과로 제시한다. 컴포넌트 예시의 수치는 가상이다.
- 코드는 `pre > code`로 감싼다. 넘치는 코드는 블록 내부에서 가로 스크롤한다.

### 링크·내비·푸터

본문 링크는 `text-accent hover:underline`, 내비는 `text-body hover:text-heading`을 사용한다. 외부 새 탭 링크에는 `target="_blank" rel="noopener"`를 함께 쓴다. 아이콘 링크에는 `aria-label`을 제공한다. `data-tip`은 hover 보조 설명이며 접근 가능한 이름을 대신하지 않는다.

홈 내비는 스크롤 다운 시 숨고 위로 스크롤하면 나타난다. 모바일 메뉴는 `#hamburger-btn` / `#mobile-menu`를 사용하고 링크 클릭 후 닫힌다. 일부 오래된 상세에는 모바일 메뉴가 없으므로 새 페이지는 템플릿의 메뉴를 따른다. 푸터는 저작권과 `#lang-toggle` 하나를 사용한다. ID를 복제하지 않는다.

### 아이콘 — Material Symbols, weight 300

일반 UI 아이콘은 [Google Fonts의 Material Symbols](https://fonts.google.com/icons)에서 선택한다. **기본 weight는 300**이다. 패밀리는 **Material Symbols Outlined**, `FILL=0`, `GRAD=0`으로 통일한다. 실제 모양과 복사 코드는 [Icons 예시](../component-library.html#icons)에서 확인한다.

| 상황 | 클래스 | 크기 / Optical size | Weight |
|---|---|---|---|
| 독립 아이콘·메뉴 | `material-symbols-outlined` | 24px / 24 | 300 |
| 텍스트 옆·보조 아이콘 | `material-symbols-outlined icon-sm` | 20px / 20 | 300 |

색상은 주변 글자색을 상속한다. 아이콘만 있는 버튼·링크의 조작 영역은 아이콘 크기와 별개로 44px 이상 확보하고, 목적을 나타내는 `aria-label`을 제공한다. 장식 아이콘에는 `aria-hidden="true"`를 붙인다. 아이콘 이름은 번역하지 않으며 아이콘 span을 `data-ko` 텍스트 요소 밖에 둔다.

아이콘 폰트는 사용하는 페이지의 head에서 로드하고, 그 뒤에 공통 `css/style.css`를 로드한다. Google Fonts 요청에도 **`wght=300`을 명시**하고 `icon_names`는 실제 사용하는 이름만 알파벳순으로 나열한다. 아래 예시는 `download`, `menu`, `open_in_new`만 로드한다.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..24,300,0,0&amp;icon_names=download,menu,open_in_new&amp;display=block">

<a href="../assets/resume.pdf" target="_blank" rel="noopener"
   class="inline-flex items-center gap-2 text-accent hover:underline">
  <span class="material-symbols-outlined icon-sm" aria-hidden="true">download</span>
  <span data-ko="이력서 PDF · 새 탭">Resume PDF · New tab</span>
</a>
```

공통 CSS가 `font-weight: 300` 및 `font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24`를 적용한다. `icon-sm`은 크기와 `opsz`를 20으로 변경한다. 일반 문구의 굵기를 바꾸더라도 아이콘 weight는 300을 유지한다. 요청 URL에 지정하지 않은 아이콘은 표시되지 않을 수 있으므로 새 아이콘을 추가할 때 목록도 갱신한다. 한글/영문 폰트나 기존 SVG에 `font-weight: 300`만 지정하는 것으로 대체하지 않는다.

SVG로 사용하는 경우도 Google Fonts에서 Outlined / weight 300 / Fill 0 / Grade 0 / 해당 Optical size를 선택해 내려받는다. **GitHub·LinkedIn 등 브랜드 로고는 별도 원형 SVG**를 사용하며 Material Symbols의 weight 규칙을 적용하지 않는다. 기존 공개 페이지의 이전 SVG는 일괄 교체된 상태가 아니다. 새 페이지 템플릿과 새로 추가·교체하는 일반 UI 아이콘부터 이 기준을 적용한다.

출처: [공식 Material Symbols 가이드](https://developers.google.com/fonts/docs/material_symbols). `display=block`과 사용하는 이름만 요청하는 방법도 이 가이드를 따른다.

## 7. 이미지·영상·확대 뷰어

### 정적 이미지

홈 썸네일은 크롭할 수 있지만 상세의 UI 캡처·노드 그래프·비교 이미지는 `w-full h-auto`로 원본 비율을 유지한다. 캡션에는 무엇을 보여주는지, 실제 캡처인지 개념도인지, 필요한 경우 시점과 비교 조건을 적는다.

비교는 두 개의 `figure`를 `grid grid-cols-1 md:grid-cols-2 gap-6`로 감싸고 각각에 캡션을 둔다. Before/After의 구도와 표시 범위를 맞추되 의미 있는 내용은 크롭하지 않는다. 글자가 작아지면 데스크톱에서도 세로 배치를 유지하고 확대 뷰어를 제공한다. 캡션은 「개선 후」만 쓰기보다 「동일 입력·동일 설정 / 달라진 처리 / 관찰되는 차이」를 설명한다.

**새 페이지 기준:** 가능하면 실제 `width`/`height`를 넣고 아래쪽 이미지는 `loading="lazy" decoding="async"`를 사용한다. 대표 이미지는 `decoding="async"`와 필요 시 `fetchpriority="high"`를 사용한다. 기존 모든 이미지에 이 최적화가 적용된 상태는 아니다.

```html
<figure class="mb-10">
  <a href="../assets/images/project-slug/detail.png" data-image-viewer class="block" aria-label="View full-size screenshot">
    <img src="../assets/images/project-slug/detail.png" alt="화면의 핵심 정보를 설명" class="w-full h-auto" loading="lazy" decoding="async">
  </a>
  <figcaption class="text-xs text-muted mt-2 text-center" data-ko="실제 개발 화면 · 촬영 시점과 맥락">Development screenshot · Date and context</figcaption>
</figure>
```

확대 대상 페이지에는 `css/image-viewer.css`와 `js/image-viewer.js`를 포함한다. 클릭하면 네이티브 `dialog`가 열리고 원본 크기/화면 맞춤, 닫기, Escape, 배경 클릭을 지원한다. 닫은 뒤 원래 링크로 포커스를 돌린다. 수정키 클릭과 지원하지 않는 브라우저에서는 일반 이미지 링크로 동작한다. 캡션은 열 때 현재 언어의 내용을 읽는다. **홈 카드·영상·외부 데모는 확대 대상으로 지정하지 않는다.**

### 영상

새로 옮기는 설명 영상은 `controls playsinline preload="metadata"`를 기본으로 하고 필요하면 포스터를 제공한다. 짧은 장식 루프만 목적을 확인해 `autoplay loop muted playsinline`을 사용한다. 기존 TA 페이지에는 자동재생 루프도 있으므로 본문 영상 전체를 자동재생하는 규칙으로 해석하지 않는다.

볼 동작과 필요한 타임스탬프를 캡션이나 본문으로 적고 영상 원본 링크를 제공한다. 음성에 중요한 설명이 있다면 자막이나 동등한 텍스트 설명을 함께 제공한다.

외부 iframe에는 설명적인 `title`, 반응형 비율, 원본을 여는 링크를 둔다. 이미지의 확대 뷰어로 동영상을 감싸지 않는다. 미디어 실패 시에도 제목·설명·대체 링크로 내용을 파악할 수 있게 한다.

## 8. 동작·접근성·현재 한계

- 페이지당 `h1` 하나, 섹션은 `h2`, 하위 항목은 `h3`로 구성한다. 장식 크기를 위해 제목 단계를 바꾸지 않는다.
- 클릭 동작은 `button`, 이동은 `a`로 구현한다. 키보드 포커스 표시를 제거하지 않는다.
- 현재 CSS는 reduced-motion에서 smooth scroll과 CSS 전환/애니메이션을 줄인다. JS 효과·자동재생 영상까지 일괄 정지하는 것은 아니다.
- 이미지 뷰어에는 키보드 조작과 포커스 복귀가 구현되어 있다. 사이트 전체 접근성 검증을 완료했다는 의미는 아니다.
- 모바일 메뉴의 `aria-expanded` 동기화, 툴팁의 키보드 노출, 전체 색상 조합의 대비 검증은 추가 개선 항목이다. 이번 문서화에서는 공개 동작을 바꾸지 않았다.
- 색상 토큰과 Tailwind 설정은 공통 CSS와 페이지별 설정에 걸쳐 있다. 타이포·간격을 모두 자동 동기화하는 디자인 토큰 빌드는 없다.

## 9. 작업 후 확인

1. 공통 규칙을 바꿨다면 이 문서와 [Component Library](../component-library.html)를 함께 갱신한다.
2. 신규 페이지·에셋을 `site-public.json`에 추가하고 `python3 scripts/build_site.py`를 실행한다.
3. 390px / 데스크톱에서 긴 제목·캡션·표·이미지 비율을 확인한다.
4. Ko/En 전환, 모바일 메뉴, 이미지 확대·Escape·포커스 복귀, 영상 조작을 확인한다.
5. 새 프로젝트의 설명·홈 카드·이력서·근거 기록이 일치하는지 확인한다. 이력서를 수정한 경우 PDF도 갱신한다.

컴포넌트 문서와 템플릿은 `site-public.json`에서 제외되어 일반 `_site/` 미리보기에는 없다. 내부 예시를 볼 때만 저장소 루트에서 실행한다.

컴포넌트 문서는 768px 이상에서 오른쪽 고정 목차를 제공한다. 작은 화면에서는 오른쪽 상단에 Material Symbols weight 300 메뉴 아이콘 하나만 표시한다. 아이콘을 누르면 섹션 목록이 떠서 이동할 위치를 고를 수 있고, 열린 상태에서는 같은 위치의 닫기 아이콘 하나로 바뀐다. 항목을 선택하면 앵커로 이동하고 목록이 닫힌다. 바깥 영역 클릭·Escape로도 닫히며 Escape는 메뉴 아이콘으로 포커스를 돌린다. 목차 안에서는 현재 섹션을 강조한다. URL의 `#cards`, `#media` 같은 앵커로 직접 연결할 수 있고, 「맨 위로」로 문서 시작에 돌아온다. 이 목차는 내부 문서에만 적용된다.

### 문서 자체를 수정한 경우

- 문서 전용 스타일·동작은 `docs/component-library.css`와 `docs/component-library.js`에 둔다. 공개 번들에 복사되는 `css/`, `js/`에 내부 UI를 추가하지 않는다.
- 색상 HEX와 타이포의 CSS 정보는 화면에서 읽지만, 패턴 설명·복사 코드·Markdown 표는 수동 관리다. 예시 마크업을 바꾸면 같은 섹션의 코드와 설명도 검토한다.
- 새 섹션은 고유 ID를 부여하고 오른쪽 목차에 문서 순서대로 추가한다. 코드 안의 예시 ID·URL은 실행되는 페이지 요소와 구분한다.
- 390px·768px·데스크톱에서 목차 이동, 코드 펼치기·복사, 표·코드 내부 스크롤을 확인한다. 클립보드가 제한되면 코드를 선택하고 수동 복사를 안내하는지 확인한다.
- 한·영 및 라이트·다크 전환 후 팔레트와 글꼴 설명이 현재 예시와 일치하는지 확인한다. 접힌 다크 팔레트는 항상 다크 값이어야 한다.
- 아이콘 링크에는 접근 가능한 이름, 장식 SVG에는 `aria-hidden="true"`를 둔다. 코드·목차를 포함해 키보드 포커스가 보여야 한다.
- 공개 빌드 검사는 내부 문서를 대상으로 하지 않는다. 내부 파일의 경로·앵커·중복 ID를 별도로 확인하고, `_site/`에 문서 전용 파일이 포함되지 않았는지도 확인한다.

```sh
python3 -m http.server 8781 --bind 127.0.0.1
# http://127.0.0.1:8781/component-library.html
# http://127.0.0.1:8781/projects/_template.html
```

루트 서버는 로컬 문서 확인용이다. 공개 배포는 README의 `_site/` 빌드 절차를 따른다.
