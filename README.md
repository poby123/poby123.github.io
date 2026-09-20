# poby123.github.io

이원주 — 소프트웨어 엔지니어 프로필 / 포트폴리오.

정적 사이트입니다. 빌드 단계가 없고, 파일을 그대로 GitHub Pages가 서빙합니다.

```
index.html          프로필 (경력 · 기술 · 케이스 스터디 목록 · 연락)
cases/*.html        케이스 스터디 5편
assets/site.css     디자인 토큰과 전체 스타일
assets/site.js      한/영 토글, 히어로 도식 재생
assets/img/         이미지 (portrait.jpg 를 갈아 끼우면 프로필 사진이 바뀐다)
                    kiosk-*.png 는 창의적 공학설계 구조도 · 회로도
```

## 로컬에서 보기

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## 한국어 / 영어

번역은 별도 파일이 아니라 같은 마크업 안에 나란히 들어 있습니다.

```html
<span data-ko>한국어 문장</span><span data-en>English sentence</span>
```

`assets/site.js`가 `<html data-lang>`을 바꾸면 CSS가 반대쪽을 숨깁니다.
선택한 언어는 localStorage에 남고, `?lang=en` 으로도 열 수 있습니다.
문장을 고칠 때는 **두 언어를 같이** 고쳐야 합니다.

## 케이스 스터디 추가하기

`cases/` 안의 파일 하나를 복사해 헤더·푸터 구조를 그대로 두고 본문만 바꾸면 됩니다.
새 글을 추가하면 다른 케이스 페이지 아래쪽 `.casenav` 와 `index.html` 의
케이스 스터디 목록에도 링크를 넣어 주세요.

## 테마

라이트 전용입니다. 다크 모드는 두지 않았습니다 — 이력서는 종이입니다.
화면 전체가 `--paper` 한 장이고, 종이결은 SVG `feTurbulence` 로 만든 알파
노이즈를 base64 data URI 로 넣어 `body` 와 `.topbar` 의 배경 레이어로 깔았습니다.

- **base64 로 넣은 이유**: URL 인코딩 방식으로 넣으면 SVG 안의 `width='100%'`
  때문에 `%'` 가 잘못된 이스케이프로 해석되어 이미지가 통째로 로드되지 않습니다.
- **`background-attachment: fixed` 인 이유**: 스크롤해도 타일이 viewport 기준으로
  고정되어야 헤더와 본문의 결이 어긋나지 않고 이음새가 안 보입니다.
- 세기는 CSS `opacity` 가 아니라 SVG 의 `tableValues` 에 넣었습니다. 그래야
  배경 레이어로 직접 쓸 수 있고, 위에 얹는 요소의 투명도와 얽히지 않습니다.

가로 여백은 `.topbar` · `main` · `footer` 가 `--pad` 로 갖고, `.wrap` 은
내용 폭(`--maxw`) 그 자체입니다. 그래서 `.wrap` 에 그은 구분선이 본문 ·
표 · 지표와 정확히 같은 자리에서 시작하고 끝납니다.

## 프로필 사진

`assets/img/portrait.jpg` (3:4, 360×480). 같은 비율로 맞춰 파일만 덮어쓰면 됩니다.
빼고 싶으면 `index.html` 의 `.letterhead` 에서 `<img>` 한 줄만 지우면
나머지 레이아웃은 그대로 동작합니다.

## 도식

히어로와 케이스 스터디의 도식은 인라인 SVG입니다. 스크립트가 살아 있을 때만
차례로 나타나고, **JS 가 없으면 처음부터 전부 보입니다** — 내용이 애니메이션 뒤에
숨지 않도록 `html.anim` 으로 기본값을 뒤집어 두었습니다.
