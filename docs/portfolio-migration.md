# 기존 포트폴리오 → TA 기반 통합

## 기준판

- 작업 브랜치: `codex/ta-portfolio-migration`
- 대상 저장소: `tomlim2/portfolio`
- 출발 브랜치: `gh-pages` — 이 저장소에는 `main` 브랜치가 없다.
- 기존 포폴 원본: `f2ef48a1903765fe92f1218227a1c44107588ed5`
- 가져온 저장소: `tomlim2/ta-portfolio`
- 가져온 브랜치·커밋: `main` / `79b0b9aac1feba028d80f1f23015b3ddf99f7f4d`
- 가져오기 날짜: 2026-09-25

TA 저장소의 커밋된 파일로 새 기반을 만들었다. 원본 저장소의 미커밋 `map.md`, `projects/mmd-player.html`, 미추적 `js/mmd-embed.js`와 Shotloom 이미지 두 개는 포함하지 않았다. 무시된 개발 메모, 초안과 `_site/` 빌드 결과도 복사하지 않았다. 원본 TA 저장소는 수정하지 않았다.

TA 사이트의 홈, 이력서 HTML/PDF, 프로젝트 8개, 스타일·스크립트·미디어, 공개 파일 목록과 검증 도구를 가져왔다. 기존 포폴의 `CNAME`인 `tommlimm.net`은 유지했다. 검증·릴리즈 워크플로의 기준 브랜치와 배포 안내는 대상 저장소에 맞췄다. 콘텐츠와 이력서 PDF는 TA 기준판 그대로이며, 이력서의 `ta.tommlimm.net` 링크도 유지했다.

## 이번 단계의 범위

- [x] 기존 기본 브랜치에서 별도 통합 브랜치 생성
- [x] 커밋된 TA 기준판으로 작업 트리 교체
- [x] 기존 도메인 유지 및 저장소별 운영 안내 조정
- [ ] 기존 프로젝트를 새 템플릿으로 하나씩 이식
- [ ] 통합 사이트의 홈 분류·정렬과 소개 최종 조정
- [ ] 기존 URL 유지 또는 리다이렉트 추가
- [ ] 배포 요청 후 Pages 설정 확인·전환 및 운영 반영

이번 단계에서는 기존 프로젝트를 새 공개 사이트에 노출하지 않는다. 기존 원본 전체는 아래 커밋과 `gh-pages`에 남아 있어, 이식 시 해당 프로젝트의 내용·미디어를 다시 가져올 수 있다. 저장소 전체를 중복 복사한 보관 폴더는 만들지 않았다.

## 프로젝트별 이식 목록

아래 순서와 분류는 초기 제안이며 실제 콘텐츠를 검토하면서 조정한다.

| 순서 | 기존 작업 | 원본 진입점 | 새 구조에서 검토할 위치 | 상태 |
|---|---|---|---|---|
| 1 | Summer VR Project / CUBE | `children/vr2019/index.html` | VR 사례: 역할·상호작용·Unreal 구현 과정 | 대기 |
| 2 | Personal Projects | `children/test2019/index.html` | 3D·모션 실험 모음 | 대기 |
| 3 | Junkyard | `children/codes/index.html` | Creative Coding, 개별 데모 연결 | 대기 |
| 4 | Curiosity | `children/concept2017/index.html` | Visual / Design Archive | 대기 |
| 5 | Office of Civic Innovation | `children/tbd/index.html` | Branding / Design Archive | 대기 |
| 6 | Olivia | `children/gd3/index.html` | Branding / Design Archive | 대기 |

각 작업은 결과물, 실제 담당 범위, 제작 과정과 기술을 기존 자료에서 확인해 옮긴다. 없는 기술 설명이나 성과 수치를 추가하지 않는다. 프로젝트별 커밋으로 분리해 검토와 되돌리기가 가능하도록 한다.

## 원본 확인과 복구

파일 하나의 원본을 확인한다.

```sh
git show f2ef48a1903765fe92f1218227a1c44107588ed5:children/vr2019/index.html
```

참조용 원본 전체가 필요하면 작업 트리 외부의 새 임시 폴더에 추출한다.

```sh
legacy_dir="$(mktemp -d)"
git archive f2ef48a1903765fe92f1218227a1c44107588ed5 | tar -x -C "$legacy_dir"
```

기존 페이지는 `assets/`의 공통 CSS·JS·폰트와 다른 `children/` 프로젝트의 이전/다음 썸네일도 참조한다. 원본 HTML만 복사하지 말고 의존 미디어를 확인한다. 새 템플릿에는 필요한 에셋만 가져오고 `site-public.json`에 공개할 페이지와 에셋을 추가한다. 기존 URL의 리다이렉트도 공개 목록에 포함한다.

## 확인 방법

```sh
python3 scripts/build_site.py
python3 -m http.server 8780 --bind 127.0.0.1 --directory _site
```

빌드가 링크·앵커·CSS 참조·제목 구조를 확인한다. 페이지를 옮길 때마다 데스크톱/모바일 레이아웃, 한국어/영어 전환, 영상과 이미지 확대, 이전 URL 진입을 확인한다. 이번 작업에서 운영 브랜치 푸시, 태그 생성과 배포는 하지 않는다.

가져온 워크플로는 `_site/`만 배포하지만 현재 저장소의 Pages 설정은 별개다. 운영 반영 전에는 GitHub Actions를 배포 소스로 설정해 `site-public.json`의 공개 범위를 유지해야 한다.

## 기준판 검증 기록

- 공개 빌드: HTML 11개, 로컬 링크·리소스 참조 292개 검증 통과. 공개 파일 140개 생성.
- `js/*.js`: Node 구문 검사 통과.
- 브라우저: 데스크톱 홈, 한국어→영어 전환, 390px 모바일 홈·메뉴·NPR 상세 진입 확인. 홈 가로 넘침과 깨진 이미지 없음, 확인한 화면의 콘솔 오류 없음.
- GitHub Pages 조회: `legacy` 빌드, `gh-pages` 루트, `tommlimm.net`. 설정 변경 없음.
- TA 원본에서 가져온 파일에는 기존 공백/CRLF 검사 경고가 있다. 원본 보존을 위해 일괄 재포맷하지 않았으며, 이번 저장소별 수정분은 공백 검사 통과.
