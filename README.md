# Peach-bloom 💄

<img width="1433" alt="peach-bloom" src="https://github.com/Seokho0120/river.dev/assets/93597794/28e8efd5-ec94-44f1-895c-af6076356bdb">

## 정보

✨ **기간:** 2023.11.01 - 2023.11.28

✨ **주소:** https://peach-bloom.vercel.app/

✨ **블로그:** https://river-dev.vercel.app/posts/peach-bloom-4

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
        type="text"
        name="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="rounded-3xl w-48 sm:w-64 text-xs p-2 box-border"
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

## 무한 스크롤

**무한 스크롤(Infinite Scroll)** 이란 사용자가 특정 페이지 하단에 도달했을 때, API가 호출되며 컨텐츠가 끊기지 않고 계속 로드되는 사용자 경험 방식입니다.
페이지를 클릭해 다음 페이지 주소로 이동하는 **페이지네이션(Pagination)** 과 달리, 한 페이지에서 스크롤만으로 새로운 컨텐츠를 보여주게 되므로, 많은 양의 컨텐츠를 스크롤하여 볼 수 있는 장점이 있습니다.

제품 카테고리 중 'ALL'을 클릭하면 모든 카테고리의 제품 목록이 표시됩니다. 제품의 수가 많아 한 번에 모두 로드하기에는 비효율적이기 때문에,
무한 스크롤 기능을 도입했습니다. 또한, 이번 프로젝트에서 `React-query`에 익숙해지는 과정에서, `React-query`가 제공하는 `useInfiniteQuery`훅을
활용하여 무한 스크롤을 구현했습니다.

`useInfiniteQuery`훅은 다양한 **options** 과 **return** 값이 있지만, 제가 사용한 옵션만 소개해드리겠습니다.

```tsx
const {
  data,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery(
  queryKey,
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  staleTime: 100,
  initialPageParam: 1,
  retry: false,
  refetchOnWindowFocus: false,
  enabled: false,
 )
```

- **data**

  서버에 요청해서 받아온 데이터입니다.

- **fetchNextPage**

  다음 페이지를 요청할 때 사용되는 메서드입니다.

- **hasNextPage**

  다음 페이지가 있는지 판별하는 boolean 값입니다.

- **getNextPageParam**

  새 데이터를 받아올 때 마지막 페이지(lastPage)와 전체 페이지(allPages) 배열을 함께 받아옵니다. 더 불러올 데이터가 있는지 여부를 결정하는데 사용되고,
  반환값이 다음 API 호출할때의 pageParam으로 들어갑니다. 흔히 마지막 페이지일 경우 undefined를 리턴하여 hasNextPage값을 false로 설정합니다.

- **queryKey**

  쿼리를 구별하여 캐시를 관리하기위한 이름, key입니다.

- **queryFn**

  쿼리가 데이터를 요청하는 데 사용할 함수, API입니다.

- **refetchOnWindowFocus**

  기본값은 true 입니다. 사용자가 브라우저 창에 다시 포커스를 맞추었을 때 자동으로 쿼리가 `refetch`가 되는데,
  이는 불필요한 네트워크 요청을 발생시키기 때문에 false로 설정했습니다.

- **initialPageParam**

  이전 버전에서는 queryFn의 pageParam이 undefined값을 가져서 0 또는 초기 값을 정의했었는데, undefined는 직렬화되지 않아
  `initialPageParam` 옵션이 필수값으로 추가되었습니다.

### 적용하기

`getProductsList` 함수를 호출해 8개씩 가져온 `productsList`를 필요에 맞게 가공합니다.<br/>
할인 상품은 할인 가격을 계산하여 업데이트하고, 카테고리를 구분하여 'ALL'인 경우 모든 제품을 불러오며, 'ALL'이 아닌 특정 카테고리를 선택한 경우
해당 카테고리의 데이터만 불러옵니다.

```tsx title="useProducts.ts"
export function useGetProductList(category: string) {
  const setProductList = useSetRecoilState(productsListAtom);
  const setInitialProductList = useSetRecoilState(initialProductsListAtom);

  const {
    data: productsList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isFetching,
  } = useInfiniteQuery<ProductsResponse, Error>({
    queryKey: ['products', category],
    queryFn: (context) => getProductsList(category, context.pageParam),
    getNextPageParam: (lastPage) => lastPage?.lastDoc || null,
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnWindowFocus: false,
    retry: false,
    initialPageParam: undefined,
    enabled: !!category,
  });

  useEffect(() => {
    if (productsList && category) {
      const allProductList = productsList.pages.flatMap((p) => p.products);

      // 리스트에 할인된 가격 추가 -> 할인된 가격으로 필터링
      const updatedProductsList = allProductList.map((product) => {
        const { price, saleRate, isSale } = product;
        const discountedPrice = isSale
          ? price - (price * (saleRate || 0)) / 100
          : price;

        return { ...product, discountedPrice };
      });

      // 카테고리에 해당하는 상품 정렬
      const filteredProductList = updatedProductsList.filter((product) => {
        if (category === 'all') {
          return updatedProductsList;
        }
        return product.category === category;
      });

      setProductList(filteredProductList);
      setInitialProductList(filteredProductList);
    }
  }, [category, productsList, setInitialProductList, setProductList]);

  return {
    isLoading,
    isError,
    productsList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    getProductsList,
  };
}
```

`getProductsList`는 Firestore 데이터베이스에서 상품 목록을 가져오는 함수 입니다.<br/>
카테고리를 구분하고 특정 카테고리의 상품을 페이지 별로 조회하며, 한 페이지당 최대 8개의 제품이 포함됩니다.

```tsx title="firestore.ts"
export async function getProductsList(
  category?: string,
  pageParam?: DocumentData | unknown,
): Promise<{
  products: ProductListType[];
  lastDoc: DocumentSnapshot | undefined;
}> {
  const baseQuery = collection(db, 'products');
  const categoryConstraint =
    category !== 'all' && category ? where('category', '==', category) : null;
  const pageConstraint = pageParam ? startAfter(pageParam) : null;

  const queries: QueryConstraint[] = [
    categoryConstraint,
    orderBy('saleRank'),
    limit(8),
    pageConstraint,
  ].filter(Boolean) as QueryConstraint[]; // 배열의 null값들 제거

  const productQuery = query(baseQuery, ...queries);
  const snapshot = await getDocs(productQuery);
  const lastDoc = snapshot.docs[snapshot.docs.length - 1]; // 마지막 문서

  return {
    products: snapshot.docs.map((doc) => doc.data() as ProductListType),
    lastDoc,
  };
}
```

화면에서 적용된 코드 입니다.<br/>
**'더 보기'** 버튼을 클릭하면, `fetchNextPage` 함수가 호출되어 다음 페이지의 상품 목록을 불러옵니다.
이 과정에서 `isFetchingNextPage`의 상태를 확인하여, 상품 데이터를 불러오는 동안 **'로딩 중...'** 텍스트를 보여줍니다.<br/>
또한, `hasNextPage`를 통해 추가로 불러올 상품 데이터가 있는지 여부를 판단합니다.

```tsx title="ProductList.tsx"
export default function ProductsList({ category }: Props) {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useGetProductList(category);
  const productsList = useRecoilValue(productsListAtom);

  return (
    <article className="flex flex-col items-center gap-20">
      {isLoading && (
        <div className="absolute inset-0 z-50 text-center pt-[30%] bg-slate-500/20">
          <GridSpinner />
        </div>
      )}
      {isError && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          Error loading data.
        </p>
      )}
      <ul className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productsList &&
          productsList.map((product) => (
            <li key={product.productId}>
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
      {!hasNextPage ? (
        <ScrollToTopBtn />
      ) : (
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
          className="flex justify-center p-1 rounded-lg font-semibold bg-navypoint hover:bg-pinkpoint text-white w-1/3"
          aria-label="NextPage Button"
        >
          {isFetchingNextPage ? '로딩 중...' : hasNextPage && '더 보기'}
        </button>
      )}
    </article>
  );
}
```

### 스크롤 복원(Scroll Restoration)

무한 스크롤 기능은 UX를 향상시키는 데 중요한 역할을 하지만, 스크롤 복원 기능이 없다면 오히려 좋지 않은 UX를 초래할 수 있습니다.
그렇기에 저는 **Next.js**가 제공하는 `scroll option`을 활용해 스크롤 복원 기능을 적용했습니다. 현재는 문제 없이 정상 작동하지만,
`experimental` 즉, 실험적인 기능이기 때문에 언제든지 변경되거나 사라질 수 있기 때문에 수동으로 처리할 수 있게 추후 개발 예정입니다.

```tsx title="next.config.js"
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  ...
}
```

### 결과

무한 스크롤과 스크롤 복원 기능을 개발하여 보다 좋은 UX를 제공할 수 있게 되었습니다.<br/>
프론트엔드 개발을 처음 시작했을 당시 무한 스크롤은 마치 퀘스트의 마지막 보스몹과 같이 어렵고 부담스러운 주제처럼 다가왔었습니다.<br/>
하지만 이제는 생각보다(?) 쉡게 구현하면서 예전보다 성장했구나 라는 생각이 들었습니다.

![infinitiscroll-sm](https://github.com/Seokho0120/peach-bloom/assets/93597794/e4924426-06a8-4b24-b144-8163e0fcd2fd)

## NextAuth Module Augmentation

평소 온라인 쇼핑을 자주하는데 매번 아이디와 비밀번호, 주소 등을 일일이 입력해야 하는 기존의 회원가입 방식을 정말 싫어하고 불편함을 느낍니다.
소셜 로그인이라는 편리한 기술이 등장한 지금, 기존의 회원가입 방식을 고수하는 사이트는 유저에게 불편함을 준다고 생각합니다.

따라서 저는 사용자 친화적인 서비스를 제공하기 위해 기존 로그인 방식 대신 소셜 로그인 방식을 도입했고, 일반적으로 가장 많이 사용되는
네이버와 카카오, 구글 기반의 소셜 로그인을 개발했습니다.

### NextAuth.js

`NextAuth`는 `Next` 애플리케이션에서 사용자 인증을 손쉽게 구현할 수 있도록 도와주는 라이브러리로,
Oauth 인증 방식의 다양한 인증공급자(Provider)를 지원하며, 자체 로그인 또한 구현할 수 있도록 도와줍니다.

- 다양한 인증 공급자 지원

  NextAuth는 다양한 인증 공급자(예: Google, Facebook, GitHub, Twitter 등)와 함께 사용할 수 있습니다.
  이를 통해 사용자는 웹 애플리케이션에 다양한 방법으로 로그인하거나 가입할 수 있습니다.

- 세션 관리

  사용자 세션을 관리하고 보안적으로 유지합니다. 사용자 로그인 상태를 추적하고 세션을 관리하여 애플리케이션 내에서 사용자 인증을 유지합니다.

- 간단한 설정

  NextAuth를 설정하는 것은 상대적으로 간단하며, 대부분의 설정은 설정 파일을 통해 수행됩니다.
  이를 통해 빠르게 인증 시스템을 설정할 수 있습니다.

- TypeScript 지원

  TypeScript를 사용하여 NextAuth를 구현할 수 있으며, 타입 안정성을 확보할 수 있습니다.

- 확장성

  확장 가능한 아키텍처를 제공하여 사용자 지정 로직 및 필요한 기능을 추가하거나 수정할 수 있습니다.

### 적용하기

각 Provider에 입력할 **Client Id**와 **Secret Key**는 구글, 카카오, 네이버 개발자 센터에서
등록한 앱의 ID와 Secret을 넣으면 되고, `env` 파일을 생성해 환경변수로 관리하면 됩니다.

```tsx title="auth.ts"
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
  ],
  ...
}
```

### Type 커스텀하기

사용자의 마이페이지에서 프로필 사진과 유저 이름, 닉네임, 계정 정보를 보여주고자 하였습니다. 하지만 `useSession` 메서드로
`session` 값을 불러올때 **`user` 객체에 원하는 정보가 들어있지 않았고 기본 정보 외 데이터가 필요**했으며, 아래 코드는 각 로그인 시 user 정보 입니다.

```tsx
// 구글
user {
  id: '102694937968612745404',
  name: 'Seokho Lee',
  email: 'seokho0120@gmail.com',
  image: 'https://lh3.googleusercontent.com/a/ACg8ocJa7VvOOo8OU5r9Os5qBArioaomoXbBv4dyyP32DOim=s96-c'
}

// 카카오
user {
  id: '3165573281',
  name: 'SH',
  email: 'seokho0120@naver.com',
  image: 'http://k.kakaocdn.net/dn/9Os9B/btrUyCE9Hqh/9MmTkF7YIz8w5c9GT06VKk/img_640x640.jpg'
}

// 네이버
user {
  id: 'dZ0GPuYforBfuRD4F8Qo2gHcW_xCiETOzJ9Cogrg1Ds',
  name: '이석호',
  email: 'seokho0120@naver.com',
  image: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png'
}
```

추가적으로 불러오고 싶은 데이터는 `username`과 `isAdmin` 입니다. `username`은 메일의 **@** 앞 부분만 가져와 닉네임으로 사용되며, `isAdmin`은 특정 계정에 관리자 권한을 부여하기 위해 필요합니다.

[next-auth/typescript](https://next-auth.js.org/getting-started/typescript#module-augmentation)
공식문서를 확인하면 `module augmentation` 모듈 확장이 가능합니다.<br/>
`next-auth.d.ts`이라는 type 정의 파일을 만들어, 원하는 속성을 추가하면 기존 속성을 덮어씌우게 된다는 것을 알 수 있습니다.
아래의 코드와 같이 필요한 속성 `username`과 `isAdmin`을 추가했습니다.

```tsx title="next-auth.d.ts"
import { AuthUser } from './AuthUserType';

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }
}

export type AuthUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  image?: string;
  isAdmin: boolean;
};
```

jwt 콜백은 JWT가 생성되거나, 업데이트 되었을 때 실행됩니다. 더불어 `userId`는 로그인이 필요한 곳에서 전부 사용되며,
대표적으로 **좋아요 기능과 장바구니**가 있습니다. 하지만 이 과정에서 `userId` **타입 관련 이슈**가 발생했습니다.

```tsx
// 네이버 로그인 user
user {
  id: 'dZ0GPuYforBfuRD4F8Qo2gHcW_xCiETOzJ9Cogrg1Ds',
  ...
}
```

네이버로 로그인 시 **user의 id**는 항상 **텍스트와 숫자가 합쳐진 문자열**로 들어오는데, 구글과 카카오는 **항상 숫자로 이루어진 문자열**로 들어옵니다.
userId가 필요한 로직에서 항상 **number 타입**으로 필요하기에, **네이버로 로그인 시 정규 표현식을 사용해 문자열에서 숫자만 추출**하여 `userId`로 설정해주었습니다.

```tsx title="auth.ts"
export const authOptions: NextAuthOptions = {
  providers: [
    ...
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const isNaver = user.email?.includes('naver');
        const userId = isNaver
          ? Number(user.id.match(/\d+/g)?.join(''))
          : user.id;

        token.id = userId;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      const user = session?.user;

      if (session.user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || user.name,
          isAdmin: token.sub === process.env.NEXT_PUBLIC_ADMIN_UID,
          id: token.id as number,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signIn',
  },
};
```

### 결과

이렇게 NextAuth의 기본 `Session` 타입을 커스터마이징하여 구글, 카카오, 네이버 소셜 로그인을 개발했습니다.<br/>
로그인은 NextAuth에서 제공하는 로그인 화면을 사용하지 않고, `/auth/signIn` 화면에서 로그인할 수 있도록 구현했습니다.

<img width="1422" alt="LoginPage" src="https://github.com/Seokho0120/peach-bloom/assets/93597794/16bc92d3-823d-4179-8179-2258e4369c8a">

## React Portal

**모달(Modal)** 은 원하는 내용을 화면 상에 띄워 표현하는 방식으로, 프로젝트 혹은 실무에서 자주 사용됩니다.
현업에서 모달을 만들 때 부모 컴포넌트의 CSS 영향을 받아 `z-index`와 같은 옵션을 조정하는 일이 불편했던 경험이 있습니다.

이러한 이슈를 해결하기 위해 React 18의 `Portals`를 이용해 모달을 구현하게되었습니다.<br/>
`Portals`은 부모 컴포넌트의 내부 DOM이 아닌 **미리 지정해준 DOM**에서 렌더링을 할 수 있습니다.
또한, **이벤트 버블링이 DOM 내부에서 가능**합니다.
이벤트 버블링은 중첩된 자식 요소에서 이벤트가 발생하면 부모로 이벤트가 전달되는 것을 말하는데,
이때 부모 DOM 밖에서 아래의 예시와 같이 구현해도 DOM 트리 위치와 상관없이 protal은 React트리 내부에 존재하기 때문에, React의 가상돔에 따른 이벤트 버블링이 됩니다.

```tsx {13}
import React from 'react';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div style={overlayStyle} />
      <div style={modalStyle}>
        <button onClick={onClose}>모달 닫기</button>
        {children}
      </div>
    </>,
    document.getElementById('portal'),
  );
};
```

**Portal의 장점**은 아래와 같이 정리할 수 있습니다.

- `<div id='root'>가 아닌, <div id='global-modal'>`에서 마운트되므로 부모 컴포넌트의 CSS영향을 받지 않습니다.
  따라서 `z-index`와 `overflow:hidden`과 같은 옵션으로 조정이 필요가 없습니다.

- 이벤트 버블링이 DOM 트리 부모의 컴포넌트가 아닌, React 트리의 Protal의 부모 컴포넌트로 전달되기 때문에 버블링에 대한 걱정없이 사용 가능합니다.

#### 적용하기

`createPortal`메서드를 이용해 Modal 컴포넌트를 만들고,
상위 HTML에 Modal 컴포넌트에서 적은 id 값을 가진 div 요소를 추가하면 됩니다.

```tsx title="Modal.tsx"
export default function Modal({
  text,
  modalText,
  isModalOpen,
  setIsModalOpen,
  onClick,
  goToCart,
}: Props) {
  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-950 opacity-20"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center bg-white w-96 p-10 rounded-lg">
          <button
            className="absolute top-3 right-3"
            onClick={() => setIsModalOpen(false)}
            aria-label="Cancel Button"
          >
            <CancelIcon />
          </button>
          <p className="mt-4">{text}</p>
          <button
            className="px-4 py-2 mt-10 rounded bg-navypoint hover:bg-pinkpoint text-white"
            onClick={goToCart}
            aria-label="Modal Button"
          >
            {modalText}
          </button>
        </div>
      </div>
    </>,
    document.getElementById('global-modal') as HTMLElement,
  );
}
```

Next.js의 루트 HTML 위치에 `<div id='global-modal'></div>`를 추가하여 모달이 마운트할 위치를 지정합니다.

```tsx title="layout.tsx" {13}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendardFont.variable} font-sans`}>
      <body className="w-full">
        <AuthSession>
          <Provider>
            <Navbar />
            <main className="grow min-h-screen">{children}</main>
            <div id="global-modal"></div>
            <Footer />
          </Provider>
        </AuthSession>
        <VercelAnalytics />
      </body>
    </html>
  );
}
```

### 결과

결과적으로 `Portal`을 활용하여 **Modal**을 보다 **더 유연하게 개발하고 불필요한 렌더링을 최소화**할 수 있었습니다.

![modal-sm](https://github.com/Seokho0120/peach-bloom/assets/93597794/d9ad901d-0b08-458e-b783-06fc4f8b621c)

## ISR

제품 상세 페이지는 자주 업데이트하지 않아도 되기 때문에, 빠른 로딩 시간과 SEO 최적화를 위해 정적 페이지로 구현했습니다.
또한, 오픈 그래프와 트위터 카드에 제품 사진과 정보를 포함하기 위한 목적도 있습니다.

`generateStaticParams` 함수를 통해 Firestore의 `productDetail` 컬렉션에서
productId에 해당하는 데이터를 정적으로 생성했습니다.

```tsx title="detail/[productId]"
export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, 'productDetail'));
  const productDetails = snapshot.docs.map(
    (doc) => doc.data() as ProductDetailType,
  );

  return productDetails.map((product) => ({
    params: { productId: product.productId },
  }));
}
```

### SSG, ISR

`SSG`와 `ISR`은 `CSR`과 다르게, **빌드 시점에 페이지를 미리 생성하여 정적인 HTML 파일을 제공**합니다.
이미 생성된 HTML을 가져오기 때문에 **SEO최적화에 유리**하고, **페이지 로딩 시간(TTV)**이 빠르며, **보안성**이 뛰어나고 **CDN에 캐싱**되는 장점이 있습니다.

하지만, `SSG`로 구현된 제품 상세페이지는 다시 빌드를 하지 않는 이상 데이터가 업데이트되지 않습니다. 이를 위해 매번 다시 빌드할 수 없으므로
`revalidate`를 사용해 페이지의 재생성을 요청하는 방식을 사용했으며, **주기적으로 정적 페이지를 업데이트하는 방식**이 `ISR`입니다.

적용 방법은 아주 간단합니다. 페이지 컴포넌트 상단에 `export const revalidate = 60 * 60 * 6`을 선언하면,
해당 페이지는 6시간 간격으로 업데이트 됩니다.

```tsx
export const revalidate = 60 * 60 * 6;

type Props = {
  params: {
    productId: number;
  };
};

export default function ProductDetailPage({ params: { productId } }: Props) {
  return (
    <section className="mx-6 md:mx-36 lg:mx-52 flex justify-center">
      <ProductDetail productId={productId} />
    </section>
  );
}
```

### 결과

제품 상세 페이지를 `SSG`가 아닌 `ISR`로 구현하여 **주기적인 데이터 업데이트를 통해 최신 정보를 제공**하면서도
**SEO 최적화**에 유리한 환경을 구축하였습니다.

## SEO

Next.js를 이용하면 정적 메타데이터(Static Metadata)와 동적 메타데이터(Dynamic Metadata),
2가지 방법으로 metadata를 생성할 수 있습니다.

페이지 내부에 metadata를 export하여 메타데이터 객체를 생성합니다.
metadata객체의 속성인 `template`를 활용하면, 페이지 별로 타이틀이 바뀌게 됩니다.

### 정적 메타데이터(Static Metadata)

```tsx title="layout.tsx"
export const metadata: Metadata = {
  metadataBase: new URL('https://peach-bloom.vercel.app/'),
  title: {
    default: 'Peach Bloom',
    template: 'Peach Bloom | %s',
  },
  description: '화장품을 판매하는 뷰티 종합 쇼핑몰 입니다.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Peach Bloom',
    description: '화장품을 판매하는 뷰티 종합 쇼핑몰 입니다.',
    url: 'https://peach-bloom.vercel.app/',
    locale: 'ko_KR',
    type: 'website',
    siteName: 'Peach Bloom',
  },
  twitter: {
    title: 'Peach Bloom',
    description: '화장품을 판매하는 뷰티 종합 쇼핑몰 입니다.',
    creator: '@River',
    images: {
      url: 'https://peach-bloom.vercel.app/',
      alt: 'peach-bloom',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'standard',
      'max-snippet': -1,
    },
  },
};
```

### 동적 메타데이터(Dynamic Metadata)

**[slug]** 와 같이 동적 라우팅을 하는 경우 동적인 값을 받아오기 위해 `generateMetadata` 함수를 사용합니다.
메타데이터를 `generateMetadata` 함수를 사용해 `fetch`하여 동적으로 생성합니다.

```tsx title="products/[categories]"
export async function generateMetadata({
  params: { categories },
}: Props): Promise<Metadata> {
  const { products } = await getProductsList(categories);

  return products
    ? {
        title: `${categories} 의 제품 리스트`,
        description: `${categories} 에 해당하는 제품들을 확인할 수 있습니다.`,
        openGraph: {
          title: `${categories} 의 제품 리스트`,
          description: `${categories}에 해당하는 제품들을 확인할 수 있습니다.`,
          images: [products[0].imageUrl],
          type: 'website',
          url: `https://peach-bloom.vercel.app/detail/${categories}`,
          emails: 'seokho0120@gmail.com',
        },
      }
    : {};
}
```

### robots.txt

`robots.txt`은 봇들에게 사이트에 어떤 페이지가 있는지 알려주는,
크롤러에게 웹페이지를 수집할 수 있도록 허용하거나 제한하는 파일입니다.

```tsx title="robots.ts"
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://peach-bloom.vercel.app/sitemap.xml',
    host: 'https://peach-bloom.vercel.app/',
  };
}
```

### sitemap.xml

`sitemap`은 사이트에 있는 페이지, 동영상 및 기타 파일과 그 관계에 관한 정보를 제공하는 파일입니다.
Google과 같은 검색엔진은 이 파일을 읽고 사이트를 더 효율적으로 크롤링합니다.

```tsx title="robots.ts"
import { MetadataRoute } from 'next';
import { getProductsList } from './api/firesotre';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const CATEGORIES = [
    'all',
    'exclusive',
    'skincare',
    'haircare',
    'bodycare',
    'makeup',
    'mens',
  ];

  const categoryPages = CATEGORIES.map((category) => ({
    url: `https://peach-bloom.vercel.app/products/${category}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const productLists = await Promise.all(
    CATEGORIES.map((category) => getProductsList(category)),
  );

  const productPages = productLists.flat().flatMap((productList) =>
    productList.products.map((product) => ({
      url: `https://peach-bloom.vercel.app/products/${product.productId}`,
      lastModified: new Date().toISOString().split('T')[0],
    })),
  );

  return [...categoryPages, ...productPages];
}
```

### 결과

이와 같이 Next에서 제공하는 API를 사용해 쉽고 간단하게 검색 엔진 최적화를 구현했습니다.

> ✨ 아래의 링크에서 확인할 수 있습니다.

- [peach-bloom.vercel.app/sitemap.xml](https://peach-bloom.vercel.app/sitemap.xml)
- [peach-bloom.vercel.app/robots.txt](https://peach-bloom.vercel.app/robots.txt)

## Lighthouse 시작하기

> ✨ Lighthouse의 정확한 측정을 위해서는 **항상 프로덕션 환경에서 테스트**를 해야합니다.

이미 배포된 웹 페이지들은 상관 없지만, 개발 환경에서는 프로덕션 환경보다 성능이 더 낮게 측정되기 때문에<br/>
**빌드를 한 뒤 yarn start로 프로덕션 환경에서 테스트**를 해야합니다.

```tsx
yarn build && yarn start

npm run build && npm run start
```

- **Performance**

  - 웹 페이지의 웹 성능을 측정
  - 화면에 콘텐츠가 표시되는 데에 시간이 얼마나 걸리는지
  - 표시된 후 사용자와 상호작용하기까지 얼마나 걸리는지
  - 화면에 불안정한 요소는 없는지 등

- **Accessibility**

  - 웹 페이지가 웹 접근성을 잘 갖추고 있는지 확인
  - 대체 텍스트를 잘 작성했는지
  - 배경색과 콘텐츠 색상의 대비가 충분한지
  - 적절한 WAI-ARIA 속성을 사용했는지 등

- **Best Practices**

  - 웹 페이지가 웹 표준 모범 사례를 잘 따르고 있는지 확인
  - HTTPS 프로토콜을 사용하는지
  - 사용자가 확인할 확률은 높지 않지만 콘솔 창에 오류가 표시되지는 않는지 등

- **SEO**

  - 웹 페이지가 검색 엔진 최적화가 잘 되었는지 확인
  - 어플리케이션의 robot.txt가 유효한지
  - `<meta>`요소가 잘 작성되어있는지, 텍스트 크기가 읽기에 무리가 없는지 등

- **PWA(Progressive Web App)**

  - 웹 페이지가 모바일 애플리케이션으로서도 잘 작동하는지 확이
  - 앱 아이콘을 제공하는지
  - 스플래시 화면이 있는지
  - 화면 크기에 맞게 콘텐츠를 적절하게 배치했는지 등

![image](https://github.com/Seokho0120/peach-bloom/assets/93597794/6881cc2f-8e85-440b-a0bc-b67bda77b281)

## Performance

Performance는 사용자가 얼마나 빠르게 컨텐츠를 인식하는지를 평가하는 지표이며, 성능 점수는 6가지 점수들의 평균값으로 계산됩니다.

![performance](https://github.com/Seokho0120/peach-bloom/assets/93597794/0d8cac46-097a-4c20-aa96-58e293450f38)

### LCP(Largest Contentful Paint) - 25%

- 가장 큰 컨텐츠를 렌더링 하는데 걸리는 시간

![lcp](https://github.com/Seokho0120/peach-bloom/assets/93597794/1fb619db-1c11-4685-9755-045a496346be)

### TBT(Total Blocking Time) - 30%

- 사용자 입력에 페이지가 응답하지 못하도록 차단되어진 총 시간
- FCP와 TTI 사이에 긴 시간이 걸리는 작업들을 모두 기록하여 측정합니다.

![tbt](https://github.com/Seokho0120/peach-bloom/assets/93597794/e2241c10-ecbc-4f9d-b446-ea4b694b0295)

### CLS(Cumulative Layout Shift) - 15%

- 사용자에게 발생하는 레이아웃 이동 빈도 측정
- 크기를 알 수 없는 이미지나 동영상, 대체 크기보다 크거나 작게 렌더링 된 폰트 등 예상치 못한 레이아웃 이동에 대한 점수

### TTI(Time to Interactive) - 10%

- 사용자와 페이지가 완전히 상호작용 가능하기까지의 시간

### FCP(First Contentful Paint) - 10%

- 페이지 로드가 시작된 후 뷰포트내에 의미있는 컨텐츠 일부가 처음 화면에 렌더링될때까지의 시간

### Speed Index - 10%

- 컨텐츠가 눈에 띄게 채워지는 속도 측정

## 개선 방법

**Performance** 성능 개선을 위해 다음과 같은 방식을 사용할 수 있습니다.

- ✨ **번들 최적화**

  - Javascript 실행 시간을 단축하면 **사용자가 더 빨리 상호작용**을 할 수 있기 때문에 TBT와 TTI 성능을 개선할 수 있습니다.
  - next의 `dynamic import`를 사용하면 현재 필요한 코드만 다운받을 수 있기 때문에 번들 사이즈를 줄일 수 있습니다.

- ✨ **이미지 최적화**

  - 웹페이지에서 대부분 가장 큰 용량을 차지하는 요소는 이미지 입니다. 그렇기에 **LCP를 개선**하기 위해서는 이미지 최적화가 가장 중요합니다.
    이미지 최적화만 잘해도 Performance 점수의 30% 이상 개선할 수 있다고 합니다.
  - 압축률이 좋은 **avif, webp** 파일 형식을 사용
  - `next/image`를 사용해 `lazy` 속성으로 필요에 따라 불러오거나, `priority` 속성으로 가장 먼저 불러오기

- ✨ **폰트 최적화**

  - 폰트 로딩이 지연되면 **컨텐츠를 늦게 표시하는데 영향**을 주며, **레이아웃 움직임을 유발**할 수 있기 때문에 FCP나 CLS 성능에 영항을 줄 수 있습니다.
  - `font-display: swap` 속성으로 폰트 로딩 전에 시스템 폰트를 보여주며, 빈 화면을 방지합니다.
  - `next/font`를 사용하면 네트워크 요청 없이 바로 font 사용 가능

## 개선 하기

### ✨ 번들 최적화

사용자가 **컨텐츠를 얼마나 빠르게 인식할 수 있는지**가 가장 중요하다고 판단하여, **Performance 항목을 개선하기 위해 집중**했습니다.

### bundle-analyzer 적용 및 리팩토링

번들 파일이 어떻게 구성되었는지 쉽게 파악하게 해주는 시각화 도구 입니다.

```tsx
// 설치
yarn add -D @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
  openAnalyzer: true,
});
```

`@next/bundle-analyzer`을 설치 후 실행하면 3가지 html 결과물이 생성됩니다. client.html, edge.html, nodejs.html 중 클라이언트 번들링 결과를 시각적으로 분석한 **client.html**을 확인했습니다.

![analyzer11](https://github.com/Seokho0120/peach-bloom/assets/93597794/e744448f-ff18-4fbb-8765-82351c395cd2)

번들 파일 중 가장 큰 사이즈에 해당하는 파일 2개입니다. 제 눈에 가장 띄었던것은 `next-auth`와 `crypto-browserify`였습니다.

<p align='center'>
  <img
    src='https://github.com/Seokho0120/peach-bloom/assets/93597794/d53ef60d-2540-457d-8fb7-154a7c521707'
    width={800}
    alt='crypto-browserify'
  />
</p>

<img
    src='https://github.com/Seokho0120/peach-bloom/assets/93597794/dcce6bf9-969f-452b-9ad9-3f340b01e61c'
    width={800}
    alt='crypto-browserify'
  />

</p>

특히, `crypto-browserify` 라는 친구가 있는데, 그런걸 쓰지 않는데? 라고 생각했지만

<p align='center'>
  <img
    src='https://github.com/Seokho0120/peach-bloom/assets/93597794/5ec7e759-f88f-482d-b247-afba0510a828'
    width={900}
    alt='crypto-browserify'
  />
</p>

코드를 간결하게 사용하기 위해 서버와 클라이언트에서 session 정보를 가져오는 **`useUserSession` 커스텀훅이 오히려
불필요한 리소스를 발생**시킨다고 판단했습니다.

아래의 코드는 개선 전 코드입니다. 생각해보니 당연한것이, 클라이언트와 서버에서 사용되는 `next-auth`의 훅들을 한곳에서 사용하는게 적절하지 않았습니다.

```tsx title="useUserSession.ts"
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export function useUserSession() {
  const { data: session } = useSession();
  const user = session?.user;

  return user;
}

export async function getServerUser() {
  const sessoin = await getServerSession(authOptions);
  const user = sessoin?.user;
}
```

그렇기에 client에서 session 정보를 불러오는 `useSession` 훅을 삭제하고, 사용하는 페이지에서 `useSession`을 직접 사용하도록 수정했습니다.

```tsx title="useUserSession.ts"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function getServerUser() {
  const sessoin = await getServerSession(authOptions);
  const user = sessoin?.user;
}
```

```tsx title="MyInfo.tsx"
'use client';

import { signOut, useSession } from 'next-auth/react';

export default function MyInfo() {
  const { data: session } = useSession();
  const user = session?.user;
  ...
}
```

### dynamic import

**dynamic import**는 필요한 모듈이나 컴포넌트를 **필요한 시점에 비동기적으로 로드**하는 기능입니다.
이를 통해 초기 로딩을 최적화하고 특정 기능이나 페이지가 필요한 경우에만 해당 리소스를 가져올 수 있습니다.

즉, 사용자의 **상호작용에 따라 필요한 요소**만 로드하게 되며, 코드 분할을 통해 **초기 번들 사이즈와 초기 로딩 속도를 크게 개선**할 수 있습니다.

대표적으로 `Loading spinner`와 같이 초기 렌더링에 필요하지 않은 요소에서 주로 사용됩니다.
이 외에도 미리 렌더링하지 않아도 되는 컴포넌트에 dynamic을 적용했습니다.

```tsx title="GridSpinner.tsx"
import dynamic from 'next/dynamic';

const GridLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.GridLoader),
  {
    ssr: false,
  },
);

type Props = {
  color?: string;
};

export default function GridSpinner({ color = 'red' }: Props) {
  return <GridLoader color={color} size={20} />;
}
```

```tsx title="app/page.tsx"
import dynamic from 'next/dynamic';
const Carousel = dynamic(() => import('@/components/Carousel'));
const ScrollToTopBtn = dynamic(() => import('@/components/ScrollToTopBtn'));

export default function Home() {
  return (
    <main className="mx-6 md:mx-48 lg:mx-72">
      <Carousel />
      <ScrollToTopBtn />
    </main>
  );
}
```

### Tree Shaking

> ✨ Tree shaking은 사용되지 않는 코드를 제거하기 위해 JavaScript 컨텍스트에서 일반적으로 사용되는 용어입니다. [webpack - Tree Shaking](https://webpack.kr/guides/tree-shaking/)

사실 Tree shaking은 구글링을 통해 처음 접하게된 방법입니다. 실제로 사용하지 않는 코드는 `import`하지 않고,
정확하게 필요한 컴포넌트와 함수들만 사용한다고 생각했는데, Tree shaking을 적용하는 것만으로도 **초기 번들 사이즈가 적절하게 조정**되었습니다.

사용 방법은 생각보다 간단합니다.<br/>
`package.json`에 `sideEffects` 옵션을 제공하여 웹팩에게 사이드 이펙트(부수 효과)가 있는 파일들을 알려줄 수 있습니다.
`sideEffects`를 false로 설정하면, 사이드 이펙트가 없기 때문에 웹팩에게 사용하지 않은 export는 빌드 단계에서 제거하도록 알려줍니다.

```tsx title="package.json" {4}
{
  "name": "peach-bloom",
  "version": "0.1.0",
  "sideEffects": false,
  ...
}
```

`sideEffects가` 있는 파일이 있으면 배열 안에 Glob 패턴의 문자열 값을 넣어줍니다. 이 파일들은 Tree Shaking 대상에서 제거됩니다.

```tsx title="package.json"
{
  "name": "peach-bloom",
  "version": "0.1.0",
  "sideEffects": [
    '**/*.css'
  ]
  ...
}
```

### 결과

리팩토링, dynamic import, tree shaking을 적용하고 재빌드한 후
bundle-analyzer로 확인한 결과, 이전에 대용량 사이즈였던 `next-auth`와 `crypto-browserify`를 포함한 파일이 사라졌습니다.

처음에는 두 파일이 보이지 않아 오류인가 싶었는데, 알고보니 bundle-analyzer는 특정 모듈의 크기가 줄어들면
해당 모듈이 작아지거나, 사라진다는 것을 확인했습니다.

결론적으로 초기에 **대용량 번들 파일들을 client.html에서 보이지 않을 정도로 번들 사이즈 최적화를 구현**했습니다.

<p align='center'>
  <img src='https://github.com/Seokho0120/peach-bloom/assets/93597794/d4d8d413-7a3f-4637-a6a3-933147e27f0f' width='auto' alt='analyzer22' />
</p>

### ✨ 이미지 최적화

이미지는 웹사이트 리소스 중 용량이 큰 편에 속하기 때문에 로드 속도가 오래 걸리며, 컨텐츠 중 가장 큰 영역을 차지하는 경우
**LCP 성능에 큰 영향**을 줄 수 있습니다.
그렇기에 **이미지 최적화는 시간 투자 대비 성능 효율이 가장 좋다고** 생각합니다.

#### webp, avif 형식과 이미지 사이즈

이미지 최적화의 기본은 **포맷 조정과 리사이징** 입니다. 사실 사이즈 조정은 당연하지만 생각보다 까다로운 작업이 될 수 있습니다.
그렇기에 작업 전에 웹사이트에서 사용하는 이미지의 최대 넓이와 높이 값을 인지하고 설정하는 것이 좋습니다.

이미지 포맷은 jpg, png, webp 등 다양한 포맷이 존재합니다.<br/>
`webp`을 사용하면 jpg, png보다 크기를 **26% 이상 줄일 수 있습니다.**
`webp`는 구글이 웹페이지 로딩 속도를 높이기 위해 만든 포맷이며, **품질은 유지하면서 파일 크기를 더 작게 만드는** 무손실 압축 확장자입니다.

더불어 `webp`보다 **20% 높은 압축률을 자랑하는 형식**이 등장 했으며, 무손실 압축과 고품질 이미지의 특징을 가진 `avif`형식 입니다.
`jpg`와 비교 시 동일 품질 대비 **최대 10배의 작은 용량**을 가집니다.

![formatcategory](https://github.com/Seokho0120/peach-bloom/assets/93597794/54428c2e-b6ce-4e77-b019-83a3ee382213)

### Cloudinary

Cloudinary는 이미지와 동영상을 관리하고 최적화, 전송할 수 있는 클라우드 기반 서비스입니다.<br/>
Cloudinary에서 제공하는 주요 기능에는 이미지 업로드와 저장 및 관리, 최적화를 위한 URL 기반 변환과 자동형식 변환,
이미지 커스텀, 글로벌 CDN을 통한 빠른 전송 등이 있습니다.

가장 많이 사용되는 AWS S3, Firebase Storage와 다르게 이미지와 동영상만을 위한 서비스이며, 특히 **업로드 즉시
빠르고 쉽게 최적화를 구현**할 수 있기 때문에 선택했습니다.

### Cloudinary 적용하기

업로드 과정은 대략 아래의 순서와 같습니다.

- 관리자권한 계정 유저가 제품 정보를 `product` 상태에 저장
- `uploadImage` 함수를 통해 선택된 이미지를 Cloudinary에 업로드하고, 변환된 이미지 URL을 `url` 변수에 저장
- `addNewProduct` 함수를 호출해 Firestore에 제품 정보와 이미지 URL 추가
- 추가된 `ProductId`에 해당하는 제품 상세 내용 업로드 페이지로 이동

```tsx title="addNewProduct.tsx"
const [file, setFile] = useState<File>();
const [product, setProduct] = useState<ProductListType>({
  brandTitle: '',
  category: '',
  imageUrl: '',
 ...
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, files, checked, type } = e.target;

  if (name === 'file') {
    if (!files) return;
    setFile(files && files[0]);
    return;
  }

  const parsedValue = type === 'number' ? Number(value) : value;

  if (type === 'checkbox') {
    setProduct((product) => ({ ...product, [name]: checked }));
  } else {
    setProduct((product) => ({ ...product, [name]: parsedValue }));
  }
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!file) return;

  const url = await uploadImage(file);
  const firebaseProductId = await addNewProduct({ product, imageUrl: url });

  const data = await getProductById(firebaseProductId);

  await router.push(`/upload/${data}`); //제품 디테일 업로드로 이동
};
```

이미지를 업로드하는 함수 `uploadImage`에서 **Cloudinary의
기능들(이미지 리사이징, 포멧 최적화)을 이용해 이미지 최적화**를 구현했습니다.

#### 이미지 리사이징

이미지 리사이징을 위해 `w_500`과 `ar_1:1` 옵션을 사용했습니다.<br/>
웹사이트에서 이미지의 `width`가 500이상 필요한 화면이 없기 때문에 `width` 를 고정값으로 지정했으며,
`width` 만 지정하면 비율이 일정하지 않을 수 있기 때문에 `aspect ratio=1:1`을 의미하는
`ar_1:1` 옵션으로 정사각형 비율을 유지시켰습니다.

#### 포맷 최적화

마지막으로 포맷 최적화를 위해 `f_auto`옵션을 사용했습니다.<br/>
`format=auto`를 의미하며, 브라우저에 알맞는 format으로 자동 변환하는 기능입니다.
최신 버전의 chrome 같은 경우 `avif`와 `webp`로,
`avif`를 지원하지 않는 safari 브라우저 같은 경우 `jpeg`로 이미지를 서빙해줍니다.

```tsx title="uploader.ts" {18}
export async function uploadImage(file: File) {
  const data = new FormData();
  data.append('file', file);
  data.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINANRY_PRESET || '',
  );

  try {
    const response = await axios({
      method: 'POST',
      url: process.env.NEXT_PUBLIC_CLOUDINANRY_URL,
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const url = response.data.url;
    const transformedUrl = url.replace(
      '/upload/',
      '/upload/w_500,ar_1:1,f_auto/',
    );

    return transformedUrl;
  } catch (error) {
    console.error('이미지 업로드 에러 발생 🚨', error);
    throw error;
  }
}
```

### 결과

Cloudinary가 제공하는 다양한 기능을 적절히 활용함으로써, **이미지들의 사이즈를 평균 80% 이상 개선하며 이미지 최적화**를 구현했습니다.

> ✨ 링크를 통해 **개선 전과 후의 이미지를 비교**할 수 있습니다.

- [개선 전](https://res.cloudinary.com/dsycahvpu/image/upload/v1700818085/bg6o5ayafbbjfdmaudas.jpg)
- [개선 후](https://res.cloudinary.com/dsycahvpu/image/upload/w_500,ar_1:1,q_auto:best/v1700818085/bg6o5ayafbbjfdmaudas.jpg)

![cloudinary-image](https://github.com/Seokho0120/peach-bloom/assets/93597794/47726a4c-ceba-4e94-a8e8-8798cfc79b6b)

### Next/Image

Next/Image 컴포넌트에서 제공하는 대표적인 기능은 다음의 3가지입니다.

- #### lazy loading

  lazy loading은 이미지 로드하는 시점을 필요할 때 까지 지연시키는 기술입니다.<br/>
  Next/Image를 사용하면 자동으로 lazy loading이 적용되며, 적용하고 싶지 않은 경우 기능을 끌 수 있습니다. Image 컴포넌트의
  priority 옵션을 true로 설정하거나, loading에 eager 값을 설정하면됩니다. 빌드 시 priority 값을 설정하는 것이 더 권장되는 방식입니다.

- #### 이미지 사이즈 최적화

  Next/Image는 디바이스 크기 별로 srcSet을 미리 지정해두고, 사용자의 디바이스에 맞는 이미지를 다운로드할 수 있게 지원합니다.
  또한, Next.js는 이미지를 webp와 같이 용량이 작은 포맥으로 변환해서 제공합니다.

  그렇다면 Next/Image를 사용하면 포맷 최적화가 되는데, Cloudinary의 포맷 최적화 기능을 사용했을까요?<br/>

  Next/Image를 사용했을 시 대부분 webp 형식으로 최적화가 이루어졌는데, Cloudinary의 포맷 최적화를 사용하니 avif 형식으로 변환되는
  비율이 더 높았습니다. 그렇기에 Cloudinary의 포맷 최적화 기능과 Next/Image를 함께 사용해서 최상의 최적화를 시도했습니다.

- #### placeholder 제공

  Next/Image는 레이아웃이 흔들리는 현상을 방지하기 위해 placeholder를 제공합니다.
  placeholder는 빈 영역 또는 blur 이미지(로컬 이미지의 경우 build 타임에 생성,
  리모트 이미지의 경우에는 base64로 인코딩된 data url 을 지정해 줘야 함)로 적용할 수도 있고, 커스텀 하게 설정할 수도 있습니다.

대표적인 기능들 덕분에 얻게되는 장점은 아래와 같습니다.

1. 성능 향상: 디바이스마다 적절한 사이즈의 이미지를 서빙하고, webp와 같은 작은 용량의 포맷을 사용함
2. 시각적인 안정성: 이미지 로드 전 placeholder를 제공하여 CLS(Cumulative Layout Shift) 방지
3. 빠른 페이지 로딩: viewport에 들어왔을 때만 이미지를 로드하고, 작은 사이즈의 blur 이미지를 미리 로딩하여 사용자에게 더 빠른 페이지를 보여줄 수 있음

#### 결과

srcSet을 개선하여 필요에 맞게 이미지를 로드하여 효율적으로 사용하게 되었습니다.

![srcSet](https://github.com/Seokho0120/peach-bloom/assets/93597794/c6363040-7422-4995-8c29-e680fd0535f6)

#### Priority

`priority`는 우선순위라는 뜻으로, 이 속성을 설정하면 **브라우저가 미리 렌더링**을 합니다. <br/>
그래서 랜딩 페이지에서 제일 처음 보이는 이미지에는 `priority`을 지정하는게 **성능면에서 당연히 유리**합니다.

사실 처음에는 모든 Image에 `priority`를 설정하면 LCP 성능이 개선되는줄 알았습니다.
하지만 모든 Image에 `priority`를 설정하면, 웹 브라우저는 모든 이미지를 동시에 불러오려고 시도하고, 이는 **네트워크에 부담을 주기에 LCP를 느리게** 만들 수 있습니다.
또한, 중요하지 않은 이미지가 먼저 로드되어 **중요한 이미지의 로드를 지연시키는 이슈**가 발생할 수도 있습니다.

`priority` 속성은 대표적으로 메인 화면에서 유용하게 사용되었습니다.<br/>
화면 로드 시 처음에 보이는 이미지의 개수만 `priority` 속성을 적용 시키기 위해 `priorityIndices` prop을
`CarouselSwiper`컴포넌트에 전달해주며 **type 별로 초기 로드되는 이미지의 개수를 다르게 설정**했습니다.

```tsx title="Carousel.tsx" {9, 17 ,25}
export default function Carousel() {
  ...
  return (
    <section className='flex flex-col gap-8 md:gap-12 lg:gap-20'>
      <CarouselSwiper
        title='BEST'
        subtitle='인기 많은 상품만 모았어요!'
        productList={mainRankingList}
        priorityIndices={[0]}
        type='BEST'
      />

      <CarouselSwiper
        title='On Sale'
        subtitle='할인 중인 상품만 모았어요!'
        productList={mainSaleRateList}
        priorityIndices={[0, 1, 2]}
        type='On Sale'
      />

      <CarouselSwiper
        title='New Arrival'
        subtitle='새로운 화장품을 만나보세요!'
        productList={mainIsNewList}
        priorityIndices={[0, 1, 2]}
        type='New Arrival'
      />
    </section>
  );
}
```

```tsx title="Carousel.tsx" {15, 27}
export default function CarouselSwiper(...) {
  ...
  const swiperSlides = useMemo(() => {
    if (type === 'BEST') {
      return productList.map(
        ({ productId, brandTitle, productTitle, imageUrl }, idx) => (
          <SwiperSlide key={productId}>
            <div className='relative flex justify-center sm:z-0'>
              ...
              <Image
                src={imageUrl}
                alt={productTitle}
                fill
                className='relative object-cover rounded-full z-0'
                priority={priorityIndices.includes(idx)}
                sizes='(min-width: 1440px) 450px, 100vw'
              />
            </div>
          </SwiperSlide>
        )
      );
    } else {
      return productList.map((product, idx) => (
        <SwiperSlide key={product.productId}>
          <ProductCard
            product={product}
            priority={priorityIndices.includes(idx)}
          />
        </SwiperSlide>
      ));
    }
  }, [handleProductClick, priorityIndices, productList, type]);
...
}
```

#### 결과

`priority`를 적절하게 설정하여 메인 화면에서 BEST 상품은 1개, 나머지는 각 3개씩
총 7개의 이미지가 **미리 렌더링되어 LCP 성능을 개선**했습니다.

![priority](https://github.com/Seokho0120/peach-bloom/assets/93597794/bd464591-d595-478d-9658-0d6cde03666e)

#### placeholder

사용자가 **예상하지 못한 순간 레이아웃이 흔들리는 현상을 CLS(Cumulative Layout Shift)** 라고 합니다<br/>
만약 이미지 로드되기 전까지 영역의 높이가 0이었다가, 로드된 후 이미지만큼 영역이 확장된다면 CLS 성능에 안 좋은 영향을 줍니다.

`next/image`는 `placeholder` 속성을 통해 **빈 영역 또는 blur 이미지를 제공하여, 레이아웃이 흔들리지 않게 합니다.**
기본 설정으로 빈 영역을 제공합니다.

#### placeholder 적용하기

`placeholder`는 로컬 이미지와 리모트 이미지 여부에 따라 사용 방법이 다릅니다.<br/>
로컬 이미지의 경우 빌드 타임에 import된 이미지 파일을 기준으로 자동으로 width, height를 지정하고, base64로 인코딩된
blur 이미지가 생성되어 별도의 작업 없이 `placeholder='blur'`를 사용할 수 있습니다.

그렇기에 로컬에서 사용하는 이미지인 `Symbol`과 `Logo`에 `placeholder='blur'`를 적용했습니다.

```tsx title="Signin.tsx"
export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Image
        src={Symbol}
        alt='Symbol'
        className={`my-8 w-[8%] sm:w-[5%] h-auto`}
        placeholder='blur' // Optional blur-up while loading
        priority
      />
      ...
  )}
```

#### 결과

**로컬**에서 사용하는 이미지인 **`Symbol`과 `Logo`에 blur 처리가 되어 CLS를 개선**했습니다.

![placeholder-sm](https://github.com/Seokho0120/peach-bloom/assets/93597794/1430aa14-ad7c-491f-908c-e4c898014332)

### ✨ 폰트 최적화

**swap 속성**

- CSS의 `@font-face` 부분에 `font-display: swap` 를 적용하면 폰트가 로딩되지 않았을 때 시스템 폰트를 보여줍니다.
  따라서 **화면이 비어있는 시간이 줄어들어 FP(First Content Paint) 시간을 단축**할 수 있습니다.

**@next/font**

- 구글 폰트를 사용한다면 폰트를 다운받기 위해 구글에 네트워크 요청을 보냅니다.
  하지만 `@next/font`를 사용한다면, 네트워크 요청 없이 폰트를 바로 사용할 수 있기에 네트워크 페이로드를 줄일 수 있습니다.

#### 적용하기

[Next.js의 가이드](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#local-fonts)에 따라 **최적화를 진행**했습니다.<br/>
`next/font/local`의 로컬 폰트를 로드하고 **swap 설정**을 해줬고, `layout`의 **html에 적용**했습니다.

```tsx title="fontUtil" {22, 23}
import localFont from 'next/font/local';

export const pretendardFont = localFont({
  src: [
    {
      path: '../../public/fonts/NanumSquareL.ttf',
      weight: '300',
    },
    {
      path: '../../public/fonts/NanumSquareR.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/NanumSquareB.ttf',
      weight: '600',
    },
    {
      path: '../../public/fonts/NanumSquareEB.ttf',
      weight: '700',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});
```

```tsx title="layout.tsx" {9}
import { pretendardFont } from '@/utils/fontUtil';
...
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className={`${pretendardFont.variable} font-sans`}>
      ...
    </html>
  );
}
```

#### 결과

폰트가 google이 아닌 **next에서 로드**되는 것을 확인할 수 있으며 **CLS 점수도 0점으로 최적화**할 수 있었습니다.

<p align='center'>
  <img src='https://github.com/Seokho0120/peach-bloom/assets/93597794/e4d9fb72-e8b0-4122-bf96-243ef21a9cb0' width='auto' alt='analyzer22' />
</p>

## 성능 개선 결과 및 회고

Lighthouse를 통해 이미지와 폰트 등 다양한 리소스의 최적화 방법과 번들 사이즈 측정 등 다양한 방식으로 개선할 수 있었습니다.

✨ **최적화 이전** <br/>
Lighthouse의 Performance 점수는 **67점**입니다.

<p align='center'>
  <img src='https://github.com/Seokho0120/peach-bloom/assets/93597794/05485f57-175c-41f9-9875-017a6e7b1d7c' width='auto' alt='analyzer22' />
</p>

✨ **최적화 이후** <br/>
Lighthouse의 Performance 점수는 **97점**으로, 총 **57% 향상에 성공**했습니다.<br/>
특히 LCP와 Speed Index가 가장 많이 개선되었고, 실제로 개선 전 보다 웹사이트의 UX가 눈에 띄게 유연함을 체감할 수 있었습니다.

**FCP** 0.3s → 0.3s<br/>
**LCP** 2.7s → 1.3s<br/>
**TBT** 0ms → 0ms<br/>
**CLS** 0.328 → 0<br/>
**Speed Index** 1.5s → 0.7s<br/>

<p align='center'>
  <img src='https://github.com/Seokho0120/peach-bloom/assets/93597794/311e5ed8-e5f4-4207-8013-9b2c30d43e0a' width='auto' alt='analyzer22' />
</p>

부끄럽지만 현업에서도, 이전의 프로젝트에서도 이처럼 성능 개선에 집중한 경험이 없었습니다. 항상 기능 구현에만 초점을 두고 급하게 개발하던
제가 성능에 집중하며 테스트를 한다니 감개무량합니다.

물론 아직 더 개선해야할 점이 많이 남아있으며, 추후 First Load JS에 집중해 개선 예정이고 댓글과 스켈레톤 UI, 결제 연동 등
추가 기능도 개발 예정입니다.

## ✨ 총 정리

- Lighthouse의 Performance 62점 → 97점 / 성능 57% 향상
- LCP 2.7s → 1.3s / CLS 0.328 → 0 / Speed Index 1.5s → 0.7s 개선
- bundle-analyzer를 사용해 번들 사이즈 측정 후 Client 번들 파일을 위주로 시간 투자대비 효율이 좋은 순서로 리팩토링 진행
- Next.js의 Dynamic import를 사용해 코드 분할을 적용하여 번들 파일 사이즈 감소 및 초기 로딩 속도 향상
- Tree Shaking을 적용해 사용하지 않는 코드 제거 및 번들 사이즈 최소화
- Next/Image의 srcSet 재설정, 이미지 우선순위에 맞게 priority 사용, 로컬 이미지에 placeholder 적용하여 이미지 최적화
- Cloudinary로 이미지를 관리하며, 리사이징 및 포맷 최적화 기능으로 이미지 평균 사이즈 80% 감소 (캐러셀 이미지 43KB → 7KB)
- Next/Font를 활용하고 swap 설정으로 폰트 최적화
