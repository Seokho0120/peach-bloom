# Peach-bloom 💄

<img width="1433" alt="peach-bloom" src="https://github.com/Seokho0120/river.dev/assets/93597794/28e8efd5-ec94-44f1-895c-af6076356bdb">

## 소개

유튜브와 인스타그램 클론코딩으로 개발을 처음 접했을때 언젠가는 혼자 백엔드부터 프론트까지, 로그인부터 시작해서 유저가 페이지를 닫을 때 까지의
과정을 개발하고 싶었습니다. 이러한 마음으로 이직 준비를 하며 단기간안에 효율적으로 원하는 기술을 익히면서 개발할 수 있는 주제가 무엇일까 고민했고,
가장 기본이되는 쇼핑몰 웹사이트를 개발하기로 결심했습니다.

peach-bloom은 화장품 쇼핑몰 웹사이트입니다. 소셜 로그인부터 제품 필터와 검색, 좋아요 기능으로 원하는 제품을 찾을 수 있고 장바구니에 담을 수 있습니다.
FireStore를 이용해 데이터 구조를 고민하며 실시간 데이터 동기화를 구현했으며, Cloudinary를 활용해 이미지를 업로드하고 관리하며 최적화에 집중했습니다.

## 폴더 구조

UI와 비지니스 로직을 분리하고, 재사용성을 높이고 의존성을 최소화하기 위해 고민하며 개발했습니다.<br/>
특히, 커스텀훅과 컴포넌트를 최대한 쪼개고 분리하여 명확한 사용성을 정의하고 꼭 필요한 곳에서만 재사용했습니다.

```tsx
📦src
 ┣ 📂app
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📂signIn
 ┃ ┣ 📂carts
 ┃ ┣ 📂detail
 ┃ ┃ ┗ 📂[productId]
 ┃ ┣ 📂mylike
 ┃ ┣ 📂mypage
 ┃ ┣ 📂products
 ┃ ┃ ┗ 📂[categories]
 ┃ ┣ 📂search
 ┃ ┃ ┗ 📂[...keyword]
 ┃ ┣ 📂upload
 ┃ ┃ ┣ 📂[productId]
 ┣ 📂atoms
 ┣ 📂components
 ┃ ┣ 📂ui
 ┣ 📂context
 ┣ 📂hooks
 ┣ 📂lib
 ┣ 📂types
 ┗ 📂utils
```

다만, 개발 완료 후 예상보다 컴포넌트의 수가 더 많아지며 복잡하다는 생각이 들었습니다.
현업에서는 컴포넌트 폴더 내부에 공통 및 페이지별 폴더를 따로 만들어 관리했었는데, 가독성 측면에서 좋지 않다고 판단해 현재 어떻게 리팩토링할지 고민하고 있습니다.

## 구현 페이지

**회원가입 페이지**

- 소셜 회원가입 가능

  개인적으로 일반 회원가입을 해야하는 사이트를 싫어합니다. 편하게 클릭 한번이면 회원가입할 수 있는 소셜 로그인이 좋은 UX라고 생각하기에 `NextAuth`를 이용해 구글과 카카오, 네이버 소셜 로그인을 구현했습니다.

- 어드민 관리자는 UPLOAD 버튼 생성 및 상품 업로드 권한 부여

  특정 계정에 관리자 권한을 설정했습니다. 관리자 계정은 로그인 시 메인 상단 메뉴에 **UPLOAD** 버튼이 생성되고, 상품을 업로드할 수 있습니다.

**메인 페이지**

- 캐러셀을 통해 베스트 상품, 할인 상품, 신상품 확인

  카테고리별로 판매 우선순위를 두는 제품을 위주로 메인페이지에 보여주었습니다.

**상품 목록 페이지**

- 필터를 통해 랭킹, 좋아요, 높은 가격, 낮은 가격, 높은 할인순으로 상품 확인 가능
- 브랜드명을 클릭하여 해당 카테고리 내 브랜드 상품 확인 가능

  쇼핑몰을 이용하며 필터를 통해 상품을 찾은 후 초기화 버튼이 없을때 불편함을 느낀 경험이 있습니다.<br/>
  그래서 **전체+** 버튼을 통해 필터와 브랜드가 초기화될 수 있도록 개발했습니다.

**상품 상세 페이지**

- 비로그인 시 하트 버튼을 클릭하면 로그인 페이지로 이동
- 우측 상단의 하트 버튼을 클릭해 해당 상품을 MY LIKE 페이지에 저장 및 삭제
- 수량 선택 후 장바구니 담기 및 바로 구매

  비로그인 상태로 좋아요 버튼을 클릭 시 모달이 보여지고, 모달의 버튼을 클릭해야 로그인 페이지로 넘어가는 쇼핑몰이 많았습니다.
  하지만 저는 쇼핑몰에 고객을 적극적으로 유입시키려면 모달이 아닌, **즉시 로그인 페이지로 이동**하는 UX가 더 비지니스에 도움이 된다 생각했습니다.

**장바구니 페이지**

- 장바구니에 담긴 제품의 수량 변경 가능
- 장바구니에 담긴 모든 제품의 총 주문 금액 및 결제 금액 확인
- 각각의 상품 삭제 가능

  장바구니에 제품을 담거나 삭제 시 `FireStore`에 실시간 업데이트가 됩니다. MVP를 구성할 때 결제 기능을 추가할지 고민했지만,
  결제 기능이 퍼포먼스에 큰 영향이 있지 않을 것이라 판단하여 추후에 개발 예정입니다.

**검색 페이지**

- 키워드에 해당하는 제품 확인 가능
- 키워드 검색 시 검색 페이지 이동, 키워드 삭제 시 메인 페이지 이동

  현업에서 검색 기능을 개발하며, 키워드 당 매번 API 호출이 되어 서버 과부화 이슈를 직면한 경험이 있습니다.
  그 당시 해결방법이 떠오르지 않아 검색 버튼을 클릭 시 결과가 나오는 방향으로 기획을 수정했습니다.<br/>
  하지만 이번 프로젝트에서는 실시간 검색 기능을 구현하고 싶어, 방법을 찾다가 `Debounce`와 `Throttle` 개념을 학습하고,
  **Debounce 커스텀훅**을 만들어 이슈를 해결했습니다.

**마이 페이지**

- 계정(이메일), 닉네임, 프로필 사진 확인 가능
- 해당 페이지에서 로그아웃 가능

**좋아요 페이지**

- 유저가 하트를 클릭한 제품 목록 확인 가능
- 해당 제품 클릭 시 상세 페이지 이동

**업로드 페이지**

- 어드민 관리자는 새로운 상품 등록 가능

  관리자 계정으로 새로운 상품을 업로드할 수 있습니다.
  `FireStore`에 업로드하기 전 이미지를 `Cloudinary`에 저장하고, **이미지 url**을 받아 FireStore에 저장합니다.

## 아키텍처

서버를 직접 구현해서 운영하진 않았기에 복잡한 아키텍처는 아닙니다. 하지만, 현업에서도 아키텍처를 고민해본 경험이 없었기에 어떤 시작점부터 고민해야하는지 학습하며 구성했습니다.

![Frame](https://github.com/Seokho0120/river.dev/assets/93597794/ce8e015b-3b2e-4cdb-ad0c-e511d32e7399)

### User Flow

- 유저의 흐름은 심플합니다. 사이트에 방문하여 필터를 이용해 제품 목록과 상세 내용을 확인할 수 있고, 검색기능으로 상품을 찾을 수 있습니다.
  상품을 장바구니에 담거나 바로 구매하기 위해서는 로그인이 필요하며, 좋아요와 마이페이지 확인을 위해서도 로그인이 필요합니다.
  또한, 관리자 계정은 UPLOAD 버튼이 생성되며, 상품을 업로드할 수 있습니다.

### Next.js & React-query

- Next.js와 React-query를 현업에서 사용해본 경험이 없기에 개인 프로젝트를 통해 학습하고, 익숙해지기 위해 사용했습니다.
  뿐만 아니라 CSR, SSR, SSG, ISR을 어느 화면에서 어떻게 왜 사용할지에 대해 고민하고 개발했습니다.

### Firestore

- 빠르고 간편한 데이터베이스가 필요했기 때문에 `Firestore`를 선택했습니다. Firestore는 구글(Firebase)에서 지원하는 NoSQL 데이터베이스 서비스로,
  실시간 리스너를 통해 사용자와 기기간 데이터 실시간 동기화가 가능합니다. 더불어, 이전에 사용해봤던 `Sanity` 와 형태가 비슷한 부분도 선택 이유 중 하나입니다.

### Cloudinary

- `Cloudinary`는 클라우드 기반의 이미지 및 비디오 관리 서비스입니다.
  AWS S3와 비교해봤을때, 더 가볍고 편할뿐 아니라 이미지 url을 커스터마이징하면 **쉽고 강력한 최적화를 구현**할 수 있기에 선택했습니다.

### NextAuth

- `NextAuth`는 **Oauth 인증 방식의 로그인** 서비스를 쉽게 구현할 수 있도록 Provider를 제공합니다.
  뿐만 아니라 Next.js를 위한 open-source이기에 사용했습니다.

### Vercel

- `Vercel`은 Next.js를 개발한 회사이기에 Next.js 프로젝트 배포에 가장 최적화된 플랫폼입니다. 큰 장점은 기본적으로 HTTPS와 CDN이 적용된 상태로 배포가 되고,
  git repository에 연결하면 변경된 코드를 메인 브랜치에 병합 시 코드를 빌드 후 배포해 주기 때문에, CI/CD 자동화에 대한 환경을 알아서 구축해줍니다.
  현업에서는 개발, 스테이징, 배포 브랜치를 따로 나눠 개발을 했지만, 개인 프로젝트는 main 브랜치로 개발부터 배포까지 진행했습니다.

## 데이터 구조

현업에서는 백엔드에서 전달해주는 데이터를 어떻게 가공하고, 효율적으로 사용할 수 있을지에 집중했습니다.
이번 프로젝트에서는 데이터의 구조를 직접 설계하며 어떻게해야 불필요한 리소스가 발생하지 않을지에 대해 고민하며 다양한 시행착오를 경험했습니다.

### 제품 리스트, 제품 상세내용

특히, **Products와 ProductDetail의 구조를 설계**하는 과정에서 어떤 정보가 필수적인지 아닌지, 어떻게 그 정보를 효율적으로 사용하고 표현할지 고민했습니다.

```tsx
// Products
[
  {
    brandTitle: '아로마티카',
    category: 'exclusive',
    imageUrl:
      'http://res.cloudinary.com/dsycahvpu/image/upload/w_500,ar_1:1,f_auto/v1700140170/rrxwl7c9xzthq0tw3yf7.jpg',
    isSale: true,
    likedCount: 109,
    price: 25000,
    productId: 2021,
    productTitle: '[두피에센스,두피부스터] 헤어 토닉 100ml + 우든 브러쉬 헤어케어 세트 (3종 택1)',
    reviewCount: 476,
    saleRank: 19,
    saleRate: 19,
    isNew: true;
  },
  ...
];

// ProductDetail
[
  {
    description: '베스트 셀러 진저바바 스칼프 헤어케어 라인의 시그니처 성분과 비타민이 풍부한 만다린 열매, 장미꽃 수를 담아 모발과 두피를 자극없이 보송하고 청량하게 케어합니다.',
    howToUse: '미온수로 모발과 두피를 충분시 적셔준 뒤 손바닥에서 적당량을 펌핑하여 거품을 내주세요.',
    ingredients: '정제수, 다이메티콘, 사이클로펜타실록세인, 글리세린, 세테아릴알코올, 세틸알코올',
    productId: 413,
  },
  ...
];
```

**ProductDetail**은 상세페이지에서만 사용하고, **Products**는 제품 목록 및 여러곳에서 사용하기 때문에 이 두 데이터를 명확하게 분리했습니다.
그리고 필요에 따라 Products의 속성을 **가공하여 사용함으로써 데이터 활용의 유연성**을 높였습니다.

하지만 개발 막바지에 Products의 속성을 가공하는 과정 또한 **불필요한 리소스가 될 수 있겠다는 판단**을 했지만, 구조를 바꾸면 다른 부분까지 수정하는데 시간이 오래 걸리기에 리팩토링은 추후 진행 예정입니다.

### 좋아요, 장바구니

**좋아요 기능과 장바구니의 데이터 구조를 설계**하는 데에도 많은 고민을 했습니다.<br/>

```tsx
// Likse
// ProductId > likerList
[
  {
    productId: 123123,
    likerList: [userId, ...],
  }
];
```

처음에는 각 유저마다 좋아요를 누른 제품을 저장하는 방식을 고려했습니다.
하지만 실제 서비스에서는 제품 수 보다 유저 수가 월등히 많을 것을 고려하여,
**제품마다 좋아요를 누른 유저의 Id를 저장**하는 구조로 수정했습니다.
이를 통해 각 제품의 좋아요 수를 쉽게 파악할 수 있으며, 각 유저가 어떤 제품을 좋아요했는지도 쉽게 알 수 있게 되었습니다.

```tsx
// Carts
// UserId > Items
[
  {
    userId: 123123,
    Items: [
      {
        brandTitle: '피부피부',
        imageUrl:
          'http://res.cloudinary.com/dsycahvpu/image/upload/w_500,ar_1:1,f_auto/v1700128032/fxgljhnjiecbclx4dpvd.jpg',
        price: 66300,
        productId: 35355,
        productTitle: '[단독최저가]샴푸+바디워시+바디로션 풀세트',
        quantity: 1,
      },
    ],
  },
];
```

**장바구니**같은 경우 제품의 Id만 DB에 전달하고, 장바구니 목록을 보여줄때 Id와 ProductList를 비교해서 해당 데이터를 가져오는 구조를 생각했습니다.
하지만, 이러한 경우 제품의 수가 많아지면 비교하는 과정이 로딩 속도에 악영향을 끼칠 수 있음을 깨닫고,
장바구니에 제품을 담을 때부터 장바구니 목록에 보여질 데이터를 전달하는 방식으로 개선해 **불필요한 리소스를 방지**할 수 있었습니다.

## Debounce와 Throttle

1년전 회사에서 검색 기능을 개발하며 검색 키워드가 한자씩 입력될 때마다 api 호출을 하게 되고 이는 서버 리소스 낭비와 과부하로 이어지는 것을 알게되었습니다.
그 당시 해결 방법을 찾다가 결국, 검색 버튼 클릭 시 결과가 보여지도록 기획을 변경했던 경험이 있습니다.

이번 프로젝트에서도 같은 문제를 직면했고, 이를 해결하기 위해 `Debounce`와 `Throttle`의 개념을 이해하고 커스텀훅을 만들어 사용했습니다.

### Debounce

특정 시간이 지난 뒤에 하나의 이벤트만 발생시킵니다. 즉, 여러번 발생하는 이벤트에서 가장 마지막 이벤트만 실행됩니다.

### Throttle

일정한 주기마다 이벤트를 발생시킵니다. 즉, 일정시간 동안 이벤트가 한번만 실행됩니다.

> ✨ [Debounce vs Throttle: Definitive Visual Guide](https://kettanaito.com/blog/debounce-vs-throttle) - Debounce와 Throttle가 어떻게 동작하는지, 개념을 쉽게 이해하는데 도움 받은 링크입니다.

### 적용하기

아래는 `Debounce` 적용 전 영상입니다. 키워드 한자씩 입력될때마다 api 호출을 하게 되고, 더불어 Firebase도 함께 실시간으로 호출되는 현상이 발생합니다.

![debounce-prev](https://github.com/Seokho0120/peach-bloom/assets/93597794/13d167fb-f88b-464c-941e-7d449534ae33)

저는 `Debounce`를 커스텀훅으로 개발했습니다.<br/>
`useDebounce`를 사용하면 `delay`는 기본값으로 **0.4초**로 설정했습니다.
`value`가 변경이 되면, 바로 `setDebounced` 상태를 업데이트 하는게 아니라 `delay`만큼 기다렸다가 설정됩니다.
`Timeout`이 끝나지 않았는데, 또 `value`가 변경되면 `clearTimeout`이 호출되면서 예전 `Timeout`은 취소됩니다.

```tsx title="useDebounce.ts"
'use client';

import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
```

실제로 사용되는 `SearchBar` 컴포넌트에서는 `router.push`를 이용해 `debouncedKeyword`에 해당하는 검색 페이지로 이동하게되며,
`debouncedKeyword`가 없으면 메인화면으로 이동합니다.

```tsx title="SearchBar.tsx"
export default function SearchBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');
  const debouncedKeyword = useDebounce(searchText);

  useEffect(() => {
    if (debouncedKeyword.length > 0) {
      router.push(`/search/${encodeURIComponent(debouncedKeyword)}`);
    } else if (debouncedKeyword.length === 0) {
      router.push('/');
    }
  }, [router, debouncedKeyword]);

  return (
    <form>
      <input
        type='text'
        name='search'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className='rounded-3xl w-48 sm:w-64 text-xs p-2 box-border'
        placeholder={`검색어 입력 후 엔터를 눌러주세요.`}
      />
    </form>
  );
}
```

### 결과

아래는 `Debounce` 적용 후 영상입니다. 키워드를 전부 입력하고 0.4초 후 한번만 api를 호출합니다.<br/>
`Debounce`를 적용하여 **api 호출 및 서버 과부화 방지**할 수 있고 **사용자에게 더 좋은 UX를 제공**할 수 있게 되었습니다.

![debounce-after-sm](https://github.com/Seokho0120/peach-bloom/assets/93597794/bf5b2e2a-c304-4a28-a110-28e8a74b3520)
