type Props = {
  image?: string | null;
};

export default function Avatar({ image }: Props) {
  return (
    <p>
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img alt='user profile' src={image ?? undefined} />
    </p>
  );
}
