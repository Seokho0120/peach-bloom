import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="mx-auto flex h-fit min-w-[360px] flex-col items-center justify-center gap-y-5 bg-slate-700 py-12 text-slate-400 mt-36 px-6 md:px-24 lg:px-32">
      <section className="flex pl-2 items-center gap-10 border-b border-slate-400 w-full font-semibold text-lg p-4">
        <p className="cursor-pointer">
          <Link
            href="https://github.com/Seokho0120/peach-bloom"
            target="_blank"
            aria-label="GitHub"
          >
            GitHub
          </Link>
        </p>
        <p className="cursor-pointer">
          <Link
            href="https://river-dev.vercel.app/"
            target="_blank"
            aria-label="Blog"
          >
            Blog
          </Link>
        </p>
      </section>

      <section className="flex flex-col gap-3 text-xs w-full max-w-[1700px] pb-0 pl-2">
        <p>상호명: River (River Co., Ltd.)</p>
        <p>대표자: 이석호</p>
        <p>이메일: seokho0120@gmail.com</p>
        <p>사업장소재지: 서울특별시 성동구 상원길 63</p>
        <p> 전화번호: 010-7166-7552</p>
        <p>
          홈페이지:{' '}
          <Link
            href="https://peach-bloom.vercel.app/"
            className="underline transition-all hover:text-slate-200"
            target="_blank"
            aria-label="홈페이지"
          >
            peach-bloom.co.kr
          </Link>
          {' / '}
          <Link
            href="/"
            className="underline transition-all hover:text-slate-200"
            target="_blank"
            aria-label="이용 약관"
          >
            이용 약관
          </Link>
          {' / '}
          <Link
            href="/"
            className="underline transition-all hover:text-slate-200"
            target="_blank"
            aria-label="개인정보 처리 방침"
          >
            개인정보 처리 방침
          </Link>
        </p>
        <p>
          본 웹사이트는 실제가 아닌 개인 학습용으로 제작된 웹사이트이며 등록된
          제품은 본 웹사이트에서 판매되는 제품이 아닙니다.
        </p>
        <p className="mt-2">
          {' '}
          &copy; {new Date().getFullYear()}. RIVER All Rights Reserved.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
